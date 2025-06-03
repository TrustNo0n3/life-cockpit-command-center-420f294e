
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/components/ui/use-toast";
import { Target, AlertTriangle, Plus, Edit } from "lucide-react";

interface Budget {
  id: string;
  category: string;
  limit: number;
  spent: number;
}

const BudgetManager = () => {
  const { toast } = useToast();
  const [budgets, setBudgets] = useState<Budget[]>([
    { id: "1", category: "Food", limit: 600, spent: 425 },
    { id: "2", category: "Utilities", limit: 200, spent: 124 },
    { id: "3", category: "Entertainment", limit: 250, spent: 180 },
    { id: "4", category: "Transportation", limit: 200, spent: 140 }
  ]);

  const [newBudget, setNewBudget] = useState({
    category: "",
    limit: ""
  });

  const [editingId, setEditingId] = useState<string | null>(null);

  const handleAddBudget = () => {
    if (!newBudget.category.trim() || !newBudget.limit) return;

    const budget: Budget = {
      id: Date.now().toString(),
      category: newBudget.category,
      limit: parseFloat(newBudget.limit),
      spent: 0
    };

    setBudgets([...budgets, budget]);
    setNewBudget({ category: "", limit: "" });
    
    toast({
      title: "Budget Created",
      description: `Budget for ${budget.category} set to $${budget.limit}.`,
    });
  };

  const updateBudgetLimit = (id: string, newLimit: number) => {
    setBudgets(budgets.map(b => 
      b.id === id ? { ...b, limit: newLimit } : b
    ));
    setEditingId(null);
    toast({
      title: "Budget Updated",
      description: "Budget limit has been updated.",
    });
  };

  const getBudgetStatus = (budget: Budget) => {
    const percentage = (budget.spent / budget.limit) * 100;
    if (percentage >= 100) return { color: "bg-red-500", status: "Over Budget!" };
    if (percentage >= 80) return { color: "bg-yellow-500", status: "Warning" };
    return { color: "bg-green-500", status: "On Track" };
  };

  const totalBudget = budgets.reduce((sum, b) => sum + b.limit, 0);
  const totalSpent = budgets.reduce((sum, b) => sum + b.spent, 0);
  const overallPercentage = (totalSpent / totalBudget) * 100;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Target className="h-5 w-5 text-blue-600" />
          Budget Manager
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Overall Budget Status */}
        <div className="bg-muted p-4 rounded-lg">
          <div className="flex justify-between items-center mb-2">
            <h4 className="font-semibold">Overall Budget</h4>
            <span className="text-sm text-muted-foreground">
              ${totalSpent.toFixed(2)} / ${totalBudget.toFixed(2)}
            </span>
          </div>
          <Progress value={overallPercentage} className="h-3" />
          <div className="flex justify-between mt-1">
            <span className="text-sm text-muted-foreground">{overallPercentage.toFixed(1)}% used</span>
            <span className="text-sm text-muted-foreground">
              ${(totalBudget - totalSpent).toFixed(2)} remaining
            </span>
          </div>
        </div>

        {/* Add New Budget */}
        <div className="border rounded-lg p-4 space-y-3">
          <h4 className="font-semibold">Add Budget Category</h4>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label htmlFor="budget-category">Category</Label>
              <Input
                id="budget-category"
                value={newBudget.category}
                onChange={(e) => setNewBudget({ ...newBudget, category: e.target.value })}
                placeholder="e.g., Shopping"
              />
            </div>
            <div>
              <Label htmlFor="budget-limit">Monthly Limit ($)</Label>
              <Input
                id="budget-limit"
                type="number"
                value={newBudget.limit}
                onChange={(e) => setNewBudget({ ...newBudget, limit: e.target.value })}
                placeholder="0.00"
              />
            </div>
          </div>
          <Button onClick={handleAddBudget} className="w-full">
            <Plus className="h-4 w-4 mr-2" />
            Add Budget
          </Button>
        </div>

        {/* Budget Categories */}
        <div className="space-y-3">
          <h4 className="font-semibold">Budget Categories</h4>
          {budgets.map((budget) => {
            const percentage = (budget.spent / budget.limit) * 100;
            const status = getBudgetStatus(budget);
            
            return (
              <div key={budget.id} className="border rounded-lg p-3">
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center gap-2">
                    <h5 className="font-medium">{budget.category}</h5>
                    {percentage >= 80 && (
                      <AlertTriangle className="h-4 w-4 text-yellow-500" />
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">
                      ${budget.spent} / ${budget.limit}
                    </span>
                    <Button 
                      size="sm" 
                      variant="ghost"
                      onClick={() => setEditingId(budget.id)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                {editingId === budget.id ? (
                  <div className="flex gap-2 mb-2">
                    <Input
                      type="number"
                      defaultValue={budget.limit}
                      placeholder="New limit"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          updateBudgetLimit(budget.id, parseFloat(e.currentTarget.value));
                        }
                      }}
                    />
                    <Button 
                      size="sm"
                      onClick={() => setEditingId(null)}
                    >
                      Cancel
                    </Button>
                  </div>
                ) : (
                  <Progress value={percentage} className="h-2 mb-2" />
                )}
                
                <div className="flex justify-between text-xs">
                  <span className={`font-medium ${
                    percentage >= 100 ? 'text-red-600' : 
                    percentage >= 80 ? 'text-yellow-600' : 'text-green-600'
                  }`}>
                    {status.status}
                  </span>
                  <span className="text-muted-foreground">
                    ${(budget.limit - budget.spent).toFixed(2)} remaining
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default BudgetManager;
