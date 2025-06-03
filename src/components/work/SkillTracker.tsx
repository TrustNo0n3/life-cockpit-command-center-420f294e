
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/components/ui/use-toast";
import { TrendingUp, Plus, Target, Star } from "lucide-react";

interface Skill {
  id: string;
  name: string;
  level: number;
  target: number;
  category: string;
}

const SkillTracker = () => {
  const { toast } = useToast();
  const [skills, setSkills] = useState<Skill[]>([
    {
      id: "1",
      name: "Network Security",
      level: 85,
      target: 95,
      category: "Security"
    },
    {
      id: "2",
      name: "Python Programming",
      level: 70,
      target: 90,
      category: "Programming"
    },
    {
      id: "3",
      name: "Risk Assessment",
      level: 60,
      target: 80,
      category: "Security"
    }
  ]);

  const [newSkill, setNewSkill] = useState({
    name: "",
    level: "",
    target: "",
    category: "Programming"
  });

  const categories = ["Programming", "Security", "Management", "Design", "Analytics"];

  const handleAddSkill = () => {
    if (!newSkill.name.trim() || !newSkill.level || !newSkill.target) return;

    const skill: Skill = {
      id: Date.now().toString(),
      name: newSkill.name,
      level: parseInt(newSkill.level),
      target: parseInt(newSkill.target),
      category: newSkill.category
    };

    setSkills([...skills, skill]);
    setNewSkill({ name: "", level: "", target: "", category: "Programming" });
    
    toast({
      title: "Skill Added",
      description: `${skill.name} has been added to your skill tracker.`,
    });
  };

  const handleLevelUp = (id: string, increment: number) => {
    setSkills(skills.map(skill => 
      skill.id === id 
        ? { ...skill, level: Math.min(100, Math.max(0, skill.level + increment)) }
        : skill
    ));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-work" />
          Skill Tracker
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Add New Skill */}
        <div className="border rounded-lg p-4 space-y-3">
          <h4 className="font-semibold">Add New Skill</h4>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label htmlFor="skill-name">Skill Name</Label>
              <Input
                id="skill-name"
                value={newSkill.name}
                onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
                placeholder="e.g., React Development"
              />
            </div>
            <div>
              <Label htmlFor="skill-category">Category</Label>
              <select
                id="skill-category"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                value={newSkill.category}
                onChange={(e) => setNewSkill({ ...newSkill, category: e.target.value })}
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label htmlFor="current-level">Current Level (%)</Label>
              <Input
                id="current-level"
                type="number"
                min="0"
                max="100"
                value={newSkill.level}
                onChange={(e) => setNewSkill({ ...newSkill, level: e.target.value })}
                placeholder="0-100"
              />
            </div>
            <div>
              <Label htmlFor="target-level">Target Level (%)</Label>
              <Input
                id="target-level"
                type="number"
                min="0"
                max="100"
                value={newSkill.target}
                onChange={(e) => setNewSkill({ ...newSkill, target: e.target.value })}
                placeholder="0-100"
              />
            </div>
          </div>
          <Button onClick={handleAddSkill} style={{ backgroundColor: "#1565c0" }}>
            <Plus className="h-4 w-4 mr-2" />
            Add Skill
          </Button>
        </div>

        {/* Skills List */}
        <div className="space-y-3">
          {skills.map((skill) => (
            <div key={skill.id} className="border rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <div>
                  <h4 className="font-semibold">{skill.name}</h4>
                  <p className="text-sm text-muted-foreground">{skill.category}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Button size="sm" variant="outline" onClick={() => handleLevelUp(skill.id, -5)}>
                    -5
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => handleLevelUp(skill.id, 5)}>
                    +5
                  </Button>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Current: {skill.level}%</span>
                  <span>Target: {skill.target}%</span>
                </div>
                <Progress value={skill.level} className="h-2" />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>{skill.level >= skill.target ? "Target Achieved!" : `${skill.target - skill.level}% to target`}</span>
                  {skill.level >= skill.target && <Star className="h-4 w-4 text-yellow-500" />}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default SkillTracker;
