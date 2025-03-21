import { useState } from 'react';
import Swal from 'sweetalert2';
import supabaseClient from '@/utils/SupabaseClient';
import InputSignup from '../Atom/InputSignup';
import ChipButtonSignup from '../Atom/ChipButtonSignup';

interface CheckEmailProps {
  email: string;
  onChange: (field: string, value: string) => void;
  onEmailCheck: (isChecked: boolean) => void; // 중복 확인 상태를 상위 컴포넌트에서 관리
}

function CheckEmail({ email, onChange, onEmailCheck }: CheckEmailProps) {
  const [emailMessage, setEmailMessage] = useState('');

  const validateEmail = (value: string) => {
    if (!value) return '이메일을 입력하세요.';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) return '올바른 이메일 형식이 아닙니다.';
    return '';
  };

  // 이메일 입력값 변경 핸들러
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    onChange('email', value);
    setEmailMessage(validateEmail(value));

    // 이메일이 변경되면 중복 확인 상태를 리셋
    onEmailCheck(false);
  };

  // 이메일 중복 확인 함수
  const checkEmailDuplicate = async () => {
    if (!email || emailMessage) {
      Swal.fire('오류', '올바른 이메일을 입력해주세요.', 'error');
      return;
    }

    try {
      const { data, error } = await supabaseClient
        .from('profiles')
        .select('email')
        .eq('email', email);

      if (error) throw error;

      if (data.length > 0) {
        Swal.fire('중복됨', '이미 사용 중인 이메일입니다.', 'warning');
        onEmailCheck(false);
      } else {
        Swal.fire('사용 가능', '사용 가능한 이메일입니다!', 'success');
        onEmailCheck(true);
      }
    } catch (error) {
      console.error('중복 확인 오류:', error);
      Swal.fire('오류', '이메일 확인 중 문제가 발생했습니다.', 'error');
    }
  };

  return (
    <div className="flex gap-4 items-center justify-between">
      <div className="w-full relative">
        <InputSignup
          id="email"
          type="email"
          value={email}
          placeholder="ID를 입력해 주세요"
          onChange={handleChange}
        />
        {emailMessage && (
          <p className="absolute -bottom-6 text-red text-sm" aria-live="polite">
            {emailMessage}
          </p>
        )}
      </div>
      <ChipButtonSignup onClick={checkEmailDuplicate}>
        중복확인
      </ChipButtonSignup>
    </div>
  );
}

export default CheckEmail;
