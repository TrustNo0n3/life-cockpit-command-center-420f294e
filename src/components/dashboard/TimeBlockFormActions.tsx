
import { Button } from "@/components/ui/button";
import { TimeBlock } from "@/types/timeBlock";

interface TimeBlockFormActionsProps {
  block?: TimeBlock;
  onCancel: () => void;
}

const TimeBlockFormActions = ({ block, onCancel }: TimeBlockFormActionsProps) => {
  return (
    <div className="flex gap-2 justify-end">
      <Button type="button" variant="outline" onClick={onCancel}>
        Cancel
      </Button>
      <Button type="submit">
        {block ? "Update" : "Create"} Time Block
      </Button>
    </div>
  );
};

export default TimeBlockFormActions;
