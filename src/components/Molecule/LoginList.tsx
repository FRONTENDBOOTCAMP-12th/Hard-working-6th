import { useState } from 'react';
import CommonButton from '../Atom/CommonButton';
import InputLogin from '../Atom/InputLogin';
import supabaseClient from '@/utils/SupabaseClient';
import { BrandGithub } from '@mynaui/icons-react';
import { Link } from 'react-router';

function LoginList() {
  const [idVal, setIdval] = useState('');
  const [pwVal, setPwval] = useState('');

  console.log(idVal);
  console.log(pwVal);

  async function signInWithEmail() {
    const { data, error } = await supabaseClient.auth.signInWithPassword({
      email: `${idVal}`,
      password: `${pwVal}`,
    });

    if (!error) {
      console.log('성공: ', data, error);
      window.location.href = '/home';
    } else if (error) {
      console.log('실패: ', data, error);
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

        <CommonButton type={'submit'} onClick={signInWithEmail}>
          로그인
        </CommonButton>

        <CommonButton type={'submit'} color={'bg-black'}>
          {<BrandGithub />}Github
        </CommonButton>
      </div>
    </div>
  );
}

export default LoginList;
