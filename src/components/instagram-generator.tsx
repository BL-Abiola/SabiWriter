"use client";

import { useTransition, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Sparkles } from 'lucide-react';

import {
  generateInstagramBio,
} from '@/ai/flows/generate-instagram-bio';
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
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { useSettings } from '@/context/settings-context';
import { useHistory } from '@/context/history-context';
import { GenerationResultDialog } from './generation-result-dialog';
import { SkeletonLoader } from './skeleton-loader';

const formSchema = z.object({
  businessName: z.string().min(2, { message: 'Business name is required.' }),
  businessDescription: z.string().min(10, { message: 'Please provide a brief description.' }),
  valueProposition: z.string().min(5, { message: 'Value proposition is required.' }),
  callToAction: z.string().min(3, { message: 'Call to action is required.' }),
});

export function InstagramGenerator() {
  const [isPending, startTransition] = useTransition();
  const [generation, setGeneration] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();
  const { tone, includeEmojis } = useSettings();
  const { addHistoryItem } = useHistory();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      businessName: '',
      businessDescription: '',
      valueProposition: '',
      callToAction: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    startTransition(async () => {
      const apiInput = { ...values, tone, includeEmojis };
      const { bio, error } = await generateInstagramBio(apiInput);
      if (error) {
        toast({
          variant: 'destructive',
          title: 'Uh oh! Something went wrong.',
          description: error.message,
        });
        return;
      }
      if (bio) {
        addHistoryItem({ type: 'Instagram', text: bio });
        setGeneration(bio);
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
                <Button type="submit" disabled={isPending} className="w-full">
                  <Sparkles className="mr-2 h-4 w-4" />
                  {isPending ? 'Generating...' : 'Generate Bio'}
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
            title="Your Instagram Bio"
            description="Here are some options for you!"
            text={generation}
        />
      )}
    </>
  );
}
