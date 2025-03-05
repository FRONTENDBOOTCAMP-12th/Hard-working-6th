import { motion } from 'motion/react';
import cardData from '../../assets/data/card_data.json';
import { tm } from '@/utils/tw-marge';

interface CardListProps {
  setCard: (card: string) => void;
}

function CardList({ setCard }: CardListProps) {
  const cards = Array.from({ length: 22 }, (_, i) => i);
  const radius = 10; // 카드 반지름

  // 아무거나 랜덤 출력
  const handleCardClick = () => {
    const randomVal = Math.floor(Math.random() * 20);

    const card = cardData.cards[randomVal].name;
    setCard(card);
    // console.log(card);
    // console.log(card);
  };

  return (
    <article className="fixed -z-20 flex justify-center items-center transform rotate-z-5  w-screen h-screen top-0 left-0">
      <ul className="relative w-full h-[25vh] ">
        {cards.map((card, index) => {
          const angle = (index - cards.length / 2) * 9; // 카드 회전 각도 조정
          const x = Math.sin((angle * Math.PI) / 180) * radius * 3; // 카드 x축 위치 조정
          const y = -Math.cos((angle * Math.PI) / 180) * radius * 0.3; // 카드 y축 위치 조정

          return (
            <motion.li
              key={card}
              className={tm(
                'absolute',
                'left-1/2',
                'transform -translate-x-1/2',
                " bg-[url('/src/assets/tarot_image/card-back.png')]",
                'bg-cover',
                'shadow-md',
                ' w-30',
                'h-53',
                'flex',
                'justify-center',
                'items-center',
                'text-black',
                'font-bold',
                'rounded-md',
                'origin-bottom',
                'hover:cursor-pointer'
              )}
              initial={{ rotate: 0, opacity: 0, y: 250 }}
              animate={{ rotate: angle, opacity: 1, x: x, y: y }}
              transition={{ delay: index * 0.02, duration: 0.5 }}
              whileHover={{
                x: x + Math.sin((angle * Math.PI) / 180) * radius * 3, // 카드 회전 각도에 따른 x 변화
                y: y - Math.cos((angle * Math.PI) / 180) * 30, // 카드 회전 각도에 따른 y 변화
                transition: { duration: 0.1 },
              }}
              onClick={() => {
                handleCardClick();
              }}
            ></motion.li>
          );
        })}
      </ul>
    </article>
  );
}

export default CardList;
