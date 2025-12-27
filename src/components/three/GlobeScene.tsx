import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

function Globe() {
  const meshRef = useRef<THREE.Mesh>(null);
  const wireframeRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.05;
    }
    if (wireframeRef.current) {
      wireframeRef.current.rotation.y = state.clock.elapsedTime * 0.05;
    }
  });

  return (
    <group>
      {/* Main globe */}
      <Sphere ref={meshRef} args={[2.5, 64, 64]}>
        <meshPhongMaterial
          color="#0a1628"
          transparent
          opacity={0.9}
          side={THREE.BackSide}
        />
      </Sphere>
      
      {/* Wireframe overlay */}
      <Sphere ref={wireframeRef} args={[2.52, 32, 32]}>
        <meshBasicMaterial
          color="#00f0ff"
          wireframe
          transparent
          opacity={0.15}
        />
      </Sphere>
      
      {/* Outer glow ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[2.6, 2.8, 64]} />
        <meshBasicMaterial color="#00f0ff" transparent opacity={0.1} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}

function IncidentMarkers() {
  const groupRef = useRef<THREE.Group>(null);
  
  // Generate random incident positions on globe surface
  const markers = useMemo(() => {
    const positions: { position: THREE.Vector3; color: string; scale: number }[] = [];
    const colors = ['#ff6b2b', '#00f0ff', '#ff4444', '#ffaa00', '#00ff88'];
    
    for (let i = 0; i < 25; i++) {
      const phi = Math.acos(-1 + (2 * Math.random()));
      const theta = Math.random() * Math.PI * 2;
      const radius = 2.55;
      
      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);
      
      positions.push({
        position: new THREE.Vector3(x, y, z),
        color: colors[Math.floor(Math.random() * colors.length)],
        scale: 0.03 + Math.random() * 0.04,
      });
    }
    return positions;
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      {markers.map((marker, i) => (
        <mesh key={i} position={marker.position}>
          <sphereGeometry args={[marker.scale, 16, 16]} />
          <meshBasicMaterial color={marker.color} />
        </mesh>
      ))}
    </group>
  );
}

function ParticleField() {
  const ref = useRef<THREE.Points>(null);
  
  const [positions] = useMemo(() => {
    const positions = new Float32Array(3000 * 3);
    
    for (let i = 0; i < 3000; i++) {
      const radius = 5 + Math.random() * 15;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(-1 + Math.random() * 2);
      
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);
    }
    
    return [positions];
  }, []);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.02;
      ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
    }
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#00f0ff"
        size={0.02}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.6}
      />
    </Points>
  );
}

function DataStreams() {
  const ref = useRef<THREE.Points>(null);
  
  const [positions] = useMemo(() => {
    const positions = new Float32Array(500 * 3);
    
    for (let i = 0; i < 500; i++) {
      const angle = (i / 500) * Math.PI * 4;
      const radius = 3.5 + Math.sin(i * 0.1) * 0.5;
      
      positions[i * 3] = Math.cos(angle) * radius;
      positions[i * 3 + 1] = (i / 500) * 4 - 2;
      positions[i * 3 + 2] = Math.sin(angle) * radius;
    }
    
    return [positions];
  }, []);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#ff6b2b"
        size={0.03}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.8}
      />
    </Points>
  );
}

export default function GlobeScene() {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.2} />
        <pointLight position={[10, 10, 10]} intensity={0.5} color="#00f0ff" />
        <pointLight position={[-10, -10, -10]} intensity={0.3} color="#ff6b2b" />
        
        <Globe />
        <IncidentMarkers />
        <ParticleField />
        <DataStreams />
      </Canvas>
    </div>
  );
}
