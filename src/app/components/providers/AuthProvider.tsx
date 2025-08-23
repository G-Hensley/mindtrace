'use client';
// This file contains the AuthProvider component and useAuth hook for managing user authentication in a React application using Supabase.

import { createContext, useContext, useEffect, useState } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@supabase/client';

// Create a type for authentication context
type AuthContextType = {
  user: User | null;
  session: Session | null;
  loading: boolean;
  error: string | null;
  passwordReset: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  clearError: () => void;
  resetPassword: (email: string) => Promise<void>;
};

// Create the authentication context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  // State to hold session and user data
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [passwordReset, setPasswordReset] = useState(false);

  // Listen for authentication state changes and update the session and user data
  useEffect(() => {
    // Initialize the session and user data
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen for authentication state changes
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
      }
    );

    // Cleanup listener on unmount
    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  // Sign in function
  const signIn = async (email: string, password: string) => {
    // Set loading state to true and clear any previous errors
    setLoading(true);
    setError(null);

    // Sign in with email and password
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      // Set loading state to false only on success
      setLoading(false);
    }
  };

  // Sign up function
  const signUp = async (email: string, password: string) => {
    // Set loading state to true and clear any previous errors
    setLoading(true);
    setError(null);

    // Sign up with email and password
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });
    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      // Set loading state to false only on success
      setLoading(false);
    }
  };

  // Sign out function
  const signOut = async () => {
    // Set loading state to true and clear any previous errors
    setLoading(true);
    setError(null);

    // Sign out with email and password
    const { error } = await supabase.auth.signOut();
    if (error) {
      setError(error.message);
    } else {
      // Navigate to the home page and refresh the page if successful
      setSession(null);
      setUser(null);
    }

    setLoading(false);
  };

  // Reset password function
  const resetPassword = async (email: string) => {
    setLoading(true);
    setError(null);
    
    // Get the correct base URL for the current environment
    const baseUrl = typeof window !== 'undefined' 
      ? window.location.origin 
      : process.env.NODE_ENV === 'production' 
        ? (process.env.NEXT_PUBLIC_SITE_URL || `https://${process.env.VERCEL_URL}` || 'https://yourdomain.com')
        : 'http://localhost:3000';
    
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${baseUrl}/auth/callback?type=recovery`
    });
    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      // Always show success message regardless of whether email exists
      setLoading(false);
      // Don't set passwordReset to true here - let the component handle the UI state
    }
  };

  // Clear error function
  const clearError = () => {
    setError(null);
  };

  // Provide the context value to children components
  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        loading,
        error,
        signIn,
        signOut,
        signUp,
        resetPassword,
        clearError,
        passwordReset,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
