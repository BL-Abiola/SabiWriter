"use client";

import { useTransition, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Sparkles } from 'lucide-react';

import {
  generateFacebookPost,
} from '@/ai/flows/generate-facebook-post';
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
  topic: z.string().min(10, { message: 'Please provide a topic for the post.' }),
});

export function FacebookPostGenerator() {
  const [isPending, startTransition] = useTransition();
  const [generation, setGeneration] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();
  const { tone, apiKey } = useSettings();
  const { addHistoryItem } = useHistory();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      topic: '',
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
      const { post, error } = await generateFacebookPost(apiInput, apiKey);
      if (error) {
        toast({
          variant: 'destructive',
          title: 'Uh oh! Something went wrong.',
          description: error.message,
        });
        return;
      }
      if (post) {
        addHistoryItem({ type: 'Facebook Post', text: post });
        setGeneration(post);
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
                  name="topic"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>What's your Facebook post about?</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="e.g., We're launching a new collection of handmade jewelry inspired by Nigerian culture."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" disabled={isPending} className="w-full">
                  <Sparkles className="mr-2 h-4 w-4" />
                  {isPending ? 'Generating...' : 'Generate Facebook Post'}
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
          title="Your Facebook Post"
          description="Ready to engage your audience!"
          text={generation}
        />
      )}
    </>
  );
}
