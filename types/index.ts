// User-related types
export interface User {
  id: string;
  email: string;
  username: string;
  avatar_url?: string;
  created_at: string;
}

// Species-related types
export interface Species {
  id: string;
  name: string;
  scientific_name: string;
  description: string;
  habitat: string;
  category?: string;
  image_url?: string;
  created_at: string;
  updated_at: string;
  created_by?: string;
}

// Observation-related types
export interface Observation {
  id: string;
  species_id: string;
  user_id: string;
  location: {
    latitude: number;
    longitude: number;
  };
  notes?: string;
  image_url?: string;
  created_at: string;
  updated_at: string;
}

// Comment-related types
export interface Comment {
  id: string;
  observation_id: string;
  user_id: string;
  content: string;
  created_at: string;
  updated_at: string;
} 