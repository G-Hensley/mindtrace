'use client';

// Import React State Management
import React, { useState, useRef } from 'react';

// Import Lucide Icons & Queries
import { Plus } from 'lucide-react';
import {
  useGetBehaviorCategories,
  useCreateBehaviorCategory,
} from '@/queries/behaviorCategory';
import { useCreateLogEntry } from '@/queries/log';
import { useGetStudentsInSameOrganization } from '@/queries/student';

// Import Types & Components
import { BehaviorCategory } from '@/types/behaviorCategory';
import ComboBoxSelector from '../inputs/ComboBoxSelector';
import { useUserProfile } from '@/queries/auth';
import { Student } from '@/types/student';
import EmojiSelector from '@/components/ui/inputs/EmojiSelector';
import NoteBox from '../inputs/NoteBox';
import { errorToast, successToast } from '@/util/ToastNotification';
import { UUID } from 'crypto';
import { Toaster } from 'react-hot-toast';

// LogEntry component
export default function LogEntry() {
  // Get the behavior categories and students in the same organization
  const { data: behaviorCategories } = useGetBehaviorCategories();
  const { data: profile } = useUserProfile();
  const orgId = profile?.organization_id || '';
  const { data: students } = useGetStudentsInSameOrganization(orgId);

  // State Management for the form and the form fields
  const [isOpen, setIsOpen] = useState(false);
  const [selectedBehavior, setSelectedBehavior] =
    useState<BehaviorCategory | null>(behaviorCategories?.[0] || null);
  const [behaviorQuery, setBehaviorQuery] = useState('');
  const [studentQuery, setStudentQuery] = useState('');
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(
    students?.[0] || null
  );
  const [selectedEmoji, setSelectedEmoji] = useState<string>('');
  const [note, setNote] = useState<string | null>(null);

  // Ref to track previous mutation states
  const prevMutationState = useRef({ isSuccess: false, isError: false });

  // Function to clear the form
  const clearForm = () => {
    setSelectedBehavior(null);
    setBehaviorQuery('');
    setSelectedStudent(null);
    setStudentQuery('');
    setSelectedEmoji('');
    setNote(null);
  };

  // Function to handle the cancel button to close the form and clear it
  const handleCancel = () => {
    clearForm();
    setIsOpen(false);
  };

  // Function to create a new behavior category
  const {
    mutate: createBehaviorCategory,
    isPending: isCreatingBehaviorCategory,
  } = useCreateBehaviorCategory();

  // Function to create a new log entry
  const {
    mutate: createLogEntry,
    isPending: isCreatingLogEntry,
    isSuccess: isLogEntryCreated,
    isError: isLogEntryError,
  } = useCreateLogEntry();

  // Handle success and error states
  React.useEffect(() => {
    // Only trigger if we transition from false to true
    if (isLogEntryCreated && !prevMutationState.current.isSuccess) {
      successToast('Log entry created successfully');
      clearForm();
      setTimeout(() => setIsOpen(false), 2000);
      prevMutationState.current.isSuccess = true;
    } else if (!isLogEntryCreated) {
      prevMutationState.current.isSuccess = false;
    }
  }, [isLogEntryCreated]);

  React.useEffect(() => {
    // Only trigger if we transition from false to true
    if (isLogEntryError && !prevMutationState.current.isError) {
      errorToast('Error creating log entry');
      prevMutationState.current.isError = true;
    } else if (!isLogEntryError) {
      prevMutationState.current.isError = false;
    }
  }, [isLogEntryError]);

  // Function to handle the form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate required fields
    if (!selectedStudent || !selectedBehavior || !selectedEmoji) {
      errorToast('Please fill in all required fields');
      return;
    }

    // If the selected behavior has a null id, it means it's a new category that needs to be created
    if (selectedBehavior?.id === null && behaviorQuery.length > 0) {
      createBehaviorCategory(behaviorQuery, {
        onSuccess: (newBehavior: BehaviorCategory) => {
          // After creating the behavior category, create the log entry
          createLogEntry({
            logEntry: {
              user_id: profile?.user_id as UUID,
              student_id: selectedStudent?.id as UUID,
              behavior_category_id: newBehavior.id as UUID,
              mood: selectedEmoji,
              notes: note || '',
            },
          });
        },
        onError: () => {
          errorToast('Error creating behavior category');
        },
      });
    } else {
      // Create log entry directly if behavior category already exists
      createLogEntry({
        logEntry: {
          user_id: profile?.user_id as UUID,
          student_id: selectedStudent?.id as UUID,
          behavior_category_id: selectedBehavior?.id as UUID,
          mood: selectedEmoji,
          notes: note || '',
        },
      });
    }
  };

  // Filter behavior categories based on query (if query is empty, return all behavior categories)
  const filteredBehaviors =
    behaviorQuery === ''
      ? behaviorCategories || []
      : behaviorCategories?.filter((behavior) =>
          behavior.name.toLowerCase().includes(behaviorQuery.toLowerCase())
        ) || [];

  // Filter students based on query
  const filteredStudents =
    studentQuery === ''
      ? students || []
      : students?.filter((student) =>
          student.first_name.toLowerCase().includes(studentQuery.toLowerCase())
        ) || [];

  return (
    // Log Entry Form
    <div className='w-full flex flex-col gap-2 h-fit relative'>

      <Toaster />

      <button
        type='button'
        aria-label='Create Log Entry'
        onClick={() => setIsOpen((prev) => !prev)}
        className='bg-gray-950/90 rounded-lg p-4 flex items-center justify-center gap-2 border border-gray-800/90 text-accent
      cursor-pointer hover:bg-gray-900/90 transition-all duration-300 font-lato active:scale-95 shadow-lg w-full shadow-black/40
      hover:border-primary/50'>
        <Plus
          aria-label='Create Log Entry Icon'
          className='border border-accent rounded-xl w-5 h-5'
        />
        <p>Create Log Entry</p>
      </button>

      <form
        id='log-entry-form'
        aria-label='Log Entry Form'
        onSubmit={handleSubmit}
        className={`${isOpen ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0'} w-full bg-gray-950/90 rounded-lg p-4 flex flex-col gap-4 border border-gray-800/90
      transition-all duration-500 text-gray-400 font-lato text-base origin-top hover:border-primary/50 shadow-black/40 shadow-lg
      relative`}>
    
        {/* Student ComboBoxSelector */}
        <ComboBoxSelector
          aria-label='Student Selector'
          selectedValue={selectedStudent}
          setSelectedValue={setSelectedStudent}
          setQuery={setStudentQuery}
          query={studentQuery}
          filteredOptions={filteredStudents}
          label='Student'
          createOption={false}
        />

        {/* Behavior Category ComboBoxSelector */}
        <ComboBoxSelector
          aria-label='Behavior Category Selector'
          selectedValue={selectedBehavior}
          setSelectedValue={setSelectedBehavior}
          setQuery={setBehaviorQuery}
          query={behaviorQuery}
          filteredOptions={filteredBehaviors}
          label='Behavior Category'
          createOption={true}
        />

        {/* Emoji Selector */}
        <EmojiSelector
          aria-label='Emoji Selector'
          setSelectedValue={setSelectedEmoji}
        />

        {/* Note Box */}
        <NoteBox aria-label='Note Box' setNote={setNote} note={note} />

        {/* Cancel and Create Buttons */}
        <div className='flex justify-center gap-4 w-full text-lg font-lato text-gray-300'>
          <button
            aria-label='Cancel Button'
            className='bg-red-800/70 rounded-lg px-2 py-1 cursor-pointer border border-gray-500/90 hover:opacity-80 transition-all duration-100 ease-in active:scale-95'
            type='button'
            onClick={handleCancel}>
            Cancel
          </button>
          <button
            aria-label='Create Button'
            className='bg-primary/80 rounded-lg px-2 py-1 cursor-pointer border border-gray-500/90 hover:opacity-80 transition-all duration-100 ease-in active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed'
            type='submit'
            disabled={
              isCreatingBehaviorCategory ||
              isCreatingLogEntry ||
              !selectedStudent ||
              !selectedBehavior ||
              !selectedEmoji
            }>
            {isCreatingBehaviorCategory || isCreatingLogEntry
              ? 'Creating...'
              : 'Create'}
          </button>
        </div>
      </form>
    </div>
  );
}
