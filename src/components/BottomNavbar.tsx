'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, PieChart, Wallet, LayoutGrid, User } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/home', icon: Home, label: 'Home' },
  { href: '/accounts', icon: Wallet, label: 'Accounts' },
  { href: '/analysis', icon: PieChart, label: 'Analysis' },
  { href: '/features', icon: LayoutGrid, label: 'Features' },
  { href: '/profile', icon: User, label: 'Profile' },
];

export default function BottomNavbar() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-1/2 z-50 h-16 w-full max-w-lg -translate-x-1/2 border-t bg-background">
      <div className="grid h-full grid-cols-5">
        {navItems.map((item) => {
          const isActive = pathname.startsWith(item.href);
          const isAnalysisDefault = pathname === '/' && item.href === '/analysis';
          return (
            <Link
              key={item.label}
              href={item.href}
              className="group flex flex-col items-center justify-center gap-1 p-2"
            >
              <item.icon
                className={cn(
                  'h-6 w-6 transition-colors',
                  isActive || isAnalysisDefault ? 'text-primary' : 'text-muted-foreground group-hover:text-primary/80'
                )}
              />
              <span
                className={cn(
                  'text-xs font-medium transition-colors',
                  isActive || isAnalysisDefault ? 'text-primary' : 'text-muted-foreground group-hover:text-primary/80'
                )}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
