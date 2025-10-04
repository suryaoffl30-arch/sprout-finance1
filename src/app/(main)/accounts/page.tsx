import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Banknote, CreditCard, Landmark, MoreVertical, Plus } from "lucide-react";

export default function AccountsPage() {
  return (
    <div className="p-4 md:p-6 space-y-6">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="font-headline text-3xl font-bold">Accounts</h1>
          <p className="text-muted-foreground">Your linked accounts and payment methods.</p>
        </div>
        <Button size="icon" variant="ghost">
          <Plus />
        </Button>
      </header>

      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Linked Accounts</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <AccountItem
            icon={<Landmark className="h-8 w-8 text-primary" />}
            name="Primary Savings"
            bank="Sprout Bank - 1234"
            balance="$12,450.00"
          />
          <Separator />
          <AccountItem
            icon={<Banknote className="h-8 w-8 text-accent" />}
            name="Spending Account"
            bank="Growth Bank - 5678"
            balance="$1,230.50"
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Card Management</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <CardItem
            name="Sprout Debit"
            number="**** **** **** 1234"
            expiry="12/26"
            isPrimary
          />
          <Separator />
          <CardItem
            name="Growth Credit"
            number="**** **** **** 5678"
            expiry="08/25"
          />
        </CardContent>
      </Card>
    </div>
  );
}

function AccountItem({ icon, name, bank, balance }: { icon: React.ReactNode; name: string; bank: string; balance: string }) {
  return (
    <div className="flex items-center gap-4">
      <div className="rounded-lg bg-muted p-3">{icon}</div>
      <div className="flex-1">
        <p className="font-semibold">{name}</p>
        <p className="text-sm text-muted-foreground">{bank}</p>
      </div>
      <div className="text-right">
        <p className="font-bold">{balance}</p>
      </div>
       <Button size="icon" variant="ghost"><MoreVertical className="h-4 w-4" /></Button>
    </div>
  );
}


function CardItem({ name, number, expiry, isPrimary = false }: { name: string; number: string; expiry: string; isPrimary?: boolean }) {
  return (
    <div className="flex items-center gap-4">
      <div className="rounded-lg bg-muted p-3">
        <CreditCard className="h-8 w-8 text-secondary-foreground" />
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-2">
            <p className="font-semibold">{name}</p>
            {isPrimary && <span className="text-xs bg-primary text-primary-foreground px-2 py-0.5 rounded-full">Primary</span>}
        </div>
        <p className="text-sm text-muted-foreground">{number}</p>
      </div>
      <div className="text-right">
        <p className="text-sm font-medium">{expiry}</p>
      </div>
      <Button size="icon" variant="ghost"><MoreVertical className="h-4 w-4" /></Button>
    </div>
  );
}
