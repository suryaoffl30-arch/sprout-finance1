'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Logo } from '@/components/Logo';
import { useRouter } from 'next/navigation';
import { Progress } from '@/components/ui/progress';

const features = [
  { id: 'scheduled_transactions', label: 'Scheduled Transactions' },
  { id: 'loan_management', label: 'Loan Management' },
  { id: 'subscription_management', label: 'Subscription Management' },
  { id: 'card_management', label: 'Credit/Debit Card Management' },
  { id: 'emergency_funds', label: 'Emergency Funds' },
  { id: 'retirement_funds', label: 'Retirement Funds' },
  { id: 'unexpected_financial_management', label: 'Unexpected Financial Management' },
];

export default function OnboardingPage() {
  const [step, setStep] = useState(1);
  const [income, setIncome] = useState('');
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const router = useRouter();

  const handleFeatureToggle = (featureId: string) => {
    setSelectedFeatures((prev) =>
      prev.includes(featureId)
        ? prev.filter((id) => id !== featureId)
        : [...prev, featureId]
    );
  };

  const handleNext = () => {
    if (step === 1 && income) {
      setStep(2);
    }
  };

  const handleFinish = () => {
    // Here you would typically save the user's income and selected features
    console.log('Onboarding complete:', { income, selectedFeatures });
    router.push('/home');
  };

  const progressValue = (step / 2) * 100;

  return (
    <div className="relative flex min-h-screen w-full items-center justify-center bg-muted/40 p-4">
      <div className="w-full max-w-md">
        <div className="mx-auto mb-6 flex justify-center">
            <Logo />
        </div>
        <Progress value={progressValue} className="mb-6 h-2" />
        <Card className="w-full">
          {step === 1 && (
            <>
              <CardHeader>
                <CardTitle className="font-headline text-2xl">Welcome to Sprout Finance</CardTitle>
                <CardDescription>Let's start by understanding your finances. What is your monthly income?</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="income">Monthly Income</Label>
                  <Input
                    id="income"
                    type="number"
                    placeholder="e.g., 50000"
                    value={income}
                    onChange={(e) => setIncome(e.target.value)}
                    className="text-base"
                  />
                </div>
                <Button onClick={handleNext} className="w-full" disabled={!income}>
                  Next
                </Button>
              </CardContent>
            </>
          )}

          {step === 2 && (
            <>
              <CardHeader>
                <CardTitle className="font-headline text-2xl">Choose Your Features</CardTitle>
                <CardDescription>Select the features you'd like to start with. You can change this later.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {features.map((feature) => (
                    <div key={feature.id} className="flex items-center space-x-3 rounded-md border p-4 hover:bg-accent/50">
                      <Checkbox
                        id={feature.id}
                        checked={selectedFeatures.includes(feature.id)}
                        onCheckedChange={() => handleFeatureToggle(feature.id)}
                      />
                      <Label htmlFor={feature.id} className="flex-1 cursor-pointer text-sm font-medium">
                        {feature.label}
                      </Label>
                    </div>
                  ))}
                </div>
                <div className='flex gap-2'>
                    <Button variant="outline" onClick={() => setStep(1)} className="w-full">
                        Back
                    </Button>
                    <Button onClick={handleFinish} className="w-full">
                        Finish Setup
                    </Button>
                </div>
              </CardContent>
            </>
          )}
        </Card>
      </div>
    </div>
  );
}
