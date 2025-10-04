'use client';

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Bell, ChevronRight, CircleUserRound, FolderDown, LogOut, Palette, Shield } from "lucide-react";
import Link from "next/link";
import { useTheme } from "next-themes";

const settings = [
    { id: "theme", icon: Palette, title: "Theme", description: "Light / Dark Mode" },
    { id: "notifications", icon: Bell, title: "Notifications", description: "Manage alerts" },
    { id: "security", icon: Shield, title: "Security", description: "Password, 2FA" },
    { id: "backup", icon: FolderDown, title: "Backup & Restore", description: "Google Drive sync" }
]

export default function ProfilePage() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="p-4 md:p-6 space-y-6">
      <header>
        <h1 className="font-headline text-3xl font-bold">Profile</h1>
        <p className="text-muted-foreground">Manage your account and settings.</p>
      </header>
      
      <div className="flex items-center gap-4">
        <Avatar className="h-16 w-16 border-2 border-primary">
          <AvatarImage src="https://picsum.photos/seed/user/64/64" data-ai-hint="person face" />
          <AvatarFallback>AD</AvatarFallback>
        </Avatar>
        <div>
          <h2 className="text-xl font-bold font-headline">Alex Doe</h2>
          <p className="text-sm text-muted-foreground">alex.doe@example.com</p>
        </div>
        <Button variant="ghost" size="icon" className="ml-auto"><CircleUserRound /></Button>
      </div>
      
      <Card>
        <CardContent className="p-0">
          <ul className="divide-y">
            {settings.map((item) => (
                <li key={item.title} className="p-4 flex items-center justify-between hover:bg-muted/50 transition-colors cursor-pointer">
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
                    /> : item.id === "notifications" ? <Switch /> : <ChevronRight className="h-5 w-5 text-muted-foreground" />}
                </li>
            ))}
          </ul>
        </CardContent>
      </Card>
      
      <Link href="/login">
        <Button variant="destructive" className="w-full">
            <LogOut className="mr-2 h-4 w-4" /> Sign Out
        </Button>
      </Link>
    </div>
  );
}
