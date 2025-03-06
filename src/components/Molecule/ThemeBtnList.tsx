import { Link } from 'react-router';
import ThemeButton from '../Atom/ThemeButton';
import { useStore } from '@/stores/theme';

function ThemeButtonList() {
  const ThemeData = ['애정운', '재물운', '학업운', '월간운세'];
  const update = useStore((state) => state.update);

  return (
    <Link to="/tairo">
      {ThemeData.map((theme) => (
        <ThemeButton key={theme} text={theme} onClick={() => update(theme)} />
      ))}
    </Link>
  );
}

export default ThemeButtonList;
