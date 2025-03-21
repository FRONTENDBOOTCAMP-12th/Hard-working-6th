import { useRef } from "react";
import supabaseClient from '@/utils/SupabaseClient';
import { useEffect, useId, useState } from 'react';

interface AvatarSelectorProps {
  onSelect: (newAvatar: string) => void;
  onClose?: () => void;
}

const AvatarSelector = ({url, size, onUpload }) => {
  // const fileInputRef = useRef<HTMLInputElement>(null);

  // // 🔹 사용자가 갤러리에서 이미지를 선택하는 경우
  // const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = event.target.files?.[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       if (reader.result && typeof reader.result === "string") {
  //         onSelect(reader.result); // ✅ Base64 변환된 이미지 전달
  //         if (onClose) onClose(); // ✅ 모달 닫기
  //       }
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // };
  const id = useId();
  const [avatarUrl, setAvatarUrl] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    const downloadImage = async (path: string) => {
      try {
        const { data, error } = await supabaseClient.storage
          .from('avatars')
          .download(path);
          console.log('path: ', path)

        if (error) {
          throw error;
        }

        const url = URL.createObjectURL(data);
        setAvatarUrl(url);
        console.log('url', url)
      } catch (error) {
        console.error(`이미지 다운로드 오류 발생! ${(error as Error).message}`);
      }
    };

    if (url) {
      downloadImage(url);
    }
  }, [url]);

  const uploadAvatar = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setIsUploading(true);

      const { files } = e.currentTarget;

      if (!files || files.length === 0) {
        throw new Error('업로드할 이미지를 선택해야 합니다.');
      }

      const [file] = files;
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabaseClient.storage
        .from('avatars')
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      onUpload(filePath);
      setIsUploading(false);
    } catch (error) {
      console.error((error as Error).message);
    }
  };


  return (
    <div>
      {
        <img
          src={avatarUrl}
          alt="아바타"
          className="avatar image"
          style={{ height: size, width: size }}
        />
       
      }
      <div style={{ width: size }}>
        <label htmlFor={id} className="button primary block">
          {isUploading ? '업로드 중...' : '업로드'}
        </label>
        <input
          id={id}
          type="file"
          accept="image/*"
          onChange={uploadAvatar}
          aria-disabled={isUploading}
          style={{ visibility: 'hidden', position: 'absolute' }}
        />
      </div>
    </div>
    // <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
    //   <div className="bg-white p-6 rounded-lg shadow-lg w-96">
    //     <h2 className="text-lg font-semibold mb-4 text-center">프로필 사진 선택</h2>

    //     {/* 🔹 기본 아바타 선택 */}
    //     <div className="flex justify-around">
    //       {avatars.map((avatar) => (
    //         <button
    //           key={avatar}
    //           type="button"
    //           onClick={() => {
    //             onSelect(avatar);
    //             if (onClose) onClose();
    //           }}
    //         >
    //           <img
    //             src={avatar}
    //             alt="Avatar Option"
    //             className="w-16 h-16 rounded-full border-2 cursor-pointer hover:border-indigo-500"
    //           />
    //         </button>
    //       ))}
    //     </div>

    //     {/* 🔹 갤러리에서 사진 업로드 */}
    //     <div className="mt-4 flex justify-center">
    //       <button
    //         className="px-4 py-2 bg-blue-500 text-white rounded-lg"
    //         onClick={() => fileInputRef.current?.click()}
    //       >
    //         갤러리에서 선택
    //       </button>
    //       <input
    //         type="file"
    //         accept="image/*"
    //         ref={fileInputRef}
    //         className="hidden"
    //         onChange={handleFileChange}
    //       />
    //     </div>

    //     {/* 🔹 취소 버튼 */}
    //     <div className="mt-4 flex justify-center">
    //       <button
    //         className="px-4 py-2 bg-gray-300 rounded-lg"
    //         onClick={onClose}
    //       >
    //         취소
    //       </button>
    //     </div>
    //   </div>
    // </div>
  );
};

export default AvatarSelector;
