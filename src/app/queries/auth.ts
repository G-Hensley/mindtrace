// Import the useQuery hook from the @tanstack/react-query library
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@supabase/client';

// Function to get the user profile
export const getUserProfile = async () => {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error('User not found');

  const { data, error } = await supabase
    .from('profile')
    .select('*')
    .eq('user_id', user.id);

  if (error) throw error;

  // Return the first profile or null if none exists
  return data?.[0] || null;
};

// React Query hook to get the user profile
export const useUserProfile = () => {
  return useQuery({
    queryKey: ['profile'],
    queryFn: getUserProfile,
  });
};
