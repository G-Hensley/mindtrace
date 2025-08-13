'use client';

// Import useState from React
import { useState } from 'react';

// Import Eye and EyeOff from Lucide React for password visibility toggle
import { Eye, EyeOff } from 'lucide-react';

// Password Input Component for forms
export default function PasswordInput({ password, label, setPassword }: { password: string; setPassword: (value: string) => void; label: string }) {

  // State to manage password visibility
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  return (
      <div className="w-full group relative z-10">

        <label htmlFor={label} className="text-base font-medium text-yellow-300 absolute group-focus-within:block opacity-0 z-10
        translate-x-3 translate-y-3 group-focus-within:-translate-y-6 group-focus-within:opacity-100 transition-all duration-200 ease-in-out rounded-full
        cursor-text" aria-label={`${label} Label - Required`}>
          {label} *
        </label>

        <input type={isPasswordVisible ? "text" : "password"} id={label} className="px-3 py-3 border border-gray-500 rounded-lg bg-gray-900/50 text-highlight backdrop-blur-sm
          focus:ring focus:ring-gray-400 outline-none w-full text-lg shadow-inner shadow-gray-400/60 focus:bg-gray-950/80" required placeholder={label}
        value={password} onChange={(e) => setPassword(e.target.value)} aria-label={`${label} Input - Required`} />

        <button type="button" onClick={() => setIsPasswordVisible(prev => !prev)} className="absolute right-3 top-1/2 -translate-y-1/2"
          aria-label={`${label} Toggle Password Visibility`}>
          {isPasswordVisible ? (
            <EyeOff className="w-6 h-6 text-gray-50 cursor-pointer hover:text-gray-400 transition-all duration-150" />
          ) : (
            <Eye className="w-6 h-6 text-gray-50 cursor-pointer hover:text-gray-400 transition-all duration-150" />
          )}
        </button>

      </div>
  )

}