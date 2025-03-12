import { useState } from 'react';
import CommonButton from '../Atom/CommonButton';
import InputLogin from '../Atom/InputLogin';
import supabaseClient from '@/utils/SupabaseClient';
import { BrandGithub } from '@mynaui/icons-react';

function LoginList() {
  const [idVal, setIdval] = useState('');
  const [pwVal, setPwval] = useState('');

  console.log(idVal);
  console.log(pwVal);

  async function signInWithEmail() {
    const { data, error } = await supabaseClient.auth.signInWithPassword({
      email: 'valid.email@supabase.io',
      password: 'example-password',
    });
    console.log(data, error);
  }

  return (
    <div>
      <div className="space-y-8">
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
        <button type="button" className="ml-auto text-font ">
          ID/PW가 기억나지 않나요?
        </button>
      </div>
      <div className="space-y-4">
        <CommonButton type={'submit'} color={'bg-gray'}>
          아직 회원이 아니신가요?
        </CommonButton>
        <CommonButton type={'submit'}>로그인</CommonButton>
        <CommonButton type={'submit'} color={'bg-black'}>
          {<BrandGithub />}Github
        </CommonButton>
      </div>
    </div>
  );
}

export default LoginList;
