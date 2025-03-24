import { useState } from 'react';

interface AvatarProps {
  src: string;
  alt?: string;
}

const Avatar = ({ src, alt = 'Profile Image' }: AvatarProps) => {
  const [selectedSrc, setSelectedSrc] = useState(src);

  return (
    <button
      type="button"
      onClick={() => setSelectedSrc('/src/assets/avatar2.svg')}
    >
      <img
        src={selectedSrc}
        alt={alt}
        className="w-32 h-32 rounded-full border-4 border-white shadow-lg cursor-pointer"
      />
    </button>
  );
};

export default Avatar;
