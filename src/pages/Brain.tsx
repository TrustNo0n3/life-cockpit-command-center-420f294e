
import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { Brain, Lightbulb, BookOpen, Target } from "lucide-react";

const BrainPage = () => {
  const { toast } = useToast();
  const [newIdea, setNewIdea] = useState("");
  const [newResearch, setNewResearch] = useState("");

  const handleAddIdea = () => {
    if (newIdea.trim()) {
      toast({
        title: "Idea Captured",
        description: `"${newIdea}" has been added to your idea vault.`,
      });
      setNewIdea("");
    }
  };

  const handleAddResearch = () => {
    if (newResearch.trim()) {
      toast({
        title: "Research Added",
        description: `"${newResearch}" has been added to your research topics.`,
      });
      setNewResearch("");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1 container py-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-lg" style={{ backgroundColor: "#ce93d8" }}>
            <Brain className="h-6 w-6" style={{ color: "#6a1b9a" }} />
          </div>
          <h1 className="text-3xl font-bold">Brain Dashboard</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Lightbulb className="h-5 w-5 text-brain" />
                    Active Projects
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="border rounded-lg p-3">
                      <h4 className="font-semibold">Personal AI Assistant</h4>
                      <p className="text-sm text-muted-foreground">Developing a custom chatbot</p>
                    </div>
                    <div className="border rounded-lg p-3">
                      <h4 className="font-semibold">Smart Home Automation</h4>
                      <p className="text-sm text-muted-foreground">IoT integration project</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-brain" />
                    Research Topics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Machine Learning</span>
                      <span className="text-xs text-muted-foreground">5 papers</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Cybersecurity Trends</span>
                      <span className="text-xs text-muted-foreground">3 articles</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Blockchain Technology</span>
                      <span className="text-xs text-muted-foreground">2 whitepapers</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Idea Vault</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border rounded-lg p-4">
                    <h4 className="font-semibold mb-2">App Ideas</h4>
                    <ul className="space-y-1 text-sm">
                      <li>• Voice-controlled expense tracker</li>
                      <li>• AR fitness companion</li>
                      <li>• Habit formation game</li>
                    </ul>
                  </div>
                  <div className="border rounded-lg p-4">
                    <h4 className="font-semibold mb-2">Business Concepts</h4>
                    <ul className="space-y-1 text-sm">
                      <li>• Security consulting for SMBs</li>
                      <li>• Tech education platform</li>
                      <li>• Automation service</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Quick Capture</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="new-idea">New Idea</Label>
                  <div className="flex gap-2 mt-1">
                    <Input
                      id="new-idea"
                      value={newIdea}
                      onChange={(e) => setNewIdea(e.target.value)}
                      placeholder="Capture your idea..."
                    />
                    <Button onClick={handleAddIdea} style={{ backgroundColor: "#6a1b9a" }}>
                      Add
                    </Button>
                  </div>
                </div>
                <div>
                  <Label htmlFor="new-research">Research Topic</Label>
                  <div className="flex gap-2 mt-1">
                    <Input
                      id="new-research"
                      value={newResearch}
                      onChange={(e) => setNewResearch(e.target.value)}
                      placeholder="Add research topic..."
                    />
                    <Button onClick={handleAddResearch} style={{ backgroundColor: "#6a1b9a" }}>
                      Add
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-brain" />
                  Learning Goals
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="border-l-4 border-brain pl-3">
                    <p className="font-semibold text-sm">Complete ML Course</p>
                    <p className="text-xs text-muted-foreground">Progress: 70%</p>
                  </div>
                  <div className="border-l-4 border-brain pl-3">
                    <p className="font-semibold text-sm">Read 5 Tech Papers</p>
                    <p className="text-xs text-muted-foreground">Progress: 3/5</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default BrainPage;
