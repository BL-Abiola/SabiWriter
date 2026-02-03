"use client";

import { useTransition, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Sparkles } from 'lucide-react';

import {
  generateInstagramBio,
  type GenerateInstagramBioOutput,
} from '@/ai/flows/generate-instagram-bio';
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
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { GenerationResult } from './generation-result';
import { Skeleton } from './ui/skeleton';

const formSchema = z.object({
  businessName: z.string().min(2, { message: 'Business name is required.' }),
  businessDescription: z.string().min(10, { message: 'Please provide a brief description.' }),
  valueProposition: z.string().min(5, { message: 'Value proposition is required.' }),
  callToAction: z.string().min(3, { message: 'Call to action is required.' }),
  nigerianTone: z.boolean().default(true),
  includeEmojis: z.boolean().default(true),
});

export function InstagramGenerator() {
  const [isPending, startTransition] = useTransition();
  const [result, setResult] = useState<GenerateInstagramBioOutput | null>(null);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      businessName: '',
      businessDescription: '',
      valueProposition: '',
      callToAction: '',
      nigerianTone: true,
      includeEmojis: true,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setResult(null);
    startTransition(async () => {
      const { bio, error } = await generateInstagramBio(values);
      if (error) {
        toast({
          variant: 'destructive',
          title: 'Uh oh! Something went wrong.',
          description: error.message,
        });
        return;
      }
      setResult({ bio: bio! });
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
                name="businessName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Business Name</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Ada's Kitchen" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="businessDescription"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>What does your business do?</FormLabel>
                    <FormControl>
                      <Textarea placeholder="e.g., We sell authentic Nigerian dishes with a modern twist." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
               <FormField
                control={form.control}
                name="valueProposition"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>What makes you special?</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Fresh ingredients, delivered fast" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
               <FormField
                control={form.control}
                name="callToAction"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>What should people do?</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Order now via DM!" {...field} />
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
                  name="includeEmojis"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                      <div className="space-y-0.5">
                        <FormLabel>Include Emojis</FormLabel>
                        <FormDescription>Make your bio pop with relevant emojis.</FormDescription>
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
                {isPending ? 'Generating...' : 'Generate Bio'}
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
              <Skeleton className="h-24 w-full" />
            </CardContent>
            <CardFooter>
               <Skeleton className="h-8 w-24" />
            </CardFooter>
          </Card>
        )}
        {result?.bio && (
          <GenerationResult
            title="Your Instagram Bio"
            description="Ready to copy and paste!"
            text={result.bio}
          />
        )}
      </div>
    </div>
  );
}
