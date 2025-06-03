
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Zap, Trophy, Star } from "lucide-react";

interface XPNotificationProps {
  xpGained: number;
  skillName?: string;
  levelUp?: boolean;
  onComplete?: () => void;
}

const XPNotification = ({ xpGained, skillName, levelUp, onComplete }: XPNotificationProps) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      onComplete?.();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  if (!visible) return null;

  return (
    <div className="fixed top-4 right-4 z-50 animate-in slide-in-from-right">
      <Card className="p-4 bg-gradient-to-r from-yellow-100 to-orange-100 border-yellow-300">
        <div className="flex items-center gap-3">
          {levelUp ? (
            <Trophy className="h-6 w-6 text-yellow-600" />
          ) : (
            <Zap className="h-6 w-6 text-blue-600" />
          )}
          <div>
            {levelUp ? (
              <div>
                <div className="font-bold text-yellow-800">Level Up!</div>
                <div className="text-sm text-yellow-700">{skillName} leveled up!</div>
              </div>
            ) : (
              <div>
                <div className="font-bold text-blue-800">+{xpGained} XP</div>
                {skillName && (
                  <div className="text-sm text-blue-700">{skillName}</div>
                )}
              </div>
            )}
          </div>
          <Star className="h-5 w-5 text-yellow-500 animate-pulse" />
        </div>
      </Card>
    </div>
  );
};

export default XPNotification;
