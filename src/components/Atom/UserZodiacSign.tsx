import { tm } from '@/utils/tw-marge';
import zodiacSignData from '@/assets/data/zodiac_signs.json';
import supabaseClient from '@/utils/SupabaseClient';
import { getProfile } from '@/utils/supabaseProfile';
import { useState, useEffect } from 'react';

interface ZodiacSign {
  name: string;
  korean: string;
  src: string;
}
interface ZodiacSigns {
  zodiac_signs: ZodiacSign[];
}

interface UserZodiacSignProps {
  className?: string;
}

// JSON 데이터에 타입 적용
const zodiacSigns: ZodiacSigns = zodiacSignData;

function UserZodiacSign({ className }: UserZodiacSignProps) {
  const [userId, setUserId] = useState<string | null>(null);
  const [zodiacSign, setZodiacsign] = useState<string | null>(null);
  const [userZodiacSign, setUserZodiacSign] = useState<ZodiacSign>();

  useEffect(() => {
    // supabase에서 userId 가져오기
    void (async () => {
      const { data, error } = await supabaseClient.auth.getUser();

      if (error) {
        console.error('에러 발생: ', error);
      } else {
        setUserId(data.user?.id);
      }
    })();
  }, []);

  useEffect(() => {
    // supabase에서 profile 테이블에서 user 별자리 가져오기
    const fetchZodiac = async () => {
      const { data, error } = await getProfile({
        columns: '*',
        orderBy: 'updated_at',
        isAscending: false,
      });

      if (data) {
        const userData = data.find((item) => item.id === userId);

        if (userData) {
          setZodiacsign(userData.zodiac_sign);
        }
      }

      if (error) {
        console.error('데이터 로딩 에러:', error);
      }
    };

    if (userId) {
      fetchZodiac();
    }
  }, [userId]);

  useEffect(() => {
    // 데이터 json 파일에서 supabase에서 가져온 zodiacSign과 일치하는 객체 찾기
    const userZodiacSignData = zodiacSigns.zodiac_signs.find((item) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      return item.korean === zodiacSign;
    });

    setUserZodiacSign(userZodiacSignData);
  }, [zodiacSign]);

  return (
    <section className={tm('', className)}>
      <h2 className="sr-only">나의 별자리</h2>
      {userZodiacSign ? (
        <img
          src={`${userZodiacSign.src}`}
          className="w-32 opacity-97"
          alt={userZodiacSign.korean}
        />
      ) : (
        <p className="mt-10">당신의 별자리는..</p>
      )}
    </section>
  );
}

export default UserZodiacSign;
