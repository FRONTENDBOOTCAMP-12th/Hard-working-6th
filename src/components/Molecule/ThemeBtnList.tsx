import { Link } from 'react-router';
import ThemeButton from '../Atom/ThemeButton';
import { useStore } from '@/stores/theme';

function ThemeButtonList() {
  const ThemeData = [
    '애정운',
    '재물운',
    '학업운',
    '취업운',
    '오늘의 운세',
    '월간운세',
  ];
  const updateTheme = useStore((state) => state.updateTheme);

  return (
    <Link to="/tairo-theme/tairo">
      {ThemeData.map((theme) => (
        <ThemeButton
          key={theme}
          text={theme}
          onClick={() => updateTheme(theme)}
        />
      ))}
    </Link>
  );
}

export default ThemeButtonList;
