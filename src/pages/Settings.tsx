import { useNavigate } from "react-router-dom";

const Settings = () => {
  const navigate = useNavigate();

  // 설정 목록
  const settingsOptions = [
    { label: "비밀번호 변경", path: "/change-password" },
    { label: "지난 기록 삭제", path: "/delete-history" },
    { label: "어플 소개", path: "/about" },
    { label: "로그아웃", path: "/logout" },
    { label: "회원 탈퇴", path: "/delete-account" },
  ];

  return (
    <div className="relative flex flex-col items-center w-full min-h-screen bg-gradient-to-b p-6 text-white">
      {/* 헤더 */}
      <div className="flex items-center w-full px-4">
        {/* 뒤로 가기 버튼 */}
        <button onClick={() => { navigate(-1); }}>
          <img
            src="/assets/icon/chevron-left-white.svg"
            alt="뒤로가기"
            className="w-6 h-6"
          />
        </button>
        <h2 className="flex-grow text-center text-lg font-semibold">설정</h2>
      </div>

      {/* 설정 목록 */}
      <ul className="mt-8 w-full max-w-md space-y-4">
        {settingsOptions.map(({ label, path }) => (
          <li key={path} className="border-b border-white">
            <button
              className="cursor-pointer w-full p-3 text-center text-lg hover:opacity-70"
              onClick={() => { navigate(path); }} 
              tabIndex={0} 
              onKeyDown={(e) => {
                if (e.key === "Enter") navigate(path); 
              }}
            >
              {label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Settings;

