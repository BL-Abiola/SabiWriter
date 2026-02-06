"use client";

import { useState } from 'react';
import { useSettings } from '@/context/settings-context';
import { Switch } from '@/components/ui/switch';
import { Label } from "@/components/ui/label";
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useTheme } from '@/context/theme-context';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function Settings() {
  const { tone, setTone, includeEmojis, setIncludeEmojis } = useSettings();
  const [apiKey, setApiKey] = useState('');
  const { toast } = useToast();
  const { theme, toggleTheme } = useTheme();

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
      <div className="space-y-2">
        <h3 className="font-headline text-lg font-medium">Appearance</h3>
        <div className="flex flex-row items-center justify-between rounded-lg border p-3">
            <div className="space-y-0.5">
                <Label htmlFor="dark-mode-switch">Dark Mode</Label>
                <p className="text-sm text-muted-foreground">Toggle between light and dark themes.</p>
            </div>
            <Switch id="dark-mode-switch" checked={theme === 'dark'} onCheckedChange={toggleTheme} />
        </div>
      </div>
      <div className="space-y-2">
        <h3 className="font-headline text-lg font-medium">Content Style</h3>
        <div className="rounded-lg border p-3 space-y-3">
          <div className="flex flex-row items-center justify-between">
              <div className="space-y-0.5">
                  <Label>Tone of Voice</Label>
                  <p className="text-sm text-muted-foreground">Set the personality for the AI.</p>
              </div>
              <Select value={tone} onValueChange={setTone}>
                  <SelectTrigger className="w-[140px]">
                      <SelectValue placeholder="Select tone" />
                  </SelectTrigger>
                  <SelectContent>
                      <SelectItem value="Nigerian">Nigerian</SelectItem>
                      <SelectItem value="Professional">Professional</SelectItem>
                      <SelectItem value="Playful">Playful</SelectItem>
                      <SelectItem value="Witty">Witty</SelectItem>
                      <SelectItem value="Inspirational">Inspirational</SelectItem>
                  </SelectContent>
              </Select>
          </div>
          <div className="flex flex-row items-center justify-between">
              <div className="space-y-0.5">
                  <Label htmlFor="include-emojis-switch">Include Emojis</Label>
                  <p className="text-sm text-muted-foreground">Add emojis for personality.</p>
              </div>
              <Switch id="include-emojis-switch" checked={includeEmojis} onCheckedChange={setIncludeEmojis} />
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="font-headline text-lg font-medium">API Settings</h3>
        <div className="rounded-lg border p-3 space-y-2">
          <div className="space-y-1">
            <Label htmlFor="api-key-input">Google AI API Key</Label>
            <p className="text-sm text-muted-foreground">
             Enter your Google AI API key below.
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
            Get your key from{" "}
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
