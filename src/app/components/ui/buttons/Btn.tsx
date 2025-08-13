// Main Button Component for the app
export default function Btn({ children, onClick }: { children: React.ReactNode, onClick: () => void }) {

  return (

    <button
      className={`text-accent/80 uppercase text-lg py-2 px-4 rounded-lg cursor-pointer transition-all duration-200
        active:scale-95 border-[1.5px] border-gray-500 z-10 bg-gray-900/40 backdrop-blur-lg font-lato
        shadow-accent/60 hover:shadow-accent hover:border-accent shadow-inner hover:text-accent font-bold w-fit`}
      type='button'
      aria-label={`${children} Button`}
      onClick={onClick}>
      {children}
    </button>

  );
}
