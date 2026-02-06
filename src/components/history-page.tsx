"use client";

import { useHistory, type HistoryItem } from '@/context/history-context';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { GenerationResult } from '@/components/generation-result';
import { Trash2 } from 'lucide-react';
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
} from "@/components/ui/alert-dialog"

export function HistoryPage() {
  const { history, clearHistory } = useHistory();

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

  return (
    <Card className="shadow-md">
       <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Generation History</CardTitle>
          <CardDescription>Review your past generations.</CardDescription>
        </div>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive" size="icon" disabled={history.length === 0}>
                <Trash2 className="h-4 w-4" />
                <span className="sr-only">Clear History</span>
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This will permanently delete your entire generation history. This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={clearHistory}>Delete</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardHeader>
      <CardContent>
        {history.length > 0 ? (
          <ScrollArea className="h-96">
            <div className="space-y-4 pr-4">
              {history.map((item) => (
                <GenerationResult
                  key={item.id}
                  title={getTitle(item.type)}
                  description={`Generated on ${new Date(
                    item.timestamp
                  ).toLocaleString()}`}
                  text={item.text}
                />
              ))}
            </div>
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
