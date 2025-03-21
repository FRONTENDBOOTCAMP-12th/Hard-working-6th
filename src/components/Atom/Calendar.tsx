import Calendar from 'react-calendar';
import { useState, useRef, memo, useMemo, useCallback } from 'react';
import 'react-calendar/dist/Calendar.css';
import '../../styles/components/calendar.css';
import dayjs from 'dayjs';

type CalendarObject = HTMLDivElement & {
  setActiveStartDate: (firstDayOfTodaysMonth: Date) => void;
};

interface CustomCalendarProps {
  onDateSelect: (date: Date) => void;
  markedDates: Record<string, { isMarked: boolean; color: string }>;
}

const MemoizedCalendar = memo(Calendar);

function CustomCalendar({ onDateSelect, markedDates }: CustomCalendarProps) {
  const calendarRef = useRef<null | CalendarObject>(null);
  const [date, setDate] = useState<Date | null>(new Date());

  const handleTodayClick = useCallback(() => {
    const today = new Date();
    setDate(today);
    const calendar = calendarRef.current;
    calendar?.setActiveStartDate(today);
    onDateSelect(today);
  }, [onDateSelect]);

  const tileContent = useMemo(() => {
    // eslint-disable-next-line react/display-name
    return ({ date }: { date: Date }) => {
      const localDate = new Date(date);
      localDate.setHours(localDate.getHours());
      const dateString = localDate.toLocaleDateString('en-CA');
      const markedDate = markedDates[dateString];

      return (
        <div className="relative flex flex-col items-center">
          {markedDate?.isMarked && (
            <div
              style={{
                position: 'absolute',
                bottom: '-6px',
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                backgroundColor: markedDate.color,
              }}
            ></div>
          )}
        </div>
      );
    };
  }, [markedDates]);

  return (
    <div className="flex justify-center">
      <div className="custom-calendar relative">
        <img
          src="/assets/calendar-paper.webp"
          alt="배경 이미지"
          className="background-img"
        />
        <MemoizedCalendar
          ref={calendarRef}
          aria-label="기록 캘린더"
          className="p-2 text-black"
          onChange={(date) => {
            setDate(date as Date);
            onDateSelect(date as Date);
          }}
          value={date}
          tileContent={tileContent}
          formatShortWeekday={(locale, date) =>
            // eslint-disable-next-line react/prop-types
            date.toLocaleDateString(locale, { weekday: 'short' }).slice(0, 1)
          }
          next2Label={null} // ">>" 버튼(연도 이동) 제거
          prev2Label={null} // "<<" 버튼(연도 이동) 제거
          calendarType="gregory" // 일요일부터 표시되도록 그레고리력으로 변경
          formatDay={(_locale, date) => dayjs(date).format('D')} // "일" 제거
        />
        <button
          type="button"
          onClick={handleTodayClick}
          className="absolute top-8 left-7.5 px-3 py-1 bg-[#7D3C3C] text-[#F0E6D2] border-[#5C2A2A] hover:bg-[#5C2A2A] text-sm rounded-lg shadow-md transition"
        >
          오늘
        </button>
      </div>
    </div>
  );
}

export default CustomCalendar;
