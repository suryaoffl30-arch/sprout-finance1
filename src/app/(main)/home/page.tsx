'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Banknote, BrainCircuit, CreditCard, Landmark, PiggyBank, PlusCircle, Shield, Umbrella } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="p-4 md:p-6 space-y-6">
      <header>
        <h1 className="font-headline text-3xl font-bold">Home</h1>
        <p className="text-muted-foreground">Your financial overview and AI insights.</p>
      </header>

      <Card className="bg-gradient-to-br from-primary/20 to-background">
        <CardHeader className="flex flex-row items-start justify-between">
          <div>
            <CardTitle className="font-headline">AI Financial Advisor</CardTitle>
            <CardDescription>Personalized tips for your growth</CardDescription>
          </div>
          <BrainCircuit className="h-6 w-6 text-primary" />
        </CardHeader>
        <CardContent>
          <p className="text-sm mb-4">Based on your recent spending, consider allocating more towards your savings goals. You are doing great on reducing dining-out expenses!</p>
          <Button size="sm" variant="outline">View All Insights</Button>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg font-headline">
              <PiggyBank className="text-primary" /> Savings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">₹12,450.00</p>
            <Progress value={60} className="mt-2 h-2" />
            <p className="text-xs text-muted-foreground mt-1">60% of your ₹20,000 goal</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg font-headline">
              <Umbrella className="text-accent" /> Emergency Fund
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">₹5,800.00</p>
            <Progress value={80} className="mt-2 h-2" />
            <p className="text-xs text-muted-foreground mt-1">80% of 3-month expenses covered</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg font-headline">
              <Landmark className="text-primary" /> Retirement
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">₹52,100.00</p>
            <p className="text-xs text-muted-foreground mt-1">Projected to grow to ₹1.2M</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg font-headline">
              <Banknote className="text-destructive" /> Loans
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">₹8,500.00</p>
            <p className="text-xs text-muted-foreground mt-1">Remaining balance</p>
          </CardContent>
        </Card>
      </div>
      
      <div>
        <h2 className="font-headline text-lg font-semibold mb-2">Quick Actions</h2>
        <div className="grid grid-cols-2 gap-2">
            <Button variant="outline"><PlusCircle className="mr-2"/> Add Expense</Button>
            <Button variant="outline"><CreditCard className="mr-2"/> View Cards</Button>
        </div>
      </div>
    </div>
  );
}
