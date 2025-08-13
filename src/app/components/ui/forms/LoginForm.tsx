'use client';

// Importing Hooks
import { useState, useEffect } from 'react';
import { useAuth } from '@/components/providers/AuthProvider';

// Input validation and Sanitization imports
import { checkAuthInputs } from '@/lib/checkAuthInputs';

// Component imports
import EmailInput from '@/components/ui/inputs/EmailInput';
import PasswordInput from '@/components/ui/inputs/PasswordInput';
import Toggle from '@/components/ui/LoginToggle';
import SubmitBtn from '@/components/ui/buttons/SubmitBtn';
import { Toaster } from 'react-hot-toast';
import { errorToast, successToast } from '../../../util/ToastNotification';

export default function LoginForm() {
  // State variables for form handling
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordReset, setPasswordReset] = useState(false);

  // Auth hook to manage authentication state and actions
  const { signIn, signUp, error, clearError, resetPassword } =
    useAuth();

  // Toggle between login and registration forms
  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  // Effect to reset form fields when switching between login and registration
  useEffect(() => {
    setEmail('');
    setPassword('');
    setConfirmPassword('');
  }, [isLogin]);

  // Effect to clear errors when user starts typing in email
  useEffect(() => {
    if (email && error) {
      clearError();
    }
  }, [email, error, clearError]);

  // Effect to clear errors when user starts typing in password
  useEffect(() => {
    if (password && error) {
      clearError();
    }
  }, [password, error, clearError]);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // If in password reset mode, handle password reset
    if (passwordReset) {
      // Basic email validation
      if (!email || !email.includes('@')) {
        errorToast('Please enter a valid email address.');
        return;
      }

      try {
        await resetPassword(email);
        // Show success message regardless of whether email exists
        successToast(
          'If an account with that email exists, an email will be sent.'
        );
        // Reset the form and go back to login
        setPasswordReset(false);
        setEmail('');
      } catch (error) {
        errorToast(error as string);
      }
      return;
    }

    // Check if inputs are valid using the checkInputs function and the passwords match when signing up
    const checkResult = checkAuthInputs(
      email,
      password,
      isLogin ? undefined : confirmPassword,
      isLogin
    );

    if (!checkResult.result) {
      errorToast(checkResult.error || 'Invalid input.');
      return;
    }

    // Call the appropriate authentication function based on the form type (login or register)
    if (isLogin) {
      await signIn(checkResult.cleanEmail, checkResult.cleanPassword);
    } else {
      await signUp(checkResult.cleanEmail, checkResult.cleanPassword);
    }
  };

  // Effect to handle showing error messages with toast notifications
  useEffect(() => {
    if (error?.includes('abcdefg')) {
      errorToast(
        'Password should contain at least 1 special character, 1 number, 1 uppercase letter, and 1 lowercase letter.'
      );
    } else if (error) {
      errorToast(error);
    }
  }, [error]);

  return (
    <form
      aria-label='Login/Signup Form'
      className='flex flex-col items-center w-sm gap-8 h-[525px] relative pb-20 form-card px-8 pt-4'
      onSubmit={handleSubmit}>
      <div aria-label='Toaster Container' className='absolute -translate-y-10 w-full z-50'>
        <Toaster />
      </div>

      <h2
        aria-label='Form Title'
        className={`text-3xl font-bold text-accent text-outline-primary z-10 uppercase font-lato`}>
        {isLogin && !passwordReset
          ? 'Log in'
          : passwordReset
            ? 'Reset Password'
            : 'Sign up'}
      </h2>

      <div className={`flex flex-col gap-7 w-full font-lato`}>
        <div className={`group relative`} aria-label='Email Input Container'>
          <EmailInput aria-label='Email Input' email={email} setEmail={setEmail} />
        </div>

        {!passwordReset && (
          <PasswordInput
            aria-label='Password Input'
            password={password}
            setPassword={setPassword}
            label='Password'
          />
        )}
        {!isLogin && (
          <PasswordInput
            aria-label='Confirm Password Input'
            password={confirmPassword}
            setPassword={setConfirmPassword}
            label='Confirm Password'
          />
        )}
        {isLogin || (!isLogin && !passwordReset) ? (
          <button
            aria-label='Forgot Password Button'
            type='button'
            onClick={() => setPasswordReset(true)}
            className='text-accent text-outline-primary font-lato text-sm cursor-pointer w-fit self-center hover:underline
          transition-all duration-200 hover:opacity-70'>
            Forgot Password?
          </button>
        ) : (
          <button
            aria-label='Cancel Password Reset Button'
            type='button'
            onClick={() => setPasswordReset(false)}
            className='text-accent text-outline-primary font-lato text-sm cursor-pointer w-fit self-center hover:underline
            transition-all duration-200 hover:opacity-70'>
            Cancel
          </button>
        )}
      </div>

      <div className='relative mt-auto'>
        <SubmitBtn aria-label='Submit Button' />
      </div>

      <div
        aria-label='Toggle Form'
        className={`flex gap-4 font-urbanist font-bold text-lg text-highlight uppercase items-center absolute bottom-4`}>
        <p>Log in</p>
        <Toggle isLogin={isLogin} toggleForm={toggleForm} />
        <p>Sign up</p>
      </div>
    </form>
  );
}
