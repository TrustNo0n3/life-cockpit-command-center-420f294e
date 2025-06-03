
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Lock, CheckCircle, Circle, Star, Trophy } from "lucide-react";

interface Skill {
  id: string;
  name: string;
  domain: string;
  level: number;
  maxLevel: number;
  unlocked: boolean;
  prerequisites: string[];
  description: string;
  xp: number;
  xpRequired: number;
}

const SkillTree = () => {
  const [skills, setSkills] = useState<Skill[]>([
    // Financial Skills
    { id: "budgeting", name: "Budgeting Master", domain: "financial", level: 3, maxLevel: 5, unlocked: true, prerequisites: [], description: "Track and manage expenses effectively", xp: 750, xpRequired: 1000 },
    { id: "investing", name: "Investment Guru", domain: "financial", level: 2, maxLevel: 5, unlocked: true, prerequisites: ["budgeting"], description: "Build wealth through smart investments", xp: 400, xpRequired: 600 },
    { id: "wealth", name: "Wealth Builder", domain: "financial", level: 0, maxLevel: 3, unlocked: false, prerequisites: ["investing"], description: "Achieve financial independence", xp: 0, xpRequired: 1500 },
    
    // Work Skills
    { id: "productivity", name: "Productivity Pro", domain: "work", level: 4, maxLevel: 5, unlocked: true, prerequisites: [], description: "Master time management and efficiency", xp: 900, xpRequired: 1000 },
    { id: "leadership", name: "Team Leader", domain: "work", level: 2, maxLevel: 5, unlocked: true, prerequisites: ["productivity"], description: "Lead and inspire others", xp: 300, xpRequired: 800 },
    { id: "expertise", name: "Domain Expert", domain: "work", level: 1, maxLevel: 3, unlocked: true, prerequisites: [], description: "Deep knowledge in your field", xp: 200, xpRequired: 500 },
    
    // Brain Skills
    { id: "learning", name: "Learning Machine", domain: "brain", level: 3, maxLevel: 5, unlocked: true, prerequisites: [], description: "Rapidly acquire new knowledge", xp: 600, xpRequired: 800 },
    { id: "creativity", name: "Creative Genius", domain: "brain", level: 2, maxLevel: 5, unlocked: true, prerequisites: ["learning"], description: "Generate innovative ideas", xp: 350, xpRequired: 700 },
    { id: "problemsolver", name: "Problem Solver", domain: "brain", level: 1, maxLevel: 4, unlocked: false, prerequisites: ["creativity"], description: "Tackle complex challenges", xp: 0, xpRequired: 600 },
    
    // Physique Skills
    { id: "strength", name: "Strength Warrior", domain: "physique", level: 2, maxLevel: 5, unlocked: true, prerequisites: [], description: "Build physical power", xp: 400, xpRequired: 600 },
    { id: "endurance", name: "Endurance Beast", domain: "physique", level: 3, maxLevel: 5, unlocked: true, prerequisites: [], description: "Unlimited stamina", xp: 700, xpRequired: 900 },
    { id: "flexibility", name: "Flexibility Master", domain: "physique", level: 1, maxLevel: 4, unlocked: true, prerequisites: [], description: "Move with grace", xp: 150, xpRequired: 400 },
    
    // Mind Skills
    { id: "mindfulness", name: "Mindful Being", domain: "mind", level: 4, maxLevel: 5, unlocked: true, prerequisites: [], description: "Present moment awareness", xp: 850, xpRequired: 1000 },
    { id: "emotional", name: "Emotional Intelligence", domain: "mind", level: 2, maxLevel: 5, unlocked: true, prerequisites: ["mindfulness"], description: "Master your emotions", xp: 300, xpRequired: 700 },
    { id: "wisdom", name: "Ancient Wisdom", domain: "mind", level: 0, maxLevel: 3, unlocked: false, prerequisites: ["emotional"], description: "Deep understanding of life", xp: 0, xpRequired: 1200 },
    
    // Soul Skills
    { id: "passion", name: "Passion Pursuer", domain: "soul", level: 3, maxLevel: 5, unlocked: true, prerequisites: [], description: "Follow your heart", xp: 600, xpRequired: 800 },
    { id: "purpose", name: "Purpose Finder", domain: "soul", level: 1, maxLevel: 4, unlocked: true, prerequisites: ["passion"], description: "Discover your why", xp: 200, xpRequired: 500 },
    { id: "fulfillment", name: "Life Fulfillment", domain: "soul", level: 0, maxLevel: 3, unlocked: false, prerequisites: ["purpose"], description: "Complete satisfaction", xp: 0, xpRequired: 1000 },
  ]);

  const domainColors = {
    financial: "#2e7d32",
    work: "#1565c0",
    brain: "#6a1b9a",
    physique: "#d84315",
    mind: "#00838f",
    soul: "#f9a825",
  };

  const getSkillIcon = (skill: Skill) => {
    if (!skill.unlocked) return <Lock className="h-4 w-4" />;
    if (skill.level === skill.maxLevel) return <Trophy className="h-4 w-4" />;
    if (skill.level > 0) return <Star className="h-4 w-4" />;
    return <Circle className="h-4 w-4" />;
  };

  const canUnlock = (skill: Skill) => {
    return !skill.unlocked && skill.prerequisites.every(prereq => 
      skills.find(s => s.id === prereq)?.level > 0
    );
  };

  const groupedSkills = skills.reduce((acc, skill) => {
    if (!acc[skill.domain]) acc[skill.domain] = [];
    acc[skill.domain].push(skill);
    return acc;
  }, {} as Record<string, Skill[]>);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Trophy className="h-5 w-5" />
          Skill Tree
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.entries(groupedSkills).map(([domain, domainSkills]) => (
            <div key={domain} className="space-y-3">
              <h3 className="font-semibold text-sm uppercase tracking-wide" style={{ color: domainColors[domain as keyof typeof domainColors] }}>
                {domain}
              </h3>
              <div className="space-y-2">
                {domainSkills.map((skill) => (
                  <div
                    key={skill.id}
                    className={`p-3 rounded-lg border-2 transition-all ${
                      skill.unlocked
                        ? "border-solid opacity-100"
                        : canUnlock(skill)
                        ? "border-dashed opacity-70 hover:opacity-90"
                        : "border-dashed opacity-40"
                    }`}
                    style={{ borderColor: domainColors[domain as keyof typeof domainColors] }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        {getSkillIcon(skill)}
                        <span className="font-medium text-sm">{skill.name}</span>
                      </div>
                      <Badge variant={skill.level === skill.maxLevel ? "default" : "secondary"}>
                        {skill.level}/{skill.maxLevel}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mb-2">{skill.description}</p>
                    {skill.unlocked && (
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span>XP: {skill.xp}/{skill.xpRequired}</span>
                          <span>{Math.round((skill.xp / skill.xpRequired) * 100)}%</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-1.5">
                          <div
                            className="h-1.5 rounded-full transition-all"
                            style={{
                              width: `${Math.min((skill.xp / skill.xpRequired) * 100, 100)}%`,
                              backgroundColor: domainColors[domain as keyof typeof domainColors]
                            }}
                          />
                        </div>
                      </div>
                    )}
                    {canUnlock(skill) && (
                      <Button
                        size="sm"
                        className="w-full mt-2"
                        style={{ backgroundColor: domainColors[domain as keyof typeof domainColors] }}
                        onClick={() => {
                          setSkills(prev => prev.map(s => 
                            s.id === skill.id ? { ...s, unlocked: true } : s
                          ));
                        }}
                      >
                        Unlock Skill
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default SkillTree;
