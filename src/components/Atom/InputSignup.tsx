import { tm } from '@/utils/tw-marge';

interface InputSignupProps {
  type: 'email' | 'password' | 'text' | 'number';
  id: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

function InputSignup({
  id,
  type,
  value,
  onChange,
  placeholder,
}: InputSignupProps) {
  const getLabel = () => {
    switch (type) {
      case 'email':
        return 'ID';
      case 'password':
        return '비밀번호';
      case 'text':
        return '이름';
      case 'number':
        return '인증번호';
      default:
        return '';
    }
  };

  return (
    <div>
      <label htmlFor={id} className="sr-only">
        {getLabel()}
      </label>
      <input
        className={tm(
          'border-b border-b-gray',
          'w-full py-4 px-6',
          'text-base'
        )}
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required
      />
    </div>
  );
}

export default InputSignup;
