"use client";

import { useState } from 'react';
import { useSettings } from '@/context/settings-context';
import { Switch } from '@/components/ui/switch';
import { Label } from "@/components/ui/label";
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

export function Settings() {
  const { nigerianTone, setNigerianTone, includeEmojis, setIncludeEmojis } = useSettings();
  const [apiKey, setApiKey] = useState('');
  const { toast } = useToast();

  const handleSaveApiKey = () => {
    if (!apiKey.trim()) {
      toast({
        variant: 'destructive',
        title: 'API Key is empty',
        description: 'Please enter a valid API key.',
      });
      return;
    }

    const envLine = `GEMINI_API_KEY="${apiKey}"`;
    navigator.clipboard.writeText(envLine);

    toast({
      title: 'Copied to Clipboard!',
      description: (
        <div className="space-y-2">
          <p>Your environment variable is ready.</p>
          <p>Open the <code className="font-mono text-xs font-bold text-foreground bg-muted p-1 rounded-sm">.env</code> file and paste the copied line.</p>
        </div>
      ),
    });
  };

  return (
    <div className="space-y-4">
      <div className="space-y-4">
        <h3 className="font-headline text-lg font-medium">Content Style</h3>
        <div className="flex flex-row items-center justify-between rounded-lg border p-3">
            <div className="space-y-0.5">
                <Label htmlFor="nigerian-tone-switch">Add Nigerian Flavour</Label>
                <p className="text-sm text-muted-foreground">Use local slang and a friendly, Naija tone.</p>
            </div>
            <Switch id="nigerian-tone-switch" checked={nigerianTone} onCheckedChange={setNigerianTone} />
        </div>
        <div className="flex flex-row items-center justify-between rounded-lg border p-3">
            <div className="space-y-0.5">
                <Label htmlFor="include-emojis-switch">Include Emojis</Label>
                <p className="text-sm text-muted-foreground">Make your bio pop with relevant emojis.</p>
            </div>
            <Switch id="include-emojis-switch" checked={includeEmojis} onCheckedChange={setIncludeEmojis} />
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="font-headline text-lg font-medium">API Settings</h3>
        <div className="rounded-lg border p-3 space-y-3">
          <div className="space-y-2">
            <Label htmlFor="api-key-input">Google AI API Key</Label>
            <p className="text-sm text-muted-foreground">
              You'll need an API key from Google AI Studio to use this app.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Input
              id="api-key-input"
              type="password"
              placeholder="Paste your API key here"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="flex-1"
            />
            <Button onClick={handleSaveApiKey} variant="secondary">
              Save Key
            </Button>
          </div>

          <p className="text-xs text-muted-foreground">
            Don't have a key? Get one from{" "}
            <a
              href="https://aistudio.google.com/app/apikey"
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              Google AI Studio
            </a>.
          </p>

        </div>
      </div>
    </div>
  );
}
