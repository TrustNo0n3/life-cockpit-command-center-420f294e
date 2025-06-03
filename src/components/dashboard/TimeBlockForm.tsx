
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { TimeBlockFormProps } from "@/types/timeBlock";
import TimeBlockFormHeader from "./TimeBlockFormHeader";
import TimeBlockFormFields from "./TimeBlockFormFields";
import TimeBlockFormActions from "./TimeBlockFormActions";

const TimeBlockForm = ({ block, onSave, onCancel }: TimeBlockFormProps) => {
  const [title, setTitle] = useState(block?.title || "");
  const [domain, setDomain] = useState(block?.domain || "");
  const [startDate, setStartDate] = useState<Date | undefined>(block?.startDate || new Date());
  const [endDate, setEndDate] = useState<Date | undefined>(block?.endDate || new Date());
  const [type, setType] = useState<"goal" | "project" | "habit" | "event">(block?.type || "goal");
  const [description, setDescription] = useState(block?.description || "");
  const [priority, setPriority] = useState<"low" | "medium" | "high">(block?.priority || "medium");
  const [estimatedHours, setEstimatedHours] = useState(block?.estimatedHours?.toString() || "");
  const [progress, setProgress] = useState(block?.progress || 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !domain || !startDate || !endDate) return;

    onSave({
      title,
      domain,
      startDate,
      endDate,
      type,
      description,
      priority,
      estimatedHours: estimatedHours ? parseInt(estimatedHours) : undefined,
      progress,
    });
  };

  return (
    <Card className="w-full max-w-2xl">
      <TimeBlockFormHeader block={block} onCancel={onCancel} />
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <TimeBlockFormFields
            title={title}
            setTitle={setTitle}
            domain={domain}
            setDomain={setDomain}
            startDate={startDate}
            setStartDate={setStartDate}
            endDate={endDate}
            setEndDate={setEndDate}
            type={type}
            setType={setType}
            description={description}
            setDescription={setDescription}
            priority={priority}
            setPriority={setPriority}
            estimatedHours={estimatedHours}
            setEstimatedHours={setEstimatedHours}
            progress={progress}
            setProgress={setProgress}
          />
          <TimeBlockFormActions block={block} onCancel={onCancel} />
        </form>
      </CardContent>
    </Card>
  );
};

export default TimeBlockForm;
