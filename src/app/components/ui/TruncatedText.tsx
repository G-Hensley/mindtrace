'use client';

// Import React useState hook
import { useState } from "react";

// Type for the TruncatedText component with text and limit props
interface TruncatedTextProps {
  text: string;
  limit: number;
}

export default function TruncatedText({ text, limit }: TruncatedTextProps) {

  // State to track if the text is expanded or not
  const [expanded, setExpanded] = useState(false);

  if (text.length <= limit) {
    return <span>{text}</span>;
  }

  return (

    <span>
      {expanded ? text : `${text.slice(0, limit)}...`}
      <button className="text-accent underline text-sm font-lato ml-2 cursor-pointer" onClick={() => setExpanded(!expanded)}>
        {expanded ? 'Show less' : 'Read more'}
      </button>
    </span>

  )

}