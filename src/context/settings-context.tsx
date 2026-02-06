'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

type Tone = 'Nigerian' | 'Professional' | 'Playful' | 'Witty' | 'Inspirational';
export type GeneratorId = 'instagram' | 'whatsapp' | 'twitter' | 'tagline' | 'product';
type EnabledGenerators = Record<GeneratorId, boolean>;

type SettingsContextType = {
  tone: Tone;
  setTone: (value: Tone) => void;
  includeEmojis: boolean;
  setIncludeEmojis: (value: boolean) => void;
  enabledGenerators: EnabledGenerators;
  toggleGenerator: (id: GeneratorId) => void;
};

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [tone, setTone] = useState<Tone>('Nigerian');
  const [includeEmojis, setIncludeEmojis] = useState(true);
  const [enabledGenerators, setEnabledGenerators] = useState<EnabledGenerators>({
    instagram: true,
    whatsapp: true,
    twitter: true,
    tagline: true,
    product: true,
  });

  const toggleGenerator = (id: GeneratorId) => {
    setEnabledGenerators(prev => ({...prev, [id]: !prev[id]}));
  };

  return (
    <SettingsContext.Provider
      value={{
        tone,
        setTone,
        includeEmojis,
        setIncludeEmojis,
        enabledGenerators,
        toggleGenerator,
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
