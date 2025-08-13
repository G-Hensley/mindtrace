"use client";

// Import React state hook
import { useState } from "react";

// Import types for log
import { StudentLog } from "@/types/log";

// Import auth query
import { useUserProfile } from "@/queries/auth";
import { useDeleteLogEntry } from "@/queries/log";

// Import components
import TruncatedText from "../TruncatedText";
import EditLogModal from "../EditLogModal";
import { errorToast, successToast } from "@/util/ToastNotification";
import { Toaster } from "react-hot-toast";

// Import icons
import { Pencil, Trash2 } from "lucide-react";

export default function Log(studentLog: StudentLog) {

  // Get user id from session
  const { data: profile } = useUserProfile();

  // State for modal visibility
  const [isOpen, setIsOpen] = useState(false);

  // Create a delete log entry mutation
  const { mutate: deleteLogEntry, isPending: deletePending, isSuccess: deleteSuccess, isError: deleteError } = useDeleteLogEntry();

  // Create a handle delete log entry function
  const handleDeleteLogEntry = async (id: string) => {
    await deleteLogEntry({ id, userId: profile?.user_id });

    if (!deletePending && !deleteError) {
      successToast('Log entry deleted successfully');
    } else if (deleteError) {
      errorToast('Failed to delete log entry');
    }

  };

  return (

    <div className="flex flex-col gap-2 text-gray-300 font-lato text-base border border-gray-800/90 rounded-lg py-1 px-2
    hover:border-primary/50 transition-all duration-300">


      <div className="grid grid-cols-3">
        <Toaster />
        <p className="text-gray-400 text-sm col-span-2">Name</p>
        <p className="text-gray-400 text-sm col-span-1">Date</p>
        <p className="col-span-2 mb-2">{studentLog.first_name} {studentLog.last_name}</p>
        <p>{studentLog.created_at.split('T')[0]}</p>
        <p className="text-gray-400 text-sm col-span-2">Behavior</p>
        <p className="text-gray-400 text-sm col-span-1">Mood</p>
        <p className="col-span-2 mb-3">{studentLog.behavior}</p>
        <p>{studentLog.mood}</p>
        {studentLog.notes && studentLog.notes.length > 0 && (
          <div className="flex flex-col gap-2 col-span-3">
            <p className="text-gray-400 text-sm text-center">Notes</p>
            <p className="col-span-2 mb-2 text-left">
              <TruncatedText text={studentLog.notes} limit={60} />
            </p>
          </div>
        )}
        {
          profile?.user_id === studentLog.user_id && (
            <div className="flex gap-3 justify-self-end col-span-3 mt-2">
              <button className="flex items-center gap-1 text-red-500 hover:text-red-500/50 transition-colors duration-300 cursor-pointer"
              onClick={() => handleDeleteLogEntry(studentLog.id as string)}
              disabled={deletePending}>
                <Trash2 className="w-6 h-6" />
                <span className="text-sm">Delete</span>
              </button>
              <button className="flex items-center gap-1 text-accent hover:text-accent/50 transition-colors duration-300 cursor-pointer" onClick={() => setIsOpen(true)}>
                <Pencil className="w-6 h-6" />
                <span className="text-sm">Edit</span>
              </button>
            </div>
          )
        }
      </div>
      {isOpen && <EditLogModal logEntry={studentLog} isOpen={isOpen} setIsOpen={setIsOpen} />}
    </div>

  );
}