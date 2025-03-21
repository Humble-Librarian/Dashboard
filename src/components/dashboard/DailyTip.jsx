import { Info, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const DailyTip = ({ className }) => {
  // In a real app, this would be fetched from an API
  const tip = {
    title: "Use the 50/30/20 Budgeting Rule",
    content: "Allocate 50% of your income to needs, 30% to wants, and 20% to savings and debt payments. This simple approach helps maintain financial balance and ensures you're saving for the future.",
    date: "June 5, 2023"
  };

  return (
    <Card className={cn("overflow-hidden transition-all duration-300 hover:shadow-md border border-border/60", className)}>
      <CardHeader className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 pb-3">
        <div className="flex items-center">
          <div className="bg-primary/20 p-2 rounded-full mr-3">
            <Info className="h-4 w-4 text-primary" />
          </div>
          <CardTitle className="text-base font-medium">Today's Financial Tip</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        <h3 className="font-medium mb-2">{tip.title}</h3>
        <p className="text-sm text-muted-foreground">{tip.content}</p>
      </CardContent>
      <CardFooter className="flex justify-between pt-0 text-xs text-muted-foreground">
        <span>{tip.date}</span>
        <Button variant="ghost" size="sm" className="text-xs p-0 h-auto hover:bg-transparent hover:text-primary">
          <span>More tips</span>
          <ArrowRight className="ml-1 h-3 w-3" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default DailyTip; 