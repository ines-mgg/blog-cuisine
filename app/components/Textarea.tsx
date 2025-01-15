import { useState } from "react";

interface IProps {
  ariaLabel?: string;
  id: string;
  isDisabled?: boolean;
  label?: string;
  name: string;
  maxLength?: number;
  placeholder?: string;
  cols?: number;
  rows?: number;
  defaultValue?: string;
}

export default function Textarea({
  id,
  name,
  ariaLabel,
  isDisabled,
  label,
  placeholder,
  cols,
  rows,
  maxLength,
  defaultValue,
}: IProps) {
  const [numberOfWords, setNumberOfWords] = useState(0);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNumberOfWords(e.target.value.length);
  };
  return (
    <div className="flex flex-col gap-2 font-medium">
      {label && <label htmlFor={id}> {label} </label>}
      <textarea
        aria-disabled={isDisabled}
        aria-label={ariaLabel}
        disabled={isDisabled}
        name={name}
        id={id}
        placeholder={placeholder}
        cols={cols}
        rows={rows}
        maxLength={maxLength}
        onChange={handleChange}
        defaultValue={defaultValue}
        className="pl-3 bg-white border-2 border-[#FF6B35] rounded dark:bg-gray-950 dark:border-white"
      ></textarea>
      {maxLength && (
        <span className="self-end">{`${numberOfWords} / ${maxLength}`}</span>
      )}
    </div>
  );
}
