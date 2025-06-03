
export interface TimeBlock {
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

export interface TimeBlockFormProps {
  block?: TimeBlock;
  onSave: (block: Omit<TimeBlock, 'id'>) => void;
  onCancel: () => void;
}

export const domains = [
  { value: "financial", label: "Financial" },
  { value: "work", label: "Work" },
  { value: "brain", label: "Brain" },
  { value: "physique", label: "Physique" },
  { value: "mind", label: "Mind" },
  { value: "soul", label: "Soul" },
];

export const types = [
  { value: "goal", label: "Goal" },
  { value: "project", label: "Project" },
  { value: "habit", label: "Habit" },
  { value: "event", label: "Event" },
];

export const priorities = [
  { value: "low", label: "Low" },
  { value: "medium", label: "Medium" },
  { value: "high", label: "High" },
];
