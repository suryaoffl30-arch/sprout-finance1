import Image from 'next/image';
import Link from 'next/link';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Logo } from '@/components/Logo';
import { Smartphone } from 'lucide-react';

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
            <CardTitle className="font-headline text-3xl">Welcome Back</CardTitle>
            <CardDescription>Sign in to manage your finances and grow your wealth.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="font-headline">
                Email
              </Label>
              <Input id="email" type="email" placeholder="name@example.com" />
            </div>
            <Button className="w-full font-bold" asChild>
              <Link href="/analysis">Continue with Email</Link>
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
              <Button variant="outline" className="w-full" asChild>
                <Link href="/analysis">
                  <SvgGoogleIcon /> Google
                </Link>
              </Button>
              <Button variant="outline" className="w-full" asChild>
                <Link href="/analysis">
                  <Smartphone className="mr-2 h-4 w-4" /> Phone
                </Link>
              </Button>
            </div>

            <div className="mt-4 text-center text-sm">
              <Link href="/analysis" className="underline text-muted-foreground hover:text-primary">
                Be My Guest
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
