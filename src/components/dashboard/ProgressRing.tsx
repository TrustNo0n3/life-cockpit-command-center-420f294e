
interface ProgressRingProps {
  percentage: number;
  color: string;
  size?: "sm" | "md" | "lg";
  label?: string;
}

const ProgressRing = ({ percentage, color, size = "md", label }: ProgressRingProps) => {
  const sizeClasses = {
    sm: "h-12 w-12 text-xs",
    md: "h-16 w-16 text-sm",
    lg: "h-20 w-20 text-base",
  };

  // Calculate rotation to create the progress arc
  const rotation = percentage >= 50 
    ? 'rotate-180' 
    : `rotate-${Math.round((percentage / 50) * 180)}`;
    
  return (
    <div className={`progress-ring ${sizeClasses[size]}`}>
      <div className="progress-ring-track"></div>
      <div 
        className="progress-ring-fill" 
        style={{ 
          borderColor: color,
          transform: `rotate(${percentage * 3.6}deg)`
        }}
      ></div>
      <div className="absolute inset-0 flex items-center justify-center flex-col">
        <span className="font-semibold">{percentage}%</span>
        {label && <span className="text-xs text-muted-foreground">{label}</span>}
      </div>
    </div>
  );
};

export default ProgressRing;
