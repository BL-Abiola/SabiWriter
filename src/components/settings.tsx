"use client";

import { useEffect, useState } from 'react';
import { useSettings, GeneratorId } from '@/context/settings-context';
import { Switch } from '@/components/ui/switch';
import { Label } from "@/components/ui/label";
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useTheme } from '@/context/theme-context';
import { useHistory } from '@/context/history-context';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DialogClose } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
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
import {
    Palette,
    SlidersHorizontal,
    Database,
    Info,
    Trash2,
    Mail,
    KeyRound,
} from 'lucide-react';
import { XLogo } from '@/components/icons/x-logo';
import { ScrollArea } from '@/components/ui/scroll-area';

const socialGeneratorOptions: {id: GeneratorId, label: string}[] = [
    { id: 'instagram', label: 'Instagram Bio' },
    { id: 'facebook', label: 'Facebook Post' },
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
    enabledGenerators, toggleGenerator,
    apiKey, setApiKey,
    resetSettings,
  } = useSettings();
  const [localApiKey, setLocalApiKey] = useState('');
  const { toast } = useToast();
  const { theme, toggleTheme, resetTheme } = useTheme();
  const { clearHistory } = useHistory();

  useEffect(() => {
    if (apiKey) {
      setLocalApiKey(apiKey);
    }
  }, [apiKey]);

  const handleSaveApiKey = () => {
    if (!localApiKey.trim()) {
      toast({
        variant: 'destructive',
        title: 'API Key is empty',
        description: 'Please enter a valid API key.',
      });
      return;
    }
    setApiKey(localApiKey);
    toast({
      title: 'API Key Saved',
      description: 'Your Google AI API key has been saved to your browser.',
    });
  };

  const handleResetSettings = () => {
    resetSettings();
    resetTheme();
    setLocalApiKey('');
    toast({
      title: 'Settings Reset',
      description: 'All settings have been restored to their default values.',
    });
  };

  return (
    <Tabs defaultValue="generators" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="generators">
                <SlidersHorizontal className="md:mr-2 h-4 w-4" />
                <span className="hidden md:inline">Generators</span>
            </TabsTrigger>
            <TabsTrigger value="appearance">
                <Palette className="md:mr-2 h-4 w-4" />
                <span className="hidden md:inline">Appearance</span>
            </TabsTrigger>
            <TabsTrigger value="data">
                <Database className="md:mr-2 h-4 w-4" />
                <span className="hidden md:inline">Data</span>
            </TabsTrigger>
            <TabsTrigger value="about">
                <Info className="md:mr-2 h-4 w-4" />
                <span className="hidden md:inline">About</span>
            </TabsTrigger>
        </TabsList>
        <TabsContent value="about" className="pt-6">
            <ScrollArea className="h-[220px]">
                <div className="space-y-4 p-1">
                    <div className="rounded-3xl border p-4 text-center">
                        <div>
                            <h3 className="font-headline text-2xl font-bold text-primary">SabiWriter</h3>
                            <p className="text-sm text-muted-foreground">Version 1.0.0</p>
                            <p className="mt-2 text-foreground/80">
                                Your AI-powered assistant for crafting expert content for your Nigerian business.
                            </p>
                        </div>
                        <Separator className="my-4" />
                        <div>
                            <h4 className="font-semibold text-foreground">Built by BL_Abiola</h4>
                        </div>
                    </div>
                    <div className="rounded-3xl border p-4 text-center">
                        <h4 className="font-semibold text-foreground">Contact</h4>
                        <Separator className="my-4" />
                        <div className="flex items-center justify-center space-x-4">
                            <a
                                href="https://x.com/BL_Abiola"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-muted-foreground hover:text-primary transition-colors"
                            >
                                <XLogo className="h-5 w-5" />
                                <span className="sr-only">X</span>
                            </a>
                            <a
                                href="mailto:Abiolalabs29@Gmail.com"
                                className="text-muted-foreground hover:text-primary transition-colors"
                            >
                                <Mail className="h-5 w-5" />
                                <span className="sr-only">Email</span>
                            </a>
                        </div>
                    </div>
                </div>
            </ScrollArea>
            <div className="mt-4 border-t pt-4">
                <DialogClose asChild>
                    <Button className="w-full">Done</Button>
                </DialogClose>
            </div>
        </TabsContent>
        <TabsContent value="data" className="pt-6">
            <ScrollArea className="h-[220px]">
                <div className="space-y-4 p-1">
                <div className="rounded-3xl border p-4 space-y-2">
                    <div className="space-y-1">
                    <Label htmlFor="api-key-input" className="flex items-center">
                        <KeyRound className="mr-2 h-4 w-4" />
                        Google AI API Key
                    </Label>
                    <p className="text-sm text-muted-foreground">
                        Your API key is stored only in your browser and is required for all AI generation features.
                    </p>
                    </div>

                    <div className="flex items-center gap-2">
                    <Input
                        id="api-key-input"
                        type="password"
                        placeholder="Paste your API key here"
                        value={localApiKey}
                        onChange={(e) => setLocalApiKey(e.target.value)}
                        className="flex-1"
                    />
                    <Button onClick={handleSaveApiKey} variant="secondary">
                        Save
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
                <div className="rounded-3xl border border-destructive/50 p-4">
                        <div className="mb-4">
                            <Label className="text-base font-semibold text-destructive">Danger Zone</Label>
                            <p className="text-sm text-muted-foreground">
                                These actions are permanent and cannot be undone.
                            </p>
                        </div>

                        <div className="space-y-2">
                            <AlertDialog>
                                <AlertDialogTrigger asChild>
                                    <Button variant="outline" className="w-full border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground">
                                        <Trash2 className="mr-2 h-4 w-4" /> Reset All Settings
                                    </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>Are you sure you want to reset settings?</AlertDialogTitle>
                                        <AlertDialogDescription>
                                            This will restore all appearance and generation settings to their original defaults and clear your saved API key.
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                        <AlertDialogAction onClick={handleResetSettings} className="bg-destructive hover:bg-destructive/90">Reset</AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>

                            <AlertDialog>
                                <AlertDialogTrigger asChild>
                                    <Button variant="outline" className="w-full border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground">
                                        <Trash2 className="mr-2 h-4 w-4" /> Clear Generation History
                                    </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>Are you sure you want to clear history?</AlertDialogTitle>
                                        <AlertDialogDescription>
                                            This will permanently delete your entire generation history.
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                        <AlertDialogAction onClick={clearHistory} className="bg-destructive hover:bg-destructive/90">Clear History</AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        </div>
                    </div>
                </div>
            </ScrollArea>
            <div className="mt-4 border-t pt-4">
                <DialogClose asChild>
                    <Button className="w-full">Done</Button>
                </DialogClose>
            </div>
        </TabsContent>
        <TabsContent value="appearance" className="pt-6">
            <ScrollArea className="h-[220px]">
                <div className="p-1">
                    <div className="space-y-3 rounded-3xl border p-4">
                        <div className="flex flex-row items-center justify-between">
                            <Label htmlFor="dark-mode-switch" className="font-medium">Dark Mode</Label>
                            <Switch id="dark-mode-switch" checked={theme === 'dark'} onCheckedChange={toggleTheme} />
                        </div>
                        <Separator />
                        <div className="flex flex-row items-center justify-between">
                            <Label>Tone of Voice</Label>
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
                    </div>
                </div>
            </ScrollArea>
            <div className="mt-4 border-t pt-4">
                <DialogClose asChild>
                    <Button className="w-full">Done</Button>
                </DialogClose>
            </div>
        </TabsContent>
        <TabsContent value="generators" className="pt-6">
            <ScrollArea className="h-[220px]">
                <div className="space-y-4 p-1">
                    <div className="rounded-3xl border p-4">
                        <Label className="font-medium">Social Platforms</Label>
                        <div className="space-y-3 pt-3">
                            {socialGeneratorOptions.map(gen => (
                                <div key={gen.id} className="flex flex-row items-center justify-between">
                                    <Label htmlFor={`${gen.id}-switch`} className="font-normal">{gen.label}</Label>
                                    <Switch
                                        id={`${gen.id}-switch`}
                                        checked={enabledGenerators[gen.id]}
                                        onCheckedChange={() => toggleGenerator(gen.id)}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="rounded-3xl border p-4">
                        <Label className="font-medium">Other Tools</Label>
                        <div className="space-y-3 pt-3">
                            {otherGeneratorOptions.map(gen => (
                                <div key={gen.id} className="flex flex-row items-center justify-between">
                                    <Label htmlFor={`${gen.id}-switch`} className="font-normal">{gen.label}</Label>
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
            </ScrollArea>
            <div className="mt-4 border-t pt-4">
                <DialogClose asChild>
                    <Button className="w-full">Done</Button>
                </DialogClose>
            </div>
        </TabsContent>
    </Tabs>
  );
}
