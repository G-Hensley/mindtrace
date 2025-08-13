import { createClient } from '@supabase/supabase-js';
import { AuthResponse } from '@supabase/supabase-js';

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
);

export const signInWithEmail = (email: string): Promise<AuthResponse> => {
  return supabase.auth.signInWithOtp({
    email,
    options: {
        emailRedirectTo: 'http://0.0.0.0:3000/auth/callback',
    }
  });
}
