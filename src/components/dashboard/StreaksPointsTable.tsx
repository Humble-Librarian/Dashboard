
import React from "react";
import { Award, Flame, Star, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface StreaksPointsTableProps {
  className?: string;
}

const StreaksPointsTable: React.FC<StreaksPointsTableProps> = ({ className }) => {
  const userStats = {
    currentStreak: 7,
    longestStreak: 14,
    totalPoints: 1250,
    level: 6,
    progressToNextLevel: 75,
    recentAchievements: [
      "Completed Budget Basics",
      "5-Day Streak",
      "Aced Investment Quiz"
    ]
  };

  return (
    <Card className={cn("overflow-hidden transition-all duration-300 hover:shadow-md border border-border/60", className)}>
      <CardHeader className="bg-gradient-to-r from-primary/10 to-accent/10 pb-3">
        <div className="flex items-center">
          <div className="bg-primary/20 p-2 rounded-full mr-3">
            <Award className="h-4 w-4 text-primary" />
          </div>
          <CardTitle className="text-base font-medium">Your Progress</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="pt-4 grid gap-4">
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-secondary/50 rounded-lg p-3 flex flex-col items-center justify-center text-center">
            <div className="bg-orange-500/20 p-2 rounded-full mb-2">
              <Flame className="h-4 w-4 text-orange-500" />
            </div>
            <span className="text-xl font-semibold">{userStats.currentStreak}</span>
            <span className="text-xs text-muted-foreground">Day Streak</span>
          </div>
          
          <div className="bg-secondary/50 rounded-lg p-3 flex flex-col items-center justify-center text-center">
            <div className="bg-yellow-500/20 p-2 rounded-full mb-2">
              <Star className="h-4 w-4 text-yellow-500" />
            </div>
            <span className="text-xl font-semibold">{userStats.totalPoints}</span>
            <span className="text-xs text-muted-foreground">Total Points</span>
          </div>
          
          <div className="bg-secondary/50 rounded-lg p-3 flex flex-col items-center justify-center text-center">
            <div className="bg-green-500/20 p-2 rounded-full mb-2">
              <TrendingUp className="h-4 w-4 text-green-500" />
            </div>
            <span className="text-xl font-semibold">{userStats.level}</span>
            <span className="text-xs text-muted-foreground">Current Level</span>
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between items-center text-sm">
            <span>Progress to Level {userStats.level + 1}</span>
            <span className="text-primary">{userStats.progressToNextLevel}%</span>
          </div>
          <Progress value={userStats.progressToNextLevel} className="h-2" />
        </div>
        
        <div>
          <h4 className="text-sm font-medium mb-2">Recent Achievements</h4>
          <ul className="space-y-1">
            {userStats.recentAchievements.map((achievement, index) => (
              <li 
                key={index} 
                className="text-xs flex items-center space-x-2 bg-secondary/30 p-2 rounded"
              >
                <div className="h-1.5 w-1.5 rounded-full bg-primary/70" />
                <span>{achievement}</span>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default StreaksPointsTable;
