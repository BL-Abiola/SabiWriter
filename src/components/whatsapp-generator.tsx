"use client";

import { useTransition, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Sparkles } from 'lucide-react';

import {
  generateWhatsAppDescription,
  type GenerateWhatsAppDescriptionOutput,
} from '@/ai/flows/generate-whatsapp-description';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { GenerationResult } from './generation-result';
import { Skeleton } from './ui/skeleton';

const formSchema = z.object({
  businessName: z.string().min(2, { message: 'Business name is required.' }),
  industry: z.string().min(3, { message: 'Industry is required.' }),
  nigerianTone: z.boolean().default(true),
  emojiPreference: z.boolean().default(true),
});

export function WhatsappGenerator() {
  const [isPending, startTransition] = useTransition();
  const [result, setResult] = useState<GenerateWhatsAppDescriptionOutput | null>(null);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      businessName: '',
      industry: '',
      nigerianTone: true,
      emojiPreference: true,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setResult(null);
    const apiInput = {
      ...values,
      tonePreference: values.nigerianTone ? 'Nigerian' : 'Friendly'
    }
    
    startTransition(async () => {
      const { description, error } = await generateWhatsAppDescription(apiInput);
      if (error) {
        toast({
          variant: 'destructive',
          title: 'Uh oh! Something went wrong.',
          description: error.message,
        });
        return;
      }
      setResult({ description: description! });
    });
  }

  return (
    <div className="mt-4 grid grid-cols-1 gap-8 lg:grid-cols-2">
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="font-headline">Set Up Your WhatsApp Info</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="businessName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Business Name</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Tunde's Tech Hub" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="industry"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Industry</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Gadgets & Electronics" {...field} />
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
                  name="emojiPreference"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                      <div className="space-y-0.5">
                        <FormLabel>Include Emojis</FormLabel>
                        <FormDescription>Make your description more engaging.</FormDescription>
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
                {isPending ? 'Generating...' : 'Generate Description'}
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
        {result?.description && (
          <GenerationResult
            title="Your WhatsApp Description"
            description="Welcome your customers warmly."
            text={result.description}
          />
        )}
      </div>
    </div>
  );
}
