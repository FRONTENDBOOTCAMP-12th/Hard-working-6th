import cardsData from '@/assets/data/card_data.json';
import CardItem from '../Atom/CardSlideItem';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay, EffectCards } from 'swiper/modules';
import 'swiper/css';
import { EffectCoverflow } from 'swiper/modules';

// 카드 데이터 타입
interface Card {
  name: string;
  number: string;
  src: string;
  mean: string;
}
interface Cards {
  cards: Card[];
}

// 카드 데이터 가져오기
const cards: Cards = cardsData;

function CardSwiper() {
  return (
    <section className="flex flex-col items-center justify-center">
      <h2 className="sr-only">타로 카드 보기</h2>

      <Swiper
        loop={true}
        centeredSlides={true}
        slidesPerView={2}
        loopAdditionalSlides={1}
        slideToClickedSlide={true}
        autoplay={{ delay: 3000 }}
        effect="coverflow"
        coverflowEffect={{
          rotate: 0,
          slideShadows: false,
          stretch: 70,
        }}
        modules={[EffectCoverflow, Autoplay]}
        className="card-swiper"
      >
        {cards?.cards.map((card: Card, index: number) => {
          return (
            <SwiperSlide key={index}>
              <div className="tit">
                <h3>{card.name}</h3>
                <span>{card.number}</span>
              </div>

              <CardItem card={card} />

              <p>{card.mean}</p>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </section>
  );
}

export default CardSwiper;
