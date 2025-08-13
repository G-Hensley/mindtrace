import { supabase } from './client';

// Create a new log entry
export async function createLogEntry(studentId: string, categoryId: string, notes: string, mood: string) {
    
    return supabase
        .from('log_entry')
        .insert([{ student_id: studentId, category_id: categoryId, notes, mood }])

}