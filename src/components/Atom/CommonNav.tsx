import { tm } from '@/utils/tw-marge';

// interface CommonNavProps {
//   text?: string;
// }

function CommonNav() {
  return (
    <nav
      className={tm(
        'w-full h-[83px] pt-[14px]',
        'bg-black opacity-57',
        'fixed bottom-0 left-0'
      )}
    >
      <ul
        className={tm(
          'w-full px-[58px]',
          'flex flex-row items-center justify-between'
        )}
      >
        <li>
          <a
            href="/"
            className="flex flex-col items-center justify-center gap-1.5"
          >
            <img
              src="/src/assets/icon/house-white.svg"
              alt="홈 메뉴 "
              className="size-[30px]"
            />
            <p className="text-white text-xs">홈</p>
          </a>
        </li>

        <li>
          <a
            href="/"
            className="flex flex-col items-center justify-center gap-1.5"
          >
            <img
              src="/src/assets/icon/moon-star-white.svg"
              alt="타로 메뉴"
              className="size-[30px]"
            />
            <p className="text-white text-xs">타로</p>
          </a>
        </li>

        <li>
          <a
            href="/"
            className="flex flex-col items-center justify-center gap-1.5"
          >
            <img
              src="/src/assets/icon/album-white.svg"
              alt="기록 메뉴"
              className="size-[30px]"
            />
            <p className="text-white text-xs">기록</p>
          </a>
        </li>

        <li>
          <a
            href="/"
            className="flex flex-col items-center justify-center gap-1.5"
          >
            <img
              src="/src/assets/icon/user-round-white.svg"
              alt="내정보 메뉴"
              className="size-[30px]"
            />
            <p className="text-white text-xs">내정보</p>
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default CommonNav;
