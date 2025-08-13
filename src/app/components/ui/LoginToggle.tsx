// Login/Signup Toggle Button
export default function LoginToggle({ isLogin, toggleForm }: { isLogin: boolean; toggleForm: (e: React.MouseEvent<HTMLButtonElement>) => void }) {

  return (

    // Toggle Button
    <button onClick={toggleForm} className={`toggle rounded-full w-20 h-8 cursor-pointer relative hover:opacity-70
      ${isLogin ? "bg-gray-600 border-gray-400" : "bg-primary border-accent/70"} transition-all duration-200 ease-in-out border-2`}
      aria-label={isLogin ? 'Switch to Signup' : 'Switch to Login'}
    >

      {/* Toggle Circle */}
      <div className={`w-5 h-5 rounded-full transform transition-all duration-200 ease-in-out translate-x-1 toggle-circle
        ${isLogin ? "bg-gray-400" : "bg-accent translate-x-13"}`}>
      </div>

    </button>

  );

};