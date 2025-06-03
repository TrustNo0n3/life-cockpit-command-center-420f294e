
interface CalendarEvent {
  title: string;
  day: string;
  type: 'financial' | 'work' | 'brain' | 'physique' | 'mind' | 'soul';
}

interface CalendarGlimpseProps {
  events: CalendarEvent[];
}

const CalendarGlimpse = ({ events }: CalendarGlimpseProps) => {
  const typeColors = {
    financial: 'bg-financial-lighter',
    work: 'bg-work-lighter',
    brain: 'bg-brain-lighter',
    physique: 'bg-physique-lighter',
    mind: 'bg-mind-lighter',
    soul: 'bg-soul-lighter',
  };
  
  const typeTextColors = {
    financial: 'text-financial',
    work: 'text-work',
    brain: 'text-brain',
    physique: 'text-physique',
    mind: 'text-mind',
    soul: 'text-soul',
  };

  return (
    <div className="rounded-xl border shadow-sm p-4">
      <h3 className="font-semibold mb-3">Upcoming</h3>
      <div className="space-y-2">
        {events.map((event, index) => (
          <div key={index} className="flex items-center gap-3">
            <div className={`h-2 w-2 rounded-full ${typeColors[event.type]}`}></div>
            <span className="text-sm flex-1">{event.title}</span>
            <span className={`text-xs ${typeTextColors[event.type]}`}>{event.day}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CalendarGlimpse;
