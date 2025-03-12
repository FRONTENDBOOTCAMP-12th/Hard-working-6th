import cardsData from '@/assets/data/card_data.json';
import CardItem from '../Atom/CardSlideItem';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay, EffectCards } from 'swiper/modules';
import 'swiper/css';

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
        modules={[Navigation, Autoplay, EffectCards]}
        spaceBetween={-170}
        slidesPerView={2}
        slidesPerGroup={1}
        initialSlide={1}
        centeredSlides={true}
        autoplay={{ delay: 3000 }}
        speed={500}
        loop={true}
        loopAdditionalSlides={1}
        longSwipes={false}
        longSwipesRatio={0.1}
        // onBeforeSlideChangeStart={}
        // scrollbar={{ draggable: true }}
        // slideToClickedSlide={true}
        // effect={'cards'}
        // grabCursor={true}
        touchRatio={1}
        resistance={false}
        // resistanceRatio={2}
        // watchSlidesProgress={true}ㄴ
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
