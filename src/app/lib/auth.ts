'use server';

// Supabase imports to handle the authentication
import { supabase } from '@supabase/client';

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
  return await supabase.auth.resetPasswordForEmail(email, {  redirectTo: 'http://0.0.0.0:3000/password-reset',})
  .then(({ error }) => {
    if (error) {
      throw error;
    }
  });
}