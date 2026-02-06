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
import { cn } from '@/lib/utils';

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

  const navButtonClasses = (isActive: boolean) =>
    cn(
      "flex-1 items-center justify-center text-base py-3 rounded-lg transition-all duration-200 ease-in-out font-medium",
      isActive
        ? "bg-primary text-primary-foreground shadow-lg hover:bg-primary/90"
        : "text-muted-foreground bg-transparent hover:bg-primary/10 hover:text-primary"
    );

  const navIconClasses = "h-5 w-5 md:mr-2";

  return (
    <div className="w-full">
        <Header />
        
        <div className="flex w-full items-center rounded-2xl bg-muted p-1.5 my-8 gap-1.5">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className={navButtonClasses(isSocialView)}>
                  <Share2 className={navIconClasses} />
                  <span className="hidden md:inline">Social</span>
                  <ChevronDown className="h-4 w-4 ml-1 hidden md:inline" />
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
                variant="ghost"
                onClick={() => setActiveView('tagline')}
                className={navButtonClasses(activeView === 'tagline')}
            >
                <Tags className={navIconClasses} />
                <span className="hidden md:inline">Tagline</span>
            </Button>
            <Button 
                variant="ghost"
                onClick={() => setActiveView('product')}
                className={navButtonClasses(activeView === 'product')}
            >
                <ShoppingBag className={navIconClasses} />
                <span className="hidden md:inline">Product</span>
            </Button>
            <Button 
                variant="ghost"
                onClick={() => setActiveView('history')}
                className={navButtonClasses(activeView === 'history')}
            >
                <History className={navIconClasses} />
                <span className="hidden md:inline">History</span>
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
    <main className="w-full max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <SettingsProvider>
        <HistoryProvider>
            {isClient ? <AppContent /> : null}
        </HistoryProvider>
        </SettingsProvider>
    </main>
  );
}
