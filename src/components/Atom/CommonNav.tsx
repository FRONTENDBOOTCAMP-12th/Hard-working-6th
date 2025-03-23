import { tm } from '@/utils/tw-marge';
import HomeIcon from '/src/assets/icon/house-white.svg?react';
import TarotIcon from '/src/assets/icon/moon-star-white.svg?react';
import RecordIcon from '/src/assets/icon/album-white.svg?react';
import UserIcon from '/src/assets/icon/user-round-white.svg?react';
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
        {[
          { to: '/home', Icon: HomeIcon, label: '홈' },
          { to: '/tairo-theme', Icon: TarotIcon, label: '타로' },
          { to: '/tairo-history', Icon: RecordIcon, label: '기록' },
          { to: '/profile', Icon: UserIcon, label: '내정보' },
        ].map(({ to, Icon, label }) => (
          <li key={to}>
            <NavLink
              to={to}
              end
              className={({ isActive }: { isActive: boolean }) =>
                tm(
                  'flex flex-col items-center justify-center gap-1.5',
                  isActive ? 'text-yellow-400' : 'text-white'
                )
              }
            >
              {({ isActive }: { isActive: boolean }) => (
                <>
                  <Icon
                    className="size-[30px]"
                    fill={isActive ? '#FACC15' : '#FFFFFF'}
                  />
                  <p className="text-c-sm font-normal">{label}</p>
                </>
              )}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default CommonNav;
