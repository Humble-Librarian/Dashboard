import { ArrowRight, InfoIcon, MoveRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

// Mock budget data
const categories = [
  { 
    name: "Housing", 
    spent: 90000, 
    budget: 90000, 
    percentage: 100,
    color: "bg-blue-500"
  },
  { 
    name: "Food", 
    spent: 36000, 
    budget: 45000, 
    percentage: 80,
    color: "bg-green-500"
  },
  { 
    name: "Transportation", 
    spent: 24000, 
    budget: 26250, 
    percentage: 91,
    color: "bg-orange-500"
  },
  { 
    name: "Entertainment", 
    spent: 15750, 
    budget: 15000, 
    percentage: 105,
    color: "bg-purple-500"
  },
  { 
    name: "Utilities", 
    spent: 11250, 
    budget: 13500, 
    percentage: 83,
    color: "bg-cyan-500"
  }
];

const BudgetOverview = () => {
  // Helper function to format rupee values
  const formatRupee = (value) => {
    return '₹' + value.toLocaleString('en-IN');
  };

  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle>Budget Overview</CardTitle>
          <Button variant="ghost" className="gap-1 h-8 font-normal text-sm">
            <span>View details</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {categories.map((category, index) => (
            <div key={index} className="space-y-1">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">{category.name}</span>
                <div className="flex gap-1.5 text-xs">
                  <span className="font-medium">{formatRupee(category.spent)}</span>
                  <span className="text-muted-foreground">{formatRupee(category.budget)}</span>
                </div>
              </div>
              <div className="relative">
                <Progress 
                  value={Math.min(100, category.percentage)} 
                  className={cn("h-2")}
                />
                <div 
                  className={cn(
                    "absolute inset-0 h-2 rounded-full", 
                    category.color
                  )} 
                  style={{ 
                    width: `${Math.min(100, category.percentage)}%`,
                    opacity: 0.95
                  }}
                ></div>
                {category.percentage > 100 && (
                  <div className="absolute -top-1 -right-1 text-xs px-1 rounded-sm text-white bg-red-500">
                    Over
                  </div>
                )}
              </div>
            </div>
          ))}
          
          <div className="pt-3 flex justify-between items-center">
            <div>
              <p className="text-sm font-medium flex items-center">
                <span>Remaining budget</span>
                <InfoIcon className="h-3 w-3 ml-1 text-muted-foreground" />
              </p>
              <p className="text-lg font-semibold">₹96,750</p>
            </div>
            <Button variant="outline" size="sm" className="h-8 gap-1">
              <span>Budget planner</span>
              <MoveRight className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BudgetOverview; 