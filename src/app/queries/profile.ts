// Import the useMutation and useQuery hooks from the @tanstack/react-query library
import { useMutation, useQuery } from '@tanstack/react-query';
import { supabase } from '@supabase/client';

// Type imports
import { Profile } from '@/types/profile';
import { UUID } from 'crypto';

// Function to upload avatar to the Supabase bucket
export const uploadAvatar = async (
  file: File | undefined,
  userId: UUID | undefined
) => {
  if (!file || !userId) {
    throw new Error('File or user ID is missing');
  }
  const filePath = `${userId}/${file.name}`;

  const { error } = await supabase.storage
    .from('profile-images')
    .upload(filePath, file, {
      upsert: true,
    });

  if (error) {
    throw error;
  }

  const { data } = supabase.storage
    .from('profile-images')
    .getPublicUrl(filePath);
  return data.publicUrl;
};


// Function to create a profile
export const createProfile = async (profile: Profile) => {
  const { data, error } = await supabase
  .from('profile')
  .insert(profile)
  .select();
  
  if (error) {
    throw error;
  }
  
  return data;
};

// Function to get an avatar from the Supabase bucket
const getAvatar = async (avatarUrl: string) => {

  const user = await supabase.auth.getUser();
  const userId = user.data.user?.id;

  const { data, error } = await supabase.storage
    .from('profile-images')
    .download(`${userId}/${avatarUrl}`);
  if (error) throw error;
  return data;
};

// Function to update a profile
export const updateProfile = async (profile: Profile, orgId: UUID) => {
  const { data, error } = await supabase
    .from('profile')
    .update(profile)
    .eq('organization_id', orgId)
    .select();

  if (error) {
    throw error;
  }

  return data;
};

// Query to upload avatar to the Supabase bucket
export const useUploadAvatar = () => {
  return useMutation({
    mutationFn: ({
      file,
      userId,
    }: {
      file: File | undefined;
      userId: UUID | undefined;
    }) => uploadAvatar(file, userId),
    onSuccess: (data) => {
      return data;
    },
    onError: (error) => {
      return error;
    },
  });
};

// Query to create a profile
export const useCreateProfile = () => {
  return useMutation({
    mutationFn: (profile: Profile) => createProfile(profile),
    onSuccess: (data) => {
      return data;
    },
    onError: (error) => {
      return error;
    },
  });
};


// Query to get an avatar from the Supabase bucket
export const useGetAvatar = (avatarUrl: string) => {
  return useQuery({
    queryKey: ['avatar', avatarUrl],
    queryFn: () => getAvatar(avatarUrl),
  });
};
