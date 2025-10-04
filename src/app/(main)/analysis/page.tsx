'use client';

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowUp, MoreHorizontal } from "lucide-react";
import ExpenseChart from "@/components/charts/ExpenseChart";
import CategoryChart from "@/components/charts/CategoryChart";
import { cn } from "@/lib/utils";

export default function AnalysisPage() {
  return (
    <div className="flex flex-col gap-6 p-4 md:p-6">
      <header className="flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground">Welcome back,</p>
          <h1 className="font-headline text-2xl font-bold">Alex Doe</h1>
        </div>
        <Avatar className="h-10 w-10 border-2 border-primary/50">
          <AvatarImage src="https://picsum.photos/seed/user/40/40" data-ai-hint="person face" />
          <AvatarFallback>AD</AvatarFallback>
        </Avatar>
      </header>
      
      <Tabs defaultValue="monthly" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="weekly">Weekly</TabsTrigger>
          <TabsTrigger value="monthly">Monthly</TabsTrigger>
          <TabsTrigger value="yearly">Yearly</TabsTrigger>
        </TabsList>
        <TabsContent value="weekly">
          <AnalysisContent period="Weekly" />
        </TabsContent>
        <TabsContent value="monthly">
          <AnalysisContent period="Monthly" />
        </TabsContent>
        <TabsContent value="yearly">
          <AnalysisContent period="Yearly" />
        </TabsContent>
      </Tabs>
    </div>
  );
}

function AnalysisContent({ period }: { period: string }) {
  const isPositive = true;
  const percentage = '7.2';

  return (
    <div className="space-y-6 pt-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Spends</CardTitle>
          <span className="text-muted-foreground">₹</span>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">₹4,295.30</div>
          <p className="text-xs text-muted-foreground flex items-center">
            <span className={cn("flex items-center mr-1", isPositive ? "text-primary" : "text-destructive")}>
              {isPositive && <ArrowUp className="h-4 w-4" />}
              {percentage}%
            </span>
             vs last {period.toLowerCase().replace('ly', '')}
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Expense vs Budget</CardTitle>
          <CardDescription>{period} spending analysis</CardDescription>
        </CardHeader>
        <CardContent>
          <ExpenseChart />
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-4">
          <div>
            <CardTitle className="font-headline">Category-wise Spending</CardTitle>
            <CardDescription>Breakdown of your expenses</CardDescription>
          </div>
          <Button variant="ghost" size="icon">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent>
          <CategoryChart />
        </CardContent>
      </Card>
    </div>
  );
}
