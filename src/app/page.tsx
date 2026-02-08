"use client";

import { useEffect, useState } from 'react';
import { SettingsProvider, useSettings, GeneratorId } from '@/context/settings-context';
import { HistoryProvider } from '@/context/history-context';
import { Navigation } from '@/components/navigation';
import { TaglineGenerator } from '@/components/tagline-generator';
import { ProductDescriptionGenerator } from '@/components/product-description-generator';
import { InstagramGenerator } from '@/components/instagram-generator';
import { WhatsappGenerator } from '@/components/whatsapp-generator';
import { TwitterPostGenerator } from '@/components/twitter-post-generator';
import { FacebookPostGenerator } from '@/components/facebook-post-generator';
import { HistoryPage } from '@/components/history-page';
import { Header } from '@/components/header';
import { AppSkeleton } from '@/components/app-skeleton';
import { OnboardingDialog } from '@/components/onboarding-dialog';

type View = 'instagram' | 'whatsapp' | 'twitter' | 'tagline' | 'product' | 'history' | 'facebook';

function AppContent() {
  const [activeView, setActiveView] = useState<View>('instagram');
  const { enabledGenerators } = useSettings();
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);

  useEffect(() => {
    try {
        const hasSeenOnboarding = localStorage.getItem('sabiWriterOnboardingComplete');
        if (!hasSeenOnboarding) {
            setIsOnboardingOpen(true);
        }
    } catch (error) {
        console.error("Failed to read from localStorage", error);
    }

    // If the active view is no longer enabled, switch to the first available one.
    if (activeView !== 'history' && !enabledGenerators[activeView as GeneratorId]) {
        const firstEnabled = Object.keys(enabledGenerators).find(
            key => enabledGenerators[key as GeneratorId]
        ) as View | undefined;
        
        setActiveView(firstEnabled || 'instagram');
    }
  }, [enabledGenerators, activeView]);

  const handleOnboardingComplete = () => {
    try {
        localStorage.setItem('sabiWriterOnboardingComplete', 'true');
    } catch (error) {
        console.error("Failed to save to localStorage", error);
    }
    setIsOnboardingOpen(false);
  };

  const renderContent = () => {
    switch (activeView) {
        case 'instagram':
            return <InstagramGenerator />;
        case 'facebook':
            return <FacebookPostGenerator />;
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
    <>
      <OnboardingDialog isOpen={isOnboardingOpen} onComplete={handleOnboardingComplete} />
      <div className="p-4 sm:p-6 lg:p-8">
          <div className="mx-auto max-w-4xl">
              <Header />
              <Navigation activeView={activeView} setActiveView={setActiveView} />
              {renderContent()}
          </div>
      </div>
    </>
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
          {isClient ? <AppContent /> : <AppSkeleton />}
      </HistoryProvider>
    </SettingsProvider>
  );
}
