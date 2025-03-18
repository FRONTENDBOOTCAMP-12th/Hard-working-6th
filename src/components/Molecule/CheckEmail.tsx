import { useState } from 'react';
import InputSignup from '../Atom/InputSignup';
import ChipButtonSignup from '../Atom/ChipButtonSignup';

interface CheckEmailProps {
  email: string;
  onChange: (field: string, value: string) => void;
}

function CheckEmail({ email, onChange }: CheckEmailProps) {
  const [emailMessage, setEmailMessage] = useState('');

  const validateEmail = (value: string) => {
    if (!value) return '이메일을 입력하세요.';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) return '올바른 이메일 형식이 아닙니다.';
    return '';
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    onChange('email', value);
    setEmailMessage(validateEmail(value));
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
          <p className="absolute -bottom-6 text-red text-sm">{emailMessage}</p>
        )}
      </div>
      <ChipButtonSignup
        onClick={() => {
          console.log('test');
        }}
      >
        중복확인
      </ChipButtonSignup>
    </div>
  );
}

export default CheckEmail;
