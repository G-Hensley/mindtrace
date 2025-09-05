// Import Next.js components for the navigation and images
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { useAuth } from '@/components/providers/AuthProvider';

import { useState } from 'react';
import { LayoutDashboard, User, LogOut, Home } from 'lucide-react';
import HamburgerBtn from '../buttons/HamburgerBtn';

const links = [
  { href: '/home', label: 'Home', icon: Home },
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/profile', label: 'Profile', icon: User },
]

export default function Nav() {

  // Get the current pathname to highlight the active page
  const pathname = usePathname();

  // State for the menu
  const [isOpen, setIsOpen] = useState(false);

  const { signOut } = useAuth();

  // Function to handle log out
  const handleLogOut = async () => {
    await signOut();
  };

  return (
    <>
      <HamburgerBtn isOpen={isOpen} toggleMenu={() => setIsOpen(!isOpen)} />

      <nav
        aria-label={`Navigation ${isOpen ? 'Open' : 'Closed'}`}
        className={`flex-col items-center fixed left-0 top-0 h-screen w-fit md:w-20 bg-gray-800/50 pt-20 md:pt-4
      border-r border-gray-700 gap-16 z-50 transition-all duration-300 ease-in-out flex ${isOpen ? 'translate-x-0' : 'translate-x-[-100%] md:translate-x-0'}
      backdrop-blur-sm md:backdrop-blur-none pb-16`}>
        {/* Logo that links to the home page and is hidden on mobile */}
        <Link
          href='/'
          className='items-center justify-center w-full hidden md:flex'
          aria-label='Home Page'>
          <Image
            className='px-2 hover:opacity-70 transition-all duration-300 ease-in-out active:scale-95 w-20'
            src='/mindTrace-logo.png'
            alt='MindTrace Logo'
            width={519}
            height={519}
            priority
          />
        </Link>

        {/* Navigation Links */}
        <ul className='flex flex-col items-center w-full text-gray-200 font-urbanist text-lg'>
          {links.map((link) => {
            const Icon = link.icon;
            return (
              <li className='w-full' key={link.href}>
                <Link
                  className='nav-link border-b border-t border-gray-700 gap-2 px-2 md:justify-center'
                  href={link.href}
                  aria-label={`${link.label} Page`}
                  onClick={() => setIsOpen(false)}>
                  <Icon
                    className={`nav-icon ${pathname === link.href ? 'text-highlight' : 'text-gray-200'}`}
                    aria-label={link.label}
                  />
                  <span className='md:hidden' aria-label={link.label}>
                    {link.label}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Log Out Button */}
        <button
          className='w-full flex items-center px-2 gap-2 text-gray-200 font-urbanist text-lg border-t border-b py-2 border-gray-700 cursor-pointer md:justify-center
        hover:text-red-800 hover:bg-gray-900/50 transition-all duration-300 ease-in-out logout-btn h-fit mt-auto overflow-hidden'
          aria-label='Log Out'
          onClick={handleLogOut}>
          <LogOut className='nav-icon logout-icon rotate-180' aria-label='Log Out' />
          <span className='md:hidden' aria-label='Log Out'>
            Log Out
          </span>
        </button>
      </nav>
    </>
  );
}
