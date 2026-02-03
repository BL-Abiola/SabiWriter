"use client";

import { useSettings } from '@/context/settings-context';
import { Switch } from '@/components/ui/switch';
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from 'lucide-react';

export function Settings() {
  const { nigerianTone, setNigerianTone, includeEmojis, setIncludeEmojis } = useSettings();

  return (
    <div className="space-y-4">
      <div className="flex flex-row items-center justify-between rounded-lg border p-4">
          <div className="space-y-0.5">
              <Label htmlFor="nigerian-tone-switch">Add Nigerian Flavour</Label>
              <p className="text-sm text-muted-foreground">Use local slang and a friendly, Naija tone.</p>
          </div>
          <Switch id="nigerian-tone-switch" checked={nigerianTone} onCheckedChange={setNigerianTone} />
      </div>
      <div className="flex flex-row items-center justify-between rounded-lg border p-4">
          <div className="space-y-0.5">
              <Label htmlFor="include-emojis-switch">Include Emojis</Label>
              <p className="text-sm text-muted-foreground">Make your bio pop with relevant emojis.</p>
          </div>
          <Switch id="include-emojis-switch" checked={includeEmojis} onCheckedChange={setIncludeEmojis} />
      </div>
      <Alert>
        <Terminal className="h-4 w-4" />
        <AlertTitle>Set Your API Key</AlertTitle>
        <AlertDescription>
          This app uses the Google AI API. Follow these steps to add your key:
          <ol className="list-decimal list-inside mt-2 space-y-1 text-xs text-muted-foreground">
            <li>
              In the file explorer, open the <code className="font-mono text-xs font-bold text-foreground bg-muted p-1 rounded-sm">.env</code> file.
            </li>
            <li>
              Replace the placeholder with your actual API key.
            </li>
            <li>
              If you don't have one, get a key from{" "}
              <a
                href="https://aistudio.google.com/app/apikey"
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                Google AI Studio
              </a>.
            </li>
          </ol>
        </AlertDescription>
      </Alert>
    </div>
  );
}
