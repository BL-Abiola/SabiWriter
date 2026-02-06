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
import { cn } from '@/lib/utils';
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

  const navItemClasses = "w-full inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";

  return (
    <div className="p-4 sm:p-6 lg:p-8">
        <div className="w-full max-w-5xl mx-auto">
            <Header />
            
            <div className="grid w-full grid-cols-4 gap-1 rounded-md bg-muted p-1 text-muted-foreground mb-6">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button 
                      variant="ghost" 
                      className={cn(navItemClasses, isSocialView && "bg-background text-foreground shadow-sm")}
                    >
                      <Share2 className="h-4 w-4 md:mr-2" />
                      <span className="hidden md:inline">Social</span>
                      <ChevronDown className="h-4 w-4 ml-1 hidden md:inline"/>
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
                    className={cn(navItemClasses, activeView === 'tagline' && "bg-background text-foreground shadow-sm")}
                    onClick={() => setActiveView('tagline')}
                >
                    <Tags className="h-4 w-4 md:mr-2" />
                    <span className="hidden md:inline">Tagline</span>
                </Button>
                <Button 
                    variant="ghost" 
                    className={cn(navItemClasses, activeView === 'product' && "bg-background text-foreground shadow-sm")}
                    onClick={() => setActiveView('product')}
                >
                    <ShoppingBag className="h-4 w-4 md:mr-2" />
                    <span className="hidden md:inline">Product</span>
                </Button>
                <Button 
                    variant="ghost" 
                    className={cn(navItemClasses, activeView === 'history' && "bg-background text-foreground shadow-sm")}
                    onClick={() => setActiveView('history')}
                >
                    <History className="h-4 w-4 md:mr-2" />
                    <span className="hidden md:inline">History</span>
                </Button>
            </div>

            <div className="mt-6">
              {renderContent()}
            </div>
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
