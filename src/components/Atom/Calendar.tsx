import Calendar from 'react-calendar';
import { useState } from 'react';
import 'react-calendar/dist/Calendar.css';

export default function CustomCalendar() {
  const [date, setDate] = useState<Date | null>(new Date());

  const handleTodayClick = () => {
    const today = new Date();
    setDate(today);
  };

  return (
    <div className="flex justify-center">
      <div className="relative">
        <Calendar
          onChange={(value) => setDate(value as Date)}
          value={date}
          className="react-calendar p-4 bg-white shadow-lg rounded-lg w-[350px] md:w-[400px]"
          tileClassName={({ view }) =>
            `p-2 text-center rounded-md transition-all ${
              view === 'month' ? 'hover:bg-gray-200' : 'hover:bg-blue-200'
            }`
          }
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
        />

        <button
          onClick={handleTodayClick}
          className="absolute top-6 right-4 px-3 py-1 bg-blue-500 text-white text-sm rounded-lg shadow-md hover:bg-blue-600 transition"
        >
          오늘
        </button>
      </div>
    </div>
  );
}
