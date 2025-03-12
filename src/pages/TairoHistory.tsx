import History from '@/components/Organism/History';
// import supabaseClient from '@/utils/SupabaseClient';
import { useEffect, useState } from 'react';

function TairoHistory() {
  const [userId, setUserId] = useState<string | null>(
    'cf31fe10-3452-4b2e-8f88-1e58f6b3afc3' // 테스트를 위해 임시로 userId를 하드코딩함
  );

  // useEffect(() => {
  //   void (async () => {
  //     const { data, error } = await supabaseClient.auth.getUser();

  //     if (error) {
  //       console.error('에러 발생: ', error);
  //     } else {
  //       setUserId(data.user?.id);
  //     }
  //   })();
  // }, []);

  return (
    <div className="min-h screen">
      <h1 className="sr-only">이전 기록</h1>
      {userId ? <History userId={userId} /> : <p>로그인이 필요합니다</p>}
    </div>
  );
}

export default TairoHistory;
