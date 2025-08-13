import { useState } from "react";
import { Listbox, ListboxButton, ListboxOption, ListboxOptions, Field, Label } from '@headlessui/react'
import { Mood } from "@/types/log";

export const emojis: Mood[] = [
  {id: 1, emoji: '😀', name: 'Happy'},
  {id: 2, emoji: '😊', name: 'Ecstatic'},
  {id: 3, emoji: '🤔', name: 'Confused'},
  {id: 4, emoji: '🤨', name: "Curious"},
  {id: 5, emoji: '😔', name: 'Sad'},
  {id: 6, emoji: '😕', name: 'Disappointed'},
  {id: 7, emoji: '😠', name: 'Angry'},
  {id: 8, emoji: '😡', name: 'Furious'},
  {id: 9, emoji: '😳', name: 'Shocked'},
  {id: 10, emoji: '😭', name: 'Crying'},
  {id: 11, emoji: '😱', name: 'Scared'},
  {id: 12, emoji: '😨', name: 'Anxious'},
  {id: 13, emoji: '😰', name: 'Stressed'},
]

export default function EmojiSelector({ setSelectedValue }: { setSelectedValue: (value: string) => void }) {

  const [selectedEmoji, setSelectedEmoji] = useState(emojis[0]);

  return (
    <Field className='flex flex-col gap-1'>
      <Label className='translate-x-2 text-highlight'>Emoji</Label>
      <Listbox
        value={selectedEmoji}
        onChange={(value) => {
          setSelectedEmoji(value || emojis[0]);
          setSelectedValue(value?.emoji || '');
        }}
        >
        <ListboxButton className='w-full rounded-lg bg-gray-900/90 py-2 pr-8 pl-3 text-gray-300 shadow-inner shadow-gray-600/30 border border-gray-800/90
            focus:not-data-focus:outline-none data-focus:outline data-focus:-outline-offset-1 data-focus:outline-gray-400/25 capitalize cursor-pointer
            text-left hover:border-gray-600/90 transition-all duration-100 ease-in'>
            {selectedEmoji?.emoji}
          </ListboxButton>

        <ListboxOptions
          anchor='bottom start'
          transition
          className='w-(--input-width) rounded-xl border border-gray-800/90 bg-gray-900/90 p-1 [--anchor-gap:--spacing(1)] empty:invisible
          transition duration-100 ease-in data-leave:data-closed:opacity-0 z-50'>
          {emojis.map((item) => (
            <ListboxOption
              key={item.id}
              value={item}
              className='group flex items-center gap-2 rounded-lg px-3 py-1.5 select-none bg-gray-900/70 data-focus:bg-gray-800/90 cursor-pointer'>
              
              <div className='text-gray-300 capitalize'>{item.emoji} {item.name}</div>
            </ListboxOption>
          ))}
        </ListboxOptions>
      </Listbox>
    </Field>
  )
}