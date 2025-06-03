
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Heart, Star, Check } from "lucide-react";

interface Value {
  id: string;
  name: string;
  description: string;
  selected: boolean;
  importance: number;
}

const ValuesExplorer = () => {
  const { toast } = useToast();
  const [values, setValues] = useState<Value[]>([
    { id: "1", name: "Creativity", description: "Expressing imagination and originality", selected: true, importance: 9 },
    { id: "2", name: "Family", description: "Strong relationships with loved ones", selected: true, importance: 10 },
    { id: "3", name: "Adventure", description: "Seeking new experiences and challenges", selected: false, importance: 7 },
    { id: "4", name: "Learning", description: "Continuous growth and knowledge", selected: true, importance: 8 },
    { id: "5", name: "Freedom", description: "Independence and autonomy", selected: false, importance: 6 },
    { id: "6", name: "Health", description: "Physical and mental wellbeing", selected: true, importance: 9 },
    { id: "7", name: "Service", description: "Helping others and making a difference", selected: false, importance: 7 },
    { id: "8", name: "Achievement", description: "Accomplishing goals and recognition", selected: false, importance: 6 },
  ]);

  const toggleValue = (id: string) => {
    setValues(values.map(value => 
      value.id === id ? { ...value, selected: !value.selected } : value
    ));
  };

  const updateImportance = (id: string, importance: number) => {
    setValues(values.map(value => 
      value.id === id ? { ...value, importance } : value
    ));
  };

  const selectedValues = values.filter(v => v.selected);

  const saveValues = () => {
    toast({
      title: "Values Saved",
      description: `Your ${selectedValues.length} core values have been saved.`,
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Heart className="h-5 w-5 text-soul" />
          Values Explorer
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-sm text-muted-foreground mb-4">
          Select your core values and rate their importance (1-10)
        </div>

        {/* Selected Values Summary */}
        {selectedValues.length > 0 && (
          <div className="border rounded-lg p-4 bg-soul/5">
            <h4 className="font-semibold mb-2">Your Core Values ({selectedValues.length})</h4>
            <div className="flex flex-wrap gap-2">
              {selectedValues.sort((a, b) => b.importance - a.importance).map(value => (
                <span key={value.id} className="px-3 py-1 bg-soul text-white rounded-full text-sm flex items-center gap-1">
                  {value.name}
                  <span className="bg-white text-soul rounded-full w-5 h-5 text-xs flex items-center justify-center">
                    {value.importance}
                  </span>
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {values.map(value => (
            <div 
              key={value.id} 
              className={`border rounded-lg p-4 cursor-pointer transition-all ${
                value.selected ? 'border-soul bg-soul/10' : 'border-gray-200 hover:border-soul/50'
              }`}
              onClick={() => toggleValue(value.id)}
            >
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-2">
                  <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                    value.selected ? 'border-soul bg-soul' : 'border-gray-300'
                  }`}>
                    {value.selected && <Check className="h-3 w-3 text-white" />}
                  </div>
                  <h4 className="font-semibold">{value.name}</h4>
                </div>
                {value.selected && (
                  <div className="flex items-center gap-1">
                    {[...Array(10)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-3 w-3 cursor-pointer ${
                          i < value.importance ? 'text-soul fill-current' : 'text-gray-300'
                        }`}
                        onClick={(e) => {
                          e.stopPropagation();
                          updateImportance(value.id, i + 1);
                        }}
                      />
                    ))}
                  </div>
                )}
              </div>
              <p className="text-sm text-muted-foreground">{value.description}</p>
            </div>
          ))}
        </div>

        <Button onClick={saveValues} className="w-full" style={{ backgroundColor: "#f9a825" }}>
          Save Core Values
        </Button>
      </CardContent>
    </Card>
  );
};

export default ValuesExplorer;
