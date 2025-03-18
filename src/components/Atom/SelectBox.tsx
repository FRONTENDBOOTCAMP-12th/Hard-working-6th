import { tm } from '@/utils/tw-marge';

interface SelectBoxProps {
  id: string;
  label: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

function SelectBox({
  id,
  label,
  options,
  value,
  onChange,
  disabled = false,
}: SelectBoxProps) {
  return (
    <div className="relative w-full">
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      <select
        id={id}
        defaultValue={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className={tm(
          'border-b border-b-gray',
          'w-full py-4 px-6 h-14',
          'text-base'
        )}
      >
        <option value={label}>{label}</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

export default SelectBox;
