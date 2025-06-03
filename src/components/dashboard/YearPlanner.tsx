
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { 
  Calendar as CalendarIcon, 
  ChevronLeft, 
  ChevronRight, 
  Plus,
  Clock,
  Target,
  Briefcase,
  DollarSign,
  Brain,
  Dumbbell,
  BookOpen,
  Star
} from "lucide-react";

interface TimeBlock {
  id: string;
  title: string;
  domain: string;
  startDate: Date;
  endDate: Date;
  type: "goal" | "project" | "habit" | "event";
  progress: number;
  description?: string;
}

const YearPlanner = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [viewMode, setViewMode] = useState<"month" | "quarter" | "year">("month");

  const [timeBlocks, setTimeBlocks] = useState<TimeBlock[]>([
    {
      id: "1",
      title: "Build Emergency Fund",
      domain: "financial",
      startDate: new Date(2024, 0, 1),
      endDate: new Date(2024, 5, 30),
      type: "goal",
      progress: 65,
      description: "Save $10,000 for emergencies"
    },
    {
      id: "2",
      title: "Complete React Certification",
      domain: "work",
      startDate: new Date(2024, 1, 1),
      endDate: new Date(2024, 3, 15),
      type: "project",
      progress: 80,
      description: "Professional development"
    },
    {
      id: "3",
      title: "Daily Meditation",
      domain: "mind",
      startDate: new Date(2024, 0, 1),
      endDate: new Date(2024, 11, 31),
      type: "habit",
      progress: 45,
      description: "20 minutes daily meditation"
    },
    {
      id: "4",
      title: "Marathon Training",
      domain: "physique",
      startDate: new Date(2024, 2, 1),
      endDate: new Date(2024, 9, 15),
      type: "goal",
      progress: 30,
      description: "Prepare for city marathon"
    },
    {
      id: "5",
      title: "Learn Spanish",
      domain: "brain",
      startDate: new Date(2024, 1, 15),
      endDate: new Date(2024, 7, 30),
      type: "project",
      progress: 55,
      description: "Achieve conversational level"
    },
    {
      id: "6",
      title: "Photography Hobby",
      domain: "soul",
      startDate: new Date(2024, 3, 1),
      endDate: new Date(2024, 11, 31),
      type: "habit",
      progress: 25,
      description: "Explore creative photography"
    }
  ]);

  const domainColors = {
    financial: "#2e7d32",
    work: "#1565c0",
    brain: "#6a1b9a",
    physique: "#d84315",
    mind: "#00838f",
    soul: "#f9a825",
  };

  const domainIcons = {
    financial: DollarSign,
    work: Briefcase,
    brain: Brain,
    physique: Dumbbell,
    mind: BookOpen,
    soul: Star,
  };

  const typeIcons = {
    goal: Target,
    project: Briefcase,
    habit: Clock,
    event: CalendarIcon,
  };

  const getBlocksForDate = (date: Date) => {
    return timeBlocks.filter(block => {
      const blockStart = new Date(block.startDate);
      const blockEnd = new Date(block.endDate);
      return date >= blockStart && date <= blockEnd;
    });
  };

  const getQuarterBlocks = (quarter: number, year: number) => {
    const quarterStart = new Date(year, (quarter - 1) * 3, 1);
    const quarterEnd = new Date(year, quarter * 3, 0);
    
    return timeBlocks.filter(block => {
      const blockStart = new Date(block.startDate);
      const blockEnd = new Date(block.endDate);
      return (blockStart <= quarterEnd && blockEnd >= quarterStart);
    });
  };

  const quarters = [
    { name: "Q1", months: "Jan - Mar", number: 1 },
    { name: "Q2", months: "Apr - Jun", number: 2 },
    { name: "Q3", months: "Jul - Sep", number: 3 },
    { name: "Q4", months: "Oct - Dec", number: 4 },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CalendarIcon className="h-5 w-5" />
            Year Planner 2024
          </div>
          <div className="flex gap-2">
            <Button
              variant={viewMode === "month" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("month")}
            >
              Month
            </Button>
            <Button
              variant={viewMode === "quarter" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("quarter")}
            >
              Quarter
            </Button>
            <Button
              variant={viewMode === "year" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("year")}
            >
              Year
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {viewMode === "month" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                className="rounded-md border"
                modifiers={{
                  hasBlocks: (date) => getBlocksForDate(date).length > 0
                }}
                modifiersStyles={{
                  hasBlocks: { backgroundColor: "#f0f9ff", fontWeight: "bold" }
                }}
              />
            </div>
            <div className="space-y-4">
              <h3 className="font-semibold">
                {selectedDate ? `Blocks for ${selectedDate.toLocaleDateString()}` : "Select a date"}
              </h3>
              {selectedDate && (
                <div className="space-y-3">
                  {getBlocksForDate(selectedDate).map((block) => {
                    const DomainIcon = domainIcons[block.domain as keyof typeof domainIcons];
                    const TypeIcon = typeIcons[block.type];
                    return (
                      <div
                        key={block.id}
                        className="p-3 rounded-lg border"
                        style={{ borderLeft: `4px solid ${domainColors[block.domain as keyof typeof domainColors]}` }}
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <DomainIcon className="h-4 w-4" style={{ color: domainColors[block.domain as keyof typeof domainColors] }} />
                          <TypeIcon className="h-4 w-4" />
                          <span className="font-medium">{block.title}</span>
                          <Badge variant="secondary">{block.progress}%</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{block.description}</p>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div
                            className="h-2 rounded-full transition-all"
                            style={{
                              width: `${block.progress}%`,
                              backgroundColor: domainColors[block.domain as keyof typeof domainColors]
                            }}
                          />
                        </div>
                      </div>
                    );
                  })}
                  {getBlocksForDate(selectedDate).length === 0 && (
                    <p className="text-muted-foreground text-sm">No time blocks for this date</p>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {viewMode === "quarter" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {quarters.map((quarter) => {
              const quarterBlocks = getQuarterBlocks(quarter.number, 2024);
              return (
                <div key={quarter.name} className="p-4 rounded-lg border">
                  <h3 className="font-semibold mb-2">{quarter.name} - {quarter.months}</h3>
                  <div className="space-y-2">
                    {quarterBlocks.map((block) => {
                      const DomainIcon = domainIcons[block.domain as keyof typeof domainIcons];
                      return (
                        <div
                          key={block.id}
                          className="flex items-center gap-2 p-2 rounded-md bg-muted/50"
                        >
                          <DomainIcon 
                            className="h-4 w-4" 
                            style={{ color: domainColors[block.domain as keyof typeof domainColors] }} 
                          />
                          <span className="text-sm flex-1">{block.title}</span>
                          <Badge variant="secondary" className="text-xs">{block.progress}%</Badge>
                        </div>
                      );
                    })}
                    {quarterBlocks.length === 0 && (
                      <p className="text-muted-foreground text-xs">No blocks this quarter</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {viewMode === "year" && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {Object.entries(domainColors).map(([domain, color]) => {
                const domainBlocks = timeBlocks.filter(block => block.domain === domain);
                const avgProgress = domainBlocks.length > 0 
                  ? Math.round(domainBlocks.reduce((sum, block) => sum + block.progress, 0) / domainBlocks.length)
                  : 0;
                const DomainIcon = domainIcons[domain as keyof typeof domainIcons];

                return (
                  <div key={domain} className="text-center p-4 rounded-lg border">
                    <DomainIcon className="h-8 w-8 mx-auto mb-2" style={{ color }} />
                    <h4 className="font-medium text-sm capitalize mb-1">{domain}</h4>
                    <p className="text-xs text-muted-foreground mb-2">{domainBlocks.length} blocks</p>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div
                        className="h-2 rounded-full transition-all"
                        style={{ width: `${avgProgress}%`, backgroundColor: color }}
                      />
                    </div>
                    <p className="text-xs mt-1">{avgProgress}%</p>
                  </div>
                );
              })}
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <h3 className="font-semibold">All Time Blocks</h3>
                <Button size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Block
                </Button>
              </div>
              
              <div className="grid gap-3">
                {timeBlocks.map((block) => {
                  const DomainIcon = domainIcons[block.domain as keyof typeof domainIcons];
                  const TypeIcon = typeIcons[block.type];
                  return (
                    <div
                      key={block.id}
                      className="flex items-center gap-4 p-3 rounded-lg border hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <DomainIcon 
                          className="h-5 w-5" 
                          style={{ color: domainColors[block.domain as keyof typeof domainColors] }} 
                        />
                        <TypeIcon className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium">{block.title}</h4>
                        <p className="text-sm text-muted-foreground">
                          {block.startDate.toLocaleDateString()} - {block.endDate.toLocaleDateString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <Badge variant="secondary">{block.progress}%</Badge>
                        <div className="w-20 bg-muted rounded-full h-2 mt-1">
                          <div
                            className="h-2 rounded-full transition-all"
                            style={{
                              width: `${block.progress}%`,
                              backgroundColor: domainColors[block.domain as keyof typeof domainColors]
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default YearPlanner;
