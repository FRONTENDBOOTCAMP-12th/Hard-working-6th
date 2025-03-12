import { useState } from 'react';
import ProfileInfo from '../Molecule/ProfileInfo';
import AvatarSelector from '../Molecule/AvatarSelector';

const ProfileCard = () => {
  // ✅ 상태: 프로필 이미지 & 모달 상태
  const [avatar, setAvatar] = useState<string>('/src/assets/profile.svg');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // ✅ 더미 사용자 데이터
  const profile = {
    name: '명재휘',
    gender: '♂',
    birth: '2000.12.02 (사수자리)',
    email: 'audwognl@gmail.com',
    joined: '2025년 02월 27일',
  };

  return (
    <div className="relative flex flex-col items-center min-h-screen bg-gradient-to-b from-[var(--color-primary-gradient1)] to-[var(--color-primary-gradient2)] p-6">
      {/* 프로필 이미지 */}
      <div className="relative mt-16 flex flex-col items-center">
        <div className="bg-white p-4 rounded-full shadow-lg">
          <img
            src={avatar}
            alt="프로필 이미지"
            className="w-32 h-32 rounded-full"
          />
        </div>

        {/* 연필 버튼 (편집 버튼) */}
        <div className="absolute bottom-2 right-2">
          <button
            className="p-2 rounded-full bg-white shadow-md"
            onClick={() => setIsModalOpen(true)}
          >
            <img src="/src/assets/icon/pencil.svg" alt="프로필 수정" />
          </button>
        </div>
      </div>

      {/* 프로필 정보 */}
      <div className="w-full flex flex-col items-center mt-6">
        <ProfileInfo {...profile} />
      </div>

      {/* 프로필 선택 모달 */}
      {isModalOpen && (
        <AvatarSelector
          onSelect={(newAvatar: string) => {
            setAvatar(newAvatar); // ✅ 선택된 이미지 업데이트
            setIsModalOpen(false); // ✅ 모달 닫기
          }}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

export default ProfileCard;
