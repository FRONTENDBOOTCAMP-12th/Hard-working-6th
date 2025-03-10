interface RadioOption {
  value: string;
  label: string;
  icon?: React.ReactNode;
}

interface RadioButtonGroupProps {
  options: RadioOption[];
  selectedValue: string;
  onChange: (value: string) => void;
}

function RadioButtonGroup({
  options,
  selectedValue,
  onChange,
}: RadioButtonGroupProps) {
  return (
    <div className="flex justify-center space-x-8">
      {options.map((option) => (
        <div key={option.value} className="relative flex items-center">
          <input
            type="radio"
            id={option.value}
            value={option.value}
            checked={selectedValue === option.value}
            onChange={() => onChange(option.value)}
            className={`min-w-28 h-10 p-1 border rounded-3xl cursor-pointer appearance-none ${selectedValue === option.value ? 'border-primary-gradient1' : 'border-gray'}`}
            onClick={() => onChange(option.value)}
          />
          <label
            htmlFor={option.value}
            className={`flex items-center gap-1 absolute transform left-[50%] translate-x-[-50%] text-base cursor-pointer
              ${selectedValue === option.value ? 'text-primary-gradient1' : 'text-gray'}`}
          >
            {option.label}
            {option.icon && <span>{option.icon}</span>}
          </label>
        </div>
      ))}
    </div>
  );
}

export default RadioButtonGroup;
