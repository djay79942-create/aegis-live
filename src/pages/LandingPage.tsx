import { Suspense } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AlertTriangle, LayoutDashboard, Users, Zap, Shield, Radio, Target, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import StatCounter from '@/components/ui/StatCounter';
import PulseNetworkScene from '@/components/three/PulseNetworkScene';
import Navbar from '@/components/layout/Navbar';
import { useIncidentStore } from '@/store/incidentStore';

export default function LandingPage() {
  const incidents = useIncidentStore((state) => state.incidents);
  const activeIncidents = incidents.filter((i) => i.status !== 'resolved').length;
  const highPriority = incidents.filter((i) => i.severity === 'high' && i.status !== 'resolved').length;

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Three.js Pulse Network Background */}
      <Suspense fallback={null}>
        <PulseNetworkScene className="absolute inset-0 -z-10" />
      </Suspense>

      {/* Gradient overlays for readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-background/30 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-background/80 pointer-events-none" />

      {/* Scanline effect */}
      <div className="absolute inset-0 scanlines pointer-events-none opacity-50" />

      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 pt-24">
        <div className="max-w-5xl mx-auto text-center z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Status Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full command-panel border border-primary/40 mb-8"
            >
              <div className="relative">
                <div className="w-2.5 h-2.5 rounded-full bg-success" />
                <div className="absolute inset-0 w-2.5 h-2.5 rounded-full bg-success animate-ping" />
              </div>
              <span className="text-sm text-primary font-semibold tracking-wider uppercase">
                Incident Intelligence Active
              </span>
              <div className="w-px h-4 bg-border" />
              <span className="text-sm text-destructive font-bold">
                {highPriority} High Priority
              </span>
            </motion.div>

            {/* Main Headline */}
            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight tracking-tight">
              <span className="text-foreground">SENTINEL</span>
              <span className="text-primary text-glow">X</span>
            </h1>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="font-display text-xl md:text-2xl lg:text-3xl text-muted-foreground mb-4 tracking-wide"
            >
              Real-Time Incident Intelligence Platform
            </motion.p>

            <p className="text-base md:text-lg text-muted-foreground/80 max-w-2xl mx-auto mb-10 leading-relaxed">
              Advanced emergency coordination powered by live data visualization. 
              Report incidents, track responses, and coordinate resources in real-time.
            </p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link to="/report">
                <Button variant="heroAccent" size="xl" className="gap-3 w-full sm:w-auto group">
                  <AlertTriangle className="w-5 h-5 group-hover:animate-pulse" />
                  Report Incident
                </Button>
              </Link>
              <Link to="/dashboard">
                <Button variant="hero" size="xl" className="gap-3 w-full sm:w-auto">
                  <Eye className="w-5 h-5" />
                  Live Dashboard
                </Button>
              </Link>
            </motion.div>
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-20"
          >
            <StatCounter
              value={activeIncidents}
              label="Active Incidents"
              icon={<Target className="w-5 h-5" />}
              delay={900}
              variant="danger"
            />
            <StatCounter
              value={247}
              label="Responders Online"
              icon={<Users className="w-5 h-5" />}
              delay={1100}
            />
            <StatCounter
              value={98}
              suffix="%"
              label="Response Rate"
              icon={<Zap className="w-5 h-5" />}
              delay={1300}
            />
            <StatCounter
              value={12}
              suffix="s"
              label="Avg. Response"
              icon={<Radio className="w-5 h-5" />}
              delay={1500}
            />
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4 tracking-tight">
              Tactical <span className="text-primary text-glow">Intelligence</span> Features
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Command-grade incident management with real-time visualization and 
              coordinated response capabilities.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: <AlertTriangle className="w-8 h-8" />,
                title: 'Instant Reporting',
                description: 'One-tap incident reporting with GPS location detection and smart categorization by severity.',
                color: 'accent',
              },
              {
                icon: <Shield className="w-8 h-8" />,
                title: 'Crowd Verification',
                description: 'Community-driven verification system eliminates false reports through voting and validation.',
                color: 'primary',
              },
              {
                icon: <Zap className="w-8 h-8" />,
                title: 'Real-time Dispatch',
                description: 'Intelligent routing ensures the nearest available responders are deployed instantly.',
                color: 'success',
              },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className="command-panel p-8 rounded-2xl relative group overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className={`text-${feature.color} mb-4 relative z-10`}>{feature.icon}</div>
                <h3 className="font-display text-xl font-semibold text-foreground mb-3 relative z-10 tracking-tight">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground relative z-10 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-8 px-4 border-t border-border/50">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Shield className="w-6 h-6 text-primary" />
            <span className="font-display font-bold tracking-wider">
              SENTINEL<span className="text-primary">X</span>
            </span>
          </div>
          <p className="text-sm text-muted-foreground">
            © 2024 SentinelX Intelligence Platform. Hackathon Demonstration.
          </p>
        </div>
      </footer>
    </div>
  );
}
