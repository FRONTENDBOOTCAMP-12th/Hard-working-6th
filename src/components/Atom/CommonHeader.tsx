import { tm } from '@/utils/tw-marge';
import left from '/src/assets/icon/chevron-left-white.svg';
import { useNavigate } from 'react-router';
import { useState, useEffect, useCallback } from 'react';

interface CommonHeaderProps {
  text?: string;
}

function CommonHeader({ text }: CommonHeaderProps) {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);

  // 스크롤 이벤트 핸들러
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY >= 40); // 40px 이상 스크롤 시 true
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleClick = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  return (
    <header
      className={tm(
        'w-full h-[110px]',
        'fixed top-0 left-0',
        'pt-16',
        'transition-colors duration-400',
        isScrolled
          ? 'bg-gradient-to-tr from-bg-gradient2 to-bg-gradient1'
          : 'bg-transparent',
        'text-white',
        'z-999'
      )}
    >
      <div className={tm('relative', 'flex flex-row')}>
        <button
          type="button"
          className={tm('w-9 h-9', 'ml-5')}
          aria-label="뒤로가기"
          onClick={handleClick}
        >
          <img src={left} alt="" className="w-full" loading="lazy" />
        </button>

        <h1
          aria-hidden="true"
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
