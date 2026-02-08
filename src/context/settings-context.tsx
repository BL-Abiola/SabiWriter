'use client';

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

type Tone = 'Nigerian' | 'Professional' | 'Playful' | 'Witty' | 'Inspirational';
export type GeneratorId = 'instagram' | 'whatsapp' | 'twitter' | 'tagline' | 'product' | 'facebook';
type EnabledGenerators = Record<GeneratorId, boolean>;

const defaultSettings = {
  tone: 'Nigerian' as Tone,
  enabledGenerators: {
    instagram: true,
    whatsapp: true,
    twitter: true,
    tagline: true,
    product: true,
    facebook: true,
  },
};

const ONBOARDING_STORAGE_KEY = 'sabiWriterOnboardingComplete';

type SettingsContextType = {
  tone: Tone;
  setTone: (value: Tone) => void;
  enabledGenerators: EnabledGenerators;
  toggleGenerator: (id: GeneratorId) => void;
  apiKey: string | null;
  setApiKey: (key: string | null) => void;
  resetSettings: () => void;
  isOnboardingComplete: boolean;
  completeOnboarding: () => void;
};

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [tone, setTone] = useState<Tone>(defaultSettings.tone);
  const [enabledGenerators, setEnabledGenerators] = useState<EnabledGenerators>(
    defaultSettings.enabledGenerators
  );
  const [apiKey, setApiKey] = useState<string | null>(null);
  const [isOnboardingComplete, setIsOnboardingComplete] = useState(true);

  useEffect(() => {
    try {
      const storedApiKey = localStorage.getItem('geminiApiKey');
      if (storedApiKey) {
        setApiKey(storedApiKey);
      }
      const storedOnboardingStatus = localStorage.getItem(ONBOARDING_STORAGE_KEY);
      if (!storedOnboardingStatus) {
        setIsOnboardingComplete(false);
      }
    } catch (error) {
      console.error("Failed to access localStorage", error);
    }
  }, []);

  const handleSetApiKey = (key: string | null) => {
    setApiKey(key);
    try {
      if (key) {
        localStorage.setItem('geminiApiKey', key);
      } else {
        localStorage.removeItem('geminiApiKey');
      }
    } catch (error) {
      console.error("Failed to save API key to localStorage", error);
    }
  };

  const toggleGenerator = (id: GeneratorId) => {
    setEnabledGenerators(prev => ({...prev, [id]: !prev[id]}));
  };

  const completeOnboarding = () => {
    setIsOnboardingComplete(true);
    try {
        localStorage.setItem(ONBOARDING_STORAGE_KEY, 'true');
    } catch (error) {
        console.error("Failed to save onboarding status to localStorage", error);
    }
  };

  const resetSettings = () => {
    setTone(defaultSettings.tone);
    setEnabledGenerators(defaultSettings.enabledGenerators);
    handleSetApiKey(null);
    setIsOnboardingComplete(false);
    try {
        localStorage.removeItem(ONBOARDING_STORAGE_KEY);
    } catch (error) {
        console.error("Failed to remove onboarding status from localStorage", error);
    }
  }

  return (
    <SettingsContext.Provider
      value={{
        tone,
        setTone,
        enabledGenerators,
        toggleGenerator,
        apiKey,
        setApiKey: handleSetApiKey,
        resetSettings,
        isOnboardingComplete,
        completeOnboarding,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
}
