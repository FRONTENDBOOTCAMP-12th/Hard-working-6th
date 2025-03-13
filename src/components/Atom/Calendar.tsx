import Calendar from 'react-calendar';
import { useState, useRef } from 'react';
import 'react-calendar/dist/Calendar.css';
import '../../styles/components/calendar.css';
import moment from 'moment';

type CalendarObject = HTMLDivElement & {
  setActiveStartDate: (firstDayOfTodaysMonth: Date) => void;
};

interface CustomCalendarProps {
  onDateSelect: (date: Date) => void;
}

function CustomCalendar({ onDateSelect }: CustomCalendarProps) {
  const calendarRef = useRef<null | CalendarObject>(null);
  const [date, setDate] = useState<Date | null>(new Date());

  const handleTodayClick = () => {
    const today = new Date();
    setDate(today);
    const calendar = calendarRef.current;
    calendar?.setActiveStartDate(new Date());
    onDateSelect(today); // 부모 컴포넌트로 전달
  };

  return (
    <div className="flex justify-center">
      <div className="custom-calendar relative">
        <Calendar
          ref={calendarRef}
          aria-label="기록 캘린더"
          className="p-2 text-black"
          onChange={(date) => {
            setDate(date as Date);
            onDateSelect(date as Date);
          }}
          value={date}
          navigationLabel={({ date }) => (
            <span className="text-lg font-semibold">
              {date.toLocaleString('default', {
                month: 'long',
                year: 'numeric',
              })}
            </span>
          )}
          formatShortWeekday={(locale, date) =>
            date.toLocaleDateString(locale, { weekday: 'short' }).slice(0, 1)
          }
          next2Label={null} // ">>" 버튼(연도 이동) 제거
          prev2Label={null} // "<<" 버튼(연도 이동) 제거
          calendarType="gregory" // 일요일부터 표시되도록 그레고리력으로 변경
          formatDay={(_locale, date) => moment(date).format('D')} // "일" 제거
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
