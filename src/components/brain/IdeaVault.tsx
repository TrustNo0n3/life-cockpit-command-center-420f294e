
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { Lightbulb, Search, Plus, Trash2, Tag } from "lucide-react";

interface Idea {
  id: string;
  title: string;
  description?: string;
  tags: string[];
  category: "app" | "business" | "general";
  createdAt: Date;
}

const IdeaVault = () => {
  const { toast } = useToast();
  const [ideas, setIdeas] = useState<Idea[]>([
    {
      id: "1",
      title: "Voice-controlled expense tracker",
      description: "Track expenses using voice commands and AI categorization",
      tags: ["fintech", "ai", "mobile"],
      category: "app",
      createdAt: new Date("2024-01-15")
    },
    {
      id: "2",
      title: "Security consulting for SMBs",
      description: "Affordable cybersecurity consulting service for small businesses",
      tags: ["cybersecurity", "consulting", "b2b"],
      category: "business",
      createdAt: new Date("2024-01-20")
    }
  ]);

  const [newIdea, setNewIdea] = useState({
    title: "",
    description: "",
    tags: "",
    category: "general" as const
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState<string>("all");

  const handleAddIdea = () => {
    if (!newIdea.title.trim()) return;

    const idea: Idea = {
      id: Date.now().toString(),
      title: newIdea.title,
      description: newIdea.description || undefined,
      tags: newIdea.tags.split(",").map(t => t.trim()).filter(t => t),
      category: newIdea.category,
      createdAt: new Date()
    };

    setIdeas([idea, ...ideas]);
    setNewIdea({ title: "", description: "", tags: "", category: "general" });
    
    toast({
      title: "Idea Captured",
      description: `"${idea.title}" has been added to your idea vault.`,
    });
  };

  const handleDeleteIdea = (id: string) => {
    setIdeas(ideas.filter(i => i.id !== id));
    toast({
      title: "Idea Deleted",
      description: "Idea has been removed from your vault.",
    });
  };

  const filteredIdeas = ideas.filter(idea => {
    const matchesSearch = idea.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         idea.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         idea.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = filterCategory === "all" || idea.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "app": return "bg-blue-100 text-blue-800";
      case "business": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Lightbulb className="h-5 w-5 text-brain" />
          Idea Vault
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Add New Idea */}
        <div className="border rounded-lg p-4 space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label htmlFor="idea-title">Idea Title</Label>
              <Input
                id="idea-title"
                value={newIdea.title}
                onChange={(e) => setNewIdea({ ...newIdea, title: e.target.value })}
                placeholder="Your brilliant idea..."
              />
            </div>
            <div>
              <Label htmlFor="idea-category">Category</Label>
              <select 
                id="idea-category"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                value={newIdea.category}
                onChange={(e) => setNewIdea({ ...newIdea, category: e.target.value as any })}
              >
                <option value="general">General</option>
                <option value="app">App Idea</option>
                <option value="business">Business Concept</option>
              </select>
            </div>
          </div>
          <div>
            <Label htmlFor="idea-description">Description (Optional)</Label>
            <Input
              id="idea-description"
              value={newIdea.description}
              onChange={(e) => setNewIdea({ ...newIdea, description: e.target.value })}
              placeholder="Brief description of your idea..."
            />
          </div>
          <div>
            <Label htmlFor="idea-tags">Tags (comma-separated)</Label>
            <Input
              id="idea-tags"
              value={newIdea.tags}
              onChange={(e) => setNewIdea({ ...newIdea, tags: e.target.value })}
              placeholder="ai, mobile, fintech..."
            />
          </div>
          <Button onClick={handleAddIdea} style={{ backgroundColor: "#6a1b9a" }}>
            <Plus className="h-4 w-4 mr-2" />
            Capture Idea
          </Button>
        </div>

        {/* Search and Filter */}
        <div className="flex gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search ideas..."
              className="pl-10"
            />
          </div>
          <select 
            className="flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
          >
            <option value="all">All Categories</option>
            <option value="app">App Ideas</option>
            <option value="business">Business</option>
            <option value="general">General</option>
          </select>
        </div>

        {/* Ideas List */}
        <div className="space-y-3">
          {filteredIdeas.map((idea) => (
            <div key={idea.id} className="border rounded-lg p-3">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-semibold">{idea.title}</h4>
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-1 rounded-full text-xs ${getCategoryColor(idea.category)}`}>
                    {idea.category}
                  </span>
                  <Button size="sm" variant="ghost" onClick={() => handleDeleteIdea(idea.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              {idea.description && (
                <p className="text-sm text-muted-foreground mb-2">{idea.description}</p>
              )}
              <div className="flex flex-wrap gap-1 mb-2">
                {idea.tags.map((tag, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    <Tag className="h-3 w-3 mr-1" />
                    {tag}
                  </Badge>
                ))}
              </div>
              <p className="text-xs text-muted-foreground">
                Added {idea.createdAt.toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default IdeaVault;
