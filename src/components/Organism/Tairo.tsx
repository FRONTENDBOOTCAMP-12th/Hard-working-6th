import CardList from '../Molecule/CardList';
import { useEffect, useState, useRef } from 'react';
import { useStore } from '@/stores/theme';
import { Link } from 'react-router';

function Tairo() {
  const theme = useStore((state) => state.theme);
  const card = useStore((state) => state.card);

  return (
    <div className="">
      <h1>Tairo / {theme}</h1>
      <CardList></CardList>

      <p>카드를 뽑아주세요.</p>
      {/* <h2>{card}</h2> */}
      <Link to="/tairo-result">결과보기</Link>
    </div>
  );
}

export default Tairo;
