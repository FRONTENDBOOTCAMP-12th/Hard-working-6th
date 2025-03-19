import { useRef } from 'react';
import { Link, useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { BrandGithub } from '@mynaui/icons-react';
import supabaseClient from '@/utils/SupabaseClient';
import CommonButton from '../Atom/CommonButton';
import InputLogin from '../Atom/InputLogin';

function LoginList() {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const MySwal = withReactContent(Swal);
  const navigate = useNavigate();

  const signInWithOAuth = async () => {
    const { error, data } = await supabaseClient.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: 'https://tairo.netlify.app/home',
      },
    });

    console.log(data, error);
  };

  async function signInWithEmail() {
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    if (!email || !password) {
      MySwal.fire({
        title: <p>이메일과 비밀번호를 입력해주세요.</p>,
        icon: 'warning',
      });
      return;
    }

    const { data, error } = await supabaseClient.auth.signInWithPassword({
      email,
      password,
    });

    if (!error) {
      console.log('성공: ', data);
      navigate('/home');
    } else {
      console.log('실패: ', error);
      MySwal.fire({
        title: <p>정보가 일치하지 않습니다.</p>,
        icon: 'error',
      });
    }
  }

  return (
    <div>
      <div className="space-y-4">
        <InputLogin
          id="email"
          type="email"
          placeholder="ID를 입력해 주세요"
          ref={emailRef}
          defaultValue=""
        />
        <InputLogin
          id="password"
          type="password"
          placeholder="비밀번호를 입력해 주세요"
          ref={passwordRef}
          defaultValue=""
        />
      </div>

      <div className="mt-14 space-y-4">
        <div className="mt-4">
          <CommonButton type="submit" onClick={signInWithEmail}>
            로그인
          </CommonButton>
        </div>

        <CommonButton type="submit" color="bg-black" onClick={signInWithOAuth}>
          <BrandGithub /> Github
        </CommonButton>

        <Link to="/sign-up">
          <CommonButton type="submit" color="bg-gray">
            아직 회원이 아니신가요?
          </CommonButton>
        </Link>
      </div>
    </div>
  );
}

export default LoginList;
