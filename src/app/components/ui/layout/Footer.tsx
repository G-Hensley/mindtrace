// Footer Component
export default function Footer() {
  return (
    <footer className='w-full relative mt-auto text-center text-gray-400 z-40' aria-label='Footer'>
      {/* Copyright Text and dynamic year */}
      <p className='text-base font-lato w-fit bg-gray-950/50 py-2 px-4 rounded-t-lg mx-auto border border-gray-800/90 backdrop-blur-sm' aria-label='Copyright Text, Version 1.0.0'>
        &copy; {new Date().getFullYear()} MindTrace V1.0.0. All rights reserved.
      </p>
    </footer>
  );
}