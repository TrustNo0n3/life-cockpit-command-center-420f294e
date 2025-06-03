
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { BookOpen, Plus, ExternalLink, Trash2, FileText } from "lucide-react";

interface ResearchItem {
  id: string;
  title: string;
  url?: string;
  type: "paper" | "article" | "video" | "book" | "course";
  notes?: string;
  status: "to-read" | "reading" | "completed";
  tags: string[];
  addedAt: Date;
}

const ResearchTracker = () => {
  const { toast } = useToast();
  const [research, setResearch] = useState<ResearchItem[]>([
    {
      id: "1",
      title: "Attention Is All You Need",
      url: "https://arxiv.org/abs/1706.03762",
      type: "paper",
      notes: "Foundational transformer paper - key concepts for understanding modern LLMs",
      status: "completed",
      tags: ["ai", "transformers", "nlp"],
      addedAt: new Date("2024-01-10")
    },
    {
      id: "2",
      title: "Zero Trust Network Security",
      url: "https://example.com/zero-trust",
      type: "article",
      notes: "Comprehensive overview of zero trust principles",
      status: "reading",
      tags: ["cybersecurity", "zero-trust", "networking"],
      addedAt: new Date("2024-01-12")
    }
  ]);

  const [newItem, setNewItem] = useState({
    title: "",
    url: "",
    type: "article" as const,
    notes: "",
    tags: ""
  });

  const handleAddItem = () => {
    if (!newItem.title.trim()) return;

    const item: ResearchItem = {
      id: Date.now().toString(),
      title: newItem.title,
      url: newItem.url || undefined,
      type: newItem.type,
      notes: newItem.notes || undefined,
      status: "to-read",
      tags: newItem.tags.split(",").map(t => t.trim()).filter(t => t),
      addedAt: new Date()
    };

    setResearch([item, ...research]);
    setNewItem({ title: "", url: "", type: "article", notes: "", tags: "" });
    
    toast({
      title: "Research Added",
      description: `"${item.title}" has been added to your research tracker.`,
    });
  };

  const handleDeleteItem = (id: string) => {
    setResearch(research.filter(r => r.id !== id));
    toast({
      title: "Research Item Deleted",
      description: "Item has been removed from your research tracker.",
    });
  };

  const handleStatusChange = (id: string, status: ResearchItem["status"]) => {
    setResearch(research.map(item => 
      item.id === id ? { ...item, status } : item
    ));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "bg-green-100 text-green-800";
      case "reading": return "bg-blue-100 text-blue-800";
      case "to-read": return "bg-yellow-100 text-yellow-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "paper": return "📄";
      case "article": return "📰";
      case "video": return "🎥";
      case "book": return "📚";
      case "course": return "🎓";
      default: return "📄";
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-brain" />
          Research Tracker
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Add New Research */}
        <div className="border rounded-lg p-4 space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label htmlFor="research-title">Title</Label>
              <Input
                id="research-title"
                value={newItem.title}
                onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
                placeholder="Research title..."
              />
            </div>
            <div>
              <Label htmlFor="research-type">Type</Label>
              <select 
                id="research-type"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                value={newItem.type}
                onChange={(e) => setNewItem({ ...newItem, type: e.target.value as any })}
              >
                <option value="article">Article</option>
                <option value="paper">Academic Paper</option>
                <option value="video">Video</option>
                <option value="book">Book</option>
                <option value="course">Course</option>
              </select>
            </div>
          </div>
          <div>
            <Label htmlFor="research-url">URL (Optional)</Label>
            <Input
              id="research-url"
              value={newItem.url}
              onChange={(e) => setNewItem({ ...newItem, url: e.target.value })}
              placeholder="https://..."
            />
          </div>
          <div>
            <Label htmlFor="research-tags">Tags (comma-separated)</Label>
            <Input
              id="research-tags"
              value={newItem.tags}
              onChange={(e) => setNewItem({ ...newItem, tags: e.target.value })}
              placeholder="ai, machine learning, research..."
            />
          </div>
          <div>
            <Label htmlFor="research-notes">Notes (Optional)</Label>
            <Textarea
              id="research-notes"
              value={newItem.notes}
              onChange={(e) => setNewItem({ ...newItem, notes: e.target.value })}
              placeholder="Key points, summary, or why this is important..."
              rows={2}
            />
          </div>
          <Button onClick={handleAddItem} style={{ backgroundColor: "#6a1b9a" }}>
            <Plus className="h-4 w-4 mr-2" />
            Add Research
          </Button>
        </div>

        {/* Research List */}
        <div className="space-y-3">
          {research.map((item) => (
            <div key={item.id} className="border rounded-lg p-3">
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-lg">{getTypeIcon(item.type)}</span>
                  <h4 className="font-semibold">{item.title}</h4>
                  {item.url && (
                    <Button size="sm" variant="ghost" asChild>
                      <a href={item.url} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </Button>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <select 
                    className="text-xs px-2 py-1 rounded border"
                    value={item.status}
                    onChange={(e) => handleStatusChange(item.id, e.target.value as any)}
                  >
                    <option value="to-read">To Read</option>
                    <option value="reading">Reading</option>
                    <option value="completed">Completed</option>
                  </select>
                  <Button size="sm" variant="ghost" onClick={() => handleDeleteItem(item.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              {item.notes && (
                <div className="mb-2 p-2 bg-muted rounded text-sm">
                  <FileText className="h-4 w-4 inline mr-1" />
                  {item.notes}
                </div>
              )}
              
              <div className="flex flex-wrap gap-1 mb-2">
                {item.tags.map((tag, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
              
              <div className="flex justify-between items-center text-xs text-muted-foreground">
                <span>Added {item.addedAt.toLocaleDateString()}</span>
                <span className={`px-2 py-1 rounded-full ${getStatusColor(item.status)}`}>
                  {item.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ResearchTracker;
