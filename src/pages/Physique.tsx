import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/components/ui/use-toast";
import { Dumbbell, Moon, Apple, Target } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import WorkoutLogger from "@/components/physique/WorkoutLogger";

const Physique = () => {
  const { toast } = useToast();
  const [newMeal, setNewMeal] = useState("");

  const handleAddMeal = () => {
    if (newMeal.trim()) {
      toast({
        title: "Meal Logged",
        description: `"${newMeal}" has been added to your meal tracker.`,
      });
      setNewMeal("");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1 container py-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-lg" style={{ backgroundColor: "#ffab91" }}>
            <Dumbbell className="h-6 w-6" style={{ color: "#d84315" }} />
          </div>
          <h1 className="text-3xl font-bold">Physique Dashboard</h1>
        </div>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="workouts">Workouts</TabsTrigger>
            <TabsTrigger value="nutrition">Nutrition</TabsTrigger>
            <TabsTrigger value="progress">Progress</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Dumbbell className="h-5 w-5 text-physique" />
                        Workouts
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm">This Week</span>
                          <span className="font-semibold">3/4</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Streak</span>
                          <span className="font-semibold">7 days</span>
                        </div>
                        <Progress value={75} className="h-2" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Moon className="h-5 w-5 text-physique" />
                        Sleep
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm">Last Night</span>
                          <span className="font-semibold">7h 30m</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Average</span>
                          <span className="font-semibold">7h 15m</span>
                        </div>
                        <Progress value={85} className="h-2" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Apple className="h-5 w-5 text-physique" />
                        Nutrition
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm">Calories Today</span>
                          <span className="font-semibold">2,150</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Goal</span>
                          <span className="font-semibold">2,200</span>
                        </div>
                        <Progress value={95} className="h-2" />
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Recent Workouts</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="border rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-semibold">Upper Body Strength</h3>
                          <span className="text-sm text-muted-foreground">Today</span>
                        </div>
                        <p className="text-sm text-muted-foreground">45 minutes • Chest, Back, Shoulders</p>
                      </div>
                      <div className="border rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-semibold">Cardio Session</h3>
                          <span className="text-sm text-muted-foreground">Yesterday</span>
                        </div>
                        <p className="text-sm text-muted-foreground">30 minutes • Running + HIIT</p>
                      </div>
                      <div className="border rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-semibold">Leg Day</h3>
                          <span className="text-sm text-muted-foreground">2 days ago</span>
                        </div>
                        <p className="text-sm text-muted-foreground">60 minutes • Squats, Deadlifts, Lunges</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Quick Log</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="new-meal">Log Meal</Label>
                      <div className="flex gap-2 mt-1">
                        <Input
                          id="new-meal"
                          value={newMeal}
                          onChange={(e) => setNewMeal(e.target.value)}
                          placeholder="Meal description..."
                        />
                        <Button onClick={handleAddMeal} style={{ backgroundColor: "#d84315" }}>
                          Add
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Target className="h-5 w-5 text-physique" />
                      Health Goals
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="border-l-4 border-physique pl-3">
                        <p className="font-semibold text-sm">Workout 4x/week</p>
                        <p className="text-xs text-muted-foreground">Progress: 3/4 this week</p>
                      </div>
                      <div className="border-l-4 border-physique pl-3">
                        <p className="font-semibold text-sm">Sleep 7+ hours</p>
                        <p className="text-xs text-muted-foreground">Average: 7h 15m</p>
                      </div>
                      <div className="border-l-4 border-physique pl-3">
                        <p className="font-semibold text-sm">10,000 steps daily</p>
                        <p className="text-xs text-muted-foreground">Today: 8,500 steps</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="workouts">
            <WorkoutLogger />
          </TabsContent>

          <TabsContent value="nutrition">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Apple className="h-5 w-5 text-orange-600" />
                  Nutrition Tracker
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center text-muted-foreground">
                  <Apple className="h-16 w-16 mx-auto mb-4 opacity-50" />
                  <p>Comprehensive nutrition tracking coming soon</p>
                  <p className="text-sm mt-1">Track calories, macros, and meal planning</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="progress">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-orange-600" />
                  Progress Tracking
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center text-muted-foreground">
                  <Target className="h-16 w-16 mx-auto mb-4 opacity-50" />
                  <p>Progress photos and measurements coming soon</p>
                  <p className="text-sm mt-1">Track your physical transformation over time</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Physique;
