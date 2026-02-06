"use client";

import { useState } from 'react';
import { useHistory, type HistoryItem } from '@/context/history-context';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Trash2, ClipboardCopy, Check } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useToast } from '@/hooks/use-toast';

export function HistoryPage() {
  const { history, deleteHistoryItem } = useHistory();
  const { toast } = useToast();
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const getTitle = (type: HistoryItem['type']) => {
    switch (type) {
      case 'Instagram':
        return 'Instagram Bio';
      case 'WhatsApp':
        return 'WhatsApp Description';
      case 'Tagline':
        return 'Tagline';
      case 'Product Description':
        return 'Product Description';
      case 'Twitter Post':
        return 'Twitter Post';
    }
  }

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    toast({
      title: "Copied to clipboard!",
    });
    setTimeout(() => {
      setCopiedId(null);
    }, 2000);
  };

  return (
    <Card className="shadow-md">
       <CardHeader>
          <CardTitle>Generation History</CardTitle>
          <CardDescription>Review your past generations.</CardDescription>
        </CardHeader>
      <CardContent>
        {history.length > 0 ? (
          <ScrollArea className="h-96">
            <Accordion type="single" collapsible className="w-full space-y-2 pr-4">
              {history.map((item) => (
                <AccordionItem value={item.id} key={item.id} className="rounded-lg border">
                  <AccordionTrigger className="p-4 hover:no-underline">
                    <div className="flex flex-col items-start text-left">
                        <span className="font-semibold">{getTitle(item.type)}</span>
                        <span className="text-sm font-normal text-muted-foreground">{new Date(item.timestamp).toLocaleDateString()}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-4">
                    <p className="whitespace-pre-wrap rounded-md bg-muted p-4 text-muted-foreground mb-2">
                        {item.text}
                    </p>
                    <div className="flex items-center gap-2">
                        <Button onClick={() => handleCopy(item.text, item.id)} variant="ghost" size="sm">
                            {copiedId === item.id ? (
                                <Check className="mr-2 h-4 w-4 text-green-500" />
                            ) : (
                                <ClipboardCopy className="mr-2 h-4 w-4" />
                            )}
                            {copiedId === item.id ? 'Copied!' : 'Copy'}
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                              <AlertDialogDescription>
                                This will permanently delete this item from your history. This action cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction onClick={() => deleteHistoryItem(item.id)}>Delete</AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </ScrollArea>
        ) : (
          <div className="flex h-48 flex-col items-center justify-center rounded-md border border-dashed text-center">
            <p className="text-lg font-medium text-foreground">No History Yet</p>
            <p className="text-sm text-muted-foreground">
              Your generated content will appear here.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
