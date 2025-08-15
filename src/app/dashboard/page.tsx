'use client';

// Import the ProtectedRoute component
import ProtectedRoute from '@/components/providers/ProtectedRoute';

// Import the visual components
import Nav from '../components/ui/layout/Nav';
import LogEntry from '../components/ui/forms/LogEntry';
import Footer from '../components/ui/layout/Footer';
import StudentLogs from '../components/ui/cards/StudentLogs';
import GenerateReport from '../components/ui/forms/GenerateReport';

// Dashboard Page Component
export default function DashboardPage() {
  return (
    // ProtectedRoute to ensure the user is authenticated
    <ProtectedRoute>
      <Nav />

      {/* Main Content */}
      <main className='md:pl-20 h-screen pt-4 w-full flex flex-col gap-10'>
        <header aria-label='Dashboard Header'>
          <h1
            aria-label='Dashboard Title'
            className='text-4xl font-urbanist text-center text-neutral-300'>
            Dashboard
          </h1>
        </header>

        <div
          aria-label='Dashboard Content'
          className='flex flex-col md:grid grid-cols-1 xl:grid-cols-3 w-3/4 mx-auto gap-4'>
          <LogEntry />
          <StudentLogs />
          <GenerateReport />
        </div>

        {/* Footer */}
        <Footer />
      </main>
    </ProtectedRoute>
  );
}
