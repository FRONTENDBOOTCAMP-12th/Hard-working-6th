import { tm } from '@/utils/tw-marge';

interface ThemaButtonProps {
  text: string;
  onClick: () => void;
}

function ThemaButton({ text, onClick }: ThemaButtonProps) {
  return (
    <button
      className={tm(
        'flex',
        'justify-between',
        'bg-gradient-to-tr',
        'to-primary-gradient1',
        'from-primary-gradient2',
        'text-white',
        'py-6',
        'px-4',
        'rounded-lg',
        'w-full',
        'mt-2',
        'shadow-md',
        'shadow-neutral-400'
      )}
      type="button"
      onClick={onClick}
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
      return ['briefcase', '여기에 뭐 넣지??'];
    case '오늘의 운세':
      return ['today', '여기에도 뭐 넣지??'];
    case '월간운세':
      return ['calendar-fold', '이번 달, 행운이 찾아올까요?'];

    default:
      return 'default';
  }
}

export default ThemaButton;
