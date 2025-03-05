interface ChipProps {
  label: string;
  selected: boolean;
  onClick: () => void;
}

const Chip = ({ label, selected, onClick }: ChipProps) => {
  return (
    <div
      className={`flex justify-center items-center px-3 py-1 rounded-full text-base font-light border transition-colors cursor-pointer focus:outline-none border-white ${selected ? 'bg-white text-black shadow-inner ' : 'bg-transparent text-white shadow-none'}`}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          onClick();
        }
      }}
      tabIndex={0}
      role="button"
    >
      <span>{label}</span>
    </div>
  );
};

export default Chip;
