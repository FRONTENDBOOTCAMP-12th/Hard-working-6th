import { useEffect, useState } from 'react';
import CustomCalendar from '../Atom/Calendar';
import { getMarkedDateKey } from '../../utils/dateUtils';

interface HistoryCalendarProps {
  historyData: { create_at: string }[];
  onDateSelect: (date: Date | null) => void;
}

function HistoryCalendar({ historyData, onDateSelect }: HistoryCalendarProps) {
  const [markedDates, setMarkedDates] = useState<
    Record<string, { isMarked: boolean; color: string }>
  >({});

  useEffect(() => {
    const newMarkedDates: Record<string, { isMarked: boolean; color: string }> =
      {};

    historyData.forEach((item) => {
      const dateKey = getMarkedDateKey(item.create_at);
      newMarkedDates[dateKey] = { isMarked: true, color: 'red' };
    });

    setMarkedDates(newMarkedDates);
  }, [historyData]);
  return (
    <CustomCalendar onDateSelect={onDateSelect} markedDates={markedDates} />
  );
}

export default HistoryCalendar;
