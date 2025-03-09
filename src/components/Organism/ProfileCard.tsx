import { useState } from "react";
import Avatar from "../Atom/Avatar.tsx";
import IconButton from "../Atom/IconButton";
import ProfileInfo from "../Molecule/ProfileInfo";
import AvatarSelector from "../Molecule/AvatarSelector";
import { FaEdit, FaArrowLeft, FaCog } from "react-icons/fa";

const ProfileCard = () => {
  const [avatar, setAvatar] = useState<string>("/src/assets/profile.svg"); 
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const profile = {
    name: "명재휘",
    birth: "2000-12-02",
    email: "audwognl@gmail.com",
    joined: "2025년 02월 27일",
  };

  return (
    <div className="relative flex flex-col items-center min-h-screen bg-gradient-to-b from-[var(--color-primary-gradient1)] to-[var(--color-primary-gradient2)] p-6">
      {/* 상단 아이콘 */}
      <div className="absolute top-0 left-0 p-4">
        <FaArrowLeft className="text-[var(--color-font)] text-2xl cursor-pointer" />
      </div>

      <div className="absolute top-0 right-0 p-4">
        <FaCog className="text-[var(--color-font)] text-2xl cursor-pointer" />
      </div>

      {/* 프로필 이미지 */}
      <div className="relative mt-16 flex flex-col items-center">
        <div className="bg-white p-4 rounded-full shadow-lg">
          <Avatar 
            src={avatar} 
          />
        </div>
        
        {/* 연필 버튼 (편집 버튼) */}
        <div className="absolute bottom-2 right-2">
          <IconButton 
            icon={<FaEdit className="text-[var(--color-primary-gradient1)]" />} 
            onClick={() => setIsModalOpen(true)} 
          />
        </div>
      </div>

      {/* 프로필 정보 */}
      <div className="w-full flex flex-col items-center mt-6">
        <ProfileInfo {...profile} />
      </div>

      {/* 모달 창 */}
      {isModalOpen && (
        <AvatarSelector
        src=""
          onSelect={(newAvatar: string) => setAvatar(newAvatar)} // ✅ 타입 명시
        />
      )}
    </div>
  );
};

export default ProfileCard;
