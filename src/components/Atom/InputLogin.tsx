import { tm } from '@/utils/tw-marge';

interface InputLoginProps {
  type: 'email' | 'password';
  id: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

function InputLogin({ id, type, onChange, placeholder }: InputLoginProps) {
  const handleChange = (e) => {
    onChange(e.target.value);
  };

  // console.log('시작', data);
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
        // defaultValue={data}
        onChange={handleChange}
        placeholder={placeholder}
        required
      />
    </div>
  );
}

export default InputLogin;
