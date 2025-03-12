import { useSwiperSlide } from 'swiper/react';

interface Card {
  name: string;
  number: string;
  src: string;
  mean: string;
}

interface CardItemProps {
  card: Card;
}

function CardItem({ card }: CardItemProps) {
  const { isActive } = useSwiperSlide(); // SwiperSlide 내부에서 isActive 상태 가져오기

  return (
    <img
      src={isActive ? card.src : '/src/assets/tarot-image/card-back.png'}
      alt={isActive ? card.name : '카드 뒷면 이미지'}
    />
  );
}

export default CardItem;
