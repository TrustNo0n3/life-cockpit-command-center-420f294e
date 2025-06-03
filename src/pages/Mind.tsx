
import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/components/ui/use-toast";
import { BookOpen, Heart, Target, Smile } from "lucide-react";

const Mind = () => {
  const { toast } = useToast();
  const [newBook, setNewBook] = useState("");
  const [journalEntry, setJournalEntry] = useState("");

  const handleAddBook = () => {
    if (newBook.trim()) {
      toast({
        title: "Book Added",
        description: `"${newBook}" has been added to your reading list.`,
      });
      setNewBook("");
    }
  };

  const handleAddJournal = () => {
    if (journalEntry.trim()) {
      toast({
        title: "Journal Entry Saved",
        description: "Your thoughts have been recorded.",
      });
      setJournalEntry("");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1 container py-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-lg" style={{ backgroundColor: "#80deea" }}>
            <BookOpen className="h-6 w-6" style={{ color: "#00838f" }} />
          </div>
          <h1 className="text-3xl font-bold">Mind Dashboard</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-mind" />
                    Reading Progress
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Books This Year</span>
                        <span>8/12</span>
                      </div>
                      <Progress value={67} className="h-2" />
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Articles Read</span>
                      <span className="font-semibold">23</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Reading Time</span>
                      <span className="font-semibold">45h</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Heart className="h-5 w-5 text-mind" />
                    Mental Wellness
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm">Meditation Streak</span>
                      <span className="font-semibold">5 days</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Mood Today</span>
                      <span className="font-semibold text-mind">Good</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Journal Entries</span>
                      <span className="font-semibold">12 this month</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Currently Reading</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold">Atomic Habits</h3>
                      <span className="text-sm text-muted-foreground">Ch. 7/12</span>
                    </div>
                    <Progress value={58} className="mb-2" />
                    <p className="text-sm text-muted-foreground">by James Clear • Personal Development</p>
                  </div>
                  <div className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold">The Psychology of Programming</h3>
                      <span className="text-sm text-muted-foreground">Ch. 3/10</span>
                    </div>
                    <Progress value={30} className="mb-2" />
                    <p className="text-sm text-muted-foreground">by Gerald Weinberg • Technical</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Journal Entries</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="border rounded-lg p-3">
                    <p className="text-sm mb-1">"Feeling productive today. Made good progress on the security audit project..."</p>
                    <span className="text-xs text-muted-foreground">Today, 8:30 PM</span>
                  </div>
                  <div className="border rounded-lg p-3">
                    <p className="text-sm mb-1">"Grateful for the team support during the certification prep..."</p>
                    <span className="text-xs text-muted-foreground">Yesterday, 9:15 PM</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Quick Add</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="new-book">Add Book</Label>
                  <div className="flex gap-2 mt-1">
                    <Input
                      id="new-book"
                      value={newBook}
                      onChange={(e) => setNewBook(e.target.value)}
                      placeholder="Book title..."
                    />
                    <Button onClick={handleAddBook} style={{ backgroundColor: "#00838f" }}>
                      Add
                    </Button>
                  </div>
                </div>
                <div>
                  <Label htmlFor="journal-entry">Journal Entry</Label>
                  <div className="flex gap-2 mt-1">
                    <Input
                      id="journal-entry"
                      value={journalEntry}
                      onChange={(e) => setJournalEntry(e.target.value)}
                      placeholder="How are you feeling?"
                    />
                    <Button onClick={handleAddJournal} style={{ backgroundColor: "#00838f" }}>
                      Save
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-mind" />
                  Mental Goals
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="border-l-4 border-mind pl-3">
                    <p className="font-semibold text-sm">Read 12 books this year</p>
                    <p className="text-xs text-muted-foreground">Progress: 8/12</p>
                  </div>
                  <div className="border-l-4 border-mind pl-3">
                    <p className="font-semibold text-sm">Daily meditation</p>
                    <p className="text-xs text-muted-foreground">Streak: 5 days</p>
                  </div>
                  <div className="border-l-4 border-mind pl-3">
                    <p className="font-semibold text-sm">Weekly journaling</p>
                    <p className="text-xs text-muted-foreground">This week: 3/3</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Smile className="h-5 w-5 text-mind" />
                  Mood Tracker
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Today</span>
                    <span className="text-sm font-semibold text-green-600">Good</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Yesterday</span>
                    <span className="text-sm font-semibold text-green-600">Great</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">This week avg</span>
                    <span className="text-sm font-semibold text-green-600">Good</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Mind;
