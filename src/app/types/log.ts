import { UUID } from "crypto";

export type Log = {
  id?: UUID;
  user_id?: UUID;
  student_id: UUID;
  behavior_category_id: UUID;
  mood?: string;
  notes?: string;
  created_at?: string;
}

export type StudentLog = {
  id?: UUID;
  log_id: UUID;
  student_id: UUID;
  user_id: UUID;
  first_name: string;
  last_name: string;
  created_at: string;
  behavior: string;
  mood: string;
  notes?: string | null;
}

export type Mood = {
  id: number; 
  emoji: string;
  name: string;
}