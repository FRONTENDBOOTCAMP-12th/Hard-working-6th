import { tm } from '@/utils/tw-marge';

interface ThemaButtonProps {
  text: string;
  onClick: () => void;
  disabled?: boolean;
}

function ThemaButton({ text, onClick, disabled = false }: ThemaButtonProps) {
  return (
    <button
      className={tm(
        'flex',
        'justify-between',
        'bg-[#00000061]',
        'text-white',
        'py-6',
        'px-4',
        'rounded-lg',
        'w-full',
        'mt-2',
        'shadow-md',
        'shadow-black/20',

        disabled && 'opacity-50'
      )}
      type="button"
      onClick={onClick}
      disabled={disabled}
    >
      <div className="text-left text-lg sm:text-xl">
        <h2 className=" font-bold">{text}</h2>
        <p className="text-sm mt-1">{getIconName(text)[1]}</p>
      </div>

      {/* <img
        src={`/src/assets/icon/${getIconName(text)[0]}.svg`}
        alt={`${text}`}
      /> */}
    </button>
  );
}

function getIconName(text: string) {
  switch (text) {
    case '애정운':
      return ['heart', '사랑이 찾아올까요? 버튼을 눌러보세요!'];
    case '재물운':
      return ['circle-dollar-sign', '뜻밖의 행운이 찾아올지도? 재물운 체크!'];
    case '학업운':
      return ['graduation-cap', '오늘은 공부하기 좋은 날일까?'];
    case '취업운':
      return ['calendar-fold', '꿈꾸던 직장을 만날 수 있을까요?'];
    case '재회운':
      return ['calendar-fold', '그 사람과 다시 만날 수 있을까요?'];
    case '월간운세':
      return ['calendar-fold', '이번 달, 행운이 찾아올까요?'];
    default:
      return 'default';
  }
}

export default ThemaButton;
