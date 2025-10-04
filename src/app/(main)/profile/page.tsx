'use client';

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Bell, ChevronRight, CircleUserRound, FolderDown, LogOut, Palette, Shield, Mail, Phone, Plus, Coins } from "lucide-react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { useAuth, useUser } from '@/firebase';
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useCurrency } from "@/context/CurrencyContext";
import { ScrollArea } from "@/components/ui/scroll-area";

function SvgGoogleIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24">
      <path
        fill="#4285F4"
        d="M22.56,12.25C22.56,11.45 22.49,10.68 22.36,9.92H12v4.13h6.06c-0.25,1.49-1,2.8-2.15,3.57v2.89h3.56c2.06-1.88 3.22-4.71 3.22-8.01z"
      ></path>
      <path
        fill="#34A853"
        d="M12,23c3.24,0 5.95-1.08 7.92-2.92l-3.56-2.89c-1.08,0.73-2.45,1.16-4.36,1.16c-3.23,0-5.96-2.18-6.94-5.14H1.5v2.98C3.08,20.25 7.15,23 12,23z"
      ></path>
      <path
        fill="#FBBC05"
        d="M5.06,14.3C4.82,13.58 4.68,12.8 4.68,12s0.14-1.58,0.38-2.3L1.5,6.72C0.56,8.65,0,10.26,0,12s0.56,3.35,1.5,5.28L5.06,14.3z"
      ></path>
      <path
        fill="#EA4335"
        d="M12,5.25c1.77,0 3.2,0.62,4.24,1.61l3.15-3.15C17.4,1.86,14.9,1,12,1C7.15,1,3.08,3.75,1.5,7.28l3.56,2.89C6.04,7.42,8.77,5.25,12,5.25z"
      ></path>
    </svg>
  );
}


const settings = [
    { id: "theme", icon: Palette, title: "Theme", description: "Light / Dark Mode" },
    { id: "currency", icon: Coins, title: "Currency Format", description: "Select your currency" },
    { id: "notifications", icon: Bell, title: "Notifications", description: "Manage alerts" },
    { id: "security", icon: Shield, title: "Security", description: "Password, 2FA" },
    { id: "backup", icon: FolderDown, title: "Backup & Restore", description: "Google Drive sync" }
]

