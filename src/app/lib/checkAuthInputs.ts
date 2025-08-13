import { z } from 'zod';
import DOMPurify from 'dompurify';

// Schema for signup
const signupSchema = z.object({
  // Check if the email is a valid email address
  email: z.string().email('Please enter a valid email address.'),
  password: z.string()
    // Check if the password meets the requirements
    .min(10, 'Password must be at least 10 characters long.')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter.')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter.')
    .regex(/[0-9]/, 'Password must contain at least one number.')
    .regex(/[!@#$%^&*]/, 'Password must contain at least one special character.'),
  // Check if the confirm password meets the same requirements as the password
  confirmPassword: z.string()
    .min(10, 'Password must be at least 10 characters long.')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter.')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter.')
    .regex(/[0-9]/, 'Password must contain at least one number.')
    .regex(/[!@#$%^&*]/, 'Password must contain at least one special character.'),
});

// Schema for login (less strict validation)
const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address.'),
  password: z.string().min(1, 'Password is required.'),
});

// Function to check the authentication inputs
export function checkAuthInputs(
  email: string,
  password: string,
  confirmPassword?: string,
  isLogin?: boolean
): {
  result: boolean;
  error?: string;
  cleanEmail: string;
  cleanPassword: string;
} {
  // Early validation for empty fields and whitespace
  if (!email.trim() || !password.trim()) {
    return {
      result: false,
      error: 'Email and password are required.',
      cleanEmail: '',
      cleanPassword: '',
    };
  }

  // Sanitize inputs to prevent XSS attacks and remove whitespace
  const cleanEmail = DOMPurify.sanitize(email.trim());
  const cleanPassword = DOMPurify.sanitize(password);
  const cleanConfirmPassword = DOMPurify.sanitize(confirmPassword ?? '');

  // Check for signup-specific validation
  if (!isLogin) {
    // Check if the confirm password is empty
    if (!confirmPassword?.trim()) {
      return {
        result: false,
        error: 'Please confirm your password.',
        cleanEmail,
        cleanPassword,
      };
    }

    // Check if the passwords match
    if (cleanPassword !== cleanConfirmPassword) {
      return {
        result: false,
        error: 'Passwords do not match.',
        cleanEmail,
        cleanPassword,
      };
    }

    // Validate signup data
    const result = signupSchema.safeParse({
      email: cleanEmail,
      password: cleanPassword,
      confirmPassword: cleanConfirmPassword,
    });

    // If the signup data is valid, return the result
    if (result.success) {
      return { result: true, cleanEmail, cleanPassword };
    }

    // If the signup data is invalid, return the result
    return {
      result: false,
      error: result.error.errors[0]?.message || 'Invalid signup data.',
      cleanEmail,
      cleanPassword,
    };
  }

  // Validate login data
  const result = loginSchema.safeParse({
    email: cleanEmail,
    password: cleanPassword,
  });

  // If the login data is valid, return the result
  if (result.success) {
    return { result: true, cleanEmail, cleanPassword };
  }

  // If the login data is invalid, return the result
  return {
    result: false,
    error: result.error.errors[0]?.message || 'Invalid Credentials.',
    cleanEmail,
    cleanPassword,
  };
}
