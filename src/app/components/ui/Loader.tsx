// Loader Component for loading states
export default function Loader() {
  return (
    <div className='flex justify-center items-center h-screen' aria-label='Loading'>
      <div className='dot-spinner' aria-label='Loading'>
        <div className='dot-spinner__dot'></div>
        <div className='dot-spinner__dot'></div>
        <div className='dot-spinner__dot'></div>
        <div className='dot-spinner__dot'></div>
        <div className='dot-spinner__dot'></div>
        <div className='dot-spinner__dot'></div>
      </div>
    </div>
  )
}