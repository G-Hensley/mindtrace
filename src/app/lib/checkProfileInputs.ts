import { z } from 'zod';
import DOMPurify from 'dompurify';

// Schema for new profile to validate the inputs for the new user form
const newProfileSchema = z.object({
  firstName: z.string()
    .min(1, 'First name is required.')
    .max(50, 'First name must be less than 50 characters.')
    .regex(/^[a-zA-Z]+$/, 'First name must contain only letters, hyphens, and apostrophes.'),
  lastName: z.string()
    .min(1, 'Last name is required.')
    .max(50, 'Last name must be less than 50 characters.')
    .regex(/^[a-zA-Z]+$/, 'Last name must contain only letters, hyphens, and apostrophes.'),
  role: z.enum(['teacher', 'counselor', 'admin', 'therapist', 'parent'], {
    errorMap: () => ({ message: 'Please select a valid role.' }),
  }),
  organization: z.string()
    .min(1, 'Organization is required.'),
  // Check if the profile image is a valid image file and if it is, return the file
  profileImage: z
    .instanceof(File)
    .refine((file) => {
      return (
        file.type == 'image/jpeg' ||
        file.type == 'image/png' ||
        file.type == 'image/webp' ||
        file.type == 'image/jpg'
      );
    }, 'Only .jpg, .jpeg, .png and .webp formats are supported.')
    .refine((file) => file?.size <= 1024 * 1024 * 5, 'File size must be less than 5MB.')
    .nullable(),
}).optional();

// Function to check the profile inputs
export function checkProfileInputs(
  firstName: string,
  lastName: string,
  role: string,
  organization: string,
  profileImage: File | null
): {
  result: boolean;
  error?: string;
  cleanInputs: {
    firstName: string;
    lastName: string;
    role: string;
    organization: string;
    profileImage: File | null;
  };
} {
  // Sanitize the inputs to prevent XSS attacks and remove whitespace
  const cleanInputs = {
    firstName: DOMPurify.sanitize(firstName),
    lastName: DOMPurify.sanitize(lastName),
    role: DOMPurify.sanitize(role),
    organization: DOMPurify.sanitize(organization),
    profileImage: profileImage || null,
  };

  // Validate the inputs
  const result = newProfileSchema.safeParse(cleanInputs);

  // If the inputs are invalid, return the result
  if (!result.success) {
    return {
      result: false,
      error: result.error.message,
      cleanInputs,
    };
  }

  // If the inputs are valid, return the result
  return {
    result: true,
    cleanInputs,
  };
}
