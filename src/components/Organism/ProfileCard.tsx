
import { useState, useEffect } from 'react';
import ProfileInfo from '@/components/Molecule/ProfileInfo';
import AvatarSelector from '@/components/Molecule/AvatarSelector';
import { getProfile } from '@/utils/supabaseProfile';
import supabaseClient from '@/utils/SupabaseClient';

// ✅ `UserProfileData` 타입 정의
interface UserProfileData {
  full_name: string;
  gender: string;
  birth_date: string;
  zodiac_sign: string;
  email: string;
  joined_at: string;
  avatar_url?: string;
}

const ProfileCard = () => {
  const [avatar, setAvatar] = useState<string>('/src/assets/profile.svg');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [userProfile, setUserProfile] = useState<UserProfileData | undefined>();
  const [userId, setUserId] = useState<string | null>(null);
  const [avatarUrl, setAvatarUrl] = useState('');

  useEffect(() => {
    void (async () => {
      const { data, error } = await supabaseClient.auth.getUser();
      console.log(data)
      if (error) {
        console.error('에러 발생: ', error);
      } else {
        setUserId(data.user?.id);
        console.log(userId)
      }
    })();
  }, []);

  useEffect(() => {
    const fetchUserProfile = async () => {
      console.log("실행", userId)
      const { data, error } = await getProfile({
        columns: '*',
        page: 0,
        perPage: 1,
        orderBy: 'updated_at',
      });
    console.log(data)
      if (data) {
        const userData = data.filter((item) => item.id === userId);

        console.log(userData); // 이부분
        setUserProfile(userData[0])
      }

      if (error) {
        console.error('데이터 로딩 에러:', error);
      }
    };

    fetchUserProfile();
  }, [userId]);

  return (
    <div className="relative flex flex-col items-center min-h-screen bg-gradient-to-b p-6">
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
        <ProfileInfo
          name={userProfile?.full_name ?? '사용자'}
          gender={userProfile?.gender ?? '알 수 없음'}
          birth={userProfile?.birth_date ?? '알 수 없음'}
          zodiac={userProfile?.zodiac_sign ?? ''}
          email={userProfile?.email ?? '알 수 없음'}
        />
      </div>

      {/* 프로필 선택 모달 */}
      { (
        <AvatarSelector 
        url={avatar} 
        size={150} 
    onUpload={(avatarUrl) => {
      setAvatarUrl(avatarUrl); // AvatarUrl 대신 상태 설정 함수 사용
      setAvatar(avatarUrl);    // 아바타 상태도 업데이트
      setIsModalOpen(false);   // 선택 후 모달 닫기(선택 사항)
    }} 
  />
)}
    </div>
  );
};

export default ProfileCard;
