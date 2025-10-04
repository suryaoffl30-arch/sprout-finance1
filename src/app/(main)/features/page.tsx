'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Banknote, CalendarClock, LifeBuoy, Plus, Repeat, ShieldCheck, TrendingUp } from "lucide-react";
import Link from 'next/link';

const features = [
    {
        title: "Loan Management",
        description: "Track and optimize your loans.",
        icon: Banknote,
        href: "/features/loans",
        status: "Active"
    },
    {
        title: "Scheduled Transactions",
        description: "Plan future payments.",
        icon: CalendarClock,
        href: "#",
        status: "Add"
    },
    {
        title: "Subscription Management",
        description: "Monitor recurring payments.",
        icon: Repeat,
        href: "#",
        status: "Add"
    },
    {
        title: "Retirement Funds",
        description: "Plan for your golden years.",
        icon: TrendingUp,
        href: "#",
        status: "Active"
    },
    {
        title: "Emergency Funds",
        description: "Be prepared for the unexpected.",
        icon: LifeBuoy,
        href: "#",
        status: "Active"
    },
    {
        title: "Card Management",
        description: "Secure and manage your cards.",
        icon: ShieldCheck,
        href: "/accounts",
        status: "View"
    }
]

export default function FeaturesPage() {
  return (
    <div className="p-4 md:p-6 space-y-6">
      <header>
        <h1 className="font-headline text-3xl font-bold">Features</h1>
        <p className="text-muted-foreground">Your financial toolkit for success.</p>
      </header>

      <div className="grid grid-cols-2 gap-4">
        {features.map((feature) => (
            <Link key={feature.title} href={feature.href} className="block">
                <Card className="h-full hover:border-primary hover:bg-primary/5 transition-colors">
                    <CardHeader>
                        <feature.icon className="h-8 w-8 text-primary mb-2" />
                        <CardTitle className="text-base font-headline">{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-xs text-muted-foreground">{feature.description}</p>
                    </CardContent>
                </Card>
            </Link>
        ))}
         <Card className="h-full border-dashed flex flex-col items-center justify-center text-muted-foreground hover:border-primary hover:text-primary transition-colors cursor-pointer">
            <Plus className="h-8 w-8 mb-2" />
            <p className="text-sm font-semibold">Add Feature</p>
        </Card>
      </div>
    </div>
  );
}
