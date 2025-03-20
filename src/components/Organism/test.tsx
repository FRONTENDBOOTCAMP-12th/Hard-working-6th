import supabaseClient from '@/utils/SupabaseClient';
import { getProfile } from '@/utils/supabaseProfile';
import { useEffect, useState } from 'react';

interface HistoryItem {
  id: number;
  user_id: string;
  created_at: string;
  card_theme: string;
  card_name: string;
  content: string;
}

function TestComponent() {
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    void (async () => {
      const { data, error } = await supabaseClient.auth.getUser();

      if (error) {
        console.error('에러 발생: ', error);
      } else {
        setUserId(data.user?.id);
        console.log('유저 아이디:', userId);
      }
    })();
  }, []);

  useEffect(() => {
    const fetchHistory = async () => {
      const { data, error } = await getProfile({
        columns: '*',
        page: 0,
        perPage: 10,
        orderBy: 'updated_at',
        isAscending: false,
      });

      if (data) {
        const userData = data.filter((item) => item.id === userId);

        console.log(userData); // 이부분
        console.log(userData[0].zodiac_sign);
      }

      if (error) {
        console.error('데이터 로딩 에러:', error);
      }
    };

    if (userId) {
      void fetchHistory();
    }
  }, [userId]);

  return <h1>{userId}</h1>;
}

export default TestComponent;
