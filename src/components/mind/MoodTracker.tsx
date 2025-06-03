
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { Smile, Meh, Frown, Heart, Calendar } from "lucide-react";

interface MoodEntry {
  id: string;
  mood: 1 | 2 | 3 | 4 | 5;
  note?: string;
  date: Date;
  tags: string[];
}

const MoodTracker = () => {
  const { toast } = useToast();
  const [moodEntries, setMoodEntries] = useState<MoodEntry[]>([
    {
      id: "1",
      mood: 4,
      note: "Great progress on the security project today!",
      date: new Date(),
      tags: ["productive", "work"]
    },
    {
      id: "2",
      mood: 5,
      note: "Had an amazing workout and finished reading a chapter",
      date: new Date(Date.now() - 86400000),
      tags: ["accomplished", "healthy"]
    }
  ]);

  const [currentMood, setCurrentMood] = useState<number | null>(null);
  const [moodNote, setMoodNote] = useState("");
  const [moodTags, setMoodTags] = useState("");

  const moodEmojis = {
    1: { emoji: "😢", label: "Very Bad", color: "text-red-500" },
    2: { emoji: "😔", label: "Bad", color: "text-orange-500" },
    3: { emoji: "😐", label: "Okay", color: "text-yellow-500" },
    4: { emoji: "😊", label: "Good", color: "text-green-500" },
    5: { emoji: "😄", label: "Excellent", color: "text-blue-500" }
  };

  const handleMoodSubmit = () => {
    if (!currentMood) return;

    const entry: MoodEntry = {
      id: Date.now().toString(),
      mood: currentMood as 1 | 2 | 3 | 4 | 5,
      note: moodNote || undefined,
      date: new Date(),
      tags: moodTags.split(",").map(t => t.trim()).filter(t => t)
    };

    setMoodEntries([entry, ...moodEntries]);
    setCurrentMood(null);
    setMoodNote("");
    setMoodTags("");
    
    toast({
      title: "Mood Recorded",
      description: `Today's mood: ${moodEmojis[entry.mood].label}`,
    });
  };

  const getAverageMood = (days: number) => {
    const recentEntries = moodEntries.filter(entry => 
      Date.now() - entry.date.getTime() < days * 24 * 60 * 60 * 1000
    );
    if (recentEntries.length === 0) return 0;
    return recentEntries.reduce((sum, entry) => sum + entry.mood, 0) / recentEntries.length;
  };

  const weeklyAverage = getAverageMood(7);
  const monthlyAverage = getAverageMood(30);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Heart className="h-5 w-5 text-pink-600" />
          Mood Tracker
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-muted p-3 rounded-lg text-center">
            <p className="text-sm text-muted-foreground">This Week</p>
            <p className="text-xl font-bold">{weeklyAverage.toFixed(1)}/5</p>
            <p className="text-xs text-muted-foreground">Average mood</p>
          </div>
          <div className="bg-muted p-3 rounded-lg text-center">
            <p className="text-sm text-muted-foreground">This Month</p>
            <p className="text-xl font-bold">{monthlyAverage.toFixed(1)}/5</p>
            <p className="text-xs text-muted-foreground">Average mood</p>
          </div>
        </div>

        {/* Log Today's Mood */}
        <div className="border rounded-lg p-4 space-y-4">
          <h4 className="font-semibold flex items-center gap-2">
            <Smile className="h-4 w-4" />
            How are you feeling today?
          </h4>
          
          <div className="grid grid-cols-5 gap-2">
            {Object.entries(moodEmojis).map(([value, { emoji, label, color }]) => (
              <Button
                key={value}
                variant={currentMood === parseInt(value) ? "default" : "outline"}
                className="h-16 flex flex-col"
                onClick={() => setCurrentMood(parseInt(value))}
              >
                <span className="text-2xl mb-1">{emoji}</span>
                <span className="text-xs">{label}</span>
              </Button>
            ))}
          </div>

          {currentMood && (
            <div className="space-y-3">
              <div>
                <Label htmlFor="mood-note">What's influencing your mood? (Optional)</Label>
                <Input
                  id="mood-note"
                  value={moodNote}
                  onChange={(e) => setMoodNote(e.target.value)}
                  placeholder="Had a great day because..."
                />
              </div>
              <div>
                <Label htmlFor="mood-tags">Tags (comma-separated)</Label>
                <Input
                  id="mood-tags"
                  value={moodTags}
                  onChange={(e) => setMoodTags(e.target.value)}
                  placeholder="work, exercise, family..."
                />
              </div>
              <Button onClick={handleMoodSubmit} className="w-full">
                Record Mood
              </Button>
            </div>
          )}
        </div>

        {/* Recent Mood Entries */}
        <div className="space-y-2">
          <h4 className="font-semibold flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Recent Entries
          </h4>
          {moodEntries.slice(0, 5).map((entry) => {
            const moodInfo = moodEmojis[entry.mood];
            return (
              <div key={entry.id} className="border rounded-lg p-3">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">{moodInfo.emoji}</span>
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-1">
                      <span className={`font-medium ${moodInfo.color}`}>
                        {moodInfo.label}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {entry.date.toLocaleDateString()}
                      </span>
                    </div>
                    {entry.note && (
                      <p className="text-sm text-muted-foreground mb-2">{entry.note}</p>
                    )}
                    {entry.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {entry.tags.map((tag, index) => (
                          <span key={index} className="px-2 py-1 bg-muted rounded text-xs">
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default MoodTracker;
