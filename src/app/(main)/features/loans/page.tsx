'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { PlusCircle, MoreVertical, DollarSign, Percent, Trash2, Edit, CalendarIcon } from "lucide-react";
import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

const initialLoans = [
    {
        id: "1",
        name: "Student Loan",
        provider: "Sprout Education Finance",
        remainingBalance: 8500,
        totalAmount: 25000,
        interestRate: 4.5,
        startDate: new Date("2022-08-01"),
    },
    {
        id: "2",
        name: "Car Loan",
        provider: "AutoLend Co.",
        remainingBalance: 12000,
        totalAmount: 30000,
        interestRate: 3.2,
        startDate: new Date("2023-01-15"),
    },
     {
        id: "3",
        name: "Personal Loan",
        provider: "Growth Bank",
        remainingBalance: 1500,
        totalAmount: 5000,
        interestRate: 7.1,
        startDate: new Date("2023-11-10"),
    }
]

type Loan = typeof initialLoans[0];

export default function LoansPage() {
  const [loans, setLoans] = useState(initialLoans);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingLoan, setEditingLoan] = useState<Loan | null>(null);

  const totalRemaining = loans.reduce((acc, loan) => acc + loan.remainingBalance, 0);

  const handleDeleteLoan = (loanId: string) => {
    setLoans(loans.filter(loan => loan.id !== loanId));
  }

  const handleSaveLoan = (loanData: Omit<Loan, 'id' | 'remainingBalance'> & { id?: string }) => {
    if (editingLoan) {
      // Edit
      setLoans(loans.map(l => l.id === editingLoan.id ? { ...editingLoan, ...loanData, remainingBalance: loanData.totalAmount } : l));
    } else {
      // Add
      const newLoan = { 
        ...loanData, 
        id: Date.now().toString(), 
        remainingBalance: loanData.totalAmount 
      };
      setLoans([...loans, newLoan]);
    }
    setIsDialogOpen(false);
    setEditingLoan(null);
  };

  const openEditDialog = (loan: Loan) => {
    setEditingLoan(loan);
    setIsDialogOpen(true);
  }
  
  const openAddDialog = () => {
    setEditingLoan(null);
    setIsDialogOpen(true);
  }

  return (
    <div className="p-4 md:p-6 space-y-6">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="font-headline text-3xl font-bold">Loan Management</h1>
          <p className="text-muted-foreground">Track and manage your outstanding loans.</p>
        </div>
        <Button size="sm" variant="outline" onClick={openAddDialog}>
          <PlusCircle className="mr-2" />
          Add Loan
        </Button>
      </header>
      
      <LoanFormDialog 
        isOpen={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onSave={handleSaveLoan}
        loan={editingLoan}
        onClose={() => setEditingLoan(null)}
      />

      <Card>
        <CardHeader>
            <CardTitle>Total Loan Balance</CardTitle>
        </CardHeader>
        <CardContent>
            <p className="text-3xl font-bold">₹{totalRemaining.toLocaleString()}</p>
            <p className="text-sm text-muted-foreground">Across {loans.length} loans</p>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <h2 className="font-headline text-lg font-semibold">Your Loans</h2>
        {loans.map((loan) => (
            <LoanCard key={loan.id} loan={loan} onEdit={() => openEditDialog(loan)} onDelete={() => handleDeleteLoan(loan.id)} />
        ))}
      </div>
    </div>
  );
}

