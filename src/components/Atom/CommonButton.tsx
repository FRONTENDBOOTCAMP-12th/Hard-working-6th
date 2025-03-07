interface CommonButtonProps {
  type?: 'button' | 'submit';
  onClick?: () => void;
  disabled?: boolean;
  children: React.ReactNode;
  color?: string;
  icon?: React.ReactNode;
}

function CommonButton({
  type = 'button',
  onClick,
  disabled = false,
  children,
  color = 'bg-linear-to-r from-primary-gradient1 to-primary-gradient2',
  icon,
}: CommonButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`flex items-center justify-center gap-2 w-full p-4 text-white text-base rounded-lg 
        ${disabled ? 'bg-disable' : color}`}
    >
      {icon && <span className="w-5 h-5">{icon}</span>}
      {children}
    </button>
  );
}

export default CommonButton;
