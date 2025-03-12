import { tm } from '@/utils/tw-marge';
import cardsData from '@/assets/data/card_data.json';
import CardItem from '../Atom/CardSlideItem';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay, Virtual } from 'swiper/modules';
// import { useSwiperSlide } from 'swiper/react';

// import 'swiper/swiper.css';
import 'swiper/css';
// import 'swiper/css/autoplay';
// import 'swiper/css/navigation';

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
        modules={[Navigation, Autoplay, Virtual]}
        spaceBetween={-170}
        slidesPerView={2}
        initialSlide={1}
        centeredSlides={true}
        autoplay={{ delay: 4000 }}
        loop={true}
        loopAdditionalSlides={1}
        scrollbar={{ draggable: true }}
        // onSlideChange={() => console.log('slide change')}
        onSwiper={(swiper) => console.log(swiper)}
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
