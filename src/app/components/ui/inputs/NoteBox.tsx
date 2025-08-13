import { Field, Label, Textarea } from '@headlessui/react'

export default function NoteBox({ setNote, note }: { setNote: (note: string) => void, note: string | null }) {

  return (

    <Field className='flex flex-col gap-1'>
      <Label className='translate-x-2 text-highlight'>Note</Label>
      <Textarea className='w-full rounded-lg bg-gray-900/90 py-2 pr-8 pl-3 text-gray-300 shadow-inner shadow-gray-600/30 border border-gray-800/90
            focus:not-data-focus:outline-none data-focus:outline data-focus:-outline-offset-1 data-focus:outline-gray-400/25 cursor-text
            text-left hover:border-gray-600/90 transition-all duration-100 ease-in resize-none' 
            placeholder='Enter a note...'
            value={note || ''}
            onChange={(e) => setNote(e.target.value)}
            rows={3}
            />
    </Field>

  )

}