
import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import DomainCard from "@/components/dashboard/DomainCard";
import ProgressRing from "@/components/dashboard/ProgressRing";
import InsightItem from "@/components/dashboard/InsightItem";
import QuickAddButton from "@/components/dashboard/QuickAddButton";
import CalendarGlimpse from "@/components/dashboard/CalendarGlimpse";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";

const Index = () => {
  const { toast } = useToast();
  
  // Mock data for the calendar glimpse
  const calendarEvents = [
    { title: "Pay Credit Card Bill", day: "Thu", type: "financial" },
    { title: "Project Deadline", day: "Fri", type: "work" },
    { title: "Finish Book Chapter 7", day: "Sat", type: "mind" },
    { title: "Gym Session", day: "Today", type: "physique" },
  ];

  // Quick add handlers
  const handleQuickAdd = (type: string) => {
    toast({
      title: `Add ${type}`,
      description: `This would open a form to add a new ${type.toLowerCase()}.`,
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container py-6">
        <h1 className="text-3xl font-bold mb-6">Life Dashboard</h1>
        
        {/* Domain Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          <DomainCard
            title="Financial"
            color="#2e7d32"
            lightColor="#a5d6a7"
            stats={[
              { label: "Net Worth", value: "$45,320" },
              { label: "This Month", value: "+$1,250" },
              { label: "Budget Used", value: "65%" },
              { label: "Savings", value: "$12,500" },
            ]}
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="8"/>
                <line x1="12" y1="8" x2="12" y2="12"/>
                <line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
            }
            progressPercentage={85}
            linkTo="/financial"
          />
          
          <DomainCard
            title="Work"
            color="#1565c0"
            lightColor="#90caf9"
            stats={[
              { label: "Projects", value: "2 Active" },
              { label: "Tasks", value: "8 Todo" },
              { label: "Goals", value: "80% Done" },
              { label: "Next", value: "Certification" },
            ]}
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
                <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
              </svg>
            }
            progressPercentage={80}
            linkTo="/work"
          />
          
          <DomainCard
            title="Brain"
            color="#6a1b9a"
            lightColor="#ce93d8"
            stats={[
              { label: "Projects", value: "2 Active" },
              { label: "Research", value: "3 Topics" },
              { label: "Ideas", value: "15 New" },
              { label: "Tasks", value: "1 Done" },
            ]}
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 12a5 5 0 0 0 5 5 8 8 0 0 1 5 2 8 8 0 0 1 5-2 5 5 0 0 0 5-5V7H2Z"/>
                <path d="M6 8v4"/>
                <path d="M18 8v4"/>
                <path d="M12 8v4"/>
              </svg>
            }
            progressPercentage={70}
            linkTo="/brain"
          />
          
          <DomainCard
            title="Physique"
            color="#d84315"
            lightColor="#ffab91"
            stats={[
              { label: "Workouts", value: "3 This Week" },
              { label: "Sleep", value: "7 hrs Avg" },
              { label: "Calories", value: "2,100 Avg" },
              { label: "Steps", value: "8,500 Avg" },
            ]}
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="5" r="3"/>
                <path d="m8 14 4-4 4 4"/>
                <path d="M12 10v11"/>
              </svg>
            }
            progressPercentage={60}
            linkTo="/physique"
          />
          
          <DomainCard
            title="Mind"
            color="#00838f"
            lightColor="#80deea"
            stats={[
              { label: "Books", value: "2 Reading" },
              { label: "Articles", value: "5 Read" },
              { label: "Mood", value: "Good" },
              { label: "Meditation", value: "3 Days" },
            ]}
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 8a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4v8a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z"/>
                <path d="M10 12h.01"/>
                <path d="M14 12h.01"/>
              </svg>
            }
            progressPercentage={75}
            linkTo="/mind"
          />
          
          <DomainCard
            title="Soul"
            color="#f9a825"
            lightColor="#ffe082"
            stats={[
              { label: "Hobbies", value: "4 Active" },
              { label: "Wishlist", value: "1 in Progress" },
              { label: "Time Spent", value: "3 hrs/week" },
              { label: "New Skills", value: "2 Learning" },
            ]}
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z" />
              </svg>
            }
            progressPercentage={65}
            linkTo="/soul"
          />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left column */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Quick Add</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  <QuickAddButton
                    icon={<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 6v12"/><path d="M6 12h12"/></svg>}
                    label="Expense"
                    color="#2e7d32"
                    onClick={() => handleQuickAdd("Expense")}
                  />
                  <QuickAddButton
                    icon={<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 6v12"/><path d="M6 12h12"/></svg>}
                    label="Task"
                    color="#1565c0"
                    onClick={() => handleQuickAdd("Task")}
                  />
                  <QuickAddButton
                    icon={<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 6v12"/><path d="M6 12h12"/></svg>}
                    label="Workout"
                    color="#d84315"
                    onClick={() => handleQuickAdd("Workout")}
                  />
                  <QuickAddButton
                    icon={<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 6v12"/><path d="M6 12h12"/></svg>}
                    label="Journal"
                    color="#00838f"
                    onClick={() => handleQuickAdd("Journal")}
                  />
                </div>
              </CardContent>
            </Card>
            
            <CalendarGlimpse events={calendarEvents} />
          </div>
          
          {/* Middle column */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Progress Rings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap justify-around gap-4">
                  <ProgressRing percentage={85} color="#2e7d32" label="Financial" />
                  <ProgressRing percentage={80} color="#1565c0" label="Work" />
                  <ProgressRing percentage={70} color="#6a1b9a" label="Brain" />
                  <ProgressRing percentage={60} color="#d84315" label="Physique" />
                  <ProgressRing percentage={75} color="#00838f" label="Mind" />
                  <ProgressRing percentage={65} color="#f9a825" label="Soul" />
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Right column */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Insights</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <InsightItem
                  icon={<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 12 2 2 4-4"/><circle cx="12" cy="12" r="10"/></svg>}
                  message="Your savings goal is on track!"
                  color="#2e7d32"
                />
                <InsightItem
                  icon={<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>}
                  message="2 work deadlines this week"
                  color="#1565c0"
                />
                <InsightItem
                  icon={<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>}
                  message="You haven't worked out for 3 days"
                  color="#d84315"
                />
                <InsightItem
                  icon={<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 12 2 2 4-4"/><circle cx="12" cy="12" r="10"/></svg>}
                  message="Great job on your reading goal!"
                  color="#00838f"
                />
                <InsightItem
                  icon={<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="m9 9 .01 .01"/><path d="m15 9 .01 .01"/><path d="M8 13h8a4 4 0 0 1 4 4v1H4v-1a4 4 0 0 1 4-4z"/></svg>}
                  message="Remember to relax and enjoy your hobbies"
                  color="#f9a825"
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
