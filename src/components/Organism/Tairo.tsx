import CardList from '../Molecule/CardList';
import { useStore } from '@/stores/theme';
import { Link } from 'react-router';
import CommonButton from '../Atom/CommonButton';

function Tairo() {
  const theme = useStore((state) => state.theme);
  const card = useStore((state) => state.card);

  return (
    <div>
      <h2 className="text-white">Tairo / {theme}</h2>

      <div className="flex justify-center items-center mt-15 relative">
        <CardList></CardList>
      </div>

      <section className="absolute bottom-25 w-[calc(100%-40px)] ">
        <Link to="/tairo-theme/result">
          <CommonButton>결과보기</CommonButton>
        </Link>
      </section>
    </div>
  );
}

export default Tairo;
