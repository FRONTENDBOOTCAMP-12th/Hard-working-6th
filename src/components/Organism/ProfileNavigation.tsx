const ProfileNavigation = () => {
  return (
    <div className="absolute bottom-0 w-full flex justify-around bg-indigo-800 p-4 text-white">
      <div className="cursor-pointer">홈</div>
      <div className="cursor-pointer">타로</div>
      <div className="cursor-pointer">지난 기록</div>
      <div className="cursor-pointer">내 정보</div>
    </div>
  );
};

export default ProfileNavigation;
