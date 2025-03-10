import { tm } from '@/utils/tw-marge';
import cardsData from '@/assets/data/card_data.json';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay, Virtual } from 'swiper/modules';

// import 'swiper/css';
// import 'swiper/css/navigation';
// import 'swiper/css/autoplay';

const test = [1, 2, 3, 4];

interface Card {
  name: string;
  number: string;
  src: string;
  mean: string;
}
interface Cards {
  cards: Card[];
}

const cards: Cards = cardsData;

function CardSwiper() {
  return (
    <section className="flex flex-col items-center justify-center">
      <h2 className="sr-only">타로 카드 보기</h2>

      <Swiper
        modules={[Navigation, Autoplay, Virtual]}
        spaceBetween={50}
        slidesPerView={3}
        onSlideChange={() => console.log('slide change')}
        onSwiper={(swiper) => console.log(swiper)}
        className="w-[300px] bg-blue-950"
      >
        <div
          className={tm(
            'font-playfair text-white',
            'flex flex-col items-center justify-center gap-1',
            'mb-3'
          )}
        >
          <h3 className="text-c-2xl">{cards.cards[7].name}</h3>
          <span className="text-c-lg block">{cards.cards[7].number}</span>
        </div>

        <SwiperSlide>Slide 1</SwiperSlide>
        <SwiperSlide>Slide 2</SwiperSlide>
        <SwiperSlide>Slide 3</SwiperSlide>

        {cards.cards.map((item, index) => {
          <SwiperSlide>
            <img src={item.src} alt="" />
          </SwiperSlide>;
        })}

        {/* {cards.cards.map((card, index): any => {
          console.log('card:', card.src);

          <SwiperSlide key={card.name} virtualIndex={index}>
            <p>{index}</p>;
            <img src={card.src} alt="" />;
          </SwiperSlide>;

          <SwiperSlide key={index}>
            {({ isActive }) => (
              <img
                src={
                  isActive
                    ? '/src/assets/00_the_fool.png'
                    : '/src/assets/tarot_image/card-back.png'
                }
                alt="카드 뒷면 이미지"
              />
            )}
          </SwiperSlide>;
        })} */}
      </Swiper>
    </section>
  );
}

export default CardSwiper;
