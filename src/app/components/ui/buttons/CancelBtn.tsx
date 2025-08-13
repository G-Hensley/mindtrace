
export default function CancelBtn({ handleCancel }: { handleCancel: () => void }) {
  return (
    <button
      aria-label='Cancel Button'
      className='bg-red-800/70 rounded-lg px-2 py-1 cursor-pointer border border-gray-500/90 hover:opacity-80 transition-all duration-100 ease-in active:scale-95'
      type='button'
      onClick={handleCancel}>
      Cancel
    </button>
  )
}