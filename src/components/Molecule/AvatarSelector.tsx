interface AvatarProps {
    src: string;
    alt?: string;
    onSelect?: (newSrc: string) => void; // 이미지 변경을 위한 콜백 추가
  }
  
  const Avatar = ({ src, alt = "Profile Image", onSelect }: AvatarProps) => {
    return (
      <button
        onClick={() => onSelect && onSelect("/assets/avatar2.svg")}
        onKeyDown={(e) => {
          if ((e.key === "Enter" || e.key === " ") && onSelect) {
            onSelect("/assets/avatar2.svg");
          }
        }}
        className="w-32 h-32 rounded-full border-4 border-white shadow-lg cursor-pointer focus:outline-none"
        aria-label="Change Profile Image"
      >
        <img src={src} alt={alt} className="w-full h-full rounded-full" />
      </button>
    );
  };
  
  
  
  export default Avatar;
  