'use client';

// Import next.js components
import Image from 'next/image';
import { useEffect, useState } from 'react';

// Import types and queries
import { Profile } from '@/types/profile';
import { useGetOrganizationById } from '@/queries/organization';
import { useGetAvatar } from '@/queries/profile';
import { UUID } from 'crypto';

// Import Icons
import { EditIcon } from 'lucide-react';

// Profile Card Component
export default function ProfileCard({ profile }: { profile: Profile | null }) {

  // State to manage edit mode
  const [isEditing, setIsEditing] = useState(false);
  const [editField, setEditField] = useState<keyof Profile | null>(null);

  // Function to toggle edit mode (Will pass in what value to edit)
  const toggleEditMode = (field: keyof Profile) => {
    setIsEditing((prev) => !prev);
    setEditField(field);
  };

  // State to manage avatar loading timeout
  const [showAvatarLoader, setShowAvatarLoader] = useState(false);
  const [avatarLoadTimeout, setAvatarLoadTimeout] = useState(false);

  // Get the organization name of the user/profile
  const { data: organizationName } = useGetOrganizationById(
    profile?.organization_id as UUID
  );

  // Get the avatar of the user/profile
  const { data: avatarData, isLoading: avatarLoading } = useGetAvatar(
    profile?.avatar?.toString() || ''
  );
  // Create avatar url to display the image/avatar
  const avatar = avatarData ? URL.createObjectURL(avatarData) : undefined;

  // Effect to manage avatar loading timeout
  useEffect(() => {
    if (avatarLoading && profile?.avatar) {
      setShowAvatarLoader(true);
      setAvatarLoadTimeout(false);
      
      // Set timeout to stop showing loader after 2 seconds
      const timeout = setTimeout(() => {
        setShowAvatarLoader(false);
        setAvatarLoadTimeout(true);
      }, 2000);

      return () => clearTimeout(timeout);
    } else if (!avatarLoading) {
      setShowAvatarLoader(false);
      setAvatarLoadTimeout(false);
    }
  }, [avatarLoading, profile?.avatar]);

  // Create profile data to display the profile information
  const profileData = [
    {
      label: 'Name',
      value: `${profile?.first_name} ${profile?.last_name}`,
    },
    {
      label: 'Role',
      value: profile?.role,
    },
    {
      label: 'Organization',
      value: organizationName?.[0].name,
    },
  ];

  return (
    <div
      className='flex flex-col justify-center font-urbanist bg-gray-950/50 p-4 rounded-lg border border-gray-800/90 shadow-lg 
    shadow-black/40 text-lg gap-8 hover:border-primary/50 transition-all duration-300 my-auto'>
      {profileData.map((item) => (
        <div className='grid grid-cols-2' key={item.label}>
          <p className='border-gray-600/90 pr-6 border-b-2 self-end text-base flex items-center justify-between'>
            {item.label}:
            <EditIcon className='text-gray-500 cursor-pointer hover:text-gray-300 transition-all duration-200 active:scale-95' size={18}
              onClick={() => toggleEditMode(item.label as keyof Profile)}
            />
          </p>

          <p className='border-b-2 border-gray-600/90 pl-2 capitalize'>
            {item.value}
          </p>
        </div>
      ))}
      {showAvatarLoader && (
        <div className='flex justify-center w-full border-b-2 border-gray-600/90 pb-1'>
          <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900'></div>
        </div>
      )}
      {avatar && !avatarLoadTimeout && (
        <div className='flex justify-center w-full'>
          <Image
            className='rounded-full border border-gray-600/90'
            src={avatar || ''}
            alt='Avatar'
            width={100}
            height={100}
          />
        </div>
      )}
    </div>
  );
}
