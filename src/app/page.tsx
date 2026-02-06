"use client";

import { useEffect, useState } from 'react';
import { SettingsProvider, useSettings, GeneratorId } from '@/context/settings-context';
import { HistoryProvider } from '@/context/history-context';
import { AppLayout } from '@/components/app-layout';
import { TaglineGenerator } from '@/components/tagline-generator';
import { ProductDescriptionGenerator } from '@/components/product-description-generator';
import { InstagramGenerator } from '@/components/instagram-generator';
import { WhatsappGenerator } from '@/components/whatsapp-generator';
import { TwitterPostGenerator } from '@/components/twitter-post-generator';
import { HistoryPage } from '@/components/history-page';

type View = 'instagram' | 'whatsapp' | 'twitter' | 'tagline' | 'product' | 'history';

function AppContent() {
  const [activeView, setActiveView] = useState<View>('instagram');
  const { enabledGenerators } = useSettings();

  useEffect(() => {
    // If the active view is no longer enabled, switch to the first available one.
    if (activeView !== 'history' && !enabledGenerators[activeView as GeneratorId]) {
        const firstEnabled = Object.keys(enabledGenerators).find(
            key => enabledGenerators[key as GeneratorId]
        ) as View | undefined;
        
        setActiveView(firstEnabled || 'history');
    }
  }, [enabledGenerators, activeView]);

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

  return (
    <AppLayout activeView={activeView} setActiveView={setActiveView}>
      {renderContent()}
    </AppLayout>
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
