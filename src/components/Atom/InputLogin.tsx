interface InputLoginProps {
  type: 'email' | 'password';
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

function InputLogin({ type, value, onChange, placeholder }: InputLoginProps) {
  return (
    <div className="relative">
      <label
        className="transform absolute left-8 top-[50%] translate-y-[-50%] font-medium text-xl"
        htmlFor={type}
      >
        {type === 'email' ? 'ID' : 'Password'}
      </label>
      <input
        className="bg-white focus:shadow-md rounded-lg pl-20 pr-8 py-4 w-full text-xl"
        id={type}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required
      />
    </div>
  );
}

export default InputLogin;
