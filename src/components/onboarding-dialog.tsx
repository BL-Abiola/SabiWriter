"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { KeyRound, Sparkles, Palette } from 'lucide-react';

type OnboardingDialogProps = {
  isOpen: boolean;
  onComplete: () => void;
};

export function OnboardingDialog({ isOpen, onComplete }: OnboardingDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onComplete()}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-center font-headline text-2xl">Welcome to SabiWriter!</DialogTitle>
          <DialogDescription className="text-center">
            Your AI-powered assistant for crafting expert content. Here’s a quick guide to get started.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-6 p-2 text-sm text-foreground/90">
            <div className="flex items-start gap-4">
                <div className="mt-1 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <KeyRound className="h-5 w-5" />
                </div>
                <div>
                    <h3 className="font-semibold">1. Set Your API Key</h3>
                    <p className="text-muted-foreground">
                        SabiWriter uses Google's Gemini AI. To begin, you need a free API key.
                        Go to <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noopener noreferrer" className="underline text-primary">Google AI Studio</a> to get your key. Then, go to <span className="font-semibold">Settings {'>'} Data</span> and paste it in.
                    </p>
                </div>
            </div>
             <div className="flex items-start gap-4">
                <div className="mt-1 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Sparkles className="h-5 w-5" />
                </div>
                <div>
                    <h3 className="font-semibold">2. Choose a Generator & Generate</h3>
                    <p className="text-muted-foreground">
                        Use the top navigation to select a content type (like Instagram Bio or Tagline), fill out the form, and click "Generate" to get AI-powered suggestions.
                    </p>
                </div>
            </div>
             <div className="flex items-start gap-4">
                <div className="mt-1 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Palette className="h-5 w-5" />
                </div>
                <div>
                    <h3 className="font-semibold">3. Customize Your Experience</h3>
                    <p className="text-muted-foreground">
                       Explore the <span className="font-semibold">Settings</span> panel to switch to dark mode, adjust the AI's tone of voice, or manage which generators appear in your navigation bar.
                    </p>
                </div>
            </div>
        </div>
        <DialogFooter>
          <Button onClick={onComplete} className="w-full">Let's Get Started</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
