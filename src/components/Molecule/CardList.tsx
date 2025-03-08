import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import cardData from '../../assets/data/card_data.json';
import { tm } from '@/utils/tw-marge';
import { useStore } from '@/stores/theme';

function CardList() {
  const [activeCardIndex, setActiveCardIndex] = useState<number | null>(null);
  const updateCard = useStore((state) => state.updateCard);

  // 파생상태
  /*
     - 초기 애니메이션을 위해 각각의 카드당 딜레이를 줬는데 active 애니메이션까지 영향을 미침
     - 그래서 이전 액티브 상태까지 저장하고 active와 prevActive 상태의 애니메이션을 다르게 적용
  */

  const prevActiveIndex = useRef<number | null>(null);

  useEffect(() => {
    prevActiveIndex.current = activeCardIndex;

    // console.log('이전 상태:', prevActiveIndex.current);
  }, [activeCardIndex]);

  const handleCardClick = (index: number) => {
    // 선택한 인덱스 카드 active
    setActiveCardIndex(index);

    const randomVal = Math.floor(Math.random() * 20);

    const card = cardData.cards[randomVal].name;
    console.log('선택한 카드:', card);
    console.log('선택한 카드 인덱스:', randomVal);

    updateCard(card);
  };

  const cards = Array.from({ length: 22 }, (_, i) => i);
  const radius = 10; // 카드 반지름

  return (
    <article className=" flex justify-center items-center transform rotate-z-5 w-50 h-50 top-0 left-0">
      <ul className="relative w-full h-[25vh] ">
        {cards.map((card, index) => {
          const angle = (index - cards.length / 2) * 9; // 카드 회전 각도 조정
          const x = Math.sin((angle * Math.PI) / 180) * radius * 3; // 카드 x축 위치 조정
          const y = -Math.cos((angle * Math.PI) / 180) * radius * 0.3; // 카드 y축 위치 조정

          // 해당 아이템이 active 상태인지 확인
          const isActive = activeCardIndex === index;
          const wasActive = prevActiveIndex.current === index;

          //  active 상태일 때 x, y 좌표
          const activeX = 20;
          const activeY = 200;

          return (
            <motion.li
              key={card}
              className={tm(
                'absolute',
                'left-1/2',
                'transform -translate-x-1/2',
                " bg-[url('/src/assets/tarot-image/card-back.png')]",
                'bg-cover',
                'shadow-md',
                'w-20',
                'h-35',
                'flex',
                'justify-center',
                'items-center',
                'text-black',
                'font-bold',
                'rounded-md',
                'origin-bottom',
                'hover:cursor-pointer',
                isActive ? 'active-card' : ''
                // active
              )}
              initial={{ rotate: 0, opacity: 0, y: 150 }}
              animate={{
                // active 상태면 회전 제거
                rotate: isActive ? -6 : angle,
                opacity: 1,
                // active 상태에 따라 x,y 좌표 변경
                x: isActive ? activeX : x,
                y: isActive ? activeY : y,
                ease: 'ease',
              }}
              transition={{
                ...(wasActive || isActive
                  ? // active
                    { duration: 0.4, delay: 0 }
                  : // 초기 펼쳐짐
                    { duration: 0.5, delay: index * 0.02 }),
              }}
              whileHover={{
                ...(!isActive && {
                  x: x + Math.sin((angle * Math.PI) / 180) * radius * 3,
                  y: y - Math.cos((angle * Math.PI) / 180) * 30,
                  transition: { duration: 0.1 },
                }),
              }}
              onClick={() => handleCardClick(index)}
            ></motion.li>
          );
        })}
      </ul>
    </article>
  );
}

export default CardList;
