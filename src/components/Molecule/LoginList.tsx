import { useState } from 'react';
import CommonButton from '../Atom/CommonButton';
import InputLogin from '../Atom/InputLogin';
import supabaseClient from '@/utils/SupabaseClient';
import { BrandGithub } from '@mynaui/icons-react';
import { Link, useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

function LoginList() {
  const [idVal, setIdval] = useState('');
  const [pwVal, setPwval] = useState('');

  console.log(idVal);
  console.log(pwVal);

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
    const { data, error } = await supabaseClient.auth.signInWithPassword({
      email: `${idVal}`,
      password: `${pwVal}`,
    });

    if (!error) {
      console.log('성공: ', data, error);
      navigate('/home');
    } else if (error) {
      console.log('실패: ', data, error);
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
          // value={email}
          onChange={setIdval}
        />
        <InputLogin
          id="password"
          type="password"
          placeholder="비밀번호를 입력해 주세요"
          // value={password}
          onChange={setPwval}
        />
        {/* <button type="button" className="ml-auto text-font ">
          ID/PW가 기억나지 않나요?
        </button> */}
      </div>
      <div className="mt-14 space-y-4">
        <Link to="/sign-up">
          <CommonButton type={'submit'} color={'bg-gray'}>
            아직 회원이 아니신가요?
          </CommonButton>
        </Link>

        <div className="mt-4">
          <CommonButton type={'submit'} onClick={signInWithEmail}>
            로그인
          </CommonButton>
        </div>

        <CommonButton
          type={'submit'}
          color={'bg-black'}
          onClick={signInWithOAuth}
        >
          {<BrandGithub />}Github
        </CommonButton>
      </div>
    </div>
  );
}

export default LoginList;
