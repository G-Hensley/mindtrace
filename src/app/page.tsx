// Home Page (Landing Page)
'use client';

// Import Next.js Components & Libraries
import Image from 'next/image';
import Link from 'next/link';

// Import Auth Provider to check if user is logged in
import { useAuth } from './components/providers/AuthProvider';

// Import Reusable Components
import HomeCard from './components/ui/cards/HomeCard';
import CtaBtn from './components/ui/buttons/CtaBtn';
import Footer from './components/ui/layout/Footer';

// Import Lucide Icons
import { Sparkles, ChartColumn, NotebookPen } from 'lucide-react';

// Home Page Component
export default function Home() {

  // Get the user from the AuthProvider
  const { user } = useAuth();

  // Information for the home page cards
  const cards = [
    {
      icon: <Sparkles />,
      title: 'Intuitive By Design',
      description: [
        'No training required. MindTrace is built with simplicity in mind.',
        'Designed for speed so educators can focus on students, not systems.',
        'Enjoy a clutter-free experience that works on any device.',
      ],
    },
    {
      icon: <ChartColumn />,
      title: 'Behavior Insights at a Glance',
      description: [
        'View student behavior patterns with clear visuals and time-based trends.',
        'Spot escalation early and celebrate improvements over time.',
        'Make informed decisions with meaningful data summaries.',
      ],
    },
    {
      icon: <NotebookPen />,
      title: 'Detailed, Flexible Logging',
      description: [
        'Capture behavior events with notes, mood emojis, and categorized tags.',
        'Quickly document what matters, without sifting through menus.',
        'Your notes, your language. MindTrace adapts to your workflow.',
      ],
    }
  ]

  // Main Home Page Component
  return (
    <main className='flex flex-col items-center min-h-screen pt-8 xl:pt-20 gap-8 2xl:gap-20'>

      {/* Background Image */}
      <Image src='/mindTrace-bg.png' alt='Background Image' width={2982} height={1674} className='fixed top-0 left-0 w-full h-full object-cover opacity-50 blur-[2px]'
      loading='lazy' />
      
      {/* Header */}
      <header className='flex flex-col gap-2 xl:gap-4 items-center md:w-fit h-fit z-20 relative auth-header'>
        <h1
          className={`text-5xl md:text-7xl xl:text-8xl text-black relative title flex gap-1.5 xl:gap-2 items-center font-playwrite`}>
          Mind
          <div className='w-14 h-14 md:w-20 md:h-20 xl:w-24 xl:h-24 xl:scale-110 relative'>
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

        <h2 className={`text-3xl md:text-4xl xl:text-6xl text-neutral-400 subtitle font-urbanist`}>
          Track Student Behavior
        </h2>
      </header>

      {/* Cards Section - Flexbox container */}
      <div className='flex flex-wrap 2xl:flex-nowrap gap-8 items-center justify-center w-full'>
        {cards.map(card => {
          return (
            <HomeCard key={card.title} title={card.title} description={card.description} icon={card.icon} />
          )
        })}
      </div>

      {/* CTA Button - Link to Auth Page */}
      <Link href={user ? '/dashboard' : '/auth'} className='z-20' aria-label='Go to Auth Page'>
        <CtaBtn>Start Tracking</CtaBtn>
      </Link>

      {/* Footer */}
      <Footer />

    </main>
  );
}
