'use client';

import type { ReactNode } from 'react';
import BottomNavbar from '@/components/BottomNavbar';
import { useUser } from '@/firebase';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function MainLayout({ children }: { children: ReactNode }) {
  const { user, isUserLoading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!isUserLoading && !user) {
      router.push('/');
    }
    // TODO: Add logic to check if user has completed onboarding
    if (!isUserLoading && user) {
      router.push('/onboarding');
    }
  }, [user, isUserLoading, router]);
  
  if (isUserLoading || !user) {
    return <div className="flex h-screen w-full items-center justify-center">Loading...</div>;
  }
  
  return (
    <div className="flex h-screen w-full justify-center bg-muted/40 dark:bg-black">
      <div className="relative flex h-full w-full max-w-lg flex-col border-x bg-background">
        <main className="flex-1 overflow-y-auto pb-20">{children}</main>
        <BottomNavbar />
      </div>
    </div>
  );
}
