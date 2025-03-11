import { tm } from '@/utils/tw-marge';
import cardsData from '@/assets/data/card_data.json';
import CardItem from '../Atom/CardSlideItem';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay, Virtual } from 'swiper/modules';
import { useSwiperSlide } from 'swiper/react';

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
  // const { isActive } = useSwiperSlide();

  // console.log(isActive);

  return (
    <section className="flex flex-col items-center justify-center">
      <h2 className="sr-only">타로 카드 보기</h2>

      <Swiper
        modules={[Navigation, Autoplay, Virtual]}
        spaceBetween={-130}
        slidesPerView={2}
        initialSlide={1}
        centeredSlides={true}
        autoplay={{ delay: 4000 }}
        loop={true}
        loopAdditionalSlides={1}
        scrollbar={{ draggable: true }}
        // onSlideChange={() => console.log('slide change')}
        onSwiper={(swiper) => console.log(swiper)}
        className="w-[340px] h-[370px] bg-blue-950"
        // virtual
      >
        {cards.cards.map((card: Card, index: number) => {
          return (
            <SwiperSlide
              key={index}
              className="justify-items-center h-full pt-30 relative"
            >
              {({ isActive }) => (
                <>
                  <div
                    className={
                      isActive
                        ? 'block absolute top-[2px] left-[50%] translate-x-[-50%] duration-200 ease-in-out z-20'
                        : 'hidden'
                    }
                  >
                    <div
                      className={tm(
                        'font-playfair text-white',
                        'flex flex-col items-center justify-center gap-1'
                      )}
                    >
                      <h3 className="text-c-xl whitespace-nowrap">
                        {card.name}
                      </h3>
                      <span className="text-c-lg block">{card.number}</span>
                    </div>
                  </div>

                  <CardItem card={card} isActiveProp={isActive} />

                  <p
                    className={
                      isActive
                        ? 'block absolute bottom-0 left-[50%] translate-x-[-50%] duration-200 ease-in-out z-20 text-white whitespace-nowrap'
                        : 'hidden'
                    }
                  >
                    {card.mean}
                  </p>
                </>
              )}
            </SwiperSlide>
          );
        })}
      </Swiper>
    </section>
  );
}

export default CardSwiper;
