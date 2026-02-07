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

type SettingsContextType = {
  tone: Tone;
  setTone: (value: Tone) => void;
  enabledGenerators: EnabledGenerators;
  toggleGenerator: (id: GeneratorId) => void;
  apiKey: string | null;
  setApiKey: (key: string | null) => void;
  resetSettings: () => void;
};

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [tone, setTone] = useState<Tone>(defaultSettings.tone);
  const [enabledGenerators, setEnabledGenerators] = useState<EnabledGenerators>(
    defaultSettings.enabledGenerators
  );
  const [apiKey, setApiKey] = useState<string | null>(null);

  useEffect(() => {
    try {
      const storedApiKey = localStorage.getItem('geminiApiKey');
      if (storedApiKey) {
        setApiKey(storedApiKey);
      }
    } catch (error) {
      console.error("Failed to load API key from localStorage", error);
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

  const resetSettings = () => {
    setTone(defaultSettings.tone);
    setEnabledGenerators(defaultSettings.enabledGenerators);
    handleSetApiKey(null);
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
