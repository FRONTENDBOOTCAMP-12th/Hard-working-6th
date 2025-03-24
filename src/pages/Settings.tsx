import { useRef } from 'react';
import { useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import supabaseClient from '@/utils/SupabaseClient';

function Setting() {
  const navigate = useNavigate();
  const currentPwRef = useRef<HTMLInputElement>(null);
  const newPwRef = useRef<HTMLInputElement>(null);
  const confirmPwRef = useRef<HTMLInputElement>(null);
  const MySwal = withReactContent(Swal);

  const handlePasswordChange = async () => {
    const currentPassword = currentPwRef.current?.value;
    const newPassword = newPwRef.current?.value;
    const confirmPassword = confirmPwRef.current?.value;

    const {
      data: { user },
      error: userError,
    } = await supabaseClient.auth.getUser();

    if (!user || userError) {
      MySwal.fire('실패', '사용자 정보를 가져올 수 없습니다.', 'error');
      return;
    }

    if (!currentPassword || !newPassword || !confirmPassword) {
      MySwal.fire('⚠️', '모든 항목을 입력해주세요.', 'warning');
      return;
    }

    if (newPassword !== confirmPassword) {
      MySwal.fire('❌', '새 비밀번호가 일치하지 않습니다.', 'error');
      return;
    }

    const { error: signInError } = await supabaseClient.auth.signInWithPassword(
      {
        email: user.email!,
        password: currentPassword,
      }
    );

    if (signInError) {
      MySwal.fire('❌', '현재 비밀번호가 올바르지 않습니다.', 'error');
      return;
    }

    const { error: updateError } = await supabaseClient.auth.updateUser({
      password: newPassword,
    });

    if (updateError) {
      console.error('비밀번호 변경 실패:', updateError);
      MySwal.fire('실패', '비밀번호 변경에 실패했습니다.', 'error');
    } else {
      MySwal.fire('완료', '비밀번호가 변경되었습니다.', 'success');
      currentPwRef.current!.value = '';
      newPwRef.current!.value = '';
      confirmPwRef.current!.value = '';
    }
  };

  const handleLogout = async () => {
    const { error } = await supabaseClient.auth.signOut();
    if (!error) {
      navigate('/');
    } else {
      console.error('로그아웃 오류:', error.message);
    }
  };

  return (
    <div>
      <h1 className="sr-only">Settings</h1>

      <Accordion type="single" collapsible className="text-white">
        <AccordionItem value="item-1">
          <AccordionTrigger>비밀번호 변경</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-3">
              <input
                type="password"
                placeholder="현재 비밀번호"
                ref={currentPwRef}
                className="w-full px-4 py-2 rounded-md bg-transparent border border-white/20 text-white placeholder-white/50"
              />
              <input
                type="password"
                placeholder="새 비밀번호"
                ref={newPwRef}
                className="w-full px-4 py-2 rounded-md bg-transparent border border-white/20 text-white placeholder-white/50"
              />
              <input
                type="password"
                placeholder="새 비밀번호 확인"
                ref={confirmPwRef}
                className="w-full px-4 py-2 rounded-md bg-transparent border border-white/20 text-white placeholder-white/50"
              />
              <button
                onClick={handlePasswordChange}
                className="w-full bg-indigo-500 hover:bg-indigo-600 text-white py-2 rounded-md mt-2"
              >
                변경하기
              </button>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-3">
          <AccordionTrigger>어플 소개</AccordionTrigger>
          <AccordionContent>
            <div className="border border-white/30 rounded-xl p-4 text-sm bg-white/5">
              타로와 AI의 결합인{' '}
              <strong className="text-indigo-300">tairo</strong>입니다.
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-4">
          <AccordionTrigger>로그아웃</AccordionTrigger>
          <AccordionContent>
            <div className="border border-white/30 rounded-xl p-4 text-sm bg-white/5 space-y-4">
              <p className="text-sm text-white text-center leading-relaxed">
                로그아웃하면 다시 로그인해야 이용이 가능합니다.
              </p>
              <div className="flex justify-center gap-4">
                <button
                  className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md"
                  onClick={handleLogout}
                >
                  로그아웃하기
                </button>
                <button className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-black rounded-md">
                  로그인 유지하기
                </button>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}

export default Setting;
