import CommonHeader from '@/components/Atom/CommonHeader';
import { Outlet } from 'react-router';
import CommonNav from '../components/Atom/CommonNav';

//bg-[url(/src/assets/bg5.png)] bg-cover

function pageLayout() {
  return (
    <div className="h-[calc(100vh-110px)] mb-24">
      <CommonHeader></CommonHeader>
      <div className="p-5 overflow-hidden w-full min-h-[calc(100vh-110px)]">
        <Outlet></Outlet>
      </div>
      <CommonNav></CommonNav>
    </div>
  );
}

export default pageLayout;
