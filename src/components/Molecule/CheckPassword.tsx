import { useState } from 'react';
import InputSignup from '../Atom/InputSignup';

interface CheckPasswordProps {
  password: string;
  passwordConfirm: string;
  onChange: (field: string, value: string) => void;
}

function CheckPassword({
  password,
  passwordConfirm,
  onChange,
}: CheckPasswordProps) {
  const [passwordMessage, setPasswordMessage] = useState('');
  const [passwordConfirmMessage, setPasswordConfirmMessage] = useState('');

  // 비밀번호 유효성 검사
  const validatePassword = (value: string) => {
    if (value.length < 6) return '비밀번호는 6자 이상이어야 합니다.';
    return '';
  };

  const validatePasswordConfirm = (value: string) => {
    if (value !== password) return '비밀번호가 일치하지 않습니다.';
    return '';
  };

  // 비밀번호 입력 변경 핸들러
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    onChange('password', value);
    setPasswordMessage(validatePassword(value));
  };

  // 비밀번호 확인 입력 변경 핸들러
  const handlePasswordConfirmChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    onChange('passwordConfirm', value);
    setPasswordConfirmMessage(validatePasswordConfirm(value));
  };

  return (
    <>
      <div className="relative">
        <InputSignup
          id="password"
          type="password"
          placeholder="비밀번호를 입력해 주세요"
          value={password}
          onChange={handlePasswordChange}
        />
        {passwordMessage && (
          <p className="absolute -bottom-6 text-red text-sm">
            {passwordMessage}
          </p>
        )}
      </div>

      <div className="relative">
        <InputSignup
          id="passwordConfirm"
          type="password"
          placeholder="비밀번호를 한번 더 입력해 주세요"
          value={passwordConfirm}
          onChange={handlePasswordConfirmChange}
        />
        {passwordConfirmMessage && (
          <p className="absolute -bottom-6 text-red text-sm">
            {passwordConfirmMessage}
          </p>
        )}
      </div>
    </>
  );
}

export default CheckPassword;
