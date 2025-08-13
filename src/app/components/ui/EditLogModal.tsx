'use client';

// Import React state hook
import { useState } from 'react';

// Import type for log and react query hooks
import { StudentLog } from '@/types/log';
import { BehaviorCategory } from '@/types/behaviorCategory';
import { useUpdateLogEntry } from '@/queries/log';
import { useGetBehaviorCategories } from '@/queries/behaviorCategory';
import { UUID } from 'crypto';

// Import components
import ComboBoxSelector from '@/components/ui/inputs/ComboBoxSelector';
import EmojiSelector from '@/components/ui/inputs/EmojiSelector';
import NoteBox from '@/components/ui/inputs/NoteBox';
import CancelBtn from '@/components/ui/buttons/CancelBtn';
import ConfirmBtn from '@/components/ui/buttons/ConfirmBtn';
import { Toaster } from 'react-hot-toast';
import { successToast, errorToast } from '@/util/ToastNotification';
import Loader from '@/components/ui/Loader';

// Import icons
import { X } from 'lucide-react';

export default function EditLogModal({
  logEntry,
  isOpen,
  setIsOpen,
}: {
  logEntry: StudentLog;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}) {
  // Function to close modal
  const closeModal = () => {
    setIsOpen(false);
  };

  // Get behavior categories
  const { data: behaviorCategories } = useGetBehaviorCategories();

  // State for behavior
  const [behavior, setBehavior] = useState<BehaviorCategory | undefined>(
    behaviorCategories?.find((category) => category.name === logEntry.behavior)
  );
  const [behaviorQuery, setBehaviorQuery] = useState<string>('');

  // State for mood
  const [mood, setMood] = useState(logEntry.mood || '');

  // State for notes
  const [notes, setNotes] = useState(logEntry.notes || '');

  // Function to update log entry
  const {
    mutate: updateLogEntry,
    error: updateError,
    isSuccess: updateSuccess,
    isPending: updatePending,
  } = useUpdateLogEntry();

  // Function to handle confirm
  const handleConfirm = async () => {
    if (!behavior || !behavior.id) return;

    await updateLogEntry({
      logEntry: {
        student_id: logEntry.student_id as UUID,
        behavior_category_id: behavior.id,
        mood: mood,
        notes: notes,
      },
      id: logEntry.id as string,
      userId: logEntry.user_id as string,
    })

    if (!updatePending) {
      if (updateSuccess) {
        successToast('Log updated successfully');
        closeModal();
      } else if (updateError) {
        errorToast('Failed to update log');
        closeModal();
      }
    }
  };

  return (
    <div className='fixed top-0 left-0 w-full h-full bg-black/70 z-50 flex justify-center items-center backdrop-blur-sm'>
      <div
        className='bg-gray-950/80 flex flex-col items-center rounded-lg p-4 w-84 h-fit relative border border-gray-800/90 
        hover:border-primary/50 transition-all duration-300 gap-4'>
        <Toaster />
        {updatePending ? (
          <Loader />
        ) : (

          <>
          <button className='absolute top-2 right-2' onClick={closeModal}>
          <X className='w-6 h-6 text-gray-400 hover:text-gray-600 transition-colors duration-300 cursor-pointer' />
        </button>

        <h3 className='font-lato text-xl'>
          Edit Log for: {logEntry.first_name} {logEntry.last_name}
        </h3>

        <div className='w-full flex flex-col gap-2'>
          <ComboBoxSelector
            createOption={false}
            selectedValue={behavior}
            setSelectedValue={setBehavior}
            setQuery={setBehaviorQuery}
            filteredOptions={
              behaviorCategories?.filter((category) =>
                category.name
                  .toLowerCase()
                  .includes(behaviorQuery.toLowerCase())
              ) || []
            }
            label='Behavior'
            showLabel={true}
            query={behaviorQuery}
          />

          <EmojiSelector setSelectedValue={setMood} />

          <NoteBox note={notes} setNote={setNotes} />
        </div>

        <div className='flex gap-2'>
          <CancelBtn handleCancel={closeModal} />
            <ConfirmBtn handleConfirm={handleConfirm} />
          </div>
        </>
        )}
      </div>
    </div>
  );
}