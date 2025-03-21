import { Link } from 'react-router';
import ThemeButton from '../Atom/ThemeButton';
import { useStore } from '@/stores/theme';
import { useEffect, useState } from 'react';
import { getMemoList } from '@/utils/supabaseHistory';
import supabaseClient from '@/utils/SupabaseClient';

function ThemeButtonList() {
  const ThemeData = [
    '애정운',
    '재물운',
    '학업운',
    '취업운',
    '재회운',
    '월간운세',
  ];
  const updateTheme = useStore((state) => state.updateTheme);
  const [TodayFortuneTheme, setTodayFortuneTheme] = useState<string[]>([]);

  const [userId, setUserId] = useState<string | null>(null);
  const [historyData, setHistoryData] = useState([]);

  const getTodayThemes = (data: any[]) => {
    const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD 형식

    return data
      .filter((item) => item.created_at.startsWith(today)) // 오늘 날짜인지 확인
      .map((item) => item.card_theme); // card_theme 값만 추출
  };

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

  useEffect(() => {
    const fetchHistory = async () => {
      const { data, error } = await getMemoList({
        columns: '*',
        page: 0,
        perPage: 10,
        orderBy: 'created_at',
        isAscending: false,
      });

      if (data) {
        const userHistory = data.filter((item) => item.user_id === userId);
        setHistoryData(userHistory);

        setTodayFortuneTheme(getTodayThemes(userHistory));
        // console.log('유저 히스토리:', userHistory);
      } else {
        setHistoryData([]);
      }

      if (error) {
        console.error('데이터 로딩 에러:', error);
      }
    };

    if (userId) {
      void fetchHistory();
    }
  }, [userId]);

  useEffect(() => {
    console.log('업데이트된 오늘의 테마:', TodayFortuneTheme);
  }, [TodayFortuneTheme]);
  return (
    <Link to="/tairo-theme/tairo">
      {ThemeData.map((theme) => (
        <ThemeButton
          key={theme}
          text={theme}
          onClick={() => updateTheme(theme)}
          disabled={TodayFortuneTheme.includes(theme)}
        />
      ))}
    </Link>
  );
}

export default ThemeButtonList;
