// Hamburger Button Component
export default function HamburgerBtn({ isOpen, toggleMenu }: { isOpen: boolean, toggleMenu: () => void }) {
  return (
    <button onClick={toggleMenu} aria-label='Toggle Menu' className='flex flex-col items-center justify-center w-10 h-10 z-60 fixed top-2 left-5 gap-1.5 md:hidden cursor-pointer'>

      <div className={`hamburger-line ${isOpen ? 'rotate-45 translate-y-3' : ''} transition-all duration-300 ease-in-out bg-highlight/70 h-1 w-8 rounded-2xl`}></div>
      <div className={`hamburger-line ${isOpen ? 'opacity-0 -translate-x-10' : ''} transition-all duration-300 ease-in-out bg-highlight/70 h-1 w-8 rounded-2xl`}></div>
      <div className={`hamburger-line ${isOpen ? '-rotate-45 -translate-y-2' : ''} transition-all duration-300 ease-in-out bg-highlight/70 h-1 w-8 rounded-2xl`}></div>

    </button>
  )
}