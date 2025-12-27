import { motion } from 'framer-motion';
import Navbar from '@/components/layout/Navbar';
import IncidentForm from '@/components/incidents/IncidentForm';

export default function ReportPage() {
  return (
    <div className="min-h-screen bg-background relative">
      {/* Grid pattern */}
      <div className="absolute inset-0 grid-pattern opacity-20 pointer-events-none" />
      
      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-radial from-primary/5 via-transparent to-transparent pointer-events-none" />

      <Navbar />

      <main className="relative pt-32 pb-16 px-4">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-10"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border border-accent/30 mb-6">
              <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span className="text-sm text-accent font-medium">
                Report an Emergency
              </span>
            </div>
            
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
              Report an <span className="text-accent text-glow-accent">Incident</span>
            </h1>
            <p className="text-muted-foreground max-w-lg mx-auto">
              Your report helps save lives. Provide as much detail as possible 
              to help first responders arrive prepared.
            </p>
          </motion.div>

          <IncidentForm />
        </div>
      </main>
    </div>
  );
}
