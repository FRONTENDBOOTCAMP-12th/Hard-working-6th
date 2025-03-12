import { tm } from '@/utils/tw-marge';

interface ChipButtonSignupProps {
  children: string;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  type?: 'button' | 'submit';
}

function ChipButtonSignup({
  children,
  onClick,
  disabled = false,
  type = 'button',
}: ChipButtonSignupProps) {
  return (
    <button
      className={tm(
        'min-w-21 p-1.5',
        'border border-primary-gradient1 rounded-4xl',
        'text-primary-gradient1',
        'disabled:text-disable disabled:border-disable'
      )}
      onClick={onClick}
      disabled={disabled}
      type={type}
    >
      {children}
    </button>
  );
}

export default ChipButtonSignup;
