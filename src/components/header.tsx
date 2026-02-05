import { Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Logo } from '@/components/logo';
import { Settings as SettingsComponent } from '@/components/settings';

export function Header() {
  return (
    <header className="flex w-full items-center justify-between">
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
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" size="icon">
            <Settings className="h-5 w-5" />
            <span className="sr-only">Settings</span>
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-xs rounded-3xl">
          <DialogHeader>
            <DialogTitle>Settings</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <SettingsComponent />
          </div>
        </DialogContent>
      </Dialog>
    </header>
  );
}
