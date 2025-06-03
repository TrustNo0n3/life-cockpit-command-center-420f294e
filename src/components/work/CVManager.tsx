
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { FileText, Plus, Edit, Download } from "lucide-react";

const CVManager = () => {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [cvData, setCvData] = useState({
    personalInfo: {
      name: "John Doe",
      title: "IT Security Specialist",
      email: "john.doe@email.com",
      phone: "+1 234 567 8900",
      location: "New York, NY"
    },
    summary: "Experienced IT Security professional with 5+ years in cybersecurity, specializing in network security audits and vulnerability assessments.",
    experience: [
      {
        company: "Tech Corp",
        position: "Senior Security Analyst",
        duration: "2021 - Present",
        description: "Led security audits and implemented security protocols"
      }
    ],
    education: [
      {
        institution: "University of Technology",
        degree: "Bachelor of Computer Science",
        year: "2019"
      }
    ],
    skills: ["Network Security", "Penetration Testing", "Risk Assessment", "Compliance"],
    certifications: ["CISSP", "CompTIA Security+", "CEH"]
  });

  const handleSave = () => {
    toast({
      title: "CV Updated",
      description: "Your CV has been successfully saved.",
    });
    setIsEditing(false);
  };

  const handleExport = () => {
    toast({
      title: "CV Exported",
      description: "Your CV has been exported as PDF.",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5 text-work" />
          CV Manager
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex gap-2 mb-4">
          <Button 
            onClick={() => setIsEditing(!isEditing)}
            variant={isEditing ? "secondary" : "default"}
            style={{ backgroundColor: isEditing ? undefined : "#1565c0" }}
          >
            <Edit className="h-4 w-4 mr-2" />
            {isEditing ? "Cancel" : "Edit CV"}
          </Button>
          <Button onClick={handleExport} variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export PDF
          </Button>
        </div>

        {isEditing ? (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input 
                  id="name" 
                  value={cvData.personalInfo.name}
                  onChange={(e) => setCvData({
                    ...cvData,
                    personalInfo: { ...cvData.personalInfo, name: e.target.value }
                  })}
                />
              </div>
              <div>
                <Label htmlFor="title">Professional Title</Label>
                <Input 
                  id="title" 
                  value={cvData.personalInfo.title}
                  onChange={(e) => setCvData({
                    ...cvData,
                    personalInfo: { ...cvData.personalInfo, title: e.target.value }
                  })}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="summary">Professional Summary</Label>
              <Textarea 
                id="summary" 
                value={cvData.summary}
                onChange={(e) => setCvData({ ...cvData, summary: e.target.value })}
                rows={3}
              />
            </div>
            <Button onClick={handleSave} style={{ backgroundColor: "#1565c0" }}>
              Save Changes
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-lg">{cvData.personalInfo.name}</h3>
              <p className="text-muted-foreground">{cvData.personalInfo.title}</p>
              <p className="text-sm">{cvData.personalInfo.email} | {cvData.personalInfo.phone}</p>
            </div>
            <div>
              <h4 className="font-medium mb-2">Summary</h4>
              <p className="text-sm text-muted-foreground">{cvData.summary}</p>
            </div>
            <div>
              <h4 className="font-medium mb-2">Skills</h4>
              <div className="flex flex-wrap gap-2">
                {cvData.skills.map((skill, index) => (
                  <span key={index} className="px-2 py-1 bg-muted rounded-md text-xs">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CVManager;
