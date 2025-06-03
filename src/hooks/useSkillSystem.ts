
import { useState, useCallback } from "react";
import { useToast } from "@/components/ui/use-toast";

interface SkillProgress {
  financial: number;
  work: number;
  brain: number;
  physique: number;
  mind: number;
  soul: number;
}

const useSkillSystem = () => {
  const { toast } = useToast();
  const [skillProgress, setSkillProgress] = useState<SkillProgress>({
    financial: 0,
    work: 0,
    brain: 0,
    physique: 0,
    mind: 0,
    soul: 0,
  });

  const awardXP = useCallback((domain: keyof SkillProgress, amount: number, action: string) => {
    setSkillProgress(prev => ({
      ...prev,
      [domain]: prev[domain] + amount
    }));

    toast({
      title: `+${amount} XP`,
      description: `${action} in ${domain.charAt(0).toUpperCase() + domain.slice(1)}`,
    });

    // Check for level up (every 100 XP = 1 level)
    const newTotal = skillProgress[domain] + amount;
    const oldLevel = Math.floor(skillProgress[domain] / 100);
    const newLevel = Math.floor(newTotal / 100);

    if (newLevel > oldLevel) {
      toast({
        title: "Level Up!",
        description: `${domain.charAt(0).toUpperCase() + domain.slice(1)} reached level ${newLevel}!`,
      });
    }
  }, [skillProgress, toast]);

  const getLevel = useCallback((domain: keyof SkillProgress) => {
    return Math.floor(skillProgress[domain] / 100);
  }, [skillProgress]);

  const getXPProgress = useCallback((domain: keyof SkillProgress) => {
    return skillProgress[domain] % 100;
  }, [skillProgress]);

  return {
    skillProgress,
    awardXP,
    getLevel,
    getXPProgress,
  };
};

export default useSkillSystem;
