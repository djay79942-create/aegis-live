import { Suspense } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AlertTriangle, LayoutDashboard, Users, Zap, Shield, Radio } from 'lucide-react';
import { Button } from '@/components/ui/button';
import StatCounter from '@/components/ui/StatCounter';
import GlobeScene from '@/components/three/GlobeScene';
import Navbar from '@/components/layout/Navbar';
import { useIncidentStore } from '@/store/incidentStore';

export default function LandingPage() {
  const incidents = useIncidentStore((state) => state.incidents);
  const activeIncidents = incidents.filter((i) => i.status !== 'resolved').length;

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Three.js Background */}
      <Suspense fallback={null}>
        <GlobeScene />
      </Suspense>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 grid-pattern opacity-30 pointer-events-none" />

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-transparent to-background/80 pointer-events-none" />

      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 pt-24">
        <div className="max-w-5xl mx-auto text-center z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border border-primary/30 mb-8"
            >
              <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
              <span className="text-sm text-primary font-medium">
                Real-time Emergency Response System
              </span>
            </motion.div>

            {/* Headline */}
            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight">
              <span className="text-foreground">Report.</span>{' '}
              <span className="text-primary text-glow">Verify.</span>{' '}
              <span className="text-accent text-glow-accent">Respond.</span>
              <br />
              <span className="text-muted-foreground text-4xl md:text-5xl lg:text-6xl">
                — In Real Time
              </span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
              A next-generation emergency coordination platform that connects citizens 
              with first responders instantly. Report incidents, verify threats, and 
              save lives faster than ever before.
            </p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link to="/report">
                <Button variant="heroAccent" size="xl" className="gap-3 w-full sm:w-auto">
                  <AlertTriangle className="w-5 h-5" />
                  Report an Incident
                </Button>
              </Link>
              <Link to="/dashboard">
                <Button variant="outline" size="xl" className="gap-3 w-full sm:w-auto">
                  <LayoutDashboard className="w-5 h-5" />
                  View Live Dashboard
                </Button>
              </Link>
            </motion.div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-20"
          >
            <StatCounter
              value={activeIncidents}
              label="Active Incidents"
              icon={<AlertTriangle className="w-6 h-6" />}
              delay={800}
            />
            <StatCounter
              value={247}
              label="Responders Online"
              icon={<Users className="w-6 h-6" />}
              delay={1000}
            />
            <StatCounter
              value={98}
              suffix="%"
              label="Response Rate"
              icon={<Zap className="w-6 h-6" />}
              delay={1200}
            />
            <StatCounter
              value={12}
              suffix="s"
              label="Avg. Response"
              icon={<Radio className="w-6 h-6" />}
              delay={1400}
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
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Built for <span className="text-primary">Critical Response</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Military-grade reliability meets civilian accessibility. Our platform 
              processes thousands of reports in real-time with zero downtime.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: <AlertTriangle className="w-8 h-8" />,
                title: 'Instant Reporting',
                description: 'One-tap incident reporting with auto-location detection and smart categorization.',
              },
              {
                icon: <Shield className="w-8 h-8" />,
                title: 'Crowd Verification',
                description: 'Community-driven verification system eliminates false reports in seconds.',
              },
              {
                icon: <Zap className="w-8 h-8" />,
                title: 'Real-time Dispatch',
                description: 'AI-powered routing ensures the nearest responders are deployed instantly.',
              },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-card p-8 rounded-2xl relative group overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="text-primary mb-4 relative z-10">{feature.icon}</div>
                <h3 className="font-display text-xl font-semibold text-foreground mb-2 relative z-10">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground relative z-10">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-8 px-4 border-t border-border">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Shield className="w-6 h-6 text-primary" />
            <span className="font-display font-bold">RAPIDRESPONSE</span>
          </div>
          <p className="text-sm text-muted-foreground">
            © 2024 RapidResponse. Built for hackathon demonstration.
          </p>
        </div>
      </footer>
    </div>
  );
}
