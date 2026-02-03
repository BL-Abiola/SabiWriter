"use client";

import { useState } from 'react';
import { ClipboardCopy, Check } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

type GenerationResultProps = {
  title: string;
  description: string;
  text: string;
};

export function GenerationResult({ title, description, text }: GenerationResultProps) {
  const [hasCopied, setHasCopied] = useState(false);
  const { toast } = useToast();

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setHasCopied(true);
    toast({
      title: "Copied to clipboard!",
      description: "You can now paste the generated text.",
    });
    setTimeout(() => {
      setHasCopied(false);
    }, 2000);
  };

  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle className="font-headline">{title}</CardTitle>
        <CardDescription className="font-body">{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="font-body whitespace-pre-wrap rounded-md bg-muted p-4 text-muted-foreground">
          {text}
        </p>
      </CardContent>
      <CardFooter>
        <Button onClick={handleCopy} variant="ghost" size="sm">
          {hasCopied ? (
            <Check className="mr-2 h-4 w-4 text-green-500" />
          ) : (
            <ClipboardCopy className="mr-2 h-4 w-4" />
          )}
          {hasCopied ? 'Copied!' : 'Copy'}
        </Button>
      </CardFooter>
    </Card>
  );
}
