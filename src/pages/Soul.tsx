import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/components/ui/use-toast";
import { Star, Heart, Target, Sparkles } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ValuesExplorer from "@/components/soul/ValuesExplorer";
import GratitudeJournal from "@/components/soul/GratitudeJournal";
import LifeSatisfaction from "@/components/soul/LifeSatisfaction";

const Soul = () => {
  const { toast } = useToast();
  const [newHobby, setNewHobby] = useState("");
  const [newWish, setNewWish] = useState("");

  const handleAddHobby = () => {
    if (newHobby.trim()) {
      toast({
        title: "Hobby Added",
        description: `"${newHobby}" has been added to your hobbies.`,
      });
      setNewHobby("");
    }
  };

  const handleAddWish = () => {
    if (newWish.trim()) {
      toast({
        title: "Wish Added",
        description: `"${newWish}" has been added to your wishlist.`,
      });
      setNewWish("");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1 container py-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-lg" style={{ backgroundColor: "#ffe082" }}>
            <Star className="h-6 w-6" style={{ color: "#f9a825" }} />
          </div>
          <h1 className="text-3xl font-bold">Soul Dashboard</h1>
        </div>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="values">Values</TabsTrigger>
            <TabsTrigger value="gratitude">Gratitude</TabsTrigger>
            <TabsTrigger value="satisfaction">Life Assessment</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Heart className="h-5 w-5 text-soul" />
                        Active Hobbies
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="border rounded-lg p-3">
                          <h4 className="font-semibold">Photography</h4>
                          <p className="text-sm text-muted-foreground">3 hours this week</p>
                        </div>
                        <div className="border rounded-lg p-3">
                          <h4 className="font-semibold">Guitar Playing</h4>
                          <p className="text-sm text-muted-foreground">2 hours this week</p>
                        </div>
                        <div className="border rounded-lg p-3">
                          <h4 className="font-semibold">Gardening</h4>
                          <p className="text-sm text-muted-foreground">1 hour this week</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Sparkles className="h-5 w-5 text-soul" />
                        Creative Time
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Weekly Goal</span>
                            <span>6/8 hours</span>
                          </div>
                          <Progress value={75} className="h-2" />
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Favorite Activity</span>
                          <span className="font-semibold">Photography</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">New Skills Learning</span>
                          <span className="font-semibold">2</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Wishlist Progress</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="border rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-semibold">Learn Landscape Photography</h3>
                          <span className="text-sm text-muted-foreground">In Progress</span>
                        </div>
                        <Progress value={60} className="mb-2" />
                        <p className="text-sm text-muted-foreground">Researching techniques and locations</p>
                      </div>
                      <div className="border rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-semibold">Visit Japan</h3>
                          <span className="text-sm text-muted-foreground">Planning</span>
                        </div>
                        <Progress value={25} className="mb-2" />
                        <p className="text-sm text-muted-foreground">Saving money and planning itinerary</p>
                      </div>
                      <div className="border rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-semibold">Build a Home Studio</h3>
                          <span className="text-sm text-muted-foreground">Researching</span>
                        </div>
                        <Progress value={10} className="mb-2" />
                        <p className="text-sm text-muted-foreground">Looking at equipment and space requirements</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Recent Achievements</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="border rounded-lg p-3">
                        <div className="flex items-start gap-3">
                          <div className="p-1 rounded-full bg-soul/20">
                            <Star className="h-4 w-4 text-soul" />
                          </div>
                          <div>
                            <p className="font-semibold text-sm">Completed Guitar Course</p>
                            <p className="text-xs text-muted-foreground">Finished beginner's course on music theory</p>
                            <p className="text-xs text-muted-foreground">1 week ago</p>
                          </div>
                        </div>
                      </div>
                      <div className="border rounded-lg p-3">
                        <div className="flex items-start gap-3">
                          <div className="p-1 rounded-full bg-soul/20">
                            <Star className="h-4 w-4 text-soul" />
                          </div>
                          <div>
                            <p className="font-semibold text-sm">Photography Exhibition Visit</p>
                            <p className="text-xs text-muted-foreground">Attended local art gallery opening</p>
                            <p className="text-xs text-muted-foreground">2 weeks ago</p>
                          </div>
                        </div>
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
                      <Label htmlFor="new-hobby">New Hobby</Label>
                      <div className="flex gap-2 mt-1">
                        <Input
                          id="new-hobby"
                          value={newHobby}
                          onChange={(e) => setNewHobby(e.target.value)}
                          placeholder="Hobby name..."
                        />
                        <Button onClick={handleAddHobby} style={{ backgroundColor: "#f9a825" }}>
                          Add
                        </Button>
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="new-wish">Wishlist Item</Label>
                      <div className="flex gap-2 mt-1">
                        <Input
                          id="new-wish"
                          value={newWish}
                          onChange={(e) => setNewWish(e.target.value)}
                          placeholder="Dream or goal..."
                        />
                        <Button onClick={handleAddWish} style={{ backgroundColor: "#f9a825" }}>
                          Add
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Target className="h-5 w-5 text-soul" />
                      Soul Goals
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="border-l-4 border-soul pl-3">
                        <p className="font-semibold text-sm">Creative time: 8h/week</p>
                        <p className="text-xs text-muted-foreground">Progress: 6/8 hours</p>
                      </div>
                      <div className="border-l-4 border-soul pl-3">
                        <p className="font-semibold text-sm">Learn new skill</p>
                        <p className="text-xs text-muted-foreground">Currently: Advanced photography</p>
                      </div>
                      <div className="border-l-4 border-soul pl-3">
                        <p className="font-semibold text-sm">Complete wishlist item</p>
                        <p className="text-xs text-muted-foreground">Focus: Japan trip planning</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Inspiration</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="border rounded-lg p-3 bg-soul/5">
                        <p className="text-sm italic">"The purpose of life is to live it, to taste experience to the utmost."</p>
                        <p className="text-xs text-muted-foreground mt-1">- Eleanor Roosevelt</p>
                      </div>
                      <div className="text-center">
                        <Button variant="outline" className="text-soul border-soul">
                          Get New Inspiration
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="values">
            <ValuesExplorer />
          </TabsContent>

          <TabsContent value="gratitude">
            <GratitudeJournal />
          </TabsContent>

          <TabsContent value="satisfaction">
            <LifeSatisfaction />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Soul;
