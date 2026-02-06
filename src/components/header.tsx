import { Logo } from '@/components/logo';
import { SidebarTrigger } from '@/components/ui/sidebar';

export function Header() {
  return (
    <header className="flex w-full items-center justify-between mb-8">
      <div className="flex items-center gap-4">
        <Logo />
        <div>
          <h1 className="font-headline text-3xl font-bold tracking-tight text-primary sm:text-4xl">
            NaijaBizBio
          </h1>
          <p className="mt-1 text-base text-foreground/80">
            Ready to stand out online?
          </p>
        </div>
      </div>
      <SidebarTrigger className="md:hidden" />
    </header>
  );
}
