export default function HomeCard({ title, description, icon }: { title: string, description: string[], icon: React.ReactNode }) {
  return (
    <div className='flex flex-col gap-4 w-full sm:w-4/5 md:w-3/5 lg:w-5/12 2xl:w-[32%] bg-neutral-950/40 py-4 px-2 sm:px-4 rounded-lg z-10 text-amber-200/80 border 
    border-neutral-800/90 shadow-lg
    backdrop-blur-md hover:bg-neutral-950/50 transition-all duration-300 hover:border-primary/50 hover:shadow-xl home-card self-stretch'>
      <h3 className='text-base sm:text-lg xl:text-xl font-bold flex items-center gap-2 justify-center text-accent font-playwrite text-center'>
        <span className='text-highlight'>
          {icon}
        </span>
        {title}
        <span className='rotate-y-180 text-highlight'>
          {icon}
        </span>
      </h3>
      <div className='text-sm sm:text-base xl:text-lg flex flex-col gap-3 text-center font-urbanist'>
        {description.map((item, index) => {
          return (
            <p key={index}>{item}</p>
          )
        })}
      </div>
    </div>
  );
}