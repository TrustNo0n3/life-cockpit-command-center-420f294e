
import { ReactNode } from "react";

interface InsightItemProps {
  icon: ReactNode;
  message: string;
  color: string;
}

const InsightItem = ({ icon, message, color }: InsightItemProps) => {
  return (
    <div className="insight-item" style={{ backgroundColor: `${color}20` }}>
      <div style={{ color }}>{icon}</div>
      <p className="text-sm flex-1">{message}</p>
    </div>
  );
};

export default InsightItem;
