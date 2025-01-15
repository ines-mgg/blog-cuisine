interface IProps {
  ariaLabel: string;
  isDisabled?: boolean;
  label: string;
  onClick?: () => void;
}

export default function Button({
  ariaLabel,
  label,
  isDisabled,
  onClick,
}: IProps) {
  return (
    <button
      aria-disabled={isDisabled}
      aria-label={ariaLabel}
      disabled={isDisabled}
      onClick={onClick}
      className="px-5 py-2 bg-[#FF6B35] text-white rounded text-sm font-bold"
    >
      {label}
    </button>
  );
}
