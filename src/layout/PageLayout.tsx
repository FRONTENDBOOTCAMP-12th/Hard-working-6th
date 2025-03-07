import CommonHeader from '@/components/Atom/CommonHeader';
import { Outlet } from 'react-router';

function pageLayout() {
  return (
    <>
      <CommonHeader></CommonHeader>
      <div className="p-5 overflow-hidden w-full h-screen">
        <Outlet></Outlet>
      </div>
    </>
  );
}

export default pageLayout;
