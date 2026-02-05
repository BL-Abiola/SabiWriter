"use client";

import { Header } from '@/components/header';
import { InstagramGenerator } from '@/components/instagram-generator';
import { TaglineGenerator } from '@/components/tagline-generator';
import { WhatsappGenerator } from '@/components/whatsapp-generator';
import { HistoryPage } from '@/components/history-page';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Instagram, MessageCircle, Tags, History } from 'lucide-react';
import { SettingsProvider } from '@/context/settings-context';
import { HistoryProvider } from '@/context/history-context';

export default function Home() {
  return (
    <SettingsProvider>
      <HistoryProvider>
        <main className="flex min-h-screen w-full flex-col items-center bg-background p-4 sm:p-8 md:p-12">
          <div className="w-full max-w-5xl space-y-8">
            <Header />
            <Tabs defaultValue="instagram" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="instagram">
                  <Instagram className="h-5 w-5" />
                  <span className="sr-only">Instagram Bio</span>
                </TabsTrigger>
                <TabsTrigger value="whatsapp">
                  <MessageCircle className="h-5 w-5" />
                  <span className="sr-only">WhatsApp Info</span>
                </TabsTrigger>
                <TabsTrigger value="tagline">
                  <Tags className="h-5 w-5" />
                  <span className="sr-only">Tagline</span>
                </TabsTrigger>
                <TabsTrigger value="history">
                  <History className="h-5 w-5" />
                  <span className="sr-only">History</span>
                </TabsTrigger>
              </TabsList>
              <TabsContent value="instagram" className="mt-6">
                <InstagramGenerator />
              </TabsContent>
              <TabsContent value="whatsapp" className="mt-6">
                <WhatsappGenerator />
              </TabsContent>
              <TabsContent value="tagline" className="mt-6">
                <TaglineGenerator />
              </TabsContent>
              <TabsContent value="history" className="mt-6">
                <HistoryPage />
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </HistoryProvider>
    </SettingsProvider>
  );
}
