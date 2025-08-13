'use client';

// Import next.js components
import Image from 'next/image';

// Import types and queries
import { Profile } from '@/types/profile';
import { useGetOrganizationById } from '@/queries/organization';
import { useGetAvatar } from '@/queries/profile';
import { UUID } from 'crypto';

// Profile Card Component
export default function ProfileCard({ profile }: { profile: Profile | null }) {

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
    shadow-black/40 text-lg gap-8 hover:border-primary/50 transition-all duration-300'>
      {profileData.map((item) => (
        <div className='grid grid-cols-2' key={item.label}>
          <p className='border-gray-600/90 pr-6 border-b-2 border-r self-end'>
            {item.label}:
          </p>

          <p className='border-b-2 border-gray-600/90 pl-2 capitalize'>
            {item.value}
          </p>
        </div>
      ))}
      {avatarLoading && (
        <div className='flex justify-center w-full border-b-2 border-gray-600/90 pb-1'>
          <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900'></div>
        </div>
      )}
      {avatar && (
        <div className='flex justify-center w-full border-b-2 border-gray-600/90 pb-1'>
          <Image
            className='rounded-full'
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
