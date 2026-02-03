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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { GenerationResult } from './generation-result';
import { Skeleton } from './ui/skeleton';

const formSchema = z.object({
  businessDescription: z.string().min(10, { message: 'Please provide a brief description.' }),
  nigerianTone: z.boolean().default(true),
  useEmoji: z.boolean().default(true),
});

export function TaglineGenerator() {
  const [isPending, startTransition] = useTransition();
  const [result, setResult] = useState<GenerateShortTaglineOutput | null>(null);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      businessDescription: '',
      nigerianTone: true,
      useEmoji: true,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setResult(null);
    startTransition(async () => {
      const { tagline, error } = await generateShortTagline(values);
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
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="nigerianTone"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                      <div className="space-y-0.5">
                        <FormLabel>Add Nigerian Flavour</FormLabel>
                        <FormDescription>Use local slang and a friendly, Naija tone.</FormDescription>
                      </div>
                      <FormControl>
                        <Switch checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="useEmoji"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                      <div className="space-y-0.5">
                        <FormLabel>Include Emojis</FormLabel>
                        <FormDescription>Add an emoji to your tagline.</FormDescription>
                      </div>
                      <FormControl>
                        <Switch checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
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
