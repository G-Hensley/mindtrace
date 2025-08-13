'use client';

import { useEffect, useState } from 'react';
import { useCreateProfile, useUploadAvatar } from '@/queries/profile';
import { useGetOrganizations } from '@/queries/organization';

// Component imports
import Selector from '@/components/ui/inputs/Selector';
import SubmitBtn from '@/components/ui/buttons/SubmitBtn';
import TextInput from '@/components/ui/inputs/TextInput';
import FileUpload from '@/components/ui/inputs/AvatarUpload';

// Toast notification imports
import { Toaster } from 'react-hot-toast';
import { successToast, errorToast } from '@/util/ToastNotification';

// Query imports
import { checkProfileInputs } from '@/lib/checkProfileInputs';
import { useAuth } from '@/components/providers/AuthProvider';

// Type imports for UUID
import { UUID } from 'crypto';

// NewUserForm component to create a new profile
export default function NewUserForm({
  setUserCreated,
}: {
  setUserCreated: (userCreated: boolean) => void;
}) {
  // Get the user
  const { user } = useAuth();

  // State variables for form inputs
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [role, setRole] = useState('');
  const [organizationId, setOrganizationId] = useState<string>('');
  const [profileImage, setProfileImage] = useState<File | null>(null);

  // Array of roles for the selector
  const roles = ['teacher', 'counselor', 'therapist'];

  // Get the organizations
  const { data: organizations } = useGetOrganizations();

  // Function to handle the useUploadAvatar mutation
  const {
    mutate: uploadAvatar,
    error: uploadAvatarError,
    isPending: isUploadingAvatar,
    data: uploadAvatarData,
  } = useUploadAvatar();

  // Function to handle the useCreateProfile mutation
  const {
    mutate: createProfile,
    error: createProfileError,
    data: createProfileData,
  } = useCreateProfile();

  // Handle avatar upload success
  useEffect(() => {
    if (uploadAvatarData && !isUploadingAvatar) {
      // Avatar uploaded successfully, now create profile
      const { cleanInputs } = checkProfileInputs(
        firstName,
        lastName,
        role,
        organizationId,
        profileImage
      );

      if (cleanInputs) {
        createProfile({
          first_name: cleanInputs.firstName,
          last_name: cleanInputs.lastName,
          role: cleanInputs.role,
          organization_id: cleanInputs.organization as UUID,
          avatar: cleanInputs.profileImage?.name || null,
        });
      }
    }
  }, [
    uploadAvatarData,
    isUploadingAvatar,
    firstName,
    lastName,
    role,
    organizationId,
    profileImage,
    createProfile,
  ]);

  // Handle profile creation success
  useEffect(() => {
    if (createProfileData) {
      successToast('Profile created successfully.');
      setTimeout(() => {
        setUserCreated(true);
      }, 3000);
    }
  }, [createProfileData, setUserCreated]);

  // Handle errors
  useEffect(() => {
    if (uploadAvatarError) {
      errorToast('Failed to upload avatar.');
    }
  }, [uploadAvatarError]);

  useEffect(() => {
    if (createProfileError) {
      errorToast('Failed to create profile.');
    }
  }, [createProfileError]);

  // Function to handle the form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Check if the form is valid
    const { cleanInputs } = checkProfileInputs(
      firstName,
      lastName,
      role,
      organizationId,
      profileImage
    );
    if (!cleanInputs) {
      errorToast('Please fill out all fields correctly.');
      return;
    }

    // If there's a profile image, upload it first
    if (cleanInputs.profileImage) {
      uploadAvatar({
        file: cleanInputs.profileImage as File,
        userId: user?.id as UUID,
      });
    } else {
      // No image, create profile directly
      createProfile({
        first_name: cleanInputs.firstName,
        last_name: cleanInputs.lastName,
        role: cleanInputs.role,
        organization_id: cleanInputs.organization as UUID,
        avatar: null,
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className='flex flex-col items-center w-sm xl:w-2/3 2xl:w-1/2 gap-8 h-fit relative form-card px-8 py-4'>
      <div className='absolute -translate-y-10 w-full z-50'>
        <Toaster />
      </div>

      <h2
        className={`text-xl font-bold text-accent z-10 font-lato`}>
        Create Profile
      </h2>

      <div className={`flex flex-col gap-8 w-full font-lato xl:grid xl:grid-cols-2`}>
        <div className='group relative'>
          <TextInput
            label='First Name'
            value={firstName}
            setValue={setFirstName}
            isRequired={true}
          />
        </div>
        <div className='group relative'>
          <TextInput
            label='Last Name'
            value={lastName}
            setValue={setLastName}
            isRequired={true}
          />
        </div>
        <div className='group relative'>
          <Selector
            options={roles}
            label='Role'
            isRequired={true}
            value={role}
            setValue={setRole}
          />
        </div>
        <div className='group relative'>
          <Selector
            options={organizations?.map((org) => org.name) || []}
            label='Organization'
            isRequired={true}
            value={
              organizations?.find((org) => org.id === organizationId)?.name ||
              ''
            }
            setValue={(orgName) => {
              const org = organizations?.find((org) => org.name === orgName);
              setOrganizationId(org?.id || '');
            }}
          />
        </div>
        <div className='group relative xl:col-span-2 xl:w-fit xl:justify-self-center'>
          <FileUpload setFile={setProfileImage} file={profileImage} />
        </div>
      </div>

      <div className='relative mt-auto'>
        <SubmitBtn />
      </div>
    </form>
  );
}
