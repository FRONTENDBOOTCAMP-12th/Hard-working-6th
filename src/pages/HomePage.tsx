import CommonNav from '@/components/Atom/CommonNav';
import TodayFortune from '../components/Atom/TodayFortune';
import CardSwiper from '../components/Molecule/CardSwiper';
import LogoText from '/src/assets/LogoText.png';
import UserZodiac from '@/components/Atom/UserZodiac';

function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-tr from-bg-gradient2 to-bg-gradient1">
      <div className="p-5 w-full h-full z-40 pb-[110px] relative">
        <h1 className="ml-6 mt-18 mb-20">
          <img src={LogoText} alt="tAIro" />
        </h1>

        <UserZodiac className="absolute top-6 right-11" />

        <TodayFortune className="mb-20" />

        <CardSwiper />
      </div>

      <CommonNav></CommonNav>
    </div>
  );
}

export default HomePage;
