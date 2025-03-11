import CommonHeader from '@/components/Atom/CommonHeader';
import { Outlet } from 'react-router';
import CommonNav from '../components/Atom/CommonNav';

//bg-[url(/src/assets/bg5.png)] bg-cover

function pageLayout() {
  return (
    <div className="min-h-screen bg-gradient-to-tr from-bg-gradient2 to-bg-gradient1">
      <CommonHeader></CommonHeader>
      <div className="p-5 w-full h-full -z-40 pb-[110px]">
        <Outlet></Outlet>
      </div>
      <CommonNav></CommonNav>
    </div>
  );
}

export default pageLayout;
