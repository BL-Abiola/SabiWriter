"use client";

import { useSettings } from '@/context/settings-context';
import { Card, CardContent } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from "@/components/ui/label";

export function Settings() {
  const { nigerianTone, setNigerianTone, includeEmojis, setIncludeEmojis } = useSettings();

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <Card className="shadow-md">
            <CardContent className="pt-6 space-y-4">
                <div className="flex flex-row items-center justify-between rounded-lg border p-3">
                    <div className="space-y-0.5">
                        <Label>Add Nigerian Flavour</Label>
                        <p className="text-sm text-muted-foreground">Use local slang and a friendly, Naija tone.</p>
                    </div>
                    <Switch checked={nigerianTone} onCheckedChange={setNigerianTone} />
                </div>
                <div className="flex flex-row items-center justify-between rounded-lg border p-3">
                    <div className="space-y-0.5">
                        <Label>Include Emojis</Label>
                        <p className="text-sm text-muted-foreground">Make your bio pop with relevant emojis.</p>
                    </div>
                    <Switch checked={includeEmojis} onCheckedChange={setIncludeEmojis} />
                </div>
            </CardContent>
        </Card>
        <div className="flex items-center justify-center p-8 bg-muted rounded-lg">
            <p className="text-center text-muted-foreground">Settings apply to all generators.</p>
        </div>
    </div>
  );
}
