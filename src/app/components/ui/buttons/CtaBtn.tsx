export default function CtaBtn({ children }: { children: React.ReactNode }) {
  return (
    <button className='text-lg sm:text-xl md:text-2xl font-playwrite font-bold bg-linear-120 from-primary to-accent/70 px-4 py-3 rounded-md text-highlight z-20 border border-highlight/70
    shadow-md shadow-black/40 cursor-pointer hover:scale-[1.04] ease-in-out transition-all duration-300 hover:shadow-black/70 active:scale-100'>
      {children}
    </button>
  );
}