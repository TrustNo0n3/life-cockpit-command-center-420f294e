
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Heart, Plus, Calendar } from "lucide-react";

interface GratitudeEntry {
  id: string;
  content: string;
  date: string;
  mood: string;
}

const GratitudeJournal = () => {
  const { toast } = useToast();
  const [entries, setEntries] = useState<GratitudeEntry[]>([
    {
      id: "1",
      content: "Grateful for the beautiful sunset today and time spent with family in the garden.",
      date: "2024-06-02",
      mood: "peaceful"
    },
    {
      id: "2",
      content: "Thankful for completing my photography course and feeling more confident with my camera.",
      date: "2024-06-01",
      mood: "accomplished"
    }
  ]);

  const [newEntry, setNewEntry] = useState("");
  const [selectedMood, setSelectedMood] = useState("grateful");

  const moods = [
    { value: "grateful", emoji: "🙏", label: "Grateful" },
    { value: "peaceful", emoji: "☮️", label: "Peaceful" },
    { value: "joyful", emoji: "😊", label: "Joyful" },
    { value: "accomplished", emoji: "🎯", label: "Accomplished" },
    { value: "blessed", emoji: "✨", label: "Blessed" },
    { value: "content", emoji: "😌", label: "Content" }
  ];

  const handleAddEntry = () => {
    if (!newEntry.trim()) return;

    const entry: GratitudeEntry = {
      id: Date.now().toString(),
      content: newEntry,
      date: new Date().toISOString().split('T')[0],
      mood: selectedMood
    };

    setEntries([entry, ...entries]);
    setNewEntry("");
    
    toast({
      title: "Gratitude Entry Added",
      description: "Your gratitude has been recorded.",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Heart className="h-5 w-5 text-soul" />
          Gratitude Journal
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Add New Entry */}
        <div className="border rounded-lg p-4 space-y-3">
          <h4 className="font-semibold">What are you grateful for today?</h4>
          <Textarea
            value={newEntry}
            onChange={(e) => setNewEntry(e.target.value)}
            placeholder="I'm grateful for..."
            rows={3}
          />
          <div>
            <label className="text-sm font-medium mb-2 block">How are you feeling?</label>
            <div className="flex flex-wrap gap-2">
              {moods.map(mood => (
                <button
                  key={mood.value}
                  onClick={() => setSelectedMood(mood.value)}
                  className={`px-3 py-2 rounded-lg text-sm flex items-center gap-2 border transition-colors ${
                    selectedMood === mood.value 
                      ? 'border-soul bg-soul text-white' 
                      : 'border-gray-200 hover:border-soul/50'
                  }`}
                >
                  <span>{mood.emoji}</span>
                  {mood.label}
                </button>
              ))}
            </div>
          </div>
          <Button onClick={handleAddEntry} style={{ backgroundColor: "#f9a825" }}>
            <Plus className="h-4 w-4 mr-2" />
            Add Entry
          </Button>
        </div>

        {/* Recent Entries */}
        <div className="space-y-3">
          <h4 className="font-semibold">Recent Entries</h4>
          {entries.map(entry => {
            const mood = moods.find(m => m.value === entry.mood);
            return (
              <div key={entry.id} className="border rounded-lg p-4 bg-soul/5">
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      {new Date(entry.date).toLocaleDateString()}
                    </span>
                  </div>
                  {mood && (
                    <div className="flex items-center gap-1 text-sm">
                      <span>{mood.emoji}</span>
                      <span className="text-muted-foreground">{mood.label}</span>
                    </div>
                  )}
                </div>
                <p className="text-sm leading-relaxed">{entry.content}</p>
              </div>
            );
          })}
        </div>

        {/* Gratitude Stats */}
        <div className="border rounded-lg p-4 bg-gradient-to-r from-soul/10 to-transparent">
          <h4 className="font-semibold mb-2">Gratitude Streak</h4>
          <div className="flex items-center gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-soul">{entries.length}</div>
              <div className="text-xs text-muted-foreground">Total Entries</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-soul">7</div>
              <div className="text-xs text-muted-foreground">Day Streak</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-soul">peaceful</div>
              <div className="text-xs text-muted-foreground">Most Common Mood</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default GratitudeJournal;
