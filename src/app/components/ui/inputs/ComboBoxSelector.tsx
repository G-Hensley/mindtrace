'use client';

// Import the headlessui components && Lucide Icons
import {
  Field,
  Label,
  Combobox,
  ComboboxInput,
  ComboboxButton,
  ComboboxOptions,
  ComboboxOption,
} from '@headlessui/react';
import { CheckIcon, ChevronDownIcon, XIcon } from 'lucide-react';

// Interface for the ComboBoxOption type
interface ComboBoxOption {
  id: string;
  name?: string;
  first_name?: string;
  last_name?: string;
}

// ComboBoxSelector component
export default function ComboBoxSelector<T extends ComboBoxOption>({
  selectedValue,
  setSelectedValue,
  setQuery,
  filteredOptions,
  label,
  showLabel,
  query,
  createOption,
}: {
  selectedValue: T | null;
  setSelectedValue: (value: T | null) => void;
  setQuery: (query: string) => void;
  filteredOptions: T[];
  label?: string;
  showLabel?: boolean;
  query: string;
  createOption: boolean;
}) {
  // Function to get the display value of the selected item (name or first and last name)
  const getDisplayValue = (item: T) => {
    if (item?.name) return item.name;
    if (item?.first_name && item?.last_name)
      return `${item.first_name} ${item.last_name}`;
    return '';
  };

  // Return the ComboBoxSelector component
  return (
    <Field className='flex flex-col gap-1' aria-label={label || 'ComboBoxSelector'}>

      <Label className={`translate-x-2 text-highlight ${showLabel === false ? 'hidden' : ''}`}>{label}</Label>

      <Combobox
        value={selectedValue}
        onChange={setSelectedValue}
        onClose={() => setQuery('')}
        >
        <div className='relative'>
          <ComboboxInput
            className='w-full rounded-lg bg-gray-900/90 py-2 pr-8 pl-3 text-gray-300 shadow-inner shadow-gray-600/30 border border-gray-800/90
            focus:not-data-focus:outline-none data-focus:outline data-focus:-outline-offset-1 data-focus:outline-gray-400/25 capitalize
            hover:border-gray-600/90 transition-all duration-100 ease-in text-base'
            displayValue={getDisplayValue}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={`Search ${label}...`}
          />
          <ComboboxButton className='group absolute inset-y-0 right-0 px-2.5 cursor-pointer'>
            <ChevronDownIcon className='size-6 fill-white/60 group-data-hover:fill-white' />
          </ComboboxButton>
        </div>

        <ComboboxOptions
          anchor='bottom'
          transition
          className='w-(--input-width) rounded-xl border border-gray-800/90 bg-gray-900/90 p-1 [--anchor-gap:--spacing(1)] empty:invisible
          transition duration-100 ease-in data-leave:data-closed:opacity-0 z-50'>
          
          {query.length > 0 && createOption && (
            <ComboboxOption value={{ id: null, name: query }} onClick={() => setQuery(query)} className='data-focus:bg-gray-700/90 text-gray-300 cursor-pointer'>
              Create <span className='font-bold'>&quot;{query}&quot;</span>
            </ComboboxOption>
          )}
          <ComboboxOption value={{ id: null, name: 'Clear' }} onClick={() => setSelectedValue(null)} className='flex items-center gap-2 rounded-lg px-3 py-1.5 select-none bg-gray-900/70 
          data-focus:bg-gray-800/90 cursor-pointer text-gray-300'>
            <XIcon className='size-4' />
            Clear Selection
          </ComboboxOption>
          {filteredOptions.map((item) => (
            <ComboboxOption
              key={item.id}
              value={item}
              className='group flex items-center gap-2 rounded-lg px-3 py-1.5 select-none bg-gray-900/70 data-focus:bg-gray-800/90 cursor-pointer'>
              <CheckIcon className='invisible size-4 fill-gray-300 group-data-selected:visible' />
              <div className='text-gray-300 capitalize'>{getDisplayValue(item)}</div>
            </ComboboxOption>
          ))}
        </ComboboxOptions>
      </Combobox>
    </Field>
  );
}
