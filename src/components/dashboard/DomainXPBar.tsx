
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

interface DomainXPBarProps {
  domain: string;
  level: number;
  xpProgress: number;
  color: string;
}

const DomainXPBar = ({ domain, level, xpProgress, color }: DomainXPBarProps) => {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium capitalize">{domain}</span>
        <Badge variant="secondary">Lv. {level}</Badge>
      </div>
      <div className="space-y-1">
        <Progress value={xpProgress} className="h-2" />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>{xpProgress}/100 XP</span>
          <span>Next: Lv. {level + 1}</span>
        </div>
      </div>
    </div>
  );
};

export default DomainXPBar;
