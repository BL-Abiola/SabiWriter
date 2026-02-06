"use client";

import { useEffect, useState } from 'react';
import { SettingsProvider } from '@/context/settings-context';
import { HistoryProvider } from '@/context/history-context';
import { InstagramGenerator } from '@/components/instagram-generator';
import { TaglineGenerator } from '@/components/tagline-generator';
import { WhatsappGenerator } from '@/components/whatsapp-generator';
import { ProductDescriptionGenerator } from '@/components/product-description-generator';
import { TwitterPostGenerator } from '@/components/twitter-post-generator';
import { HistoryPage } from '@/components/history-page';
import { Header } from '@/components/header';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { History, Instagram, MessageCircle, ShoppingBag, Tags, Twitter } from 'lucide-react';

function AppContent() {
  return (
    <div className="p-4 sm:p-6 lg:p-8 flex flex-col items-center">
        <div className="w-full max-w-3xl">
            <Header />
            <Tabs defaultValue="instagram" className="w-full">
                <TabsList className="grid w-full grid-cols-6">
                    <TabsTrigger value="instagram">
                        <Instagram className="h-4 w-4 md:mr-2" />
                        <span className="hidden md:inline">Instagram</span>
                    </TabsTrigger>
                    <TabsTrigger value="whatsapp">
                        <MessageCircle className="h-4 w-4 md:mr-2" />
                        <span className="hidden md:inline">WhatsApp</span>
                    </TabsTrigger>
                    <TabsTrigger value="tagline">
                        <Tags className="h-4 w-4 md:mr-2" />
                        <span className="hidden md:inline">Tagline</span>
                    </TabsTrigger>
                    <TabsTrigger value="product">
                        <ShoppingBag className="h-4 w-4 md:mr-2" />
                        <span className="hidden md:inline">Product</span>
                    </TabsTrigger>
                    <TabsTrigger value="twitter">
                        <Twitter className="h-4 w-4 md:mr-2" />
                        <span className="hidden md:inline">X / Twitter</span>
                    </TabsTrigger>
                    <TabsTrigger value="history">
                        <History className="h-4 w-4 md:mr-2" />
                        <span className="hidden md:inline">History</span>
                    </TabsTrigger>
                </TabsList>
                <TabsContent value="instagram" className="mt-6">
                    <div className="w-full max-w-2xl mx-auto">
                        <InstagramGenerator />
                    </div>
                </TabsContent>
                <TabsContent value="whatsapp" className="mt-6">
                    <div className="w-full max-w-2xl mx-auto">
                        <WhatsappGenerator />
                    </div>
                </TabsContent>
                <TabsContent value="tagline" className="mt-6">
                    <div className="w-full max-w-2xl mx-auto">
                        <TaglineGenerator />
                    </div>
                </TabsContent>
                <TabsContent value="product" className="mt-6">
                    <div className="w-full max-w-2xl mx-auto">
                        <ProductDescriptionGenerator />
                    </div>
                </TabsContent>
                <TabsContent value="twitter" className="mt-6">
                    <div className="w-full max-w-2xl mx-auto">
                        <TwitterPostGenerator />
                    </div>
                </TabsContent>
                <TabsContent value="history" className="mt-6">
                    <div className="w-full max-w-2xl mx-auto">
                        <HistoryPage />
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    </div>
  );
}


export default function Home() {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  return (
    <SettingsProvider>
      <HistoryProvider>
        {isClient ? <AppContent /> : null}
      </HistoryProvider>
    </SettingsProvider>
  );
}
