'use client';

import Image from 'next/image';
import Link from 'next/link';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Logo } from '@/components/Logo';
import { Smartphone } from 'lucide-react';
import { initiateEmailSignIn, initiateEmailSignUp, initiateAnonymousSignIn } from '@/firebase/non-blocking-login';
import { useAuth, useUser } from '@/firebase';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useToast } from '@/hooks/use-toast';

function SvgGoogleIcon() {
  return (
    <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
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

export default function LoginPage() {
  const bgImage = PlaceHolderImages.find((p) => p.id === 'login-background');
  const auth = useAuth();
  const { user, isUserLoading } = useUser();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSigningIn, setIsSigningIn] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    if (!isUserLoading && user) {
      router.push('/home');
    }
  }, [user, isUserLoading, router]);

  const handleEmailAuth = () => {
    if (isSigningIn) {
      initiateEmailSignIn(auth, email, password);
    } else {
      if (password !== confirmPassword) {
        toast({
          variant: "destructive",
          title: "Passwords do not match",
          description: "Please make sure your passwords match.",
        });
        return;
      }
      initiateEmailSignUp(auth, email, password);
    }
  };
  
  const handleGoogleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
  };

  const handleAnonymousSignIn = () => {
    initiateAnonymousSignIn(auth);
  };

  if (isUserLoading || user) {
    return <div className="flex h-screen w-full items-center justify-center">Loading...</div>;
  }

  return (
    <div className="relative min-h-screen w-full">
      {bgImage && (
        <Image
          src={bgImage.imageUrl}
          alt={bgImage.description}
          fill
          quality={80}
          className="object-cover"
          data-ai-hint={bgImage.imageHint}
          priority
        />
      )}
      <div className="absolute inset-0 bg-secondary/80 backdrop-blur-sm" />
      <div className="relative z-10 flex min-h-screen items-center justify-center p-4">
        <Card className="w-full max-w-md bg-background/80 backdrop-blur-lg border-border/50">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4">
              <Logo />
            </div>
            <CardTitle className="font-headline text-3xl">{isSigningIn ? 'Welcome Back' : 'Create an Account'}</CardTitle>
            <CardDescription>
              {isSigningIn ? 'Sign in to manage your finances and grow your wealth.' : 'Get started with Sprout Finance.'}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="font-headline">
                Email
              </Label>
              <Input id="email" type="email" placeholder="name@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
             <div className="space-y-2">
              <Label htmlFor="password">
                Password
              </Label>
              <Input id="password" type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            {!isSigningIn && (
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">
                  Confirm Password
                </Label>
                <Input id="confirmPassword" type="password" placeholder="••••••••" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
              </div>
            )}
            <Button className="w-full font-bold" onClick={handleEmailAuth}>
              {isSigningIn ? 'Continue with Email' : 'Create Account'}
            </Button>
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <Button variant="outline" className="w-full" onClick={handleGoogleSignIn}>
                  <SvgGoogleIcon /> Google
              </Button>
              <Button variant="outline" className="w-full" asChild>
                <Link href="/analysis">
                  <Smartphone className="mr-2 h-4 w-4" /> Phone
                </Link>
              </Button>
            </div>

            <div className="mt-4 text-center text-sm">
                <Button variant="link" onClick={() => setIsSigningIn(!isSigningIn)} className="text-muted-foreground hover:text-primary">
                  {isSigningIn ? "Don't have an account? Sign Up" : 'Already have an account? Sign In'}
                </Button>
            </div>
             <div className="mt-4 text-center text-sm">
              <Button variant="link" onClick={handleAnonymousSignIn} className="underline text-muted-foreground hover:text-primary">
                Be My Guest
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
