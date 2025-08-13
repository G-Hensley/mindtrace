'use client';

// Import React Hooks
import { useEffect, useState } from 'react';

// Import Types & Queries
import { useUserProfile } from '@/queries/auth';
import { useGetStudentsInSameOrganization } from '@/queries/student';
import { useGetAllLogEntries } from '@/queries/log';
import { useGetBehaviorCategories } from '@/queries/behaviorCategory';
import { Student } from '@/types/student';

// Import Icons
import { FileText } from 'lucide-react';

// Import Components
import { Toaster } from 'react-hot-toast';
import ComboboxSelector from '@/components/ui/inputs/ComboBoxSelector';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import type {} from '@mui/x-date-pickers/themeAugmentation';
import { ThemeProvider } from '@mui/material/styles';
import { createTheme } from '@mui/material';
import dayjs, { Dayjs } from 'dayjs';

import { generatePDF } from '@/util/generateReport';

const theme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#111827',
      paper: '#111827',
    },
    text: {
      primary: '#ffffff', 
      secondary: '#9CA3AF',
    },
  }
});

// Generate Report Component
export default function GenerateReport() {
  const [isOpen, setIsOpen] = useState(false);
  const [studentsWithLogs, setStudentsWithLogs] = useState<Student[]>([]);

  // State for the student selector
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [studentQuery, setStudentQuery] = useState('');

  // State for the date pickers
  const [fromDate, setFromDate] = useState<Dayjs | null>(null);
  const [toDate, setToDate] = useState<Dayjs | null>(null);

  // Get the user profile
  const { data: profile } = useUserProfile();

  // Get the students in the same organization and get the logs
  const { data: students } = useGetStudentsInSameOrganization(
    profile?.organization_id
  );
  const { data: logs } = useGetAllLogEntries();
  const { data: behaviorCategories } = useGetBehaviorCategories();
  // Create array of students that have logs
  useEffect(() => {
    if (students && logs) {
      const studentsWithLogs = students.filter((student) => {
        return logs.some((log) => log.student_id === student.id);
      });
      setStudentsWithLogs(studentsWithLogs);
    }
  }, [students, logs]);

  // Create filtered students of the students that have logs
  const filteredStudents =
    studentQuery === ''
      ? studentsWithLogs || []
      : studentsWithLogs?.filter((student) =>
          student.first_name.toLowerCase().includes(studentQuery.toLowerCase())
        ) || [];

    // Create filtered logs of the logs that are within the date range and the student that is selected
    const filteredLogs = logs?.filter((log) => {
      if (fromDate && toDate && selectedStudent) {
        return log.student_id === selectedStudent?.id && dayjs(log.created_at).isAfter(fromDate) && dayjs(log.created_at).isBefore(toDate);
      } else if (selectedStudent) {
        return log.student_id === selectedStudent?.id;
      }
      return [];
    });

  // Generate the report
  const handleGenerateReport = () => {
    if (filteredLogs && selectedStudent && behaviorCategories) {
      generatePDF(selectedStudent.first_name, filteredLogs, behaviorCategories);
    }
  };
  return (
    <ThemeProvider theme={theme}>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
    <div className='w-full flex flex-col gap-2 h-fit relative'>
      <Toaster />

      <button
        type='button'
        aria-label='Generate Report'
        onClick={() => setIsOpen((prev) => !prev)}
        className='bg-gray-950/90 rounded-lg p-4 flex items-center justify-center gap-2 border border-gray-800/90 text-accent
      cursor-pointer hover:bg-gray-900/90 transition-all duration-300 font-lato active:scale-95 shadow-lg w-full shadow-black/40
      hover:border-primary/50'>
        <FileText className='size-5' />
        <p>Generate Report</p>
      </button>

      <form
        id='generate-report-form'
        aria-label='Generate Report Form'
        className={`${isOpen ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0'} w-full bg-gray-950/90 rounded-lg p-4 flex flex-col gap-4 border border-gray-800/90
      transition-all duration-500 text-gray-400 font-lato text-base origin-top hover:border-primary/50 shadow-black/40 shadow-lg
      relative z-10`}>
        {/* Student Selector */}
        <ComboboxSelector
          aria-label='Student Selector'
          selectedValue={selectedStudent}
          setSelectedValue={setSelectedStudent}
          setQuery={setStudentQuery}
          query={studentQuery}
          filteredOptions={filteredStudents}
          label='Student'
          createOption={false}
        />

        {/* Date Picker */}
        <DatePicker label='From' defaultValue={dayjs()} value={fromDate} onChange={(value) => setFromDate(value as Dayjs)} />
        <DatePicker label='To' defaultValue={dayjs()} value={toDate} onChange={(value) => setToDate(value as Dayjs)} />

        {/* Cancel and Generate Buttons */}
        <div className='flex justify-center gap-4 w-full text-lg font-lato text-gray-300'>
          <button
            aria-label='Cancel Button'
            className='bg-red-800/70 rounded-lg px-2 py-1 cursor-pointer border border-gray-500/90 hover:opacity-80 transition-all duration-100 ease-in active:scale-95'
            type='button'
            onClick={() => setIsOpen(false)}>
            Cancel
          </button>
          <button
            aria-label='Create Button'
            className='bg-primary/80 rounded-lg px-2 py-1 cursor-pointer border border-gray-500/90 hover:opacity-80 transition-all duration-100 ease-in active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed'
            type='submit'
            onClick={handleGenerateReport}>
            Generate Report
          </button>
        </div>
      </form>
      </div>
    </LocalizationProvider>
    </ThemeProvider>
  );
}
