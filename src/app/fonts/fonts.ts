import { Lato, Urbanist, Playwrite_DE_Grund } from 'next/font/google';

export const lato = Lato({
  subsets: ['latin'],
  variable: '--font-lato',
  weight: ['400', '700'],
  display: 'swap',
});

export const urbanist = Urbanist({
  subsets: ['latin'],
  variable: '--font-urbanist',
  weight: ['400', '700'],
  display: 'swap',
});

export const playwrite = Playwrite_DE_Grund({
  weight: '400',
  style: ['normal'],
  variable: '--font-playwrite',
  display: 'swap',
});