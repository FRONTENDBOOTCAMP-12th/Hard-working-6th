import CommonNav from '@/components/Atom/CommonNav';
import TodayFortune from '../components/Atom/TodayFortune';
import CardSwiper from '../components/Molecule/CardSwiper';
import LogoText from '/assets/Logo-text.svg';
import UserZodiacSign from '@/components/Atom/UserZodiacSign';

function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-tr from-bg-gradient2 to-bg-gradient1">
      <div className="p-5 w-full h-full z-40 pb-[110px] relative">
        <h1 className="ml-6 mt-18 mb-20">
          <img src={LogoText} alt="tAIro" />
        </h1>

        <UserZodiacSign className="absolute top-18 right-11" />

        <TodayFortune className="mb-20" />

        <CardSwiper />
      </div>

      <CommonNav></CommonNav>
    </div>
  );
}

export default HomePage;
