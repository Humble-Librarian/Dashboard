
import React from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import DailyTip from "@/components/dashboard/DailyTip";
import FlashcardPreview from "@/components/dashboard/FlashcardPreview";
import StreaksPointsTable from "@/components/dashboard/StreaksPointsTable";
import InvestmentRecommendations from "@/components/dashboard/InvestmentRecommendations";

const Index = () => {
  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto animate-fade-in">
        <h1 className="text-2xl font-medium mb-6">Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl p-4 shadow-sm border border-primary/20">
            <h3 className="text-sm font-medium text-primary/80 mb-1">Current Balance</h3>
            <p className="text-2xl font-semibold">$12,680</p>
            <p className="text-xs text-muted-foreground mt-1">Updated today</p>
          </div>
          
          <div className="bg-gradient-to-br from-accent/10 to-accent/5 rounded-xl p-4 shadow-sm border border-accent/20">
            <h3 className="text-sm font-medium text-accent/80 mb-1">Monthly Savings</h3>
            <p className="text-2xl font-semibold">$2,450</p>
            <p className="text-xs text-muted-foreground mt-1">+15% from last month</p>
          </div>
          
          <div className="bg-gradient-to-br from-orange-500/10 to-orange-500/5 rounded-xl p-4 shadow-sm border border-orange-500/20">
            <h3 className="text-sm font-medium text-orange-500/80 mb-1">Knowledge Score</h3>
            <p className="text-2xl font-semibold">760 pts</p>
            <p className="text-xs text-muted-foreground mt-1">Intermediate level</p>
          </div>
          
          <div className="bg-gradient-to-br from-emerald-500/10 to-emerald-500/5 rounded-xl p-4 shadow-sm border border-emerald-500/20">
            <h3 className="text-sm font-medium text-emerald-500/80 mb-1">Investment Growth</h3>
            <p className="text-2xl font-semibold">+8.3%</p>
            <p className="text-xs text-muted-foreground mt-1">Year to date</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <DailyTip />
              <FlashcardPreview />
            </div>
            <InvestmentRecommendations />
          </div>
          <div>
            <StreaksPointsTable />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Index;
