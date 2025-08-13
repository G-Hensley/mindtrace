'use client';
// Import the ProtectedRoute component to protect this page
import ProtectedRoute from '@/components/providers/ProtectedRoute';

// Import the useState and useEffect hooks from the react library
import { useState, useEffect } from 'react';

// Import the useUserProfile hook to get the user profile
import { useUserProfile } from '@/queries/auth';

// Import the visual components
import Nav from '@/components/ui/layout/Nav';
import NewUserForm from '@/components/ui/forms/NewUserForm';
import ProfileCard from '@/components/ui/cards/ProfileCard';
import Loader from '@/components/ui/Loader';
import Footer from '@/components/ui/layout/Footer';

export default function Profile() {
  // State to track if the user has been created
  const [userCreated, setUserCreated] = useState(false);

  // Get the user profile using the hook
  const {
    data: userProfile,
    isLoading: isLoadingUserProfile,
    refetch: refetchUserProfile,
  } = useUserProfile();

  // UseEffect to check if the user has been created
  useEffect(() => {
    if (userProfile?.first_name) {
      setUserCreated(true);
    }
  }, [userProfile]);

  // UseEffect to refetch the user profile if the user has been created
  useEffect(() => {
    if (userCreated) {
      refetchUserProfile();
    }
  }, [userCreated, refetchUserProfile]);

  return (
    <ProtectedRoute>
      <Nav />

      <main className='px-20 flex flex-col items-center gap-10 md:gap-20 h-screen text-gray-300 pt-4'>
        <h1 className='text-center text-4xl font-urbanist'>Profile</h1>

        {/* If the user has not been created, show the new user form */}
        {!userProfile?.first_name && !userCreated && !isLoadingUserProfile && (
          <NewUserForm setUserCreated={setUserCreated} />
        )}

        {/* If the user has been created, but the profile is still loading, show the loader */}
        {userProfile?.first_name && isLoadingUserProfile && <Loader />}
        {/* If the user has been created, and the profile is loaded, show the profile card */}
        {userProfile?.first_name && !isLoadingUserProfile && (
          <ProfileCard profile={userProfile} />
        )}

        <Footer />
      </main>

    </ProtectedRoute>
  );
}
