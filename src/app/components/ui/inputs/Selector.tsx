// Selector Component for forms
export default function Selector({ options, label, isRequired, value, setValue }: 
  { options: string[], label: string, isRequired: boolean, value: string, setValue: (value: string) => void }) {

  return (
    <>
      <label htmlFor={label} className="text-base font-medium text-yellow-300 absolute group-focus-within:block opacity-0 z-10
      translate-x-3 translate-y-3 group-focus-within:-translate-y-6 group-focus-within:opacity-100 transition-all duration-200 ease-in-out
      cursor-text" aria-label={`${label} Label, ${isRequired ? 'Required' : 'Optional'}`}>
        {label} {isRequired ? '*' : ''}
      </label>

      <select
        id={label}
        required={isRequired}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="px-3 py-3 border border-gray-500 rounded-lg bg-gray-900/50 text-highlight backdrop-blur-sm
          focus:ring focus:ring-gray-400 outline-none w-full text-lg shadow-inner shadow-gray-400/60 focus:bg-gray-950/80 cursor-pointer"
      >
        <option className="font-sans" value="">Select {label}</option>
        {options.map((option) => (
          <option className="font-sans" key={option} value={option}>{option.charAt(0).toUpperCase() + option.slice(1)}</option>
        ))}
      </select>
    </>
  )
}