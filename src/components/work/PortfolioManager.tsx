
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { FolderOpen, Plus, ExternalLink, Edit, Trash2 } from "lucide-react";

interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  status: "completed" | "in-progress" | "planning";
  demoUrl?: string;
  githubUrl?: string;
  imageUrl?: string;
}

const PortfolioManager = () => {
  const { toast } = useToast();
  const [isAddingProject, setIsAddingProject] = useState(false);
  const [projects, setProjects] = useState<Project[]>([
    {
      id: "1",
      title: "Network Security Dashboard",
      description: "Real-time monitoring dashboard for network security threats and vulnerabilities.",
      technologies: ["React", "Node.js", "MongoDB", "Docker"],
      status: "completed",
      demoUrl: "https://demo.example.com",
      githubUrl: "https://github.com/example/project"
    },
    {
      id: "2",
      title: "Vulnerability Scanner",
      description: "Automated vulnerability scanning tool for web applications.",
      technologies: ["Python", "Flask", "PostgreSQL"],
      status: "in-progress"
    }
  ]);

  const [newProject, setNewProject] = useState({
    title: "",
    description: "",
    technologies: "",
    status: "planning" as const,
    demoUrl: "",
    githubUrl: ""
  });

  const handleAddProject = () => {
    if (!newProject.title.trim()) return;

    const project: Project = {
      id: Date.now().toString(),
      title: newProject.title,
      description: newProject.description,
      technologies: newProject.technologies.split(",").map(t => t.trim()),
      status: newProject.status,
      demoUrl: newProject.demoUrl || undefined,
      githubUrl: newProject.githubUrl || undefined
    };

    setProjects([...projects, project]);
    setNewProject({
      title: "",
      description: "",
      technologies: "",
      status: "planning",
      demoUrl: "",
      githubUrl: ""
    });
    setIsAddingProject(false);

    toast({
      title: "Project Added",
      description: `"${project.title}" has been added to your portfolio.`,
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
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FolderOpen className="h-5 w-5 text-work" />
          Portfolio Projects
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center mb-4">
          <p className="text-sm text-muted-foreground">{projects.length} projects in portfolio</p>
          <Button 
            onClick={() => setIsAddingProject(true)}
            style={{ backgroundColor: "#1565c0" }}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Project
          </Button>
        </div>

        {isAddingProject && (
          <Card className="mb-4 border-dashed">
            <CardContent className="pt-4">
              <div className="space-y-3">
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
                      placeholder="React, Node.js, MongoDB..."
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
                      <option value="planning">Planning</option>
                      <option value="in-progress">In Progress</option>
                      <option value="completed">Completed</option>
                    </select>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button onClick={handleAddProject} style={{ backgroundColor: "#1565c0" }}>
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

        <div className="space-y-3">
          {projects.map((project) => (
            <Card key={project.id} className="border">
              <CardContent className="pt-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold">{project.title}</h3>
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
                <div className="flex flex-wrap gap-1 mb-3">
                  {project.technologies.map((tech, index) => (
                    <span key={index} className="px-2 py-1 bg-muted rounded text-xs">
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  {project.demoUrl && (
                    <Button size="sm" variant="outline">
                      <ExternalLink className="h-4 w-4 mr-1" />
                      Demo
                    </Button>
                  )}
                  {project.githubUrl && (
                    <Button size="sm" variant="outline">
                      <ExternalLink className="h-4 w-4 mr-1" />
                      GitHub
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default PortfolioManager;
