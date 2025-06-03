
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { Plus, Trash2, TrendingDown, TrendingUp } from "lucide-react";

interface Expense {
  id: string;
  description: string;
  amount: number;
  category: string;
  date: Date;
}

const ExpenseTracker = () => {
  const { toast } = useToast();
  const [expenses, setExpenses] = useState<Expense[]>([
    {
      id: "1",
      description: "Grocery Shopping",
      amount: 85.42,
      category: "Food",
      date: new Date("2024-06-02")
    },
    {
      id: "2",
      description: "Electricity Bill",
      amount: 124.33,
      category: "Utilities",
      date: new Date("2024-05-30")
    }
  ]);

  const [newExpense, setNewExpense] = useState({
    description: "",
    amount: "",
    category: "Food"
  });

  const categories = ["Food", "Utilities", "Transportation", "Entertainment", "Shopping", "Healthcare", "Other"];

  const handleAddExpense = () => {
    if (!newExpense.description.trim() || !newExpense.amount) return;

    const expense: Expense = {
      id: Date.now().toString(),
      description: newExpense.description,
      amount: parseFloat(newExpense.amount),
      category: newExpense.category,
      date: new Date()
    };

    setExpenses([expense, ...expenses]);
    setNewExpense({ description: "", amount: "", category: "Food" });
    
    toast({
      title: "Expense Added",
      description: `$${expense.amount} expense recorded successfully.`,
    });
  };

  const handleDeleteExpense = (id: string) => {
    setExpenses(expenses.filter(e => e.id !== id));
    toast({
      title: "Expense Deleted",
      description: "Expense has been removed.",
    });
  };

  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const thisMonthExpenses = expenses.filter(e => 
    e.date.getMonth() === new Date().getMonth()
  ).reduce((sum, expense) => sum + expense.amount, 0);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingDown className="h-5 w-5 text-red-600" />
          Expense Tracker
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-muted p-3 rounded-lg">
            <p className="text-sm text-muted-foreground">This Month</p>
            <p className="text-xl font-bold">${thisMonthExpenses.toFixed(2)}</p>
          </div>
          <div className="bg-muted p-3 rounded-lg">
            <p className="text-sm text-muted-foreground">Total Tracked</p>
            <p className="text-xl font-bold">${totalExpenses.toFixed(2)}</p>
          </div>
        </div>

        {/* Add New Expense */}
        <div className="border rounded-lg p-4 space-y-3">
          <h4 className="font-semibold">Add Expense</h4>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label htmlFor="expense-desc">Description</Label>
              <Input
                id="expense-desc"
                value={newExpense.description}
                onChange={(e) => setNewExpense({ ...newExpense, description: e.target.value })}
                placeholder="What did you buy?"
              />
            </div>
            <div>
              <Label htmlFor="expense-amount">Amount ($)</Label>
              <Input
                id="expense-amount"
                type="number"
                step="0.01"
                value={newExpense.amount}
                onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })}
                placeholder="0.00"
              />
            </div>
          </div>
          <div>
            <Label htmlFor="expense-category">Category</Label>
            <select
              id="expense-category"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              value={newExpense.category}
              onChange={(e) => setNewExpense({ ...newExpense, category: e.target.value })}
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
          <Button onClick={handleAddExpense} className="w-full">
            <Plus className="h-4 w-4 mr-2" />
            Add Expense
          </Button>
        </div>

        {/* Recent Expenses */}
        <div className="space-y-2">
          <h4 className="font-semibold">Recent Expenses</h4>
          {expenses.slice(0, 5).map((expense) => (
            <div key={expense.id} className="flex items-center justify-between p-2 border rounded">
              <div>
                <p className="font-medium">{expense.description}</p>
                <p className="text-sm text-muted-foreground">
                  {expense.category} • {expense.date.toLocaleDateString()}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-red-600">-${expense.amount.toFixed(2)}</span>
                <Button size="sm" variant="ghost" onClick={() => handleDeleteExpense(expense.id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ExpenseTracker;
