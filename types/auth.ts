// File: /types/auth.ts
export interface User {
  id: string;
  email: string;
  full_name: string;
  role: string;
  phone: string;
  skin_type: string;
  avatar_url?: string;
  birth_date: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}