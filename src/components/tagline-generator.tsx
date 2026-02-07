"use client";

import { useTransition, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Sparkles } from 'lucide-react';

import {
  generateShortTagline,
} from '@/ai/flows/generate-short-tagline';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
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
import { useSettings } from '@/context/settings-context';
import { useHistory } from '@/context/history-context';
import { GenerationResultDialog } from './generation-result-dialog';
import { SkeletonLoader } from './skeleton-loader';

const formSchema = z.object({
  businessDescription: z.string().min(10, { message: 'Please provide a brief description.' }),
});

export function TaglineGenerator() {
  const [isPending, startTransition] = useTransition();
  const [generation, setGeneration] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();
  const { tone, apiKey } = useSettings();
  const { addHistoryItem } = useHistory();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      businessDescription: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (!apiKey) {
      toast({
        variant: 'destructive',
        title: 'API Key Missing',
        description: 'Please set your Google AI API key in the settings.',
      });
      return;
    }

    startTransition(async () => {
      const apiInput = { ...values, tone };
      const { tagline, error } = await generateShortTagline(apiInput, apiKey);
      if (error) {
        toast({
          variant: 'destructive',
          title: 'Uh oh! Something went wrong.',
          description: error.message,
        });
        return;
      }
      if (tagline) {
        addHistoryItem({ type: 'Tagline', text: tagline });
        setGeneration(tagline);
        setIsDialogOpen(true);
        form.reset();
      }
    });
  }

  return (
    <>
      <Card className="shadow-md">
        <CardContent className="pt-6">
          {isPending ? (
            <SkeletonLoader />
          ) : (
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
          )}
        </CardContent>
      </Card>
      {generation && (
        <GenerationResultDialog
          isOpen={isDialogOpen}
          onOpenChange={setIsDialogOpen}
          title="Your New Tagline"
          description="Short, sweet, and memorable."
          text={generation}
        />
      )}
    </>
  );
}
