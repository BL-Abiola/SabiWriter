"use client";

import { useSettings } from '@/context/settings-context';
import { Card, CardContent } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { FormDescription, FormItem, FormLabel } from './ui/form';

export function Settings() {
  const { nigerianTone, setNigerianTone, includeEmojis, setIncludeEmojis } = useSettings();

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <Card className="shadow-md">
            <CardContent className="pt-6 space-y-4">
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                    <div className="space-y-0.5">
                    <FormLabel>Add Nigerian Flavour</FormLabel>
                    <FormDescription>Use local slang and a friendly, Naija tone.</FormDescription>
                    </div>
                    <Switch checked={nigerianTone} onCheckedChange={setNigerianTone} />
                </FormItem>
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                    <div className="space-y-0.5">
                    <FormLabel>Include Emojis</FormLabel>
                    <FormDescription>Make your bio pop with relevant emojis.</FormDescription>
                    </div>
                    <Switch checked={includeEmojis} onCheckedChange={setIncludeEmojis} />
                </FormItem>
            </CardContent>
        </Card>
        <div className="flex items-center justify-center p-8 bg-muted rounded-lg">
            <p className="text-center text-muted-foreground">Settings apply to all generators.</p>
        </div>
    </div>
  );
}
