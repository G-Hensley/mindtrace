// Import Metadata to set the title and description of the page
import type { Metadata } from 'next';

// Import Providers to wrap the children and provide them with authentication and react query
import { AuthProvider } from './components/providers/AuthProvider';
import { ReactQueryProvider } from './components/providers/ReactQueryProvider';

// Import the global styles
import './globals.css';

// Import the fonts
import { lato, urbanist, playwrite } from './fonts/fonts';

// Set the metadata for the page
export const metadata: Metadata = {
  title: 'MindTrace',
  description: 'Student Behavior Logging and Analysis System',
};

// Root Layout Component
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  return (
    <html lang='en'>
      <body className={`${lato.variable} ${urbanist.variable} ${playwrite.variable} bg-gray-950/95 px-4 sm:px-8`}>
        <ReactQueryProvider>
          <AuthProvider>{children}</AuthProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
