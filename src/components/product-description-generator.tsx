"use client";

import { useTransition, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Sparkles } from 'lucide-react';

import {
  generateProductDescription,
} from '@/ai/flows/generate-product-description';
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
  productName: z.string().min(2, { message: 'Product name is required.' }),
  productFeatures: z.string().min(10, { message: 'Please provide some features or a brief description.' }),
});

export function ProductDescriptionGenerator() {
  const [isPending, startTransition] = useTransition();
  const [generation, setGeneration] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();
  const { tone, includeEmojis } = useSettings();
  const { addHistoryItem } = useHistory();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      productName: '',
      productFeatures: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    startTransition(async () => {
      const apiInput = { ...values, tone, includeEmojis };
      const { description, error } = await generateProductDescription(apiInput);
      if (error) {
        toast({
          variant: 'destructive',
          title: 'Uh oh! Something went wrong.',
          description: error.message,
        });
        return;
      }
      if (description) {
        addHistoryItem({ type: 'Product Description', text: description });
        setGeneration(description);
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
                  name="productName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Product Name</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Aso-Oke Throw Pillow" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="productFeatures"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Product Features & Details</FormLabel>
                      <FormControl>
                        <Textarea placeholder="e.g., Handwoven fabric from Ondo state, 18x18 inches, available in 3 colors, perfect for modern homes." {...field} />
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
          )}
        </CardContent>
      </Card>
      {generation && (
        <GenerationResultDialog
            isOpen={isDialogOpen}
            onOpenChange={setIsDialogOpen}
            title="Your Product Description"
            description="Here are a few options to make your product shine."
            text={generation}
        />
      )}
    </>
  );
}
