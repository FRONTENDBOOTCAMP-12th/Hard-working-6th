import CardList from '../Molecule/CardList';
import { useEffect, useState, useRef } from 'react';
import { useStore } from '@/stores/theme';
import { Link } from 'react-router';
import CommonButton from '../Atom/CommonButton';

function Tairo() {
  const theme = useStore((state) => state.theme);
  const card = useStore((state) => state.card);

  return (
    <div>
      <h2 className="">Tairo / {theme}</h2>

      <div className="flex justify-center items-center mt-15 relative">
        <CardList></CardList>
      </div>

      <p className="text-center text-xl mt-8 ">카드를 뽑아주세요.</p>

      <section className="absolute bottom-0 w-[calc(100%-40px)] ">
        <Link to="/tairo-result">
          <CommonButton>결과보기</CommonButton>
        </Link>
      </section>
    </div>
  );
}

export default Tairo;
