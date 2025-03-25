import { tm } from '@/utils/tw-marge';
import { useMatch } from 'react-router';
import HomeIcon from '/src/assets/icon/house.svg?react';
import TarotIcon from '/src/assets/icon/moon-star.svg?react';
import RecordIcon from '/src/assets/icon/album.svg?react';
import UserIcon from '/src/assets/icon/user-round.svg?react';
import { NavLink } from 'react-router';

function CommonNav() {
  const isTairoActive = useMatch('/tairo-theme/*');
  const isProfileActive = useMatch('/profile');
  const isSettingsActive = useMatch('/settings');

  const isProfileOrSettingsActive = isProfileActive ?? isSettingsActive;

  const navItems = [
    { to: '/home', Icon: HomeIcon, label: '홈', isActive: false },
    {
      to: '/tairo-theme',
      Icon: TarotIcon,
      label: '타로',
      isActive: isTairoActive,
    },
    { to: '/tairo-history', Icon: RecordIcon, label: '기록', isActive: false },
    {
      to: '/profile',
      Icon: UserIcon,
      label: '내정보',
      isActive: isProfileOrSettingsActive,
    },
  ];

  return (
    <nav
      className={tm(
        'w-full h-[83px] pt-[14px]',
        'bg-black opacity-57', // 항상 배경 보이도록
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
        {navItems.map(({ to, Icon, label, isActive }) => (
          <li key={to}>
            <NavLink
              to={to}
              end
              className={tm(
                'flex flex-col items-center justify-center gap-1.5',
                isActive ? 'text-yellow-400' : 'text-white'
              )}
            >
              <Icon
                className="size-[30px]"
                stroke={isActive ? '#FACC15' : '#FFFFFF'}
              />
              <p className="text-c-sm font-normal">{label}</p>
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default CommonNav;
