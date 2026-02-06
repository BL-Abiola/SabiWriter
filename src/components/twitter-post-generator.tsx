"use client";

import { useTransition, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Sparkles } from 'lucide-react';

import {
  generateTwitterPost,
} from '@/ai/flows/generate-twitter-post';
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

export function TwitterPostGenerator() {
  const [isPending, startTransition] = useTransition();
  const [generation, setGeneration] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();
  const { tone, includeEmojis } = useSettings();
  const { addHistoryItem } = useHistory();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      topic: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    startTransition(async () => {
      const apiInput = { ...values, tone, includeEmojis };
      const { post, error } = await generateTwitterPost(apiInput);
      if (error) {
        toast({
          variant: 'destructive',
          title: 'Uh oh! Something went wrong.',
          description: error.message,
        });
        return;
      }
      if (post) {
        addHistoryItem({ type: 'Twitter Post', text: post });
        setGeneration(post);
        setIsDialogOpen(true);
        form.reset();
      }
    });
  }

  return (
    <>
      <Card className="shadow-md max-w-2xl mx-auto">
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
                      <FormLabel>What is the post about?</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="e.g., Announcing a flash sale on all our new shoes, 50% off for 24 hours!"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" disabled={isPending} className="w-full">
                  <Sparkles className="mr-2 h-4 w-4" />
                  {isPending ? 'Generating...' : 'Generate Post'}
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
          title="Your Twitter Post"
          description="Ready to go viral!"
          text={generation}
        />
      )}
    </>
  );
}
