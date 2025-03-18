import SelectBox from '../Atom/SelectBox';

interface SelectBirthdateProps {
  birthdate: { year: string; month: string; day: string };
  onChange: (field: 'year' | 'month' | 'day', value: string) => void;
}

function SelectBirthdate({ birthdate, onChange }: SelectBirthdateProps) {
  const years = Array.from({ length: 100 }, (_, i) =>
    (new Date().getFullYear() - i).toString()
  );
  const months = Array.from({ length: 12 }, (_, i) => (i + 1).toString());
  const days = Array.from({ length: 31 }, (_, i) => (i + 1).toString());

  // undefined 방지를 위해 초기값을 설정
  const selectedYear = birthdate.year || '';
  const selectedMonth = birthdate.month || '';
  const selectedDay = birthdate.day || '';

  return (
    <div className="flex gap-4 justify-center">
      <SelectBox
        id="year"
        label="년도"
        options={years}
        value={selectedYear}
        onChange={(value) => onChange('year', value)}
      />

      <SelectBox
        id="month"
        label="월"
        options={months}
        value={selectedMonth}
        onChange={(value) => onChange('month', value)}
      />

      <SelectBox
        id="day"
        label="일"
        options={days}
        value={selectedDay}
        onChange={(value) => onChange('day', value)}
      />
    </div>
  );
}

export default SelectBirthdate;
