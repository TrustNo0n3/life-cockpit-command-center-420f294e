
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/components/ui/use-toast";
import { Target, Plus, Trash2, BookOpen, Award } from "lucide-react";

interface LearningGoal {
  id: string;
  title: string;
  description: string;
  category: string;
  targetDate?: Date;
  progress: number;
  milestones: string[];
  completedMilestones: number;
  resources: string[];
  status: "active" | "completed" | "paused";
}

const LearningGoals = () => {
  const { toast } = useToast();
  const [goals, setGoals] = useState<LearningGoal[]>([
    {
      id: "1",
      title: "Complete Machine Learning Specialization",
      description: "Finish Andrew Ng's ML course on Coursera",
      category: "AI/ML",
      targetDate: new Date("2024-06-01"),
      progress: 70,
      milestones: ["Linear Regression", "Neural Networks", "Deep Learning", "Final Project"],
      completedMilestones: 3,
      resources: ["Coursera Course", "Python for ML Book"],
      status: "active"
    },
    {
      id: "2",
      title: "Master Kubernetes",
      description: "Learn container orchestration and deployment",
      category: "DevOps",
      progress: 40,
      milestones: ["Basic Concepts", "Deployments", "Services", "Advanced Features"],
      completedMilestones: 2,
      resources: ["Kubernetes Documentation", "CKA Study Guide"],
      status: "active"
    }
  ]);

  const [newGoal, setNewGoal] = useState({
    title: "",
    description: "",
    category: "",
    targetDate: "",
    milestones: ""
  });

  const handleAddGoal = () => {
    if (!newGoal.title.trim()) return;

    const goal: LearningGoal = {
      id: Date.now().toString(),
      title: newGoal.title,
      description: newGoal.description,
      category: newGoal.category,
      targetDate: newGoal.targetDate ? new Date(newGoal.targetDate) : undefined,
      progress: 0,
      milestones: newGoal.milestones.split(",").map(m => m.trim()).filter(m => m),
      completedMilestones: 0,
      resources: [],
      status: "active"
    };

    setGoals([goal, ...goals]);
    setNewGoal({ title: "", description: "", category: "", targetDate: "", milestones: "" });
    
    toast({
      title: "Learning Goal Added",
      description: `"${goal.title}" has been added to your learning goals.`,
    });
  };

  const handleDeleteGoal = (id: string) => {
    setGoals(goals.filter(g => g.id !== id));
    toast({
      title: "Learning Goal Deleted",
      description: "Goal has been removed from your learning tracker.",
    });
  };

  const handleProgressUpdate = (id: string, newProgress: number) => {
    setGoals(goals.map(goal => 
      goal.id === id ? { ...goal, progress: newProgress } : goal
    ));
  };

  const handleMilestoneComplete = (goalId: string, milestoneIndex: number) => {
    setGoals(goals.map(goal => {
      if (goal.id === goalId) {
        const newCompletedMilestones = Math.max(goal.completedMilestones, milestoneIndex + 1);
        const newProgress = Math.round((newCompletedMilestones / goal.milestones.length) * 100);
        return { 
          ...goal, 
          completedMilestones: newCompletedMilestones,
          progress: newProgress,
          status: newProgress === 100 ? "completed" : goal.status
        };
      }
      return goal;
    }));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "bg-green-100 text-green-800";
      case "active": return "bg-blue-100 text-blue-800";
      case "paused": return "bg-yellow-100 text-yellow-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getDaysUntilTarget = (targetDate: Date) => {
    const today = new Date();
    const diffTime = targetDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Target className="h-5 w-5 text-brain" />
          Learning Goals
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Add New Goal */}
        <div className="border rounded-lg p-4 space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label htmlFor="goal-title">Goal Title</Label>
              <Input
                id="goal-title"
                value={newGoal.title}
                onChange={(e) => setNewGoal({ ...newGoal, title: e.target.value })}
                placeholder="Learn React Native..."
              />
            </div>
            <div>
              <Label htmlFor="goal-category">Category</Label>
              <Input
                id="goal-category"
                value={newGoal.category}
                onChange={(e) => setNewGoal({ ...newGoal, category: e.target.value })}
                placeholder="Programming, Design, etc."
              />
            </div>
          </div>
          <div>
            <Label htmlFor="goal-description">Description</Label>
            <Input
              id="goal-description"
              value={newGoal.description}
              onChange={(e) => setNewGoal({ ...newGoal, description: e.target.value })}
              placeholder="What do you want to achieve?"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label htmlFor="goal-target">Target Date (Optional)</Label>
              <Input
                id="goal-target"
                type="date"
                value={newGoal.targetDate}
                onChange={(e) => setNewGoal({ ...newGoal, targetDate: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="goal-milestones">Milestones (comma-separated)</Label>
              <Input
                id="goal-milestones"
                value={newGoal.milestones}
                onChange={(e) => setNewGoal({ ...newGoal, milestones: e.target.value })}
                placeholder="Basics, Intermediate, Advanced..."
              />
            </div>
          </div>
          <Button onClick={handleAddGoal} style={{ backgroundColor: "#6a1b9a" }}>
            <Plus className="h-4 w-4 mr-2" />
            Add Learning Goal
          </Button>
        </div>

        {/* Goals List */}
        <div className="space-y-4">
          {goals.map((goal) => (
            <div key={goal.id} className="border rounded-lg p-4">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h4 className="font-semibold flex items-center gap-2">
                    {goal.status === "completed" && <Award className="h-4 w-4 text-yellow-500" />}
                    {goal.title}
                  </h4>
                  <p className="text-sm text-muted-foreground">{goal.description}</p>
                  <span className="text-xs bg-muted px-2 py-1 rounded mt-1 inline-block">
                    {goal.category}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(goal.status)}`}>
                    {goal.status}
                  </span>
                  <Button size="sm" variant="ghost" onClick={() => handleDeleteGoal(goal.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-3">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium">Progress</span>
                  <span className="text-sm text-muted-foreground">{goal.progress}%</span>
                </div>
                <Progress value={goal.progress} className="h-2" />
              </div>

              {/* Milestones */}
              {goal.milestones.length > 0 && (
                <div className="mb-3">
                  <h5 className="text-sm font-medium mb-2 flex items-center gap-1">
                    <BookOpen className="h-4 w-4" />
                    Milestones ({goal.completedMilestones}/{goal.milestones.length})
                  </h5>
                  <div className="space-y-1">
                    {goal.milestones.map((milestone, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm">
                        <input
                          type="checkbox"
                          checked={index < goal.completedMilestones}
                          onChange={() => handleMilestoneComplete(goal.id, index)}
                          className="rounded"
                        />
                        <span className={index < goal.completedMilestones ? "line-through text-muted-foreground" : ""}>
                          {milestone}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Target Date */}
              {goal.targetDate && (
                <div className="text-xs text-muted-foreground">
                  Target: {goal.targetDate.toLocaleDateString()}
                  {goal.status !== "completed" && (
                    <span className="ml-2">
                      ({getDaysUntilTarget(goal.targetDate)} days remaining)
                    </span>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default LearningGoals;
