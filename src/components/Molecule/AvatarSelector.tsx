import supabaseClient from '@/utils/SupabaseClient';
import { editProfile } from '@/utils/supabaseProfile';
import { useEffect, useId, useState } from 'react';

interface AvatarSelectorProps {
  url?: string; // 현재 아바타 URL 또는 경로
  size: number; // 아바타 크기
  onUpload: (filePath: string) => void; // 업로드 후 콜백
  onClose?: () => void; // 닫기 콜백 (옵션)
}

const AvatarSelector = ({
  url,
  size,
  onUpload,
  onClose,
}: AvatarSelectorProps) => {
  const id = useId();
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    if (!url) return;

    // URL이 이미 완전한 URL인지 확인
    if (
      url.startsWith('http') ||
      url.startsWith('blob') ||
      url.startsWith('data:')
    ) {
      setAvatarUrl(url);
      return;
    }

    // Supabase 스토리지 경로인 경우 다운로드
    const downloadImage = async (path: string) => {
      console.log('실행');

      try {
        const { data, error } = await supabaseClient.storage
          .from('avatars')
          .download(path);

        if (error) {
          console.error('이미지 다운로드 오류:', error);
          return;
        }

        if (data) {
          console.log(data);

          const objectUrl = URL.createObjectURL(data);
          setAvatarUrl(objectUrl);

          // 컴포넌트 언마운트 시 URL 해제를 위한 클린업 함수
          return () => URL.revokeObjectURL(objectUrl);
        }
      } catch (error) {
        console.error(`이미지 다운로드 오류 발생! ${(error as Error).message}`);
      }
    };

    downloadImage(url);
  }, [url]);

  useEffect(() => {
    void (async () => {
      const { data, error } = await supabaseClient.auth.getUser();
      console.log(data);
      if (error) {
        console.error('에러 발생: ', error);
      } else {
        setUserId(data.user?.id);
        console.log(userId);
      }
    })();
  }, []);

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

      editProfile({
        id: userId,
        avatar_url: filePath,
      });

      onUpload(filePath);
    } catch (error) {
      console.error((error as Error).message);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="flex flex-col items-center">
      {avatarUrl ? (
        <img
          src={avatarUrl}
          alt="아바타"
          className="avatar image rounded-full"
          style={{ height: size, width: size }}
        />
      ) : (
        <div
          className="avatar no-image bg-gray-200 rounded-full flex items-center justify-center"
          style={{ height: size, width: size }}
        >
          <span className="text-gray-500">이미지 없음</span>
        </div>
      )}

      <div className="mt-4 relative" style={{ width: size }}>
        <label
          htmlFor={id}
          className="absolute bottom-2 right-2 bg-white p-2 rounded-full shadow-lg cursor-pointer"
        >
          <img src="/src/assets/icon/pencil.svg" alt="편집하기" />
        </label>
        <input
          id={id}
          type="file"
          accept="image/*"
          onChange={uploadAvatar}
          disabled={isUploading}
          style={{ visibility: 'hidden', position: 'absolute' }}
        />
      </div>

      {onClose && (
        <button
          onClick={onClose}
          className="mt-2 py-2 px-4 bg-gray-300 rounded text-gray-700"
        >
          취소
        </button>
      )}
    </div>
  );
};

export default AvatarSelector;
