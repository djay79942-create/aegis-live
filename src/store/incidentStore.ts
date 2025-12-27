import { create } from 'zustand';

export type IncidentType = 'accident' | 'fire' | 'medical' | 'disaster' | 'infrastructure';
export type IncidentSeverity = 'low' | 'medium' | 'high';
export type IncidentStatus = 'unverified' | 'verified' | 'responding' | 'resolved';

export interface Incident {
  id: string;
  type: IncidentType;
  description: string;
  location: {
    lat: number;
    lng: number;
    address: string;
  };
  severity: IncidentSeverity;
  status: IncidentStatus;
  votes: number;
  reportedAt: Date;
  updatedAt: Date;
  imageUrl?: string;
  notes?: string[];
}

interface IncidentStore {
  incidents: Incident[];
  addIncident: (incident: Omit<Incident, 'id' | 'reportedAt' | 'updatedAt' | 'votes' | 'status'>) => void;
  updateIncidentStatus: (id: string, status: IncidentStatus) => void;
  upvoteIncident: (id: string) => void;
  addNote: (id: string, note: string) => void;
  getIncidentById: (id: string) => Incident | undefined;
}

// Sample incidents for demo
const sampleIncidents: Incident[] = [
  {
    id: '1',
    type: 'fire',
    description: 'Building fire reported on 5th floor. Multiple residents evacuating.',
    location: { lat: 40.7128, lng: -74.006, address: '123 Main St, New York, NY' },
    severity: 'high',
    status: 'verified',
    votes: 15,
    reportedAt: new Date(Date.now() - 1000 * 60 * 5),
    updatedAt: new Date(Date.now() - 1000 * 60 * 2),
  },
  {
    id: '2',
    type: 'accident',
    description: 'Multi-vehicle collision on highway. Traffic backed up for miles.',
    location: { lat: 40.7589, lng: -73.9851, address: 'I-95 North, Exit 23' },
    severity: 'medium',
    status: 'responding',
    votes: 8,
    reportedAt: new Date(Date.now() - 1000 * 60 * 12),
    updatedAt: new Date(Date.now() - 1000 * 60 * 5),
  },
  {
    id: '3',
    type: 'medical',
    description: 'Person collapsed at subway station. CPR in progress.',
    location: { lat: 40.7484, lng: -73.9857, address: 'Times Square Station, Platform 2' },
    severity: 'high',
    status: 'unverified',
    votes: 3,
    reportedAt: new Date(Date.now() - 1000 * 60 * 1),
    updatedAt: new Date(Date.now() - 1000 * 60 * 1),
  },
  {
    id: '4',
    type: 'infrastructure',
    description: 'Water main break causing flooding on residential street.',
    location: { lat: 40.7282, lng: -73.7949, address: '456 Oak Ave, Queens, NY' },
    severity: 'medium',
    status: 'verified',
    votes: 12,
    reportedAt: new Date(Date.now() - 1000 * 60 * 30),
    updatedAt: new Date(Date.now() - 1000 * 60 * 15),
  },
  {
    id: '5',
    type: 'disaster',
    description: 'Flash flood warning - multiple areas affected downtown.',
    location: { lat: 40.7061, lng: -74.0087, address: 'Financial District, Manhattan' },
    severity: 'high',
    status: 'verified',
    votes: 45,
    reportedAt: new Date(Date.now() - 1000 * 60 * 45),
    updatedAt: new Date(Date.now() - 1000 * 60 * 10),
  },
];

export const useIncidentStore = create<IncidentStore>((set, get) => ({
  incidents: sampleIncidents,
  
  addIncident: (incident) => {
    const newIncident: Incident = {
      ...incident,
      id: Math.random().toString(36).substr(2, 9),
      status: 'unverified',
      votes: 0,
      reportedAt: new Date(),
      updatedAt: new Date(),
    };
    set((state) => ({ incidents: [newIncident, ...state.incidents] }));
  },
  
  updateIncidentStatus: (id, status) => {
    set((state) => ({
      incidents: state.incidents.map((inc) =>
        inc.id === id ? { ...inc, status, updatedAt: new Date() } : inc
      ),
    }));
  },
  
  upvoteIncident: (id) => {
    set((state) => ({
      incidents: state.incidents.map((inc) =>
        inc.id === id ? { ...inc, votes: inc.votes + 1, updatedAt: new Date() } : inc
      ),
    }));
  },
  
  addNote: (id, note) => {
    set((state) => ({
      incidents: state.incidents.map((inc) =>
        inc.id === id
          ? { ...inc, notes: [...(inc.notes || []), note], updatedAt: new Date() }
          : inc
      ),
    }));
  },
  
  getIncidentById: (id) => {
    return get().incidents.find((inc) => inc.id === id);
  },
}));
