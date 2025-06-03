
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";
import { TrendingUp, Clock, Target, Calendar } from "lucide-react";

interface TimeBlock {
  id: string;
  title: string;
  domain: string;
  startDate: Date;
  endDate: Date;
  type: "goal" | "project" | "habit" | "event";
  progress: number;
  priority: "low" | "medium" | "high";
  estimatedHours?: number;
}

interface CrossDomainAnalyticsProps {
  timeBlocks: TimeBlock[];
}

const CrossDomainAnalytics = ({ timeBlocks }: CrossDomainAnalyticsProps) => {
  const domainColors = {
    financial: "#2e7d32",
    work: "#1565c0",
    brain: "#6a1b9a",
    physique: "#d84315",
    mind: "#00838f",
    soul: "#f9a825",
  };

  // Calculate domain distribution
  const domainData = Object.entries(
    timeBlocks.reduce((acc, block) => {
      acc[block.domain] = (acc[block.domain] || 0) + 1;
      return acc;
    }, {} as Record<string, number>)
  ).map(([domain, count]) => ({
    domain: domain.charAt(0).toUpperCase() + domain.slice(1),
    count,
    color: domainColors[domain as keyof typeof domainColors],
  }));

  // Calculate type distribution
  const typeData = Object.entries(
    timeBlocks.reduce((acc, block) => {
      acc[block.type] = (acc[block.type] || 0) + 1;
      return acc;
    }, {} as Record<string, number>)
  ).map(([type, count]) => ({
    type: type.charAt(0).toUpperCase() + type.slice(1),
    count,
  }));

  // Calculate priority distribution
  const priorityData = Object.entries(
    timeBlocks.reduce((acc, block) => {
      acc[block.priority] = (acc[block.priority] || 0) + 1;
      return acc;
    }, {} as Record<string, number>)
  ).map(([priority, count]) => ({
    priority: priority.charAt(0).toUpperCase() + priority.slice(1),
    count,
    color: priority === "high" ? "#dc2626" : priority === "medium" ? "#ea580c" : "#16a34a",
  }));

  // Calculate progress insights
  const progressStats = {
    totalBlocks: timeBlocks.length,
    completedBlocks: timeBlocks.filter(block => block.progress === 100).length,
    avgProgress: timeBlocks.length > 0 ? Math.round(timeBlocks.reduce((sum, block) => sum + block.progress, 0) / timeBlocks.length) : 0,
    totalEstimatedHours: timeBlocks.reduce((sum, block) => sum + (block.estimatedHours || 0), 0),
  };

  // Calculate upcoming deadlines
  const upcomingDeadlines = timeBlocks
    .filter(block => {
      const now = new Date();
      const endDate = new Date(block.endDate);
      const daysUntil = Math.ceil((endDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
      return daysUntil >= 0 && daysUntil <= 30 && block.progress < 100;
    })
    .sort((a, b) => new Date(a.endDate).getTime() - new Date(b.endDate).getTime())
    .slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Target className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm text-muted-foreground">Total Blocks</p>
                <p className="text-2xl font-bold">{progressStats.totalBlocks}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-sm text-muted-foreground">Avg Progress</p>
                <p className="text-2xl font-bold">{progressStats.avgProgress}%</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-orange-600" />
              <div>
                <p className="text-sm text-muted-foreground">Est. Hours</p>
                <p className="text-2xl font-bold">{progressStats.totalEstimatedHours}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-purple-600" />
              <div>
                <p className="text-sm text-muted-foreground">Completed</p>
                <p className="text-2xl font-bold">{progressStats.completedBlocks}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Domain Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Domain Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={domainData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="count"
                  label={({ domain, count }) => `${domain}: ${count}`}
                >
                  {domainData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Type Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Type Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={typeData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="type" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Priority Overview */}
        <Card>
          <CardHeader>
            <CardTitle>Priority Distribution</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {priorityData.map((item) => (
              <div key={item.priority} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="capitalize">{item.priority}</span>
                </div>
                <Badge variant="secondary">{item.count}</Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Upcoming Deadlines */}
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Deadlines</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {upcomingDeadlines.length > 0 ? (
              upcomingDeadlines.map((block) => {
                const daysUntil = Math.ceil((new Date(block.endDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
                return (
                  <div key={block.id} className="flex items-center justify-between p-2 rounded-lg border">
                    <div>
                      <p className="font-medium text-sm">{block.title}</p>
                      <p className="text-xs text-muted-foreground capitalize">{block.domain}</p>
                    </div>
                    <div className="text-right">
                      <Badge variant={daysUntil <= 7 ? "destructive" : daysUntil <= 14 ? "secondary" : "outline"}>
                        {daysUntil === 0 ? "Today" : `${daysUntil}d`}
                      </Badge>
                      <p className="text-xs text-muted-foreground mt-1">{block.progress}%</p>
                    </div>
                  </div>
                );
              })
            ) : (
              <p className="text-sm text-muted-foreground">No upcoming deadlines</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CrossDomainAnalytics;
