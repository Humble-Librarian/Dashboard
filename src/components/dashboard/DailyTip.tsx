
import React from "react";
import { Info, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface DailyTipProps {
  className?: string;
}

const tips = [
  {
    title: "Emergency Fund Basics",
    content: "Aim to save 3-6 months of expenses in an easily accessible account for unexpected costs."
  },
  {
    title: "Compound Interest Power",
    content: "Starting to invest early, even with small amounts, can lead to significant growth over time due to compound interest."
  },
  {
    title: "The 50/30/20 Rule",
    content: "Try allocating 50% of income to needs, 30% to wants, and 20% to savings for balanced finances."
  }
];

const DailyTip: React.FC<DailyTipProps> = ({ className }) => {
  const randomTip = tips[Math.floor(Math.random() * tips.length)];

  return (
    <Card className={cn("overflow-hidden transition-all duration-300 hover:shadow-md border border-border/60", className)}>
      <CardHeader className="bg-gradient-to-r from-primary/10 to-accent/10 pb-3">
        <div className="flex items-center">
          <div className="bg-primary/20 p-2 rounded-full mr-3">
            <Info className="h-4 w-4 text-primary" />
          </div>
          <CardTitle className="text-base font-medium">Daily Financial Tip</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        <h3 className="font-medium text-sm mb-2">{randomTip.title}</h3>
        <p className="text-sm text-muted-foreground">{randomTip.content}</p>
      </CardContent>
      <CardFooter className="pt-0">
        <Button variant="ghost" size="sm" className="text-xs p-0 h-auto hover:bg-transparent hover:text-primary">
          <span>Learn more</span>
          <ArrowRight className="ml-1 h-3 w-3" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default DailyTip;
