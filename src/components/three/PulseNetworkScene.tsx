import { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useIncidentStore, Incident } from '@/store/incidentStore';

// Shader for expanding pulse rings
const pulseVertexShader = `
  uniform float uTime;
  uniform float uProgress;
  varying vec2 vUv;
  
  void main() {
    vUv = uv;
    vec3 pos = position;
    float scale = 1.0 + uProgress * 4.0;
    pos.xy *= scale;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const pulseFragmentShader = `
  uniform vec3 uColor;
  uniform float uProgress;
  varying vec2 vUv;
  
  void main() {
    float dist = length(vUv - 0.5) * 2.0;
    float alpha = (1.0 - uProgress) * (1.0 - dist) * 0.8;
    alpha = max(0.0, alpha);
    gl_FragColor = vec4(uColor, alpha);
  }
`;

interface PulseWave {
  id: string;
  position: THREE.Vector3;
  color: THREE.Color;
  startTime: number;
  duration: number;
}

function IncidentPulse({ pulse, currentTime }: { pulse: PulseWave; currentTime: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  
  const progress = Math.min(1, (currentTime - pulse.startTime) / pulse.duration);
  
  useFrame(() => {
    if (materialRef.current) {
      const prog = Math.min(1, (performance.now() / 1000 - pulse.startTime) / pulse.duration);
      materialRef.current.uniforms.uProgress.value = prog;
    }
  });

  if (progress >= 1) return null;

  return (
    <mesh ref={meshRef} position={pulse.position} rotation={[-Math.PI / 2, 0, 0]}>
      <ringGeometry args={[0.1, 0.15, 64]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={pulseVertexShader}
        fragmentShader={pulseFragmentShader}
        transparent
        side={THREE.DoubleSide}
        depthWrite={false}
        uniforms={{
          uTime: { value: 0 },
          uProgress: { value: progress },
          uColor: { value: pulse.color },
        }}
      />
    </mesh>
  );
}

function GridPlane() {
  const planeRef = useRef<THREE.Mesh>(null);
  
  const gridTexture = useMemo(() => {
    const size = 512;
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d')!;
    
    // Dark background
    ctx.fillStyle = '#030712';
    ctx.fillRect(0, 0, size, size);
    
    // Grid lines
    ctx.strokeStyle = '#0ea5e9';
    ctx.lineWidth = 1;
    ctx.globalAlpha = 0.15;
    
    const step = size / 32;
    for (let i = 0; i <= 32; i++) {
      ctx.beginPath();
      ctx.moveTo(i * step, 0);
      ctx.lineTo(i * step, size);
      ctx.stroke();
      
      ctx.beginPath();
      ctx.moveTo(0, i * step);
      ctx.lineTo(size, i * step);
      ctx.stroke();
    }
    
    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(8, 8);
    return texture;
  }, []);

  return (
    <mesh ref={planeRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]}>
      <planeGeometry args={[100, 100]} />
      <meshBasicMaterial map={gridTexture} transparent opacity={0.6} />
    </mesh>
  );
}

function IncidentMarker({ incident, onClick }: { incident: Incident; onClick?: () => void }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.PointLight>(null);
  const [hovered, setHovered] = useState(false);
  
  const color = useMemo(() => {
    switch (incident.severity) {
      case 'high': return new THREE.Color('#ef4444');
      case 'medium': return new THREE.Color('#f97316');
      case 'low': return new THREE.Color('#0ea5e9');
      default: return new THREE.Color('#0ea5e9');
    }
  }, [incident.severity]);
  
  // Deterministic position based on incident
  const position = useMemo(() => {
    const hash = incident.id.split('').reduce((a, b) => {
      a = ((a << 5) - a) + b.charCodeAt(0);
      return a & a;
    }, 0);
    const x = ((hash % 100) / 100 - 0.5) * 20;
    const z = (((hash * 7) % 100) / 100 - 0.5) * 20;
    return new THREE.Vector3(x, 0.1, z);
  }, [incident.id]);

  useFrame((state) => {
    if (meshRef.current) {
      const pulse = Math.sin(state.clock.elapsedTime * 3 + position.x) * 0.05 + 0.15;
      meshRef.current.scale.setScalar(hovered ? 0.25 : pulse);
    }
    if (glowRef.current) {
      glowRef.current.intensity = Math.sin(state.clock.elapsedTime * 2) * 0.5 + 1;
    }
  });

  const isResolved = incident.status === 'resolved';

  return (
    <group position={position}>
      {/* Core marker */}
      <mesh
        ref={meshRef}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={onClick}
      >
        <sphereGeometry args={[1, 16, 16]} />
        <meshBasicMaterial color={color} transparent opacity={isResolved ? 0.3 : 0.9} />
      </mesh>
      
      {/* Glow effect */}
      {!isResolved && (
        <pointLight ref={glowRef} color={color} intensity={1} distance={3} />
      )}
      
      {/* Vertical beam */}
      {!isResolved && incident.severity === 'high' && (
        <mesh position={[0, 2, 0]}>
          <cylinderGeometry args={[0.02, 0.02, 4, 8]} />
          <meshBasicMaterial color={color} transparent opacity={0.4} />
        </mesh>
      )}
    </group>
  );
}

function ConnectionLines({ incidents }: { incidents: Incident[] }) {
  const lineRef = useRef<THREE.LineSegments>(null);
  
  const geometry = useMemo(() => {
    const positions: number[] = [];
    const activeIncidents = incidents.filter(i => i.status !== 'resolved');
    
    // Connect nearby incidents
    for (let i = 0; i < activeIncidents.length; i++) {
      for (let j = i + 1; j < activeIncidents.length; j++) {
        const inc1 = activeIncidents[i];
        const inc2 = activeIncidents[j];
        
        // Calculate positions
        const getPos = (id: string) => {
          const hash = id.split('').reduce((a, b) => {
            a = ((a << 5) - a) + b.charCodeAt(0);
            return a & a;
          }, 0);
          return {
            x: ((hash % 100) / 100 - 0.5) * 20,
            z: (((hash * 7) % 100) / 100 - 0.5) * 20,
          };
        };
        
        const pos1 = getPos(inc1.id);
        const pos2 = getPos(inc2.id);
        
        const distance = Math.sqrt(
          Math.pow(pos2.x - pos1.x, 2) + Math.pow(pos2.z - pos1.z, 2)
        );
        
        // Only connect if close enough
        if (distance < 8) {
          positions.push(pos1.x, 0.05, pos1.z);
          positions.push(pos2.x, 0.05, pos2.z);
        }
      }
    }
    
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    return geo;
  }, [incidents]);

  useFrame((state) => {
    if (lineRef.current) {
      const material = lineRef.current.material as THREE.LineBasicMaterial;
      material.opacity = Math.sin(state.clock.elapsedTime * 2) * 0.2 + 0.3;
    }
  });

  return (
    <lineSegments ref={lineRef} geometry={geometry}>
      <lineBasicMaterial color="#0ea5e9" transparent opacity={0.3} />
    </lineSegments>
  );
}

function AmbientParticles() {
  const pointsRef = useRef<THREE.Points>(null);
  
  const [positions, colors] = useMemo(() => {
    const count = 500;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 50;
      positions[i * 3 + 1] = Math.random() * 5;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 50;
      
      const color = new THREE.Color('#0ea5e9');
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }
    
    return [positions, colors];
  }, []);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.02;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={colors.length / 3}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        transparent
        opacity={0.6}
        vertexColors
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

function CameraController({ incidents }: { incidents: Incident[] }) {
  const { camera } = useThree();
  const targetRef = useRef(new THREE.Vector3(0, 8, 15));
  const lookAtRef = useRef(new THREE.Vector3(0, 0, 0));
  
  useFrame((state) => {
    // Subtle orbital movement
    const t = state.clock.elapsedTime * 0.1;
    const radius = 18;
    
    targetRef.current.x = Math.sin(t) * radius;
    targetRef.current.z = Math.cos(t) * radius;
    targetRef.current.y = 10 + Math.sin(t * 0.5) * 2;
    
    // Smooth camera follow
    camera.position.lerp(targetRef.current, 0.01);
    camera.lookAt(lookAtRef.current);
  });

  return null;
}

function Scene() {
  const incidents = useIncidentStore((state) => state.incidents);
  const [pulses, setPulses] = useState<PulseWave[]>([]);
  const prevIncidentCount = useRef(incidents.length);

  // Generate pulses when new incidents are added
  useEffect(() => {
    if (incidents.length > prevIncidentCount.current) {
      const newIncident = incidents[0];
      const hash = newIncident.id.split('').reduce((a, b) => {
        a = ((a << 5) - a) + b.charCodeAt(0);
        return a & a;
      }, 0);
      
      const color = newIncident.severity === 'high' 
        ? new THREE.Color('#ef4444')
        : newIncident.severity === 'medium'
        ? new THREE.Color('#f97316')
        : new THREE.Color('#0ea5e9');
      
      const newPulse: PulseWave = {
        id: `pulse-${Date.now()}`,
        position: new THREE.Vector3(
          ((hash % 100) / 100 - 0.5) * 20,
          0.02,
          (((hash * 7) % 100) / 100 - 0.5) * 20
        ),
        color,
        startTime: performance.now() / 1000,
        duration: 3,
      };
      
      setPulses((prev) => [...prev, newPulse]);
    }
    prevIncidentCount.current = incidents.length;
  }, [incidents]);

  // Auto-generate demo pulses
  useEffect(() => {
    const interval = setInterval(() => {
      const colors = [
        new THREE.Color('#ef4444'),
        new THREE.Color('#f97316'),
        new THREE.Color('#0ea5e9'),
      ];
      
      const newPulse: PulseWave = {
        id: `pulse-${Date.now()}`,
        position: new THREE.Vector3(
          (Math.random() - 0.5) * 20,
          0.02,
          (Math.random() - 0.5) * 20
        ),
        color: colors[Math.floor(Math.random() * colors.length)],
        startTime: performance.now() / 1000,
        duration: 3,
      };
      
      setPulses((prev) => [...prev.slice(-10), newPulse]);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  // Clean up old pulses
  useEffect(() => {
    const cleanup = setInterval(() => {
      const now = performance.now() / 1000;
      setPulses((prev) => prev.filter((p) => now - p.startTime < p.duration));
    }, 1000);

    return () => clearInterval(cleanup);
  }, []);

  const currentTime = performance.now() / 1000;

  return (
    <>
      <ambientLight intensity={0.1} />
      <pointLight position={[0, 20, 0]} intensity={0.5} color="#0ea5e9" />
      <fog attach="fog" args={['#030712', 15, 50]} />
      
      <CameraController incidents={incidents} />
      <GridPlane />
      <AmbientParticles />
      <ConnectionLines incidents={incidents} />
      
      {/* Incident markers */}
      {incidents.map((incident) => (
        <IncidentMarker key={incident.id} incident={incident} />
      ))}
      
      {/* Pulse waves */}
      {pulses.map((pulse) => (
        <IncidentPulse key={pulse.id} pulse={pulse} currentTime={currentTime} />
      ))}
    </>
  );
}

interface PulseNetworkSceneProps {
  className?: string;
  mini?: boolean;
}

export default function PulseNetworkScene({ className = '', mini = false }: PulseNetworkSceneProps) {
  return (
    <div className={`${className}`}>
      <Canvas
        camera={{ 
          position: mini ? [0, 12, 12] : [0, 10, 18], 
          fov: mini ? 50 : 45,
          near: 0.1,
          far: 100
        }}
        gl={{ 
          antialias: true, 
          alpha: true,
          powerPreference: 'high-performance'
        }}
        style={{ background: 'transparent' }}
        dpr={[1, 2]}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
