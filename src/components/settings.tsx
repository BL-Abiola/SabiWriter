"use client";

import { useState } from 'react';
import { useSettings, GeneratorId } from '@/context/settings-context';
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DialogClose } from '@/components/ui/dialog';
import {
    Palette,
    BotMessageSquare,
    SlidersHorizontal,
    KeyRound,
    Info,
    Twitter,
    Mail,
} from 'lucide-react';

const socialGeneratorOptions: {id: GeneratorId, label: string}[] = [
    { id: 'instagram', label: 'Instagram Bio' },
    { id: 'whatsapp', label: 'WhatsApp Description' },
    { id: 'twitter', label: 'X / Twitter Post' },
];

const otherGeneratorOptions: {id: GeneratorId, label: string}[] = [
    { id: 'tagline', label: 'Tagline Generator' },
    { id: 'product', label: 'Product Description' },
];

export function Settings() {
  const { 
    tone, setTone, 
    includeEmojis, setIncludeEmojis,
    enabledGenerators, toggleGenerator,
  } = useSettings();
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
    <Tabs defaultValue="about" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="about">
                <Info className="md:mr-2 h-4 w-4" />
                <span className="hidden md:inline">About</span>
            </TabsTrigger>
            <TabsTrigger value="api">
                <KeyRound className="md:mr-2 h-4 w-4" />
                <span className="hidden md:inline">API</span>
            </TabsTrigger>
            <TabsTrigger value="appearance">
                <Palette className="md:mr-2 h-4 w-4" />
                <span className="hidden md:inline">Appearance</span>
            </TabsTrigger>
            <TabsTrigger value="generators">
                <SlidersHorizontal className="md:mr-2 h-4 w-4" />
                <span className="hidden md:inline">Generators</span>
            </TabsTrigger>
            <TabsTrigger value="style">
                <BotMessageSquare className="md:mr-2 h-4 w-4" />
                <span className="hidden md:inline">Style</span>
            </TabsTrigger>
        </TabsList>
        <TabsContent value="about" className="pt-6">
            <div className="max-h-[400px] space-y-4 overflow-y-auto p-1">
                <div className="rounded-lg border p-4 text-center">
                    <h3 className="font-headline text-2xl font-bold text-primary">NaijaBizBio</h3>
                    <p className="text-sm text-muted-foreground">Version 1.0.0</p>
                    <p className="mt-2 text-foreground/80">
                        Your AI-powered assistant for crafting the perfect bios, taglines, and descriptions for your Nigerian business.
                    </p>
                </div>
                <div className="rounded-lg border p-4 text-center">
                    <h4 className="font-semibold text-foreground">Built by Studio</h4>
                    <p className="text-sm text-muted-foreground">Your Friendly AI Coding Partner</p>
                    <div className="mt-4 flex justify-center gap-4">
                        <a href="https://twitter.com/Firebase" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                            <Twitter className="h-5 w-5" />
                            <span className="sr-only">Twitter</span>
                        </a>
                        <a href="mailto:firebase-support@google.com" className="text-muted-foreground hover:text-primary transition-colors">
                            <Mail className="h-5 w-5" />
                            <span className="sr-only">Email</span>
                        </a>
                    </div>
                </div>
                 <div className="rounded-lg border p-4 text-center">
                    <p className="text-sm text-muted-foreground">
                        Made with ❤️ in Lagos, Nigeria.
                    </p>
                </div>
            </div>
            <div className="mt-4 border-t pt-4">
                <DialogClose asChild>
                    <Button className="w-full">Done</Button>
                </DialogClose>
            </div>
        </TabsContent>
        <TabsContent value="api" className="pt-6">
            <div className="max-h-[400px] space-y-2 overflow-y-auto p-1">
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
            <div className="mt-4 border-t pt-4">
                <DialogClose asChild>
                    <Button className="w-full">Done</Button>
                </DialogClose>
            </div>
        </TabsContent>
        <TabsContent value="appearance" className="pt-6">
            <div className="max-h-[400px] space-y-2 overflow-y-auto p-1">
                <div className="flex flex-row items-center justify-between rounded-lg border p-3">
                    <div className="space-y-0.5">
                        <Label htmlFor="dark-mode-switch">Dark Mode</Label>
                        <p className="text-sm text-muted-foreground">Toggle between light and dark themes.</p>
                    </div>
                    <Switch id="dark-mode-switch" checked={theme === 'dark'} onCheckedChange={toggleTheme} />
                </div>
            </div>
            <div className="mt-4 border-t pt-4">
                <DialogClose asChild>
                    <Button className="w-full">Done</Button>
                </DialogClose>
            </div>
        </TabsContent>
        <TabsContent value="generators" className="pt-6">
            <div className="max-h-[400px] space-y-4 overflow-y-auto p-1">
                <div className="rounded-lg border p-3 space-y-3">
                    <div className="space-y-1 mb-2">
                        <Label>Social Platforms</Label>
                        <p className="text-sm text-muted-foreground">
                            Enable or disable specific social media generators.
                        </p>
                    </div>
                    <div className="space-y-2">
                        {socialGeneratorOptions.map(gen => (
                            <div key={gen.id} className="flex flex-row items-center justify-between rounded-lg border p-3">
                                <div className="space-y-0.5">
                                    <Label htmlFor={`${gen.id}-switch`}>{gen.label}</Label>
                                </div>
                                <Switch
                                    id={`${gen.id}-switch`}
                                    checked={enabledGenerators[gen.id]}
                                    onCheckedChange={() => toggleGenerator(gen.id)}
                                />
                            </div>
                        ))}
                    </div>
                </div>
                <div className="rounded-lg border p-3 space-y-3">
                    <div className="space-y-1 mb-2">
                        <Label>Other Tools</Label>
                        <p className="text-sm text-muted-foreground">
                            Enable or disable other content creation tools.
                        </p>
                    </div>
                    <div className="space-y-2">
                        {otherGeneratorOptions.map(gen => (
                            <div key={gen.id} className="flex flex-row items-center justify-between rounded-lg border p-3">
                                <div className="space-y-0.5">
                                    <Label htmlFor={`${gen.id}-switch`}>{gen.label}</Label>
                                </div>
                                <Switch
                                    id={`${gen.id}-switch`}
                                    checked={enabledGenerators[gen.id]}
                                    onCheckedChange={() => toggleGenerator(gen.id)}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="mt-4 border-t pt-4">
                <DialogClose asChild>
                    <Button className="w-full">Done</Button>
                </DialogClose>
            </div>
        </TabsContent>
        <TabsContent value="style" className="pt-6">
            <div className="max-h-[400px] space-y-3 overflow-y-auto p-1">
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
            <div className="mt-4 border-t pt-4">
                <DialogClose asChild>
                    <Button className="w-full">Done</Button>
                </DialogClose>
            </div>
        </TabsContent>
    </Tabs>
  );
}
