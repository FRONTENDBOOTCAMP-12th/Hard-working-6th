import supabaseClient from '@/utils/SupabaseClient';
import { getProfile, editProfile } from '@/utils/supabaseProfile';
import { useEffect, useState } from 'react';

interface UserProfileData {
  id: string;
  full_name: string;
  email: string;
  birthdate: string;
  gender: string;
  zodiac: string;
  profile_image: string;
  joined_at: string;
}

function UserProfile() {
  const [userId, setUserId] = useState<string | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfileData | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabaseClient.auth.getUser();

      if (error) {
        console.error('유저 정보 가져오기 실패:', error);
      } else {
        setUserId(data.user?.id ?? null);
      }
    };

    void fetchUser();
  }, []);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!userId) return;

      const { data, error } = await getProfile({
        columns: '*',
        page: 0,
        perPage: 1,
        orderBy: 'updated_at',
        isAscending: false,
      });

      if (error) {
        console.error('프로필 불러오기 실패:', error);
      } else if (data.length > 0) {
        setUserProfile(data[0]);
      }
    };

    void fetchProfile();
  }, [userId]);

  const handleAvatarChange = async (newAvatar: string) => {
    if (!userProfile) return;

    const updatedProfile = { ...userProfile, profile_image: newAvatar };
    setUserProfile(updatedProfile);

    const { error } = await editProfile(updatedProfile);
    if (error) {
      console.error('프로필 업데이트 실패:', error);
    }
  };

  return userProfile ? (
    <div className="text-center">
      <img
        src={userProfile.profile_image}
        alt="프로필 이미지"
        className="w-32 h-32 rounded-full border-4 border-white shadow-lg"
      />
      <h2 className="text-xl font-semibold">{userProfile.full_name}</h2>
      <p>
        {userProfile.gender} • {userProfile.zodiac}
      </p>
      <p>{userProfile.birthdate}</p>
      <p>{userProfile.email}</p>

      <button
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
        onClick={() => handleAvatarChange('/src/assets/avatar2.svg')}
      >
        프로필 사진 변경
      </button>
    </div>
  ) : (
    <p>프로필 정보를 불러오는 중...</p>
  );
}

export default UserProfile;
