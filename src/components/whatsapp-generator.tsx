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
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { GenerationResult } from './generation-result';
import { Skeleton } from './ui/skeleton';
import { useSettings } from '@/context/settings-context';

const formSchema = z.object({
  businessName: z.string().min(2, { message: 'Business name is required.' }),
  industry: z.string().min(3, { message: 'Industry is required.' }),
});

export function WhatsappGenerator() {
  const [isPending, startTransition] = useTransition();
  const [result, setResult] = useState<GenerateWhatsAppDescriptionOutput | null>(null);
  const { toast } = useToast();
  const { nigerianTone, includeEmojis: emojiPreference } = useSettings();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      businessName: '',
      industry: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setResult(null);
    const apiInput = {
      ...values,
      tonePreference: nigerianTone ? 'Nigerian' : 'Friendly',
      emojiPreference,
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
