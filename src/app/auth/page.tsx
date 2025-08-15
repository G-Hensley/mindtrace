'use client';

import Image from 'next/image';
import { redirect } from 'next/navigation';

import { useAuth } from '@/components/providers/AuthProvider';
import LoginForm from '@/components/ui/forms/LoginForm';
import Loader from '@/components/ui/Loader';
import Footer from '@/components/ui/layout/Footer';

export default function Auth() {

  // Get the user from the AuthProvider
  const { user, loading } = useAuth();

  // If the user is logged in, redirect to the dashboard
  if (loading) {
    return <Loader />;
  }
  else if (user) {
    redirect('/dashboard');
  } else {

    return (
      <main className='flex flex-col min-h-screen'>
        <section className='flex min-h-[90vh] xl:gap-36 xl:px-36 xl:py-24 relative justify-around xl:justify-center flex-col-reverse xl:flex-row'>
          {/* Background Image */}
          <div className='fixed inset-0 w-full h-full scale-102 overflow-hidden opacity-25 -z-10'>
            <Image
              src='/auth-bg.png'
              alt='Background Image'
              width={1782}
              height={937}
              className='blur-[3px] saturate-100 brightness-120 object-cover w-full h-full'
            />
          </div>

          {/* Login Form */}
          <div className='w-full flex items-center justify-center relative z-10'>
            <LoginForm />
          </div>

          <header className='flex flex-col gap-2 xl:gap-4 items-center md:w-full h-fit z-20 relative auth-header'>
            <h1
              className={`text-5xl md:text-7xl xl:text-8xl text-black relative title flex gap-1.5 xl:gap-2 items-center font-playwrite`}>
              Mind
              <div className='w-12 h-12 sm:w-14 sm:h-14 xl:w-24 xl:h-24 xl:scale-110 relative'>
                <Image
                  src='/mindTrace-logo.png'
                  alt='MindTrace Logo'
                  width={96}
                  height={96}
                  className='rounded-full'
                  loading='lazy'
                />
              </div>
              Trace
            </h1>

            <h2 className={`text-3xl md:text-4xl xl:text-6xl text-neutral-400 subtitle font-urbanist text-center`}>
              Track Student Behavior
            </h2>
          </header>

        </section>
        <Footer />
      </main>
    );
  }
}
