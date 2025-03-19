import { forwardRef } from 'react';
import { tm } from '@/utils/tw-marge';

interface InputLoginProps {
  type: 'email' | 'password';
  id: string;
  defaultValue?: string;
  placeholder?: string;
}

function InputLogin(
  { id, type, defaultValue, placeholder }: InputLoginProps,
  ref: React.Ref<HTMLInputElement>
) {
  return (
    <div className="relative">
      <label
        className={tm(
          'transform absolute left-8 top-[50%] translate-y-[-50%]',
          'font-medium text-xl'
        )}
        htmlFor={id}
        aria-label={type === 'password' ? '비밀번호' : undefined}
      >
        {type === 'email' ? 'ID' : 'PW'}
      </label>
      <input
        className={tm(
          'pl-20 pr-8 py-4 w-full',
          'bg-white focus:shadow-md rounded-lg',
          'text-xl'
        )}
        id={id}
        type={type}
        defaultValue={defaultValue}
        ref={ref}
        placeholder={placeholder}
        required
      />
    </div>
  );
}

// forwardRef로 감싸기 (React.forwardRef는 고차 함수 형태이므로 감싸야 함)
const ForwardedInputLogin = forwardRef(InputLogin);

export default ForwardedInputLogin;
