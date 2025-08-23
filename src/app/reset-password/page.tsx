'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/supabase/client';
import { useRouter } from 'next/navigation';
import { errorToast, successToast } from '@/app/util/ToastNotification';
import PasswordInput from '@/app/components/ui/inputs/PasswordInput';

export default function ResetPassword() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Check if user has a valid session (came from password reset email)
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        // No valid session, redirect to home
        router.push('/');
      }
    });
  }, [router]);

  const handlePasswordReset = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!password || !confirmPassword) {
      errorToast('Please fill in all fields.');
      return;
    }

    if (password !== confirmPassword) {
      errorToast('Passwords do not match.');
      return;
    }

    if (password.length < 8) {
      errorToast('Password must be at least 8 characters long.');
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase.auth.updateUser({
        password: password
      });

      if (error) {
        throw error;
      }

      successToast('Password updated successfully!');
      
      // Redirect to dashboard after successful password reset
      setTimeout(() => {
        router.push('/dashboard');
      }, 1500);

    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to update password.';
      errorToast(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Reset Your Password
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Enter your new password below
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handlePasswordReset}>
          <div className="space-y-4">
            <PasswordInput
              aria-label="New Password Input"
              password={password}
              setPassword={setPassword}
              label="New Password"
            />
            <PasswordInput
              aria-label="Confirm New Password Input"
              password={confirmPassword}
              setPassword={setConfirmPassword}
              label="Confirm New Password"
            />
          </div>
          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Updating Password...' : 'Update Password'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}