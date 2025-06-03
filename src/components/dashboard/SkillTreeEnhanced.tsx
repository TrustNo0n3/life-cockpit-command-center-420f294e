
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/components/ui/use-toast";
import { Lock, CheckCircle, Circle, Star, Trophy, Zap, Award, Target } from "lucide-react";

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
  benefits: string[];
  position: { x: number; y: number };
}

interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlocked: boolean;
  domain?: string;
}

const SkillTreeEnhanced = () => {
  const { toast } = useToast();
  
  const [skills, setSkills] = useState<Skill[]>([
    // Financial Skills Tree
    { 
      id: "budgeting", 
      name: "Budget Master", 
      domain: "financial", 
      level: 3, 
      maxLevel: 5, 
      unlocked: true, 
      prerequisites: [], 
      description: "Master personal budgeting and expense tracking", 
      xp: 750, 
      xpRequired: 1000,
      benefits: ["Better expense control", "Increased savings rate"],
      position: { x: 0, y: 0 }
    },
    { 
      id: "investing", 
      name: "Investment Guru", 
      domain: "financial", 
      level: 2, 
      maxLevel: 5, 
      unlocked: true, 
      prerequisites: ["budgeting"], 
      description: "Build wealth through smart investments", 
      xp: 400, 
      xpRequired: 600,
      benefits: ["Portfolio growth", "Passive income"],
      position: { x: 1, y: 0 }
    },
    { 
      id: "wealth", 
      name: "Wealth Builder", 
      domain: "financial", 
      level: 0, 
      maxLevel: 3, 
      unlocked: false, 
      prerequisites: ["investing"], 
      description: "Achieve financial independence", 
      xp: 0, 
      xpRequired: 1500,
      benefits: ["Financial freedom", "Early retirement"],
      position: { x: 2, y: 0 }
    },
    
    // Work Skills Tree
    { 
      id: "productivity", 
      name: "Productivity Pro", 
      domain: "work", 
      level: 4, 
      maxLevel: 5, 
      unlocked: true, 
      prerequisites: [], 
      description: "Master time management and efficiency", 
      xp: 900, 
      xpRequired: 1000,
      benefits: ["Time optimization", "Goal achievement"],
      position: { x: 0, y: 1 }
    },
    { 
      id: "leadership", 
      name: "Team Leader", 
      domain: "work", 
      level: 2, 
      maxLevel: 5, 
      unlocked: true, 
      prerequisites: ["productivity"], 
      description: "Lead and inspire others", 
      xp: 300, 
      xpRequired: 800,
      benefits: ["Team synergy", "Career advancement"],
      position: { x: 1, y: 1 }
    },
    { 
      id: "expertise", 
      name: "Domain Expert", 
      domain: "work", 
      level: 1, 
      maxLevel: 3, 
      unlocked: true, 
      prerequisites: [], 
      description: "Deep knowledge in your field", 
      xp: 200, 
      xpRequired: 500,
      benefits: ["Industry recognition", "Higher compensation"],
      position: { x: 0, y: 2 }
    },
    
    // Brain Skills Tree
    { 
      id: "learning", 
      name: "Learning Machine", 
      domain: "brain", 
      level: 3, 
      maxLevel: 5, 
      unlocked: true, 
      prerequisites: [], 
      description: "Rapidly acquire new knowledge", 
      xp: 600, 
      xpRequired: 800,
      benefits: ["Faster skill acquisition", "Better memory"],
      position: { x: 0, y: 3 }
    },
    { 
      id: "creativity", 
      name: "Creative Genius", 
      domain: "brain", 
      level: 2, 
      maxLevel: 5, 
      unlocked: true, 
      prerequisites: ["learning"], 
      description: "Generate innovative ideas", 
      xp: 350, 
      xpRequired: 700,
      benefits: ["Innovation boost", "Problem solving"],
      position: { x: 1, y: 3 }
    },
    { 
      id: "problemsolver", 
      name: "Problem Solver", 
      domain: "brain", 
      level: 0, 
      maxLevel: 4, 
      unlocked: false, 
      prerequisites: ["creativity"], 
      description: "Tackle complex challenges", 
      xp: 0, 
      xpRequired: 600,
      benefits: ["Critical thinking", "Solution finding"],
      position: { x: 2, y: 3 }
    },
    
    // Physique Skills Tree
    { 
      id: "strength", 
      name: "Strength Warrior", 
      domain: "physique", 
      level: 2, 
      maxLevel: 5, 
      unlocked: true, 
      prerequisites: [], 
      description: "Build physical power", 
      xp: 400, 
      xpRequired: 600,
      benefits: ["Increased muscle mass", "Better bone density"],
      position: { x: 0, y: 4 }
    },
    { 
      id: "endurance", 
      name: "Endurance Beast", 
      domain: "physique", 
      level: 3, 
      maxLevel: 5, 
      unlocked: true, 
      prerequisites: [], 
      description: "Unlimited stamina", 
      xp: 700, 
      xpRequired: 900,
      benefits: ["Cardiovascular health", "Energy levels"],
      position: { x: 1, y: 4 }
    },
    { 
      id: "flexibility", 
      name: "Flexibility Master", 
      domain: "physique", 
      level: 1, 
      maxLevel: 4, 
      unlocked: true, 
      prerequisites: [], 
      description: "Move with grace", 
      xp: 150, 
      xpRequired: 400,
      benefits: ["Injury prevention", "Better mobility"],
      position: { x: 2, y: 4 }
    },
    
    // Mind Skills Tree
    { 
      id: "mindfulness", 
      name: "Mindful Being", 
      domain: "mind", 
      level: 4, 
      maxLevel: 5, 
      unlocked: true, 
      prerequisites: [], 
      description: "Present moment awareness", 
      xp: 850, 
      xpRequired: 1000,
      benefits: ["Stress reduction", "Mental clarity"],
      position: { x: 0, y: 5 }
    },
    { 
      id: "emotional", 
      name: "Emotional Intelligence", 
      domain: "mind", 
      level: 2, 
      maxLevel: 5, 
      unlocked: true, 
      prerequisites: ["mindfulness"], 
      description: "Master your emotions", 
      xp: 300, 
      xpRequired: 700,
      benefits: ["Better relationships", "Self-awareness"],
      position: { x: 1, y: 5 }
    },
    { 
      id: "wisdom", 
      name: "Ancient Wisdom", 
      domain: "mind", 
      level: 0, 
      maxLevel: 3, 
      unlocked: false, 
      prerequisites: ["emotional"], 
      description: "Deep understanding of life", 
      xp: 0, 
      xpRequired: 1200,
      benefits: ["Life perspective", "Inner peace"],
      position: { x: 2, y: 5 }
    },
    
    // Soul Skills Tree
    { 
      id: "passion", 
      name: "Passion Pursuer", 
      domain: "soul", 
      level: 3, 
      maxLevel: 5, 
      unlocked: true, 
      prerequisites: [], 
      description: "Follow your heart", 
      xp: 600, 
      xpRequired: 800,
      benefits: ["Life fulfillment", "Motivation boost"],
      position: { x: 0, y: 6 }
    },
    { 
      id: "purpose", 
      name: "Purpose Finder", 
      domain: "soul", 
      level: 1, 
      maxLevel: 4, 
      unlocked: true, 
      prerequisites: ["passion"], 
      description: "Discover your why", 
      xp: 200, 
      xpRequired: 500,
      benefits: ["Direction clarity", "Meaningful goals"],
      position: { x: 1, y: 6 }
    },
    { 
      id: "fulfillment", 
      name: "Life Fulfillment", 
      domain: "soul", 
      level: 0, 
      maxLevel: 3, 
      unlocked: false, 
      prerequisites: ["purpose"], 
      description: "Complete satisfaction", 
      xp: 0, 
      xpRequired: 1000,
      benefits: ["Inner peace", "Life satisfaction"],
      position: { x: 2, y: 6 }
    },
  ]);

  const [achievements, setAchievements] = useState<Achievement[]>([
    { id: "first_skill", name: "First Steps", description: "Unlock your first skill", icon: "🎯", unlocked: true },
    { id: "domain_master", name: "Domain Master", description: "Max out a skill in any domain", icon: "👑", unlocked: false },
    { id: "multi_domain", name: "Renaissance", description: "Have skills in all 6 domains", icon: "🌟", unlocked: true },
    { id: "level_50", name: "Halfway There", description: "Reach level 50 total", icon: "⚡", unlocked: false },
    { id: "perfectionist", name: "Perfectionist", description: "Max out 5 skills", icon: "💎", unlocked: false },
  ]);

  const [selectedDomain, setSelectedDomain] = useState<string | null>(null);

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
    if (skill.level === skill.maxLevel) return <Trophy className="h-4 w-4 text-yellow-500" />;
    if (skill.level > 0) return <Star className="h-4 w-4" />;
    return <Circle className="h-4 w-4" />;
  };

  const canUnlock = (skill: Skill) => {
    return !skill.unlocked && skill.prerequisites.every(prereq => 
      skills.find(s => s.id === prereq)?.level > 0
    );
  };

  const getTotalLevel = () => skills.reduce((sum, skill) => sum + skill.level, 0);
  const getTotalXP = () => skills.reduce((sum, skill) => sum + skill.xp, 0);
  const getUnlockedSkills = () => skills.filter(s => s.unlocked).length;

  const levelUpSkill = (skillId: string) => {
    setSkills(prev => prev.map(skill => {
      if (skill.id === skillId && skill.level < skill.maxLevel && skill.xp >= skill.xpRequired) {
        const newLevel = skill.level + 1;
        const newXpRequired = skill.xpRequired + (newLevel * 200);
        
        toast({
          title: "Skill Level Up!",
          description: `${skill.name} is now level ${newLevel}!`,
        });

        return {
          ...skill,
          level: newLevel,
          xp: skill.xp - skill.xpRequired,
          xpRequired: newXpRequired
        };
      }
      return skill;
    }));
  };

  const unlockSkill = (skillId: string) => {
    setSkills(prev => prev.map(skill => 
      skill.id === skillId ? { ...skill, unlocked: true } : skill
    ));
    
    toast({
      title: "Skill Unlocked!",
      description: `You can now start developing this skill!`,
    });
  };

  const addXP = (skillId: string, amount: number) => {
    setSkills(prev => prev.map(skill => 
      skill.id === skillId ? { ...skill, xp: skill.xp + amount } : skill
    ));
  };

  const filteredSkills = selectedDomain 
    ? skills.filter(skill => skill.domain === selectedDomain)
    : skills;

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">{getTotalLevel()}</div>
            <div className="text-sm text-muted-foreground">Total Level</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">{getTotalXP().toLocaleString()}</div>
            <div className="text-sm text-muted-foreground">Total XP</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">{getUnlockedSkills()}</div>
            <div className="text-sm text-muted-foreground">Skills Unlocked</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">{achievements.filter(a => a.unlocked).length}</div>
            <div className="text-sm text-muted-foreground">Achievements</div>
          </CardContent>
        </Card>
      </div>

      {/* Domain Filter */}
      <Card>
        <CardHeader>
          <CardTitle>Domain Filter</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            <Button 
              variant={selectedDomain === null ? "default" : "outline"}
              onClick={() => setSelectedDomain(null)}
            >
              All Domains
            </Button>
            {Object.keys(domainColors).map(domain => (
              <Button
                key={domain}
                variant={selectedDomain === domain ? "default" : "outline"}
                onClick={() => setSelectedDomain(domain)}
                style={{ 
                  backgroundColor: selectedDomain === domain ? domainColors[domain as keyof typeof domainColors] : undefined 
                }}
              >
                {domain.charAt(0).toUpperCase() + domain.slice(1)}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Skill Tree */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5" />
            Skill Tree
            {selectedDomain && (
              <Badge style={{ backgroundColor: domainColors[selectedDomain as keyof typeof domainColors] }}>
                {selectedDomain.toUpperCase()}
              </Badge>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredSkills.map((skill) => (
              <div
                key={skill.id}
                className={`p-4 rounded-lg border-2 transition-all ${
                  skill.unlocked
                    ? "border-solid opacity-100"
                    : canUnlock(skill)
                    ? "border-dashed opacity-70 hover:opacity-90"
                    : "border-dashed opacity-40"
                }`}
                style={{ borderColor: domainColors[skill.domain as keyof typeof domainColors] }}
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
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span>XP: {skill.xp}/{skill.xpRequired}</span>
                      <span>{Math.round((skill.xp / skill.xpRequired) * 100)}%</span>
                    </div>
                    <Progress 
                      value={(skill.xp / skill.xpRequired) * 100} 
                      className="h-1.5"
                    />
                    
                    {skill.benefits.length > 0 && (
                      <div className="text-xs">
                        <span className="font-medium">Benefits:</span>
                        <ul className="list-disc list-inside ml-2">
                          {skill.benefits.map((benefit, idx) => (
                            <li key={idx}>{benefit}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    <div className="flex gap-2">
                      {skill.xp >= skill.xpRequired && skill.level < skill.maxLevel && (
                        <Button
                          size="sm"
                          className="flex-1"
                          style={{ backgroundColor: domainColors[skill.domain as keyof typeof domainColors] }}
                          onClick={() => levelUpSkill(skill.id)}
                        >
                          <Zap className="h-3 w-3 mr-1" />
                          Level Up!
                        </Button>
                      )}
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => addXP(skill.id, 50)}
                      >
                        +50 XP
                      </Button>
                    </div>
                  </div>
                )}
                
                {canUnlock(skill) && (
                  <Button
                    size="sm"
                    className="w-full"
                    style={{ backgroundColor: domainColors[skill.domain as keyof typeof domainColors] }}
                    onClick={() => unlockSkill(skill.id)}
                  >
                    <Target className="h-3 w-3 mr-1" />
                    Unlock Skill
                  </Button>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Achievements */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5" />
            Achievements
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {achievements.map((achievement) => (
              <div
                key={achievement.id}
                className={`p-3 rounded-lg border flex items-center gap-3 ${
                  achievement.unlocked 
                    ? "bg-yellow-50 border-yellow-200" 
                    : "bg-gray-50 border-gray-200 opacity-60"
                }`}
              >
                <div className="text-2xl">{achievement.icon}</div>
                <div>
                  <h4 className="font-semibold text-sm">{achievement.name}</h4>
                  <p className="text-xs text-muted-foreground">{achievement.description}</p>
                </div>
                {achievement.unlocked && (
                  <CheckCircle className="h-4 w-4 text-green-600 ml-auto" />
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SkillTreeEnhanced;
