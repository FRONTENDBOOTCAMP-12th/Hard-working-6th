import { tm } from '@/utils/tw-marge';

interface CommonHeaderProps {
  text?: string;
}

function CommonHeader({ text = 'title' }: CommonHeaderProps) {
  return (
    <header className={tm('w-full h-[110px]', 'pt-16', 'bg-transparent')}>
      <div className={tm('relative', 'flex flex-row')}>
        <button
          type="button"
          className={tm('w-9 h-9', 'ml-5')}
          aria-label="뒤로가기"
        >
          <img
            src="/src/assets/icon/chevron-left.svg"
            alt=""
            className="w-full"
          />
        </button>

        <h1
          className={tm(
            'absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]',
            'font-medium'
          )}
        >
          {text}
        </h1>
      </div>
    </header>
  );
}

export default CommonHeader;