export default function ProfilePage() {
  const { theme, setTheme } = useTheme();
  const auth = useAuth();
  const { user } = useUser();
  const router = useRouter();
  const [isAuthDialogOpen, setIsAuthDialogOpen] = useState(false);
  const [isCurrencyDialogOpen, setIsCurrencyDialogOpen] = useState(false);

  const handleSignOut = () => {
    signOut(auth).then(() => {
        router.push('/');
    });
  }
  
  const providerData = user?.providerData || [];
  const hasEmail = providerData.some(p => p.providerId === 'password');
  const hasPhone = providerData.some(p => p.providerId === 'phone');
  const hasGoogle = providerData.some(p => p.providerId === 'google.com');


  return (
    <div className="p-4 md:p-6 space-y-6">
      <header>
        <h1 className="font-headline text-3xl font-bold">Profile</h1>
        <p className="text-muted-foreground">Manage your account and settings.</p>
      </header>
      
      <div className="flex items-center gap-4">
        <Avatar className="h-16 w-16 border-2 border-primary">
          <AvatarImage src={user?.photoURL ?? "https://picsum.photos/seed/user/64/64"} data-ai-hint="person face" />
          <AvatarFallback>{user?.displayName?.charAt(0) ?? user?.email?.charAt(0)?.toUpperCase() ?? 'U'}</AvatarFallback>
        </Avatar>
        <div>
          <h2 className="text-xl font-bold font-headline">{user?.displayName ?? 'User'}</h2>
          <p className="text-sm text-muted-foreground">{user?.email ?? user?.phoneNumber ?? 'No contact info'}</p>
        </div>
        <Dialog open={isAuthDialogOpen} onOpenChange={setIsAuthDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="ghost" size="icon" className="ml-auto"><CircleUserRound /></Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Linked Accounts</DialogTitle>
              <DialogDescription>
                Manage your connected sign-in methods.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-3">
              {hasEmail && (
                <div className="flex items-center justify-between rounded-md border p-4">
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-semibold">Email</p>
                      <p className="text-sm text-muted-foreground">{user?.email}</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" disabled>Connected</Button>
                </div>
              )}
               {hasPhone && (
                <div className="flex items-center justify-between rounded-md border p-4">
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-muted-foreground" />
                     <div>
                      <p className="font-semibold">Phone</p>
                      <p className="text-sm text-muted-foreground">{user?.phoneNumber}</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" disabled>Connected</Button>
                </div>
              )}
              {hasGoogle && (
                <div className="flex items-center justify-between rounded-md border p-4">
                  <div className="flex items-center gap-3">
                    <SvgGoogleIcon />
                     <div>
                      <p className="font-semibold">Google</p>
                       <p className="text-sm text-muted-foreground">{user?.providerData.find(p=>p.providerId === 'google.com')?.email}</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" disabled>Connected</Button>
                </div>
              )}
               <Button variant="outline" className="w-full">
                  <Plus className="mr-2 h-4 w-4" /> Add Method
                </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      
      <Card>
        <CardContent className="p-0">
          <ul className="divide-y">
            {settings.map((item) => (
                <li key={item.title} onClick={() => item.id === 'currency' && setIsCurrencyDialogOpen(true)} className="p-4 flex items-center justify-between hover:bg-muted/50 transition-colors cursor-pointer">
                    <div className="flex items-center gap-4">
                        <item.icon className="h-5 w-5 text-muted-foreground" />
                        <div>
                            <p className="font-semibold">{item.title}</p>
                            <p className="text-sm text-muted-foreground">{item.description}</p>
                        </div>
                    </div>
                    {item.id === "theme" ? <Switch
                        checked={theme === 'dark'}
                        onCheckedChange={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                        aria-label="Toggle dark mode"
                    /> : item.id === "notifications" ? <Switch /> : item.id === "currency" ? <CurrencyDisplay /> : <ChevronRight className="h-5 w-5 text-muted-foreground" />}
                </li>
            ))}
          </ul>
        </CardContent>
      </Card>
      <CurrencyDialog isOpen={isCurrencyDialogOpen} onOpenChange={setIsCurrencyDialogOpen} />
      
      <Button variant="destructive" className="w-full" onClick={handleSignOut}>
          <LogOut className="mr-2 h-4 w-4" /> Sign Out
      </Button>
    </div>
  );
}

function CurrencyDisplay() {
    const { currency } = useCurrency();
    return (
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>{currency.symbol}</span>
            <span>({currency.code})</span>
            <ChevronRight className="h-5 w-5" />
        </div>
    )
}

function CurrencyDialog({ isOpen, onOpenChange }: { isOpen: boolean, onOpenChange: (open: boolean) => void }) {
    const { setCurrency, currencies, currency: currentCurrency } = useCurrency();

    const handleCurrencySelect = (currencyCode: string) => {
        setCurrency(currencyCode);
        onOpenChange(false);
    }

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Select Currency</DialogTitle>
                    <DialogDescription>
                        Choose your preferred currency. This will be updated across the app.
                    </DialogDescription>
                </DialogHeader>
                <ScrollArea className="h-72">
                    <div className="space-y-2 p-1">
                    {currencies.map((c) => (
                        <Button
                            key={c.code}
                            variant={currentCurrency.code === c.code ? "default" : "ghost"}
                            className="w-full justify-start"
                            onClick={() => handleCurrencySelect(c.code)}
                        >
                            <span className="font-bold w-10">{c.symbol}</span>
                            <span>{c.name} ({c.code})</span>
                        </Button>
                    ))}
                    </div>
                </ScrollArea>
            </DialogContent>
        </Dialog>
    )
}
