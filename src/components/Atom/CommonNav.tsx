import { tm } from '@/utils/tw-marge';
import home from '/src/assets/icon/house-white.svg';
import tarot from '/src/assets/icon/moon-star-white.svg';
import record from '/src/assets/icon/album-white.svg';
import user from '/src/assets/icon/user-round-white.svg';
import { NavLink } from 'react-router';

function CommonNav() {
  return (
    <nav
      className={tm(
        'w-full h-[83px] pt-[14px]',
        'bg-black opacity-57',
        'fixed bottom-0 left-0',
        'z-999'
      )}
    >
      <ul
        className={tm(
          'w-full px-[58px]',
          'flex flex-row items-center justify-between'
        )}
      >
        <li>
          <NavLink
            to="/home"
            end
            className="flex flex-col items-center justify-center gap-1.5"
          >
            <img src={home} alt="홈 메뉴 " className="size-[30px]" />
            <p className="text-white text-c-sm font-normal">홈</p>
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/tairo-theme"
            className="flex flex-col items-center justify-center gap-1.5"
          >
            <img src={tarot} alt="타로 메뉴" className="size-[30px]" />
            <p className="text-white text-c-sm font-normal">타로</p>
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/tairo-history"
            className="flex flex-col items-center justify-center gap-1.5"
          >
            <img src={record} alt="기록 메뉴" className="size-[30px]" />
            <p className="text-white text-c-sm font-normal">기록</p>
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/profile"
            className="flex flex-col items-center justify-center gap-1.5"
          >
            <img src={user} alt="내정보 메뉴" className="size-[30px]" />
            <p className="text-white text-c-sm font-normal">내정보</p>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default CommonNav;
