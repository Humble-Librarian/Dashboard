import { Award, Flame, Star, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

// Mock data - in a real app this would come from an API
const userStats = {
  currentStreak: 12,
  bestStreak: 23,
  totalPoints: 835,
  level: 5,
  progressToNextLevel: 68,
  badges: [
    { name: "First Step", icon: <Award className="h-4 w-4" />, earned: true },
    { name: "Week Warrior", icon: <Flame className="h-4 w-4" />, earned: true },
    { name: "Knowledge Master", icon: <Star className="h-4 w-4" />, earned: false },
  ]
};

const StreaksPointsTable = ({ className }) => {
  return (
    <Card className={cn("overflow-hidden border border-border/60", className)}>
      <CardHeader className="bg-gradient-to-r from-orange-500/10 to-yellow-500/10 pb-3">
        <CardTitle className="text-base font-medium">Learning Progress</CardTitle>
      </CardHeader>
      
      <CardContent className="pt-4 grid gap-4">
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-secondary/40 rounded-lg p-3 flex flex-col items-center justify-center text-center">
            <div className="bg-orange-500/20 p-2 rounded-full mb-2">
              <Flame className="h-4 w-4 text-orange-500" />
            </div>
            <span className="text-xl font-semibold">{userStats.currentStreak}</span>
            <span className="text-xs text-muted-foreground">Day Streak</span>
          </div>
          
          <div className="bg-secondary/40 rounded-lg p-3 flex flex-col items-center justify-center text-center">
            <div className="bg-yellow-500/20 p-2 rounded-full mb-2">
              <Star className="h-4 w-4 text-yellow-500" />
            </div>
            <span className="text-xl font-semibold">{userStats.totalPoints}</span>
            <span className="text-xs text-muted-foreground">Total Points</span>
          </div>
          
          <div className="bg-secondary/40 rounded-lg p-3 flex flex-col items-center justify-center text-center">
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
        
        <div className="pt-2">
          <h4 className="text-sm font-medium mb-3">Badges & Achievements</h4>
          <div className="flex gap-3 items-center">
            {userStats.badges.map((badge, index) => (
              <div 
                key={index} 
                className={cn(
                  "flex flex-col items-center justify-center text-center",
                  !badge.earned && "opacity-40"
                )}
              >
                <div className={cn(
                  "p-3 rounded-full mb-1",
                  badge.earned ? "bg-primary/20" : "bg-secondary"
                )}>
                  {badge.icon}
                </div>
                <span className="text-xs">{badge.name}</span>
              </div>
            ))}
            <div className="flex items-center justify-center h-10 w-10 rounded-full border-2 border-dashed border-muted-foreground/20 text-muted-foreground/60">
              <span className="text-lg font-light">+</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StreaksPointsTable; 