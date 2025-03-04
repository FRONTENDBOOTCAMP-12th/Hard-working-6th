import { useState } from 'react';
import Chip from '../Atom/Chip';

const ChipList = () => {
  const [selectedChip, setSelectedChip] = useState<string | null>(null);

  const chipData = [
    { label: '애정운', content: '애정운입니다.' },
    { label: '재물운', content: '재물운입니다.' },
    { label: '학업운', content: '학업운입니다.' },
    { label: '월간운세', content: '월간운세입니다.' },
  ];

  const handleChipClick = (label: string) => {
    setSelectedChip(label === selectedChip ? null : label);
  };

  return (
    <div>
      <div className="flex space-x-3 ml-3">
        {chipData.map((chip) => (
          <Chip
            key={chip.label}
            label={chip.label}
            onClick={() => handleChipClick(chip.label)}
            selected={chip.label === selectedChip}
          />
        ))}
      </div>

      {selectedChip && (
        <div className="mt-4 text-white text-base ml-3">
          <p>{chipData.find((chip) => chip.label === selectedChip)?.content}</p>
        </div>
      )}
    </div>
  );
};

export default ChipList;
