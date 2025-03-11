import { useState } from 'react';
import ChipButtonSignup from '../Atom/ChipButtonSignup';
import InputSignup from '../Atom/InputSignup';
import CommonButton from '../Atom/CommonButton';
import supabaseClient from '@/utils/SupabaseClient';

function SignUpList() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [emailMessage, setEmailMessage] = useState('');
  const [passwordMessage, setPasswordMessage] = useState('');
  const [passwordConfirmMessage, setPasswordConfirmMessage] = useState('');
  const [globalMessage, setGlobalMessage] = useState('');

  // 유효성 검사 함수
  const validateEmail = (value) => {
    if (!value) return '이메일을 입력하세요.';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) return '올바른 이메일 형식이 아닙니다.';
    return '';
  };

  const validatePassword = (value) => {
    if (!value) return '비밀번호를 입력하세요.';
    if (value.length < 6) return '비밀번호는 6자 이상이어야 합니다.';
    return '';
  };

  const validatePasswordConfirm = (value) => {
    if (!value) return '비밀번호 확인을 입력하세요.';
    if (value !== password) return '비밀번호가 일치하지 않습니다.';
    return '';
  };

  // 입력 값 변경 시 즉시 유효성 검사
  const handleChange = (e) => {
    const { id, value } = e.target;

    if (id === 'email') {
      setEmail(value);
      setEmailMessage(validateEmail(value));
    }
    if (id === 'password') {
      setPassword(value);
      setPasswordMessage(validatePassword(value));
    }
    if (id === 'passwordConfirm') {
      setPasswordConfirm(value);
      setPasswordConfirmMessage(validatePasswordConfirm(value));
    }

    console.log(`${id} 입력:`, value);
  };

  // 회원가입 버튼 클릭 시 최종 유효성 검사 및 회원가입 요청
  const handleSignUp = async () => {
    setGlobalMessage('');

    if (emailMessage || passwordMessage || passwordConfirmMessage) {
      setGlobalMessage('입력값을 확인해 주세요.');
      return;
    }

    const { data, error } = await supabaseClient.auth.signUp({
      email,
      password,
    });

    if (error) {
      setGlobalMessage(`회원가입 실패: ${error.message}`);
    } else {
      setGlobalMessage('회원가입 성공! 이메일을 확인하세요.');
      console.log('회원가입 성공:', data);
    }
  };

  return (
    <>
      <div className="space-y-8 mb-5">
        <div className="flex gap-4 items-center justify-between">
          <div className="w-full relative">
            <InputSignup
              id="email"
              type="email"
              placeholder="ID를 입력해 주세요"
              value={email}
              onChange={handleChange}
            />
            {emailMessage && (
              <p className="absolute -bottom-6 text-red text-sm">
                {emailMessage}
              </p>
            )}
          </div>
          <ChipButtonSignup>중복확인</ChipButtonSignup>
        </div>

        <div className="relative">
          <InputSignup
            id="password"
            type="password"
            placeholder="비밀번호를 입력해 주세요"
            value={password}
            onChange={handleChange}
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
            onChange={handleChange}
          />
          {passwordConfirmMessage && (
            <p className="absolute -bottom-6 text-red text-sm">
              {passwordConfirmMessage}
            </p>
          )}
        </div>

        <InputSignup id="name" type="text" placeholder="이름을 입력해 주세요" />
      </div>

      <CommonButton onClick={handleSignUp}>회원가입</CommonButton>

      {/* 회원가입 성공/실패 */}
      {globalMessage && (
        <p className="text-red-500 text-center mt-3">{globalMessage}</p>
      )}
    </>
  );
}

export default SignUpList;
