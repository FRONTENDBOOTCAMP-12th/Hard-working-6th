import { useState } from 'react';
import Chip from '../Atom/Chip';

const chipData = [
  '재회운',
  '애정운',
  '재물운',
  '학업운',
  '취업운',
  '오늘의 운세',
];

interface ChipListProps {
  onSelect: (selection: string | null) => void;
}

function ChipList({ onSelect }: ChipListProps) {
  const [selectedChip, setSelectedChip] = useState<string | null>(
    '오늘의 운세'
  );

  const handleChipClick = (label: string) => {
    const newSelection = label;
    setSelectedChip(newSelection);
    onSelect(newSelection); // 부모 컴포넌트로 전달
  };

  return (
    <div
      className="flex space-x-3 ml-3"
      role="group"
      aria-labelledby="chip-list"
    >
      <h2 id="chip-list" className="sr-only">
        운세 선택
      </h2>
      {chipData.map((label) => (
        <Chip
          key={label}
          label={label}
          onClick={() => handleChipClick(label)}
          selected={label === selectedChip}
          aria-pressed={label === selectedChip ? 'true' : 'false'}
        />
      ))}
    </div>
  );
}

export default ChipList;
