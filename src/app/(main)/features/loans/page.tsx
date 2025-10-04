import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { PlusCircle, MoreVertical, DollarSign, Percent } from "lucide-react";

const loans = [
    {
        name: "Student Loan",
        provider: "Sprout Education Finance",
        remainingBalance: 8500,
        totalAmount: 25000,
        interestRate: 4.5,
    },
    {
        name: "Car Loan",
        provider: "AutoLend Co.",
        remainingBalance: 12000,
        totalAmount: 30000,
        interestRate: 3.2,
    },
     {
        name: "Personal Loan",
        provider: "Growth Bank",
        remainingBalance: 1500,
        totalAmount: 5000,
        interestRate: 7.1,
    }
]

export default function LoansPage() {
  const totalRemaining = loans.reduce((acc, loan) => acc + loan.remainingBalance, 0);

  return (
    <div className="p-4 md:p-6 space-y-6">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="font-headline text-3xl font-bold">Loan Management</h1>
          <p className="text-muted-foreground">Track and manage your outstanding loans.</p>
        </div>
        <Button size="sm" variant="outline">
          <PlusCircle className="mr-2" />
          Add Loan
        </Button>
      </header>

      <Card>
        <CardHeader>
            <CardTitle>Total Loan Balance</CardTitle>
        </CardHeader>
        <CardContent>
            <p className="text-3xl font-bold">${totalRemaining.toLocaleString()}</p>
            <p className="text-sm text-muted-foreground">Across {loans.length} loans</p>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <h2 className="font-headline text-lg font-semibold">Your Loans</h2>
        {loans.map((loan, index) => (
            <LoanCard key={index} loan={loan} />
        ))}
      </div>
    </div>
  );
}

function LoanCard({ loan }: { loan: typeof loans[0] }) {
    const progress = ((loan.totalAmount - loan.remainingBalance) / loan.totalAmount) * 100;
    return (
        <Card>
            <CardHeader className="flex flex-row items-start justify-between">
                <div>
                    <CardTitle className="font-headline">{loan.name}</CardTitle>
                    <CardDescription>{loan.provider}</CardDescription>
                </div>
                <Button size="icon" variant="ghost">
                    <MoreVertical className="h-4 w-4" />
                </Button>
            </CardHeader>
            <CardContent>
                <div className="flex justify-between items-baseline">
                     <p className="text-2xl font-bold">${loan.remainingBalance.toLocaleString()}</p>
                     <p className="text-xs text-muted-foreground">of ${loan.totalAmount.toLocaleString()}</p>
                </div>
                <Progress value={progress} className="mt-2 h-2" />
            </CardContent>
            <CardFooter className="text-xs text-muted-foreground justify-between">
                 <div className="flex items-center gap-1">
                    <Percent className="h-3 w-3" />
                    <span>{loan.interestRate}% Interest Rate</span>
                </div>
                 <div className="flex items-center gap-1">
                    <DollarSign className="h-3 w-3" />
                    <span>${((loan.totalAmount - loan.remainingBalance)).toLocaleString()} paid</span>
                </div>
            </CardFooter>
        </Card>
    )
}