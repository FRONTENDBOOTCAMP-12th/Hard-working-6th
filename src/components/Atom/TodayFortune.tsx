import { tm } from '@/utils/tw-marge';
import todayFortunesData from '@/assets/data/today_fortunes.json';
import { useEffect, useState } from 'react';
import supabaseClient from '@/utils/SupabaseClient';
import { addFortune } from '@/utils/supabaseFortune';

interface Fortune {
  title: string;
  desc: string;
}
interface TodayFortunes {
  today_fortunes: Fortune[];
}

interface TodayFortuneProps {
  className?: string;
}

// JSON 데이터에 타입 적용
const todayFortunes: TodayFortunes = todayFortunesData;

function TodayFortune({ className }: TodayFortuneProps) {
  // 유저 아이디
  const [userId, setUserId] = useState<string | null>(null);
  // 오늘의 운세
  const [todayFortune, setTodayFortune] = useState<Fortune>({
    title: '운세를 불러오는 중...',
    desc: '잠시만 기다려 주세요.',
  });

  // 오늘 날짜 구하기
  const today = new Date().toISOString().split('T')[0];

  useEffect(() => {
    // 수퍼베이스에서 userId 가져오기

    void (async () => {
      // let { data: user_fortune, error } = await supabaseClient
      //   .from('user_fortune')
      //   .select('id');

      const { data, error } = await supabaseClient.auth.getUser();

      if (error) {
        console.error('에러 발생: ', error);
      } else {
        setUserId(data.user?.id || null);
      }

      // console.log(userId);
    })();
  }, []);

  useEffect(() => {
    if (!userId) return;

    const fetchTodayFortune = async () => {
      // 수퍼베이스에서 userId, today와 일치하는 정보 찾기
      const { data, error } = await supabaseClient
        .from('user_fortune') // 테이블 이름 (수정 가능)
        .select('*')
        .eq('user_id', userId)
        .eq('today_fortune_date', today)
        .single(); // 단일 행 조회

      console.log('data:', data);

      if (error && error.code !== 'PGRST116') {
        // 'PGRST116': 조회된 데이터가 없는 경우 발생하는 에러
        console.error('운세 데이터를 가져오는 중 오류 발생:', error);
        return;
      }

      if (data) {
        // 기존 데이터가 있으면 그대로 사용

        setTodayFortune(data.today_fortune);
        // return;
      } else {
        // 기존 데이터가 없으면 새로운 운세 저장

        // 랜덤 오늘의 운세 만들기
        const randomIndex = Math.floor(
          Math.random() * todayFortunes.today_fortunes.length
        );
        const newFortune = todayFortunes.today_fortunes[randomIndex];

        // 새로운 데이터 정보를 수퍼베이스에 저장
        const insertData = {
          today_fortune: newFortune,
          user_id: userId,
          today_fortune_date: today,
        };
        await addFortune(insertData);

        // const { error: insertError } = await supabaseClient
        //   .from('user_fortune')
        //   .insert(insertData);

        // if (insertError) {
        //   console.error('운세 저장 중 오류 발생:', insertError);
        //   return;
        // }

        setTodayFortune(newFortune);
      }
    };

    void fetchTodayFortune();
  }, [userId]);

  return (
    <section className={tm('w-[275px] ml-6', className)}>
      <h2 className="sr-only">오늘의 운세</h2>
      {/* {todayFortune && ( */}
      <div className="text-white">
        <h3 className="text-c-2md font-semibold whitespace-nowrap">
          {todayFortune.title}
        </h3>
        <p className={tm('font-light tracking-tight', 'mt-2')}>
          {todayFortune.desc}
        </p>
      </div>
      {/* )} */}
    </section>
  );
}

export default TodayFortune;
