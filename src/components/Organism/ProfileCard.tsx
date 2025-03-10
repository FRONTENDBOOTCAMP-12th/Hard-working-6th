import { useState } from 'react';
import Avatar from '../Atom/Avatar.tsx';
import IconButton from '../Atom/IconButton';
import ProfileInfo from '../Molecule/ProfileInfo';
import AvatarSelector from '../Molecule/AvatarSelector';

/*
 * 아이콘은 에셋에 정리해 두어서 react-icons 사용하지 않아도 됩니다.
 * Avatar 컴포넌트 내부에는 img 태그 한 개만 받고 있습니다. 따라서 굳이 컴포넌트로 나누지 않고 img 태그를 사용해도 됩니다.
 * 마찬가지로 IconButton 컴포넌트도 굳이 만들지 않아도 됩니다.
 * ex)
 */

const ProfileCard = () => {
  const [avatar, setAvatar] = useState<string>('/src/assets/profile.svg');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const profile = {
    name: '명재휘',
    birth: '2000-12-02',
    email: 'audwognl@gmail.com',
    joined: '2025년 02월 27일',
  };

  return (
    <div className="relative flex flex-col items-center min-h-screen bg-gradient-to-b from-[var(--color-primary-gradient1)] to-[var(--color-primary-gradient2)] p-6">
      {/* 프로필 이미지 */}
      <div className="relative mt-16 flex flex-col items-center">
        <div className="bg-white p-4 rounded-full shadow-lg">
          <Avatar src={avatar} />
          {/* 이 부분 그냥 <img src={avatar} alt="프로필 이미지" /> 로 사용해도 댐 */}
        </div>

        {/* 연필 버튼 (편집 버튼) */}
        <div className="absolute bottom-2 right-2">
          <button className="p-2 rounded-full bg-white shadow-md">
            <img src="/src/assets/icon/pencil.svg" alt="프로필 수정" />
          </button>
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
