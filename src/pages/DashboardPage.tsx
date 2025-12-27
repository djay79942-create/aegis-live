import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Filter, MapPin, Clock, AlertTriangle, RefreshCw } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import IncidentCard from '@/components/incidents/IncidentCard';
import { Button } from '@/components/ui/button';
import { useIncidentStore, IncidentType, Incident } from '@/store/incidentStore';

const incidentTypes: { value: IncidentType | 'all'; label: string }[] = [
  { value: 'all', label: 'All Types' },
  { value: 'accident', label: 'Accident' },
  { value: 'fire', label: 'Fire' },
  { value: 'medical', label: 'Medical' },
  { value: 'disaster', label: 'Disaster' },
  { value: 'infrastructure', label: 'Infrastructure' },
];

const timeFilters = [
  { value: 'all', label: 'All Time' },
  { value: '1h', label: 'Last Hour' },
  { value: '24h', label: 'Last 24h' },
  { value: '7d', label: 'Last 7 Days' },
];

export default function DashboardPage() {
  const incidents = useIncidentStore((state) => state.incidents);
  const [typeFilter, setTypeFilter] = useState<IncidentType | 'all'>('all');
  const [timeFilter, setTimeFilter] = useState('all');
  const [isLive, setIsLive] = useState(true);
  const [filteredIncidents, setFilteredIncidents] = useState<Incident[]>(incidents);

  // Filter incidents
  useEffect(() => {
    let filtered = [...incidents];

    // Type filter
    if (typeFilter !== 'all') {
      filtered = filtered.filter((inc) => inc.type === typeFilter);
    }

    // Time filter
    const now = new Date();
    if (timeFilter === '1h') {
      filtered = filtered.filter((inc) => 
        now.getTime() - new Date(inc.reportedAt).getTime() < 1000 * 60 * 60
      );
    } else if (timeFilter === '24h') {
      filtered = filtered.filter((inc) => 
        now.getTime() - new Date(inc.reportedAt).getTime() < 1000 * 60 * 60 * 24
      );
    } else if (timeFilter === '7d') {
      filtered = filtered.filter((inc) => 
        now.getTime() - new Date(inc.reportedAt).getTime() < 1000 * 60 * 60 * 24 * 7
      );
    }

    // Sort by most recent
    filtered.sort((a, b) => new Date(b.reportedAt).getTime() - new Date(a.reportedAt).getTime());

    setFilteredIncidents(filtered);
  }, [incidents, typeFilter, timeFilter]);

  // Simulate live updates
  useEffect(() => {
    if (!isLive) return;
    
    const interval = setInterval(() => {
      // Trigger re-render to show "live" feel
      setFilteredIncidents((prev) => [...prev]);
    }, 5000);

    return () => clearInterval(interval);
  }, [isLive]);

  const activeCount = filteredIncidents.filter((i) => i.status !== 'resolved').length;
  const highPriorityCount = filteredIncidents.filter((i) => i.severity === 'high' && i.status !== 'resolved').length;

  return (
    <div className="min-h-screen bg-background relative">
      {/* Grid pattern */}
      <div className="absolute inset-0 grid-pattern opacity-20 pointer-events-none" />

      <Navbar />

      <main className="relative pt-32 pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h1 className="font-display text-4xl font-bold text-foreground mb-2">
                  Live <span className="text-primary text-glow">Dashboard</span>
                </h1>
                <p className="text-muted-foreground">
                  Real-time incident monitoring and coordination center
                </p>
              </div>

              <div className="flex items-center gap-3">
                <Button
                  variant={isLive ? 'default' : 'outline'}
                  onClick={() => setIsLive(!isLive)}
                  className="gap-2"
                >
                  <RefreshCw className={`w-4 h-4 ${isLive ? 'animate-spin' : ''}`} />
                  {isLive ? 'Live' : 'Paused'}
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Stats Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
          >
            <div className="glass-card p-4 rounded-xl">
              <div className="text-2xl font-display font-bold text-foreground">{filteredIncidents.length}</div>
              <div className="text-sm text-muted-foreground">Total Reports</div>
            </div>
            <div className="glass-card p-4 rounded-xl">
              <div className="text-2xl font-display font-bold text-primary">{activeCount}</div>
              <div className="text-sm text-muted-foreground">Active Incidents</div>
            </div>
            <div className="glass-card p-4 rounded-xl">
              <div className="text-2xl font-display font-bold text-destructive">{highPriorityCount}</div>
              <div className="text-sm text-muted-foreground">High Priority</div>
            </div>
            <div className="glass-card p-4 rounded-xl flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-success animate-pulse" />
              <div className="text-sm font-medium text-success">System Online</div>
            </div>
          </motion.div>

          {/* Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-card p-4 rounded-xl mb-8"
          >
            <div className="flex flex-col md:flex-row gap-4">
              {/* Type Filter */}
              <div className="flex-1">
                <label className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                  <Filter className="w-4 h-4" />
                  Incident Type
                </label>
                <div className="flex flex-wrap gap-2">
                  {incidentTypes.map((type) => (
                    <button
                      key={type.value}
                      onClick={() => setTypeFilter(type.value)}
                      className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                        typeFilter === type.value
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-secondary text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      {type.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Time Filter */}
              <div>
                <label className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                  <Clock className="w-4 h-4" />
                  Time Range
                </label>
                <div className="flex gap-2">
                  {timeFilters.map((time) => (
                    <button
                      key={time.value}
                      onClick={() => setTimeFilter(time.value)}
                      className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                        timeFilter === time.value
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-secondary text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      {time.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Content Grid */}
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Incident List */}
            <div className="lg:col-span-2 space-y-4">
              {filteredIncidents.length > 0 ? (
                filteredIncidents.map((incident, index) => (
                  <motion.div
                    key={incident.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <IncidentCard incident={incident} />
                  </motion.div>
                ))
              ) : (
                <div className="glass-card p-12 rounded-xl text-center">
                  <AlertTriangle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                    No Incidents Found
                  </h3>
                  <p className="text-muted-foreground">
                    No incidents match your current filters.
                  </p>
                </div>
              )}
            </div>

            {/* Map Placeholder */}
            <div className="lg:col-span-1">
              <div className="glass-card rounded-xl overflow-hidden sticky top-32">
                <div className="p-4 border-b border-border">
                  <h3 className="font-display font-semibold text-foreground flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-primary" />
                    Incident Map
                  </h3>
                </div>
                <div className="h-[500px] bg-secondary/30 relative">
                  {/* Map visualization placeholder */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center relative">
                        <MapPin className="w-12 h-12 text-primary" />
                        <div className="absolute inset-0 rounded-full border-2 border-primary/30 animate-ping" />
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {filteredIncidents.length} incidents in view
                      </p>
                    </div>
                  </div>

                  {/* Simulated incident dots */}
                  {filteredIncidents.slice(0, 10).map((incident, i) => (
                    <div
                      key={incident.id}
                      className="absolute w-3 h-3 rounded-full animate-pulse"
                      style={{
                        left: `${20 + (i * 7) % 60}%`,
                        top: `${15 + (i * 11) % 70}%`,
                        backgroundColor: 
                          incident.severity === 'high' ? '#ef4444' :
                          incident.severity === 'medium' ? '#eab308' : '#22c55e',
                        boxShadow: `0 0 10px ${
                          incident.severity === 'high' ? '#ef4444' :
                          incident.severity === 'medium' ? '#eab308' : '#22c55e'
                        }`,
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
