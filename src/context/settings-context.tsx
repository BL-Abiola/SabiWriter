'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

type Tone = 'Nigerian' | 'Professional' | 'Playful' | 'Witty' | 'Inspirational';

type SettingsContextType = {
  tone: Tone;
  setTone: (value: Tone) => void;
  includeEmojis: boolean;
  setIncludeEmojis: (value: boolean) => void;
};

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [tone, setTone] = useState<Tone>('Nigerian');
  const [includeEmojis, setIncludeEmojis] = useState(true);

  return (
    <SettingsContext.Provider
      value={{
        tone,
        setTone,
        includeEmojis,
        setIncludeEmojis,
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
