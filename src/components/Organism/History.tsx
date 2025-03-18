import { useEffect, useState } from 'react';
import CustomCalendar from '../Atom/Calendar';
import ChipList from '../Molecule/ChipList';
import { getMemoList } from '@/utils/supabaseHistory';
import { getMarkedDateKey } from '@/utils/dateUtils';

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
  const [selectedChip, setSelectedChip] = useState<string | null>('애정운');
  const [historyData, setHistoryData] = useState<HistoryItem[]>([]);
  const [filteredData, setFilteredData] = useState<HistoryItem[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [markedDates, setMarkedDates] = useState<
    Record<string, { isMarked: boolean; color: string }>
  >({});

  const handleChipSelect = (selection: string | null) => {
    setSelectedChip(selection);
  };

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
        const userHistory = data.filter(
          (item: HistoryItem) => item.user_id === userId
        );
        setHistoryData(userHistory);

        const newMarkedDates: Record<
          string,
          { isMarked: boolean; color: string }
        > = {};
        userHistory.forEach((item) => {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          const dateKey = getMarkedDateKey(item.created_at as string);
          newMarkedDates[dateKey] = { isMarked: true, color: 'red' };
        });
        setMarkedDates(newMarkedDates);
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

  useEffect(() => {
    let filtered = historyData;

    if (selectedDate) {
      const startOfDayKST = new Date(selectedDate);
      startOfDayKST.setHours(0, 0, 0, 0);

      const endOfDayKST = new Date(selectedDate);
      endOfDayKST.setHours(23, 59, 59, 999);

      filtered = filtered.filter((item) => {
        const createdAtKST = new Date(item.created_at);
        createdAtKST.setHours(createdAtKST.getHours() - 9);

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
      {/* 캘린더 */}
      <CustomCalendar
        onDateSelect={setSelectedDate}
        markedDates={markedDates}
        aria-label="날짜를 선택하여 이전 기록을 볼 수 있는 캘린더"
      />

      {/* 칩 리스트 */}
      <div className="mt-4 w-full overflow-x-auto whitespace-nowrap">
        <h2 id="chip-list" className="sr-only">
          운세 주제 선택
        </h2>
        <div className="flex space-x-3 snap-x snap-mandatory overflow-x-auto">
          <ChipList onSelect={handleChipSelect} />
        </div>
      </div>

      {/* 기록 리스트 */}
      <div className="mt-6 text-white w-full">
        {filteredData.length > 0 ? (
          <ul className="mt-2">
            {filteredData.map((item) => (
              <li key={item.id} className="border-b border-gray-400 py-2">
                <p className="text-center">{item.card_name}</p>
                <p>{item.content}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>이전 기록이 없습니다.</p>
        )}
      </div>
    </div>
  );
}

export default TairoHistory;
