"use client";

import { useTransition, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Sparkles } from 'lucide-react';

import {
  generateShortTagline,
  type GenerateShortTaglineOutput,
} from '@/ai/flows/generate-short-tagline';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { GenerationResult } from './generation-result';
import { Skeleton } from './ui/skeleton';
import { useSettings } from '@/context/settings-context';

const formSchema = z.object({
  businessDescription: z.string().min(10, { message: 'Please provide a brief description.' }),
});

export function TaglineGenerator() {
  const [isPending, startTransition] = useTransition();
  const [result, setResult] = useState<GenerateShortTaglineOutput | null>(null);
  const { toast } = useToast();
  const { nigerianTone, includeEmojis: useEmoji } = useSettings();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      businessDescription: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setResult(null);
    startTransition(async () => {
      const apiInput = { ...values, nigerianTone, useEmoji };
      const { tagline, error } = await generateShortTagline(apiInput);
      if (error) {
        toast({
          variant: 'destructive',
          title: 'Uh oh! Something went wrong.',
          description: error.message,
        });
        return;
      }
      setResult({ tagline: tagline! });
    });
  }

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
      <Card className="shadow-md">
        <CardContent className="pt-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="businessDescription"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Describe your business</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="e.g., An online store that sells handmade leather sandals for men and women."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isPending} className="w-full">
                <Sparkles className="mr-2 h-4 w-4" />
                {isPending ? 'Generating...' : 'Generate Tagline'}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
      <div className="space-y-4">
        {isPending && (
          <Card className="shadow-md">
            <CardHeader>
              <Skeleton className="h-6 w-1/2" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-12 w-full" />
            </CardContent>
             <CardFooter>
               <Skeleton className="h-8 w-24" />
            </CardFooter>
          </Card>
        )}
        {result?.tagline && (
          <GenerationResult
            title="Your New Tagline"
            description="Short, sweet, and memorable."
            text={result.tagline}
          />
        )}
      </div>
    </div>
  );
}
