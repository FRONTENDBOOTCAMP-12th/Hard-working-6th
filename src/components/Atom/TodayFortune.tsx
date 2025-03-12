import { tm } from '@/utils/tw-marge';
import todayFortunesData from '@/assets/data/today_fortunes.json';
import { useEffect, useState } from 'react';

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
  const getStoredFortune = () => {
    const storedData = localStorage.getItem('daily_fortune');

    if (storedData) {
      const { date, fortune }: { date: string; fortune: Fortune } =
        JSON.parse(storedData); // 로컬스토리지 저장 데이터 타입 지정

      // 저장된 날짜가 오늘과 같다면 저장된 운세 사용
      const today = new Date().toISOString().split('T')[0]; // Date()의 날짜 형식을 YYYY-MM-DD 형식로 변환
      if (date === today) {
        return fortune;
      }
    }

    // 새로운 랜덤 운세 생성
    const randomIndex = Math.floor(
      Math.random() * todayFortunes.today_fortunes.length
    );
    const newFortune = todayFortunes.today_fortunes[randomIndex];

    // 새로운 운세와 오늘 날짜 저장
    const today = new Date().toISOString().split('T')[0];

    localStorage.setItem(
      'daily_fortune',
      JSON.stringify({ date: today, fortune: newFortune })
    );

    return newFortune;
  };

  const [fortune, setFortune] = useState<Fortune | null>(null);

  useEffect(() => {
    setFortune(getStoredFortune());
  }, []);

  return (
    <section className={tm('w-[275px] ml-6', className)}>
      <h2 className="sr-only">오늘의 운세</h2>

      {fortune && (
        <div className="text-white">
          <h3 className="text-c-2md font-semibold whitespace-nowrap">
            {fortune.title}
          </h3>

          <p className={tm('font-light tracking-tight', 'mt-2')}>
            {fortune.desc}
          </p>
        </div>
      )}
    </section>
  );
}

export default TodayFortune;
