// Import Image from Next.js
import Image from "next/image";

// Import Upload from Lucide React
import { Upload } from "lucide-react";

// Avatar Upload Component for forms
export default function AvatarUpload({ setFile, file }: { setFile: (file: File | null) => void, file: File | null }) {

  return (
    <>
      <input type="file" className="hidden"
      aria-label="Avatar Upload Input - Optional"
      accept="image/*"
      multiple={false}
      id="file"
      onChange={(e) => {
        const file = e.target.files?.[0];
        if (file) {
          setFile(file);
        }
      }}
    />
    <label htmlFor="file" className="text-lg p-2 flex flex-col font-medium text-highlight cursor-pointer border-dotted border-2 border-gray-500 rounded-lg 
    items-center justify-center hover:text-highlight/70 hover:border-highlight/70 bg-gray-900/50 backdrop-blur-sm shadow-inner shadow-gray-400/20" 
    aria-label="Avatar Upload Label - Optional">
        {!file ? (
          <>
            <Upload aria-label="Upload Icon" className="w-8 h-8" />
            <span className="text-lg" aria-label="Upload Profile Image">Upload Profile Image</span>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center gap-2">
            <Image aria-label="Profile Image" src={URL.createObjectURL(file)} alt="Profile" className="w-auto max-h-24" width={24} height={24} />
            <span className="text-lg" aria-label="Change Image">Change Image</span>
          </div>
        )}
      </label>
    </>
  )
}