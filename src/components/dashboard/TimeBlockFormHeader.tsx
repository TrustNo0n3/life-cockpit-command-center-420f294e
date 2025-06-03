
import { Button } from "@/components/ui/button";
import { CardHeader, CardTitle } from "@/components/ui/card";
import { X } from "lucide-react";
import { TimeBlock } from "@/types/timeBlock";

interface TimeBlockFormHeaderProps {
  block?: TimeBlock;
  onCancel: () => void;
}

const TimeBlockFormHeader = ({ block, onCancel }: TimeBlockFormHeaderProps) => {
  return (
    <CardHeader>
      <div className="flex items-center justify-between">
        <CardTitle>{block ? "Edit Time Block" : "Add Time Block"}</CardTitle>
        <Button variant="ghost" size="sm" onClick={onCancel}>
          <X className="h-4 w-4" />
        </Button>
      </div>
    </CardHeader>
  );
};

export default TimeBlockFormHeader;
