
import React from "react";
import { TrendingUp, ChevronUp, ChevronDown, Info, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface InvestmentRecommendationsProps {
  className?: string;
}

const investments = [
  {
    name: "Sustainable Energy ETF",
    ticker: "GRNG",
    change: 2.4,
    reason: "Based on your interest in environmental investments",
  },
  {
    name: "Technology Growth Fund",
    ticker: "TECH",
    change: -0.8,
    reason: "Complements your existing tech stocks",
  },
  {
    name: "Balanced Index Fund",
    ticker: "BLND",
    change: 1.2,
    reason: "Adds diversification to your portfolio",
  },
];

const InvestmentRecommendations: React.FC<InvestmentRecommendationsProps> = ({ className }) => {
  return (
    <Card className={cn("overflow-hidden transition-all duration-300 hover:shadow-md border border-border/60", className)}>
      <CardHeader className="bg-gradient-to-r from-primary/10 to-accent/10 pb-3">
        <div className="flex items-center">
          <div className="bg-primary/20 p-2 rounded-full mr-3">
            <TrendingUp className="h-4 w-4 text-primary" />
          </div>
          <CardTitle className="text-base font-medium">Recommended Investments</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="space-y-3">
          {investments.map((investment, index) => (
            <div 
              key={index} 
              className="flex items-center justify-between p-2 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors cursor-pointer"
            >
              <div className="flex-1">
                <div className="flex items-center">
                  <span className="font-medium text-sm">{investment.name}</span>
                  <span className="text-xs text-muted-foreground ml-2">{investment.ticker}</span>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-5 w-5 ml-1">
                          <Info className="h-3 w-3 text-muted-foreground" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="text-xs">{investment.reason}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </div>
              <div className={cn(
                "flex items-center text-sm",
                investment.change >= 0 ? "text-green-500" : "text-red-500"
              )}>
                {investment.change >= 0 ? (
                  <ChevronUp className="h-4 w-4 mr-1" />
                ) : (
                  <ChevronDown className="h-4 w-4 mr-1" />
                )}
                {Math.abs(investment.change)}%
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="pt-0">
        <Button variant="ghost" size="sm" className="text-xs p-0 h-auto hover:bg-transparent hover:text-primary">
          <span>View all recommendations</span>
          <ArrowRight className="ml-1 h-3 w-3" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default InvestmentRecommendations;