function LoanCard({ loan, onEdit, onDelete }: { loan: Loan; onEdit: () => void; onDelete: () => void; }) {
    const progress = ((loan.totalAmount - loan.remainingBalance) / loan.totalAmount) * 100;
    return (
        <Card>
            <CardHeader className="flex flex-row items-start justify-between">
                <div>
                    <CardTitle className="font-headline">{loan.name}</CardTitle>
                    <CardDescription>{loan.provider}</CardDescription>
                </div>
                 <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button size="icon" variant="ghost">
                            <MoreVertical className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={onEdit}>
                            <Edit className="mr-2 h-4 w-4" />
                            <span>Edit</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={onDelete} className="text-destructive">
                            <Trash2 className="mr-2 h-4 w-4" />
                            <span>Delete</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </CardHeader>
            <CardContent>
                <div className="flex justify-between items-baseline">
                     <p className="text-2xl font-bold">₹{loan.remainingBalance.toLocaleString()}</p>
                     <p className="text-xs text-muted-foreground">of ₹{loan.totalAmount.toLocaleString()}</p>
                </div>
                <Progress value={progress} className="mt-2 h-2" />
                 <p className="text-xs text-muted-foreground mt-2">Started on: {format(loan.startDate, 'PPP')}</p>
            </CardContent>
            <CardFooter className="text-xs text-muted-foreground justify-between">
                 <div className="flex items-center gap-1">
                    <Percent className="h-3 w-3" />
                    <span>{loan.interestRate}% Interest Rate</span>
                </div>
                 <div className="flex items-center gap-1">
                    <DollarSign className="h-3 w-3" />
                    <span>₹{(loan.totalAmount - loan.remainingBalance).toLocaleString()} paid</span>
                </div>
            </CardFooter>
        </Card>
    )
}


function LoanFormDialog({ isOpen, onOpenChange, onSave, loan, onClose }: { isOpen: boolean, onOpenChange: (open: boolean) => void, onSave: (data: any) => void, loan: Loan | null, onClose: () => void }) {
  const [formData, setFormData] = useState({
    name: '',
    provider: '',
    totalAmount: '',
    interestRate: '',
    startDate: new Date(),
  });

  useEffect(() => {
    if (loan) {
      setFormData({
        name: loan.name,
        provider: loan.provider,
        totalAmount: loan.totalAmount.toString(),
        interestRate: loan.interestRate.toString(),
        startDate: loan.startDate
      });
    } else {
       setFormData({ name: '', provider: '', totalAmount: '', interestRate: '', startDate: new Date() });
    }
  }, [loan, isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleDateChange = (date: Date | undefined) => {
    if (date) {
      setFormData(prev => ({ ...prev, startDate: date }));
    }
  }

  const handleSubmit = () => {
    onSave({
      name: formData.name,
      provider: formData.provider,
      totalAmount: parseFloat(formData.totalAmount) || 0,
      interestRate: parseFloat(formData.interestRate) || 0,
      startDate: formData.startDate,
    });
  };

  const handleOpenChange = (open: boolean) => {
    if(!open) {
      onClose();
    }
    onOpenChange(open);
  }
  
  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{loan ? 'Edit Loan' : 'Add New Loan'}</DialogTitle>
          <DialogDescription>
            {loan ? "Update the details of your existing loan." : "Enter the details of your new loan to start tracking."}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">Name</Label>
            <Input id="name" value={formData.name} onChange={handleChange} className="col-span-3" placeholder="e.g. Student Loan" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="provider" className="text-right">Provider</Label>
            <Input id="provider" value={formData.provider} onChange={handleChange} className="col-span-3" placeholder="e.g. Sprout Finance" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="totalAmount" className="text-right">Total Amount</Label>
            <Input id="totalAmount" type="number" value={formData.totalAmount} onChange={handleChange} className="col-span-3" placeholder="e.g. 25000" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="interestRate" className="text-right">Interest Rate (%)</Label>
            <Input id="interestRate" type="number" value={formData.interestRate} onChange={handleChange} className="col-span-3" placeholder="e.g. 4.5" />
          </div>
           <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="startDate" className="text-right">Start Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "col-span-3 justify-start text-left font-normal",
                    !formData.startDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {formData.startDate ? format(formData.startDate, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={formData.startDate}
                  onSelect={handleDateChange}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleSubmit}>Save Loan</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
