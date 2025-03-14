import CommonHeader from '@/components/Atom/CommonHeader';
import { Outlet, useLocation } from 'react-router';
import CommonNav from '../components/Atom/CommonNav';

function PageLayout() {
  const location = useLocation();

  const getHeaderText = (pathname: string) => {
    switch (pathname) {
      case '/tairo-theme':
        return '운세 선택';
      case '/tairo-theme/tairo':
        return '카드 뽑기';
      case '/tairo-theme/result':
        return '운세 결과';
      case '/tairo-history':
        return '기록';
      case '/profile':
        return '프로필';
      default:
        return 'title';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-bg-gradient2 to-bg-gradient1">
      <CommonHeader text={getHeaderText(location.pathname)}></CommonHeader>
      <div className="p-5 w-full h-full -z-40 pb-[110px]">
        <Outlet></Outlet>
      </div>
      <CommonNav></CommonNav>
    </div>
  );
}

export default PageLayout;
