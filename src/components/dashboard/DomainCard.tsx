
import { Link } from "react-router-dom";

interface DomainCardProps {
  title: string;
  color: string;
  lightColor: string;
  stats: {
    label: string;
    value: string | number;
  }[];
  icon: React.ReactNode;
  progressPercentage: number;
  linkTo: string;
}

const DomainCard = ({
  title,
  color,
  lightColor,
  stats,
  icon,
  progressPercentage,
  linkTo,
}: DomainCardProps) => {
  return (
    <Link to={linkTo} className="domain-card">
      <div className="p-4" style={{ backgroundColor: color, color: "white" }}>
        <div className="flex justify-between items-center">
          <h3 className="font-semibold text-lg">{title}</h3>
          <div className="p-1 rounded-full bg-white/20">{icon}</div>
        </div>
      </div>
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div className="grid grid-cols-2 gap-2">
          {stats.map((stat, index) => (
            <div key={index} className="text-sm">
              <div className="font-medium">{stat.value}</div>
              <div className="text-muted-foreground text-xs">{stat.label}</div>
            </div>
          ))}
        </div>
        <div className="mt-4 relative h-1.5 bg-muted rounded-full overflow-hidden">
          <div
            className="absolute top-0 left-0 h-full rounded-full transition-all duration-500 ease-in-out"
            style={{
              width: `${progressPercentage}%`,
              backgroundColor: color,
            }}
          ></div>
        </div>
      </div>
    </Link>
  );
};

export default DomainCard;
