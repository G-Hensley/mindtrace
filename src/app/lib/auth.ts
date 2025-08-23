'use server';

// Supabase imports to handle the authentication
import { supabase } from '@supabase/client';
import { getBaseUrl } from './getBaseUrl';

// Function to handle user signup
export async function signUp(email: string, password: string) {

  return await supabase.auth.signUp({
    email: email,
    password: password,
  }).then(({ error }) => {
    if (error) {
      throw error;
    }
  });

};

// Function to handle user login
export async function signIn(email: string, password: string) {

  // Sign in with password
  return await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  }).then(({ error }) => {
    if (error) {
      throw error;
    }
  });

};

// Function to handle user logout
export async function signOut() {
  return await supabase.auth.signOut().then(({ error }) => {
    if (error) {
      throw error;
    }
  });
}

// Function to handle password reset
export async function resetPassword(email: string) {
  const baseUrl = getBaseUrl();
  const { data, error } = await supabase.auth.resetPasswordForEmail(email, { 
    redirectTo: `${baseUrl}/auth/callback?type=recovery` 
  });
  if (error) {
    throw error;
  }
  return data;
}