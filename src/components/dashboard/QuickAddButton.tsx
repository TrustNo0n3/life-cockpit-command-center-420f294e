
import { ReactNode } from "react";

interface QuickAddButtonProps {
  icon: ReactNode;
  label: string;
  color: string;
  onClick: () => void;
}

const QuickAddButton = ({ icon, label, color, onClick }: QuickAddButtonProps) => {
  return (
    <button
      className="quick-add-button"
      style={{ backgroundColor: `${color}20`, color }}
      onClick={onClick}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
};

export default QuickAddButton;
