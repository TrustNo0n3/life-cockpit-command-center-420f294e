
import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/components/ui/use-toast";
import { Briefcase, Target, BookOpen, Award } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CVManager from "@/components/work/CVManager";
import PortfolioManager from "@/components/work/PortfolioManager";
import SkillTracker from "@/components/work/SkillTracker";
import CareerMilestones from "@/components/work/CareerMilestones";

const Work = () => {
  const { toast } = useToast();
  const [newTask, setNewTask] = useState("");
  const [newProject, setNewProject] = useState("");

  const handleAddTask = () => {
    if (newTask.trim()) {
      toast({
        title: "Task Added",
        description: `"${newTask}" has been added to your work tasks.`,
      });
      setNewTask("");
    }
  };

  const handleAddProject = () => {
    if (newProject.trim()) {
      toast({
        title: "Project Added",
        description: `"${newProject}" has been added to your projects.`,
      });
      setNewProject("");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1 container py-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-lg" style={{ backgroundColor: "#90caf9" }}>
            <Briefcase className="h-6 w-6" style={{ color: "#1565c0" }} />
          </div>
          <h1 className="text-3xl font-bold">Work Dashboard</h1>
        </div>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="cv">CV Manager</TabsTrigger>
            <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
            <TabsTrigger value="skills">Skills</TabsTrigger>
            <TabsTrigger value="milestones">Milestones</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Stats Overview */}
              <div className="lg:col-span-2 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Target className="h-5 w-5 text-work" />
                        Annual Goals
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>IT Certification</span>
                            <span>80%</span>
                          </div>
                          <Progress value={80} className="h-2" />
                        </div>
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Leadership Training</span>
                            <span>45%</span>
                          </div>
                          <Progress value={45} className="h-2" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <BookOpen className="h-5 w-5 text-work" />
                        Learning Progress
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-sm">Courses Completed</span>
                          <span className="font-semibold">3/5</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Study Hours</span>
                          <span className="font-semibold">24h</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Next Milestone</span>
                          <span className="font-semibold text-work">Security+</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Active Projects</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="border rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-semibold">Network Security Audit</h3>
                          <span className="text-sm text-muted-foreground">Due: Next Week</span>
                        </div>
                        <Progress value={75} className="mb-2" />
                        <p className="text-sm text-muted-foreground">Vulnerability assessment and penetration testing</p>
                      </div>
                      <div className="border rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-semibold">Security Policy Update</h3>
                          <span className="text-sm text-muted-foreground">Due: End of Month</span>
                        </div>
                        <Progress value={30} className="mb-2" />
                        <p className="text-sm text-muted-foreground">Updating company security protocols</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Quick Actions */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Quick Add</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="new-task">New Task</Label>
                      <div className="flex gap-2 mt-1">
                        <Input
                          id="new-task"
                          value={newTask}
                          onChange={(e) => setNewTask(e.target.value)}
                          placeholder="Enter task..."
                        />
                        <Button onClick={handleAddTask} style={{ backgroundColor: "#1565c0" }}>
                          Add
                        </Button>
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="new-project">New Project</Label>
                      <div className="flex gap-2 mt-1">
                        <Input
                          id="new-project"
                          value={newProject}
                          onChange={(e) => setNewProject(e.target.value)}
                          placeholder="Enter project..."
                        />
                        <Button onClick={handleAddProject} style={{ backgroundColor: "#1565c0" }}>
                          Add
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Award className="h-5 w-5 text-work" />
                      Recent Achievements
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="border-l-4 border-work pl-3">
                        <p className="font-semibold text-sm">Completed Security Training</p>
                        <p className="text-xs text-muted-foreground">2 days ago</p>
                      </div>
                      <div className="border-l-4 border-work pl-3">
                        <p className="font-semibold text-sm">Project Milestone Reached</p>
                        <p className="text-xs text-muted-foreground">1 week ago</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="cv">
            <CVManager />
          </TabsContent>

          <TabsContent value="portfolio">
            <PortfolioManager />
          </TabsContent>

          <TabsContent value="skills">
            <SkillTracker />
          </TabsContent>

          <TabsContent value="milestones">
            <CareerMilestones />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Work;
