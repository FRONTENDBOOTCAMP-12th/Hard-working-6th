import { useState } from "react";

interface AvatarProps {
  src: string;
  alt?: string;
}


function Avatar({src, alt}:AvatarProps){
  return(
    <>
      <img src={src} alt={alt} />
    </>
  )
}

export default Avatar

// const Avatar = ({ src, alt = "Profile Image" }: AvatarProps) => {
//   const [selectedSrc, setSelectedSrc] = useState(src); // 선택된 이미지 상태 관리

//   return (
//     <img
//       src={selectedSrc}
//       alt={alt}
//       className="w-32 h-32 rounded-full border-4 border-white shadow-lg"
//     />
//   );
// };

// export default Avatar;
