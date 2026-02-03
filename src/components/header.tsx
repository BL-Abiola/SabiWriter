import { Logo } from '@/components/logo';

export function Header() {
  return (
    <header className="flex items-center justify-center gap-4 text-center">
      <Logo />
      <div>
        <h1 className="text-4xl font-bold tracking-tight text-primary font-headline sm:text-5xl">
          NaijaBizBio
        </h1>
        <p className="mt-2 text-lg text-foreground/80 font-body">
          AI-powered bios & taglines for your Nigerian business.
        </p>
      </div>
    </header>
  );
}
