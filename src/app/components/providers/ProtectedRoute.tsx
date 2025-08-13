'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/providers/AuthProvider';
import Loader from '@/components/ui/Loader';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace('/auth');
    }
  }, [user, loading, router]);

  if (loading) {
    return <Loader />;
  }

  if (!user) {
    return null;
  }

  return <>{children}</>;
}
