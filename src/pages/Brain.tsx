import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Brain, Lightbulb, BookOpen, Target, FolderOpen, Plus, ExternalLink, Trash2 } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import IdeaVault from "@/components/brain/IdeaVault";
import ResearchTracker from "@/components/brain/ResearchTracker";
import LearningGoals from "@/components/brain/LearningGoals";

interface BrainProject {
  id: string;
  title: string;
  description: string;
  category: string;
  status: "idea" | "planning" | "in-progress" | "completed" | "archived";
  technologies: string[];
  demoUrl?: string;
  githubUrl?: string;
  notes?: string;
}

const BrainPage = () => {
  const { toast } = useToast();
  const [newIdea, setNewIdea] = useState("");
  const [newResearch, setNewResearch] = useState("");
  const [isAddingProject, setIsAddingProject] = useState(false);

  const [projects, setProjects] = useState<BrainProject[]>([
    {
      id: "1",
      title: "Personal AI Assistant",
      description: "Developing a custom chatbot for personal productivity",
      category: "AI",
      status: "in-progress",
      technologies: ["Python", "OpenAI API", "Flask"],
      notes: "Focus on natural language processing for task management",
      demoUrl: "https://my-ai-assistant.vercel.app",
      githubUrl: "https://github.com/username/ai-assistant"
    },
    {
      id: "2",
      title: "Smart Home Automation",
      description: "IoT integration project for home automation",
      category: "IoT",
      status: "planning",
      technologies: ["Arduino", "Raspberry Pi", "MQTT"],
      notes: "Start with lighting and temperature control"
    },
    {
      id: "3",
      title: "Network Security Scanner",
      description: "Automated vulnerability scanning tool",
      category: "Cyber Security",
      status: "completed",
      technologies: ["Python", "Nmap", "SQLite"],
      demoUrl: "https://security-scanner-demo.com",
      githubUrl: "https://github.com/username/network-scanner"
    }
  ]);

  const [newProject, setNewProject] = useState({
    title: "",
    description: "",
    category: "AI",
    status: "idea" as const,
    technologies: "",
    notes: "",
    demoUrl: "",
    githubUrl: ""
  });

  const categories = [
    "AI",
    "Cyber Security", 
    "Life Management",
    "IoT",
    "Robot",
    "Automate Process",
    "Web Development",
    "Data Science",
    "Research"
  ];

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

  const handleAddProject = () => {
    if (!newProject.title.trim()) return;

    const project: BrainProject = {
      id: Date.now().toString(),
      title: newProject.title,
      description: newProject.description,
      category: newProject.category,
      status: newProject.status,
      technologies: newProject.technologies.split(",").map(t => t.trim()).filter(t => t),
      notes: newProject.notes || undefined,
      demoUrl: newProject.demoUrl || undefined,
      githubUrl: newProject.githubUrl || undefined
    };

    setProjects([...projects, project]);
    setNewProject({
      title: "",
      description: "",
      category: "AI",
      status: "idea",
      technologies: "",
      notes: "",
      demoUrl: "",
      githubUrl: ""
    });
    setIsAddingProject(false);

    toast({
      title: "Project Added",
      description: `"${project.title}" has been added to your brain portfolio.`,
    });
  };

  const handleDeleteProject = (id: string) => {
    setProjects(projects.filter(p => p.id !== id));
    toast({
      title: "Project Deleted",
      description: "Project has been removed from your portfolio.",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "bg-green-100 text-green-800";
      case "in-progress": return "bg-blue-100 text-blue-800";
      case "planning": return "bg-yellow-100 text-yellow-800";
      case "idea": return "bg-purple-100 text-purple-800";
      case "archived": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      "AI": "#6a1b9a",
      "Cyber Security": "#d32f2f",
      "Life Management": "#388e3c",
      "IoT": "#1976d2",
      "Robot": "#f57c00",
      "Automate Process": "#7b1fa2",
      "Web Development": "#0288d1",
      "Data Science": "#5d4037",
      "Research": "#455a64"
    };
    return colors[category as keyof typeof colors] || "#666";
  };

  const groupedProjects = projects.reduce((acc, project) => {
    if (!acc[project.category]) acc[project.category] = [];
    acc[project.category].push(project);
    return acc;
  }, {} as Record<string, BrainProject[]>);

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

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="ideas">Ideas</TabsTrigger>
            <TabsTrigger value="research">Research</TabsTrigger>
            <TabsTrigger value="learning">Learning</TabsTrigger>
            <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
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
                        {projects.filter(p => p.status === "in-progress").slice(0, 2).map(project => (
                          <div key={project.id} className="border rounded-lg p-3">
                            <h4 className="font-semibold">{project.title}</h4>
                            <p className="text-sm text-muted-foreground">{project.description}</p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <BookOpen className="h-5 w-5 text-brain" />
                        Research Progress
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
                    <CardTitle>Quick Stats</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div className="text-center p-4 border rounded-lg">
                        <div className="text-2xl font-bold text-brain">{projects.length}</div>
                        <p className="text-sm text-muted-foreground">Total Projects</p>
                      </div>
                      <div className="text-center p-4 border rounded-lg">
                        <div className="text-2xl font-bold text-green-600">
                          {projects.filter(p => p.status === "completed").length}
                        </div>
                        <p className="text-sm text-muted-foreground">Completed</p>
                      </div>
                      <div className="text-center p-4 border rounded-lg">
                        <div className="text-2xl font-bold text-blue-600">
                          {projects.filter(p => p.status === "in-progress").length}
                        </div>
                        <p className="text-sm text-muted-foreground">In Progress</p>
                      </div>
                      <div className="text-center p-4 border rounded-lg">
                        <div className="text-2xl font-bold text-purple-600">
                          {Object.keys(groupedProjects).length}
                        </div>
                        <p className="text-sm text-muted-foreground">Categories</p>
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
                      Active Learning Goals
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="border-l-4 border-brain pl-3">
                        <p className="font-semibold text-sm">Complete ML Course</p>
                        <p className="text-xs text-muted-foreground">Progress: 70%</p>
                      </div>
                      <div className="border-l-4 border-brain pl-3">
                        <p className="font-semibold text-sm">Master Kubernetes</p>
                        <p className="text-xs text-muted-foreground">Progress: 40%</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="ideas">
            <IdeaVault />
          </TabsContent>

          <TabsContent value="research">
            <ResearchTracker />
          </TabsContent>

          <TabsContent value="learning">
            <LearningGoals />
          </TabsContent>

          <TabsContent value="portfolio">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FolderOpen className="h-5 w-5 text-brain" />
                  Brain Portfolio
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center mb-4">
                  <p className="text-sm text-muted-foreground">{projects.length} projects in portfolio</p>
                  <Button 
                    onClick={() => setIsAddingProject(true)}
                    style={{ backgroundColor: "#6a1b9a" }}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Project
                  </Button>
                </div>

                {isAddingProject && (
                  <Card className="mb-4 border-dashed">
                    <CardContent className="pt-4">
                      <div className="space-y-3">
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <Label htmlFor="project-title">Project Title</Label>
                            <Input
                              id="project-title"
                              value={newProject.title}
                              onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                              placeholder="Enter project title..."
                            />
                          </div>
                          <div>
                            <Label htmlFor="category">Category</Label>
                            <select 
                              id="category"
                              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                              value={newProject.category}
                              onChange={(e) => setNewProject({ ...newProject, category: e.target.value })}
                            >
                              {categories.map(cat => (
                                <option key={cat} value={cat}>{cat}</option>
                              ))}
                            </select>
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="project-description">Description</Label>
                          <Textarea
                            id="project-description"
                            value={newProject.description}
                            onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                            placeholder="Describe your project..."
                            rows={2}
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <Label htmlFor="technologies">Technologies (comma-separated)</Label>
                            <Input
                              id="technologies"
                              value={newProject.technologies}
                              onChange={(e) => setNewProject({ ...newProject, technologies: e.target.value })}
                              placeholder="Python, React, Arduino..."
                            />
                          </div>
                          <div>
                            <Label htmlFor="status">Status</Label>
                            <select 
                              id="status"
                              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                              value={newProject.status}
                              onChange={(e) => setNewProject({ ...newProject, status: e.target.value as any })}
                            >
                              <option value="idea">Idea</option>
                              <option value="planning">Planning</option>
                              <option value="in-progress">In Progress</option>
                              <option value="completed">Completed</option>
                              <option value="archived">Archived</option>
                            </select>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <Label htmlFor="demo-url">Demo URL (Optional)</Label>
                            <Input
                              id="demo-url"
                              value={newProject.demoUrl}
                              onChange={(e) => setNewProject({ ...newProject, demoUrl: e.target.value })}
                              placeholder="https://your-demo.com"
                            />
                          </div>
                          <div>
                            <Label htmlFor="github-url">GitHub URL (Optional)</Label>
                            <Input
                              id="github-url"
                              value={newProject.githubUrl}
                              onChange={(e) => setNewProject({ ...newProject, githubUrl: e.target.value })}
                              placeholder="https://github.com/user/repo"
                            />
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="notes">Notes</Label>
                          <Textarea
                            id="notes"
                            value={newProject.notes}
                            onChange={(e) => setNewProject({ ...newProject, notes: e.target.value })}
                            placeholder="Additional notes or ideas..."
                            rows={2}
                          />
                        </div>
                        <div className="flex gap-2">
                          <Button onClick={handleAddProject} style={{ backgroundColor: "#6a1b9a" }}>
                            Add Project
                          </Button>
                          <Button onClick={() => setIsAddingProject(false)} variant="outline">
                            Cancel
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                <div className="space-y-6">
                  {Object.entries(groupedProjects).map(([category, categoryProjects]) => (
                    <div key={category}>
                      <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                        <div 
                          className="w-3 h-3 rounded-full" 
                          style={{ backgroundColor: getCategoryColor(category) }}
                        />
                        {category} ({categoryProjects.length})
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {categoryProjects.map((project) => (
                          <Card key={project.id} className="border">
                            <CardContent className="pt-4">
                              <div className="flex justify-between items-start mb-2">
                                <h4 className="font-semibold">{project.title}</h4>
                                <div className="flex items-center gap-2">
                                  <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(project.status)}`}>
                                    {project.status}
                                  </span>
                                  <Button size="sm" variant="ghost" onClick={() => handleDeleteProject(project.id)}>
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </div>
                              </div>
                              <p className="text-sm text-muted-foreground mb-3">{project.description}</p>
                              {project.technologies.length > 0 && (
                                <div className="flex flex-wrap gap-1 mb-3">
                                  {project.technologies.map((tech, index) => (
                                    <span key={index} className="px-2 py-1 bg-muted rounded text-xs">
                                      {tech}
                                    </span>
                                  ))}
                                </div>
                              )}
                              {project.notes && (
                                <p className="text-xs text-muted-foreground mb-3 italic">{project.notes}</p>
                              )}
                              <div className="flex gap-2">
                                {project.demoUrl && (
                                  <Button size="sm" variant="outline" asChild>
                                    <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                                      <ExternalLink className="h-4 w-4 mr-1" />
                                      Demo
                                    </a>
                                  </Button>
                                )}
                                {project.githubUrl && (
                                  <Button size="sm" variant="outline" asChild>
                                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                                      <ExternalLink className="h-4 w-4 mr-1" />
                                      GitHub
                                    </a>
                                  </Button>
                                )}
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default BrainPage;
