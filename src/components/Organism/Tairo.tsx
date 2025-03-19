import CardList from '../Molecule/CardList';
import { useStore } from '@/stores/theme';
import { Link } from 'react-router';
import CommonButton from '../Atom/CommonButton';
import { useState } from 'react';

function Tairo() {
  const theme = useStore((state) => state.theme);
  const card = useStore((state) => state.card);

  const [isActive, setIsActive] = useState(false);

  return (
    <div>
      <h2 className="text-white">Tairo / {theme}</h2>

      <div className="flex justify-center items-center mt-15 relative">
        <CardList setIsActive={setIsActive}></CardList>
      </div>

      <section className="absolute bottom-25 w-[calc(100%-40px)] ">
        <Link to="/tairo-theme/result">
          {isActive ? (
            <CommonButton>결과보기</CommonButton>
          ) : (
            <CommonButton disabled>결과보기</CommonButton>
          )}
        </Link>
      </section>
    </div>
  );
}

export default Tairo;
