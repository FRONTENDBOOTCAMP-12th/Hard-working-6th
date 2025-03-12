import { useState } from 'react';

interface AvatarProps {
  src: string;
  alt?: string;
}

const Avatar = ({ src, alt = 'Profile Image' }: AvatarProps) => {
  const [selectedSrc, setSelectedSrc] = useState(src); // ✅ 상태 선언

  return (
    <img
      src={selectedSrc}
      alt={alt}
      className="w-32 h-32 rounded-full border-4 border-white shadow-lg cursor-pointer"
      onClick={() => setSelectedSrc('/src/assets/avatar2.svg')} // ✅ 클릭 시 이미지 변경
    />
  );
};

export default Avatar;
