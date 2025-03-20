import History from '@/components/Organism/History';
import supabaseClient from '@/utils/SupabaseClient';
import { useEffect, useState } from 'react';

function TairoHistory() {
  const [userId, setUserId] = useState<string | null>('null');

  useEffect(() => {
    void (async () => {
      const { data, error } = await supabaseClient.auth.getUser();

      if (error) {
        console.error('에러 발생: ', error);
      } else {
        setUserId(data.user?.id);
      }
    })();
  }, []);

  return (
    <div className="min-h screen">
      <h1 className="sr-only">이전 기록</h1>
      {userId ? <History userId={userId} /> : <p>로그인이 필요합니다</p>}
    </div>
  );
}

export default TairoHistory;
