
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/components/ui/use-toast";
import { BarChart3, TrendingUp, Star } from "lucide-react";

interface SatisfactionArea {
  id: string;
  name: string;
  score: number;
  description: string;
  color: string;
}

const LifeSatisfaction = () => {
  const { toast } = useToast();
  const [areas, setAreas] = useState<SatisfactionArea[]>([
    { id: "1", name: "Career", score: 7, description: "Professional growth and fulfillment", color: "#1565c0" },
    { id: "2", name: "Relationships", score: 9, description: "Family, friends, and social connections", color: "#c2185b" },
    { id: "3", name: "Health", score: 6, description: "Physical and mental wellbeing", color: "#388e3c" },
    { id: "4", name: "Personal Growth", score: 8, description: "Learning and self-development", color: "#f57c00" },
    { id: "5", name: "Recreation", score: 8, description: "Hobbies and leisure activities", color: "#7b1fa2" },
    { id: "6", name: "Finances", score: 5, description: "Financial security and goals", color: "#d32f2f" }
  ]);

  const updateScore = (id: string, newScore: number) => {
    setAreas(areas.map(area => 
      area.id === id ? { ...area, score: newScore } : area
    ));
  };

  const averageScore = areas.reduce((sum, area) => sum + area.score, 0) / areas.length;

  const saveAssessment = () => {
    toast({
      title: "Life Satisfaction Updated",
      description: `Your overall satisfaction score is ${averageScore.toFixed(1)}/10`,
    });
  };

  const getSatisfactionLevel = (score: number) => {
    if (score >= 8) return { label: "Excellent", color: "text-green-600" };
    if (score >= 6) return { label: "Good", color: "text-blue-600" };
    if (score >= 4) return { label: "Fair", color: "text-yellow-600" };
    return { label: "Needs Attention", color: "text-red-600" };
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart3 className="h-5 w-5 text-soul" />
          Life Satisfaction Assessment
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Overall Score */}
        <div className="text-center p-4 border rounded-lg bg-gradient-to-r from-soul/10 to-transparent">
          <div className="text-3xl font-bold text-soul">{averageScore.toFixed(1)}/10</div>
          <div className="text-sm text-muted-foreground">Overall Life Satisfaction</div>
          <div className={`text-sm font-medium ${getSatisfactionLevel(averageScore).color}`}>
            {getSatisfactionLevel(averageScore).label}
          </div>
        </div>

        {/* Satisfaction Areas */}
        <div className="space-y-4">
          {areas.map(area => {
            const level = getSatisfactionLevel(area.score);
            return (
              <div key={area.id} className="border rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <div>
                    <h4 className="font-semibold">{area.name}</h4>
                    <p className="text-sm text-muted-foreground">{area.description}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-bold" style={{ color: area.color }}>
                      {area.score}/10
                    </div>
                    <div className={`text-xs ${level.color}`}>{level.label}</div>
                  </div>
                </div>
                
                <div className="mb-3">
                  <Progress value={area.score * 10} className="h-2" />
                </div>

                <div className="flex justify-center gap-1">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(score => (
                    <button
                      key={score}
                      onClick={() => updateScore(area.id, score)}
                      className={`w-8 h-8 rounded text-xs font-medium transition-colors ${
                        score <= area.score 
                          ? 'text-white' 
                          : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
                      }`}
                      style={{ 
                        backgroundColor: score <= area.score ? area.color : undefined 
                      }}
                    >
                      {score}
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Areas for Improvement */}
        <div className="border rounded-lg p-4 bg-yellow-50">
          <h4 className="font-semibold mb-2 flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            Areas for Improvement
          </h4>
          <div className="space-y-2">
            {areas
              .filter(area => area.score < 7)
              .sort((a, b) => a.score - b.score)
              .map(area => (
                <div key={area.id} className="flex justify-between items-center text-sm">
                  <span>{area.name}</span>
                  <span className="text-muted-foreground">{area.score}/10</span>
                </div>
              ))}
            {areas.filter(area => area.score < 7).length === 0 && (
              <p className="text-sm text-muted-foreground">Great job! All areas are scoring well.</p>
            )}
          </div>
        </div>

        <Button onClick={saveAssessment} className="w-full" style={{ backgroundColor: "#f9a825" }}>
          Save Assessment
        </Button>
      </CardContent>
    </Card>
  );
};

export default LifeSatisfaction;
