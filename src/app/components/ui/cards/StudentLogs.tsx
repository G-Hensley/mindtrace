'use client';

// Import React
import { useEffect, useState } from 'react';

// Import React Query Hooks
import { useGetAllLogEntries } from '@/queries/log';
import { useGetStudentsInSameOrganization } from '@/queries/student';
import { useGetBehaviorCategories } from '@/queries/behaviorCategory';
import { useUserProfile } from '@/queries/auth';

// Import Types
import { StudentLog } from '@/types/log';
import { Student } from '@/types/student';

// Import Components
import Loader from '../Loader';
import Log from './Log';
import ComboBoxSelector from '@/components/ui/inputs/ComboBoxSelector';

import { Logs } from 'lucide-react';

// Student Logs Component
export default function StudentLogs() {
  // Create state for student logs to be displayed
  const [studentLogs, setStudentLogs] = useState<StudentLog[]>([]);

  // State for opening/closing the student logs
  const [isOpen, setIsOpen] = useState(false);

  // Create state for loading
  const [loading, setLoading] = useState(true);

  // Create states for the selected student and query
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [query, setQuery] = useState('');

  // Get the profile, log entries, students, and behavior categories
  const { data: profile } = useUserProfile();
  const { data: logEntries } = useGetAllLogEntries();
  const { data: students } = useGetStudentsInSameOrganization(
    profile?.organization_id
  );
  const { data: behaviorCategories } = useGetBehaviorCategories();

  // Create a useEffect to set the student logs with the log entries, students, and behavior categories
  useEffect(() => {
    // If the log entries, students, and behavior categories are loaded, map the log entries to the student logs
    if (logEntries && students && behaviorCategories) {
      const newStudentLogs = logEntries.map((logEntry) => {
        const student = students.find(
          (student) => student.id === logEntry.student_id
        );
        const behaviorCategory = behaviorCategories.find(
          (behaviorCategory) =>
            behaviorCategory.id === logEntry.behavior_category_id
        );
        return {
          // Add the student and behavior category to the log entry
          ...logEntry,
          first_name: student?.first_name,
          last_name: student?.last_name,
          behavior: behaviorCategory?.name,
          student_id: student?.id,
          user_id: logEntry.user_id,
          log_id: logEntry.id
        };
      });
      // Set the student logs to the new student logs and set the loading to false
      setStudentLogs(newStudentLogs);
      setLoading(false);
    } else {
      // If the log entries, students, or behavior categories are not loaded, return
      return;
    }
  }, [logEntries, students, behaviorCategories]);

  // Create a student filter function to filter the students based on the query
  const filteredStudents = students?.filter((student) =>
    student.first_name.toLowerCase().includes(query.toLowerCase())
  ) || [];

  // Return the Student Logs component
  return (
    <div
      className='flex flex-col font-urbanist bg-gray-950/90 p-2 rounded-lg border border-gray-800/90 shadow-lg 
    shadow-black/40 text-lg gap-4 hover:border-primary/50 transition-all duration-300 w-[360px] h-fit md:w-full max-h-[80vh] overflow-y-auto'
      aria-label='Student Logs Card'>
      <header aria-label='Student Logs Header' className='flex border-b pb-2 border-accent gap-4 items-center'>

        <h2 aria-label='Student Logs Title' className='text-xl text-accent text-nowrap w-4/10'>
          Student Logs
        </h2>

        {/* Student Selector */}
        <ComboBoxSelector
          aria-label='Student Selector'
          selectedValue={selectedStudent}
          setSelectedValue={setSelectedStudent}
          setQuery={setQuery}
          filteredOptions={filteredStudents}
          label='Student'
          showLabel={false}
          query={query}
          createOption={false}
        />
      </header>

      <button className='text-accent cursor-pointer flex gap-2 items-center justify-center transition-all hover:bg-gray-900/90 py-1 rounded-md' 
        onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? 'Close Logs' : 'Open Logs'}
        <Logs />
      </button>

      {isOpen && (
        <>
                {/* If the loading state is true, show the loader */}
      {loading ? (
        <div aria-label='Loading State' className='flex justify-center items-center h-full'>
          <Loader />
        </div>
      ) : studentLogs.length < 1 ? (
        <div aria-label='No Logs Found' className='flex justify-center items-center h-full'>
          <p className='text-gray-400'>No logs found</p>
        </div>
      ) : selectedStudent === null ? (
        <div aria-label='All Logs' className='flex flex-col gap-2'>
          {studentLogs.map((logEntry: StudentLog) => (
            <Log key={logEntry.created_at} {...logEntry} />
          ))}
        </div>
      ) : (
        <div aria-label='Selected Student Logs' className='flex flex-col gap-2'>
          {studentLogs.filter((logEntry: StudentLog) => logEntry.first_name === selectedStudent.first_name && logEntry.last_name === selectedStudent.last_name).map((logEntry: StudentLog) => (
            <Log key={logEntry.created_at} {...logEntry} />
          ))}
        </div>
      )
      }
        </>
      )}

    </div>
  );
}
