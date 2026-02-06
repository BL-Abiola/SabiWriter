'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

type Tone = 'Nigerian' | 'Professional' | 'Playful' | 'Witty' | 'Inspirational';
export type GeneratorId = 'instagram' | 'whatsapp' | 'twitter' | 'tagline' | 'product';
type EnabledGenerators = Record<GeneratorId, boolean>;

const defaultSettings = {
  tone: 'Nigerian' as Tone,
  includeEmojis: true,
  enabledGenerators: {
    instagram: true,
    whatsapp: true,
    twitter: true,
    tagline: true,
    product: true,
  },
};

type SettingsContextType = {
  tone: Tone;
  setTone: (value: Tone) => void;
  includeEmojis: boolean;
  setIncludeEmojis: (value: boolean) => void;
  enabledGenerators: EnabledGenerators;
  toggleGenerator: (id: GeneratorId) => void;
  resetSettings: () => void;
};

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [tone, setTone] = useState<Tone>(defaultSettings.tone);
  const [includeEmojis, setIncludeEmojis] = useState(defaultSettings.includeEmojis);
  const [enabledGenerators, setEnabledGenerators] = useState<EnabledGenerators>(
    defaultSettings.enabledGenerators
  );

  const toggleGenerator = (id: GeneratorId) => {
    setEnabledGenerators(prev => ({...prev, [id]: !prev[id]}));
  };

  const resetSettings = () => {
    setTone(defaultSettings.tone);
    setIncludeEmojis(defaultSettings.includeEmojis);
    setEnabledGenerators(defaultSettings.enabledGenerators);
  }

  return (
    <SettingsContext.Provider
      value={{
        tone,
        setTone,
        includeEmojis,
        setIncludeEmojis,
        enabledGenerators,
        toggleGenerator,
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
