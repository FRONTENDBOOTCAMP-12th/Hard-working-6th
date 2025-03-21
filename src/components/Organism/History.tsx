import { useEffect, useState, useRef, useMemo } from 'react';
import CustomCalendar from '../Atom/Calendar';
import ChipList from '../Molecule/ChipList';
import { getMemoList } from '@/utils/supabaseHistory';

interface HistoryItem {
  id: number;
  user_id: string;
  created_at: string;
  card_theme: string;
  card_name: string;
  content: string;
}

interface TairoHistoryProps {
  userId: string;
}

function TairoHistory({ userId }: TairoHistoryProps) {
  const [selectedChip, setSelectedChip] = useState<string | null>(
    '오늘의 운세'
  );
  const [historyData, setHistoryData] = useState<HistoryItem[]>([]);
  const [filteredData, setFilteredData] = useState<HistoryItem[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const contentRef = useRef<HTMLDivElement | null>(null); // 스크롤을 참조할 ref
  const handleChipSelect = (selection: string | null) => {
    setSelectedChip(selection);
  };
  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTop = 0; // 스크롤을 맨 위로 초기화
    }
  }, [selectedChip, filteredData]);

  useEffect(() => {
    const fetchHistory = async () => {
      const { data, error } = await getMemoList({
        columns: '*',
        orderBy: 'created_at',
        isAscending: false,
      });

      if (data) {
        const userHistory = data.filter(
          (item: HistoryItem) => item.user_id === userId
        );
        setHistoryData(userHistory);
      } else {
        setHistoryData([]);
      }

      if (error) {
        console.error('데이터 로딩 에러:', error);
      }
    };

    if (userId) {
      fetchHistory();
    }
  }, [userId]);

  const markedDates = useMemo(() => {
    return historyData.reduce(
      (acc, item) => {
        const date = new Date(item.created_at);
        date.setHours(date.getHours() - 9);
        const dateKey = item.created_at.split('T')[0]; // 날짜만 추출
        acc[dateKey] = { isMarked: true, color: 'brown' };
        return acc;
      },
      {} as Record<string, { isMarked: boolean; color: string }>
    );
  }, [historyData]);

  useEffect(() => {
    let filtered = historyData;

    if (selectedDate) {
      const startOfDayKST = new Date(selectedDate);
      startOfDayKST.setHours(0, 0, 0, 0);

      const endOfDayKST = new Date(selectedDate);
      endOfDayKST.setHours(23, 59, 59, 999);

      filtered = filtered.filter((item) => {
        const createdAtKST = new Date(item.created_at);
        createdAtKST.setHours(createdAtKST.getHours() - 9); // DB에서 created_at이 로컬 시간으로 UTC 저장이 되어 로컬 시간이 +9가 되어있는 상태여서 -9로 시간을 맞춰줌

        return createdAtKST >= startOfDayKST && createdAtKST <= endOfDayKST;
      });
    }

    if (selectedChip) {
      filtered = filtered.filter((item) => item.card_theme === selectedChip);
    }

    setFilteredData(filtered);
  }, [selectedDate, selectedChip, historyData]);

  return (
    <div className="flex flex-col justify-center items-center p-6">
      <CustomCalendar
        onDateSelect={setSelectedDate}
        markedDates={markedDates}
        aria-label="날짜를 선택하여 이전 기록을 볼 수 있는 캘린더"
      />

      <div className="flex justify-center mt-4 w-full overflow-x-auto whitespace-nowrap scrollbar-none">
        <h2 id="chip-list" className="sr-only">
          운세 주제 선택
        </h2>
        <div className="flex space-x-3 snap-x snap-mandatory overflow-x-auto">
          <ChipList onSelect={handleChipSelect} />
        </div>
      </div>

      <div
        ref={contentRef}
        className="mt-6 w-sm text-white bg-[rgba(59,33,95,0.5)] px-4 rounded-lg h-60 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-700"
      >
        {filteredData.length > 0 ? (
          <ul className="mt-2">
            {filteredData.map((item) => (
              <li key={item.id} className="border-b border-gray-400 pt-2 pb-2">
                <p className="text-center">{item.card_name}</p>
                <p>{item.content}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="flex items-center justify-center h-full text-2xl">
            이전 기록이 없습니다.
          </p>
        )}
      </div>
    </div>
  );
}

export default TairoHistory;
