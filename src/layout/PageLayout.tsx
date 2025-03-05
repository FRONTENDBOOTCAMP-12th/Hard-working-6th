import CommonHeader from '@/components/Atom/CommonHeader';
import { Outlet } from 'react-router';

function pageLayout() {
  return (
    <>
      <CommonHeader></CommonHeader>
      <div className="p-5">
        <Outlet></Outlet>
      </div>
    </>
  );
}

export default pageLayout;
