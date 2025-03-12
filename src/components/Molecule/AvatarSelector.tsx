interface AvatarSelectorProps {
  onSelect: (newAvatar: string) => void;
  onClose?: () => void;
}

const AvatarSelector = ({ onSelect, onClose }: AvatarSelectorProps) => {
  const avatars = [
    '/src/assets/avatar1.svg',
    '/src/assets/avatar2.svg',
    '/src/assets/avatar3.svg',
  ];

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-lg font-semibold mb-4 text-center">
          프로필 사진 선택
        </h2>

        <div className="flex justify-around">
          {avatars.map((avatar) => (
            <img
              key={avatar}
              src={avatar}
              alt="Avatar Option"
              className="w-16 h-16 rounded-full border-2 cursor-pointer hover:border-indigo-500"
              onClick={() => {
                onSelect(avatar); // ✅ 선택한 아바타 변경
                if (onClose) onClose(); // ✅ 모달 닫기
              }}
            />
          ))}
        </div>

        <div className="mt-4 flex justify-between">
          <button
            className="px-4 py-2 bg-gray-300 rounded-lg"
            onClick={onClose}
          >
            취소
          </button>
        </div>
      </div>
    </div>
  );
};

export default AvatarSelector;
