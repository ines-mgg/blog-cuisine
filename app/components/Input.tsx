import { HTMLInputTypeAttribute, useState } from "react";

interface IProps {
  ariaLabel?: string;
  id: string;
  isDisabled?: boolean;
  label?: string;
  name: string;
  placeholder?: string;
  type: HTMLInputTypeAttribute;
  defaultValue?: string;
}

export default function Input({
  id,
  name,
  type,
  ariaLabel,
  isDisabled,
  label,
  placeholder,
  defaultValue,
}: IProps) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <div className="flex flex-col gap-2 font-medium text-black dark:text-white">
      {label && <label htmlFor={id}> {label} </label>}
      <div className="relative">
        <input
          aria-disabled={isDisabled}
          aria-label={ariaLabel}
          disabled={isDisabled}
          type={type === "password" && isPasswordVisible ? "text" : type}
          name={name}
          id={id}
          placeholder={placeholder}
          defaultValue={defaultValue}
          className="w-72 h-12 pl-3 bg-white border-2 border-[#FF6B35] rounded dark:bg-gray-950 dark:border-white"
        />
        {type === "password" && (
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute inset-y-0 right-0 flex items-center justify-center p-2"
          >
            {isPasswordVisible ? (
              <span
                className="icon-[mdi--eye-off]"
                style={{ width: "30px", height: "30px" }}
              ></span>
            ) : (
              <span
                className="icon-[mdi--eye]"
                style={{ width: "30px", height: "30px" }}
              ></span>
            )}
          </button>
        )}
      </div>
    </div>
  );
}
