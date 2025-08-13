export default function ConfirmBtn({ handleConfirm }: { handleConfirm: () => void }) {

  return (
    <button
      aria-label='Create Button'
      className='bg-primary/80 rounded-lg px-2 py-1 cursor-pointer border border-gray-500/90 hover:opacity-80 transition-all duration-100 ease-in active:scale-95 
      disabled:opacity-50 disabled:cursor-not-allowed'
      type='submit'
      onClick={handleConfirm}
    >
      Confirm
    </button>
  )

}