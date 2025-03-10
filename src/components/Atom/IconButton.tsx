import { ReactNode } from "react";

interface IconButtonProps {
  icon: ReactNode;
  onClick?: () => void;
}

const IconButton = ({ icon, onClick }: IconButtonProps) => {
  return (
    <button onClick={onClick} className="p-2 rounded-full bg-white shadow-md">
      {icon}
    </button>
  );
};

export default IconButton;