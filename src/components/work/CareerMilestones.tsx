
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Trophy, Plus, Calendar, CheckCircle } from "lucide-react";

interface Milestone {
  id: string;
  title: string;
  description: string;
  targetDate: string;
  completed: boolean;
  completedDate?: string;
  category: string;
}

const CareerMilestones = () => {
  const { toast } = useToast();
  const [milestones, setMilestones] = useState<Milestone[]>([
    {
      id: "1",
      title: "CISSP Certification",
      description: "Complete CISSP certification to advance security expertise",
      targetDate: "2024-12-31",
      completed: false,
      category: "Certification"
    },
    {
      id: "2",
      title: "Team Lead Promotion",
      description: "Achieve promotion to team lead position",
      targetDate: "2024-09-30",
      completed: true,
      completedDate: "2024-08-15",
      category: "Career"
    }
  ]);

  const [newMilestone, setNewMilestone] = useState({
    title: "",
    description: "",
    targetDate: "",
    category: "Career"
  });

  const categories = ["Career", "Certification", "Skills", "Education", "Leadership"];

  const handleAddMilestone = () => {
    if (!newMilestone.title.trim() || !newMilestone.targetDate) return;

    const milestone: Milestone = {
      id: Date.now().toString(),
      title: newMilestone.title,
      description: newMilestone.description,
      targetDate: newMilestone.targetDate,
      completed: false,
      category: newMilestone.category
    };

    setMilestones([...milestones, milestone]);
    setNewMilestone({ title: "", description: "", targetDate: "", category: "Career" });
    
    toast({
      title: "Milestone Added",
      description: `"${milestone.title}" has been added to your career milestones.`,
    });
  };

  const toggleMilestone = (id: string) => {
    setMilestones(milestones.map(milestone => 
      milestone.id === id 
        ? { 
            ...milestone, 
            completed: !milestone.completed,
            completedDate: !milestone.completed ? new Date().toISOString().split('T')[0] : undefined
          }
        : milestone
    ));
  };

  const getDaysUntilTarget = (targetDate: string) => {
    const target = new Date(targetDate);
    const today = new Date();
    const diffTime = target.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Trophy className="h-5 w-5 text-work" />
          Career Milestones
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Add New Milestone */}
        <div className="border rounded-lg p-4 space-y-3">
          <h4 className="font-semibold">Add New Milestone</h4>
          <div>
            <Label htmlFor="milestone-title">Title</Label>
            <Input
              id="milestone-title"
              value={newMilestone.title}
              onChange={(e) => setNewMilestone({ ...newMilestone, title: e.target.value })}
              placeholder="e.g., Senior Developer Promotion"
            />
          </div>
          <div>
            <Label htmlFor="milestone-description">Description</Label>
            <Textarea
              id="milestone-description"
              value={newMilestone.description}
              onChange={(e) => setNewMilestone({ ...newMilestone, description: e.target.value })}
              placeholder="Describe your milestone..."
              rows={2}
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label htmlFor="target-date">Target Date</Label>
              <Input
                id="target-date"
                type="date"
                value={newMilestone.targetDate}
                onChange={(e) => setNewMilestone({ ...newMilestone, targetDate: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="milestone-category">Category</Label>
              <select
                id="milestone-category"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                value={newMilestone.category}
                onChange={(e) => setNewMilestone({ ...newMilestone, category: e.target.value })}
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </div>
          <Button onClick={handleAddMilestone} style={{ backgroundColor: "#1565c0" }}>
            <Plus className="h-4 w-4 mr-2" />
            Add Milestone
          </Button>
        </div>

        {/* Milestones List */}
        <div className="space-y-3">
          {milestones.map((milestone) => {
            const daysUntil = getDaysUntilTarget(milestone.targetDate);
            return (
              <div key={milestone.id} className={`border rounded-lg p-4 ${milestone.completed ? 'bg-green-50' : ''}`}>
                <div className="flex justify-between items-start mb-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className={`font-semibold ${milestone.completed ? 'line-through text-green-700' : ''}`}>
                        {milestone.title}
                      </h4>
                      {milestone.completed && <CheckCircle className="h-5 w-5 text-green-600" />}
                    </div>
                    <p className="text-sm text-muted-foreground">{milestone.description}</p>
                    <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        Target: {new Date(milestone.targetDate).toLocaleDateString()}
                      </span>
                      <span className={`px-2 py-1 rounded-full ${
                        milestone.category === 'Career' ? 'bg-blue-100 text-blue-800' :
                        milestone.category === 'Certification' ? 'bg-purple-100 text-purple-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {milestone.category}
                      </span>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant={milestone.completed ? "secondary" : "outline"}
                    onClick={() => toggleMilestone(milestone.id)}
                  >
                    {milestone.completed ? "Completed" : "Mark Complete"}
                  </Button>
                </div>
                {!milestone.completed && (
                  <div className="text-sm">
                    {daysUntil > 0 ? (
                      <span className="text-blue-600">{daysUntil} days remaining</span>
                    ) : daysUntil === 0 ? (
                      <span className="text-orange-600">Due today!</span>
                    ) : (
                      <span className="text-red-600">{Math.abs(daysUntil)} days overdue</span>
                    )}
                  </div>
                )}
                {milestone.completed && milestone.completedDate && (
                  <div className="text-sm text-green-600">
                    Completed on {new Date(milestone.completedDate).toLocaleDateString()}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default CareerMilestones;
