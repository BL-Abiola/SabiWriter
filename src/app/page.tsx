"use client";

import { useEffect, useState } from 'react';
import { SettingsProvider } from '@/context/settings-context';
import { HistoryProvider } from '@/context/history-context';
import { TaglineGenerator } from '@/components/tagline-generator';
import { ProductDescriptionGenerator } from '@/components/product-description-generator';
import { InstagramGenerator } from '@/components/instagram-generator';
import { WhatsappGenerator } from '@/components/whatsapp-generator';
import { TwitterPostGenerator } from '@/components/twitter-post-generator';
import { HistoryPage } from '@/components/history-page';
import { Header } from '@/components/header';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { History, Share2, ShoppingBag, Tags, ChevronDown, Instagram, MessageCircle, Twitter } from 'lucide-react';

type View = 'instagram' | 'whatsapp' | 'twitter' | 'tagline' | 'product' | 'history';

function AppContent() {
  const [activeView, setActiveView] = useState<View>('instagram');

  const renderContent = () => {
    switch (activeView) {
        case 'instagram':
            return <InstagramGenerator />;
        case 'whatsapp':
            return <WhatsappGenerator />;
        case 'twitter':
            return <TwitterPostGenerator />;
        case 'tagline':
            return <TaglineGenerator />;
        case 'product':
            return <ProductDescriptionGenerator />;
        case 'history':
            return <HistoryPage />;
        default:
            return <InstagramGenerator />;
    }
  }

  const isSocialView = ['instagram', 'whatsapp', 'twitter'].includes(activeView);

  return (
    <div className="w-full">
        <Header />
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 my-8">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant={isSocialView ? 'default' : 'outline'} className="w-full justify-center text-base py-6 shadow-sm">
                  <Share2 className="h-5 w-5 mr-3" />
                  <span>Social</span>
                  <ChevronDown className="h-4 w-4 ml-2"/>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                <DropdownMenuItem onClick={() => setActiveView('instagram')}>
                  <Instagram className="mr-2 h-4 w-4" />
                  <span>Instagram</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setActiveView('whatsapp')}>
                  <MessageCircle className="mr-2 h-4 w-4" />
                  <span>WhatsApp</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setActiveView('twitter')}>
                  <Twitter className="mr-2 h-4 w-4" />
                  <span>X / Twitter</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button 
                variant={activeView === 'tagline' ? 'default' : 'outline'}
                onClick={() => setActiveView('tagline')}
                className="w-full justify-center text-base py-6 shadow-sm"
            >
                <Tags className="h-5 w-5 mr-3" />
                <span>Tagline</span>
            </Button>
            <Button 
                variant={activeView === 'product' ? 'default' : 'outline'}
                onClick={() => setActiveView('product')}
                className="w-full justify-center text-base py-6 shadow-sm"
            >
                <ShoppingBag className="h-5 w-5 mr-3" />
                <span>Product</span>
            </Button>
            <Button 
                variant={activeView === 'history' ? 'default' : 'outline'}
                onClick={() => setActiveView('history')}
                className="w-full justify-center text-base py-6 shadow-sm"
            >
                <History className="h-5 w-5 mr-3" />
                <span>History</span>
            </Button>
        </div>

        <div>
          {renderContent()}
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
    <main className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <SettingsProvider>
        <HistoryProvider>
            {isClient ? <AppContent /> : null}
        </HistoryProvider>
        </SettingsProvider>
    </main>
  );
}
