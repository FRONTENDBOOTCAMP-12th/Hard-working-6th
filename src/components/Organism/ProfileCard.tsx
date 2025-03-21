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
  const [avatar, setAvatar] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [userProfile, setUserProfile] = useState<UserProfileData | undefined>();
  const [userId, setUserId] = useState<string | null>(null);
  const [avatarUrl, setAvatarUrl] = useState('');

  useEffect(() => {
    void (async () => {
      const { data, error } = await supabaseClient.auth.getUser();
      console.log(data);
      if (error) {
        console.error('에러 발생: ', error);
      } else {
        setUserId(data.user?.id);
        console.log(userId);
      }
    })();
  }, []);

  useEffect(() => {
    const fetchUserProfile = async () => {
      console.log('실행', userId);
      const { data, error } = await getProfile({
        columns: '*',
        orderBy: 'updated_at',
      });
      console.log(data);
      if (data) {
        const userData = data.filter((item) => item.id === userId);
        console.log('durl', userData[0].avatar_url); // 이부분
        setUserProfile(userData[0]);
        setAvatar(userData[0].avatar_url);
      }

      if (error) {
        console.error('데이터 로딩 에러:', error);
      }
    };

    fetchUserProfile();
  }, [userId]);

  return (
    <div className="relative flex flex-col items-center min-h-screen bg-gradient-to-b p-6">
      <AvatarSelector
        url={avatar}
        size={150}
        onUpload={(avatarUrl) => {
          setAvatar(avatarUrl); // 아바타 상태도 업데이트
          setIsModalOpen(false); // 선택 후 모달 닫기(선택 사항)
        }}
      />

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
      {}
    </div>
  );
};

export default ProfileCard;
