import type { ReactNode } from 'react';
import BottomNavbar from '@/components/BottomNavbar';

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen w-full justify-center bg-muted/40 dark:bg-black">
      <div className="relative flex h-full w-full max-w-lg flex-col border-x bg-background">
        <main className="flex-1 overflow-y-auto pb-20">{children}</main>
        <BottomNavbar />
      </div>
    </div>
  );
}
