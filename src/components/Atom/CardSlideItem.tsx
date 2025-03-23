import { useSwiperSlide } from 'swiper/react';
import { motion } from 'motion/react';
import cardBack from '@/assets/tarot-image/card-back.png';

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
  const { isActive } = useSwiperSlide();

  return (
    <motion.div
      className="card-img-wrapper"
      initial={{ y: 0, scale: 1, opacity: 0.8 }}
      animate={{
        y: isActive ? -30 : 0,
        scale: isActive ? 1.1 : 1,
        opacity: isActive ? 1 : 0.8,
      }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
    >
      <motion.img
        src={isActive ? card.src : cardBack}
        alt={isActive ? card.name : '카드 뒷면 이미지'}
        initial={{ opacity: 0 }} // 처음엔 투명한 상태
        animate={{ opacity: 1 }} // 나타나는 효과
        exit={{ opacity: 0 }} // 사라지는 효과
        transition={{ duration: 0.2 }} // 부드러운 전환
      />
    </motion.div>
  );
}

export default CardItem;
