// Email Input Component for forms
export default function EmailInput({ email, setEmail }: { email: string; setEmail: (value: string) => void }) {

  return (

    <>
      <label htmlFor="email" className="text-base font-medium text-yellow-300 absolute group-focus-within:block opacity-0 z-10
      translate-x-3 translate-y-3 group-focus-within:-translate-y-6 group-focus-within:opacity-100 transition-all duration-200 ease-in-out
      cursor-text" aria-label='Email Label - Required'>
        Email *
      </label>

      <input type="email" id="email" className="px-3 py-3 border border-gray-500 rounded-lg bg-gray-900/50 text-highlight backdrop-blur-sm
          focus:ring focus:ring-gray-400 outline-none w-full text-lg shadow-inner shadow-gray-400/60 focus:bg-gray-950/80" required placeholder='Email'
      value={email} onChange={(e) => setEmail(e.target.value)} aria-label='Email Input - Required' />
    </>

  )

}