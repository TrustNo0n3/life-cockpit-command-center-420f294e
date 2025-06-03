
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, X } from "lucide-react";
import { format } from "date-fns";

interface TimeBlock {
  id: string;
  title: string;
  domain: string;
  startDate: Date;
  endDate: Date;
  type: "goal" | "project" | "habit" | "event";
  progress: number;
  description?: string;
  priority: "low" | "medium" | "high";
  estimatedHours?: number;
}

interface TimeBlockFormProps {
  block?: TimeBlock;
  onSave: (block: Omit<TimeBlock, 'id'>) => void;
  onCancel: () => void;
}

const TimeBlockForm = ({ block, onSave, onCancel }: TimeBlockFormProps) => {
  const [title, setTitle] = useState(block?.title || "");
  const [domain, setDomain] = useState(block?.domain || "");
  const [startDate, setStartDate] = useState<Date | undefined>(block?.startDate || new Date());
  const [endDate, setEndDate] = useState<Date | undefined>(block?.endDate || new Date());
  const [type, setType] = useState(block?.type || "goal");
  const [description, setDescription] = useState(block?.description || "");
  const [priority, setPriority] = useState(block?.priority || "medium");
  const [estimatedHours, setEstimatedHours] = useState(block?.estimatedHours?.toString() || "");
  const [progress, setProgress] = useState(block?.progress || 0);

  const domains = [
    { value: "financial", label: "Financial" },
    { value: "work", label: "Work" },
    { value: "brain", label: "Brain" },
    { value: "physique", label: "Physique" },
    { value: "mind", label: "Mind" },
    { value: "soul", label: "Soul" },
  ];

  const types = [
    { value: "goal", label: "Goal" },
    { value: "project", label: "Project" },
    { value: "habit", label: "Habit" },
    { value: "event", label: "Event" },
  ];

  const priorities = [
    { value: "low", label: "Low" },
    { value: "medium", label: "Medium" },
    { value: "high", label: "High" },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !domain || !startDate || !endDate) return;

    onSave({
      title,
      domain,
      startDate,
      endDate,
      type: type as "goal" | "project" | "habit" | "event",
      description,
      priority: priority as "low" | "medium" | "high",
      estimatedHours: estimatedHours ? parseInt(estimatedHours) : undefined,
      progress,
    });
  };

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>{block ? "Edit Time Block" : "Add Time Block"}</CardTitle>
          <Button variant="ghost" size="sm" onClick={onCancel}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter title..."
                required
              />
            </div>
            <div>
              <Label htmlFor="domain">Domain</Label>
              <Select value={domain} onValueChange={setDomain} required>
                <SelectTrigger>
                  <SelectValue placeholder="Select domain" />
                </SelectTrigger>
                <SelectContent>
                  {domains.map((d) => (
                    <SelectItem key={d.value} value={d.value}>
                      {d.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="type">Type</Label>
              <Select value={type} onValueChange={setType}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {types.map((t) => (
                    <SelectItem key={t.value} value={t.value}>
                      {t.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="priority">Priority</Label>
              <Select value={priority} onValueChange={setPriority}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {priorities.map((p) => (
                    <SelectItem key={p.value} value={p.value}>
                      {p.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Start Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left font-normal">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {startDate ? format(startDate, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={startDate}
                    onSelect={setStartDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div>
              <Label>End Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left font-normal">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {endDate ? format(endDate, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={endDate}
                    onSelect={setEndDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="estimatedHours">Estimated Hours</Label>
              <Input
                id="estimatedHours"
                type="number"
                value={estimatedHours}
                onChange={(e) => setEstimatedHours(e.target.value)}
                placeholder="Optional"
              />
            </div>
            <div>
              <Label htmlFor="progress">Progress (%)</Label>
              <Input
                id="progress"
                type="number"
                min="0"
                max="100"
                value={progress}
                onChange={(e) => setProgress(parseInt(e.target.value) || 0)}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Optional description..."
              rows={3}
            />
          </div>

          <div className="flex gap-2 justify-end">
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit">
              {block ? "Update" : "Create"} Time Block
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default TimeBlockForm;
