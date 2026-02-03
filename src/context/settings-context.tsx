'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

type SettingsContextType = {
  nigerianTone: boolean;
  setNigerianTone: (value: boolean) => void;
  includeEmojis: boolean;
  setIncludeEmojis: (value: boolean) => void;
};

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [nigerianTone, setNigerianTone] = useState(true);
  const [includeEmojis, setIncludeEmojis] = useState(true);

  return (
    <SettingsContext.Provider
      value={{
        nigerianTone,
        setNigerianTone,
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
