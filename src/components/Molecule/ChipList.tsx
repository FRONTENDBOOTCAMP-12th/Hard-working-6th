import { useState } from 'react';
import Chip from '../Atom/Chip';

const chipData = ['애정운', '재물운', '학업운', '월간운세'];

interface ChipListProps {
  onSelect: (selection: string | null) => void;
}

function ChipList({ onSelect }: ChipListProps) {
  const [selectedChip, setSelectedChip] = useState<string | null>(null);

  const handleChipClick = (label: string) => {
    const newSelection = label === selectedChip ? null : label;
    setSelectedChip(newSelection);
    onSelect(newSelection); // 부모 컴포넌트로 전달
  };

  return (
    <div className="flex space-x-3 ml-3">
      {chipData.map((label) => (
        <Chip
          key={label}
          label={label}
          onClick={() => handleChipClick(label)}
          selected={label === selectedChip}
        />
      ))}
    </div>
  );
}

export default ChipList;
