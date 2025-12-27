import { motion } from 'framer-motion';
import { 
  Flame, Car, Heart, CloudLightning, Wrench, 
  MapPin, Clock, ThumbsUp, AlertCircle, CheckCircle2, Loader2 
} from 'lucide-react';
import { Incident, IncidentType, IncidentStatus, useIncidentStore } from '@/store/incidentStore';
import { Button } from '@/components/ui/button';
import { formatDistanceToNow } from 'date-fns';

const typeIcons: Record<IncidentType, React.ReactNode> = {
  fire: <Flame className="w-5 h-5" />,
  accident: <Car className="w-5 h-5" />,
  medical: <Heart className="w-5 h-5" />,
  disaster: <CloudLightning className="w-5 h-5" />,
  infrastructure: <Wrench className="w-5 h-5" />,
};

const typeLabels: Record<IncidentType, string> = {
  fire: 'Fire',
  accident: 'Accident',
  medical: 'Medical',
  disaster: 'Natural Disaster',
  infrastructure: 'Infrastructure',
};

const typeColors: Record<IncidentType, string> = {
  fire: 'text-orange-500',
  accident: 'text-yellow-500',
  medical: 'text-red-500',
  disaster: 'text-purple-500',
  infrastructure: 'text-blue-500',
};

const statusConfig: Record<IncidentStatus, { label: string; className: string; icon: React.ReactNode }> = {
  unverified: { 
    label: 'Unverified', 
    className: 'status-unverified',
    icon: <AlertCircle className="w-3 h-3" />
  },
  verified: { 
    label: 'Verified', 
    className: 'bg-primary/20 text-primary border-primary/50',
    icon: <CheckCircle2 className="w-3 h-3" />
  },
  responding: { 
    label: 'Responding', 
    className: 'status-in-progress',
    icon: <Loader2 className="w-3 h-3 animate-spin" />
  },
  resolved: { 
    label: 'Resolved', 
    className: 'status-resolved',
    icon: <CheckCircle2 className="w-3 h-3" />
  },
};

const severityColors = {
  low: 'bg-green-500/20 text-green-400 border-green-500/50',
  medium: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50',
  high: 'bg-red-500/20 text-red-400 border-red-500/50',
};

interface IncidentCardProps {
  incident: Incident;
  showActions?: boolean;
}

export default function IncidentCard({ incident, showActions = true }: IncidentCardProps) {
  const upvoteIncident = useIncidentStore((state) => state.upvoteIncident);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card p-5 rounded-xl relative overflow-hidden group hover:border-primary/30 transition-all duration-300"
    >
      {/* Severity indicator bar */}
      <div className={`absolute top-0 left-0 right-0 h-1 ${
        incident.severity === 'high' ? 'bg-red-500' :
        incident.severity === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
      }`} />

      <div className="flex gap-4">
        {/* Type Icon */}
        <div className={`flex-shrink-0 w-12 h-12 rounded-lg bg-secondary flex items-center justify-center ${typeColors[incident.type]}`}>
          {typeIcons[incident.type]}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-2">
            <div>
              <h3 className="font-display font-semibold text-foreground truncate">
                {typeLabels[incident.type]}
              </h3>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <MapPin className="w-3 h-3" />
                <span className="truncate">{incident.location.address}</span>
              </div>
            </div>

            {/* Status Badge */}
            <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${statusConfig[incident.status].className}`}>
              {statusConfig[incident.status].icon}
              {statusConfig[incident.status].label}
            </div>
          </div>

          <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
            {incident.description}
          </p>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {/* Severity */}
              <span className={`px-2 py-0.5 rounded text-xs font-medium border ${severityColors[incident.severity]}`}>
                {incident.severity.toUpperCase()}
              </span>
              
              {/* Time */}
              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="w-3 h-3" />
                {formatDistanceToNow(incident.reportedAt, { addSuffix: true })}
              </span>
            </div>

            {showActions && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => upvoteIncident(incident.id)}
                className="gap-1 text-muted-foreground hover:text-primary"
              >
                <ThumbsUp className="w-4 h-4" />
                <span className="font-mono">{incident.votes}</span>
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Hover glow effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-accent/5" />
      </div>
    </motion.div>
  );
}
