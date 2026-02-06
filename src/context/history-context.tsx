'use client';

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

export type HistoryItem = {
  id: string;
  type: 'Instagram' | 'WhatsApp' | 'Tagline' | 'Product Description' | 'Twitter Post';
  text: string;
  timestamp: string;
};

type HistoryContextType = {
  history: HistoryItem[];
  addHistoryItem: (item: Omit<HistoryItem, 'id' | 'timestamp'>) => void;
  clearHistory: () => void;
};

const HistoryContext = createContext<HistoryContextType | undefined>(undefined);

export function HistoryProvider({ children }: { children: ReactNode }) {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    try {
      const storedHistory = localStorage.getItem('naijaBizBioHistory');
      if (storedHistory) {
        setHistory(JSON.parse(storedHistory));
      }
    } catch (error) {
      console.error("Failed to load history from localStorage", error);
    }
  }, []);

  const updateLocalStorage = (updatedHistory: HistoryItem[]) => {
    try {
      localStorage.setItem('naijaBizBioHistory', JSON.stringify(updatedHistory));
    } catch (error) {
      console.error("Failed to save history to localStorage", error);
    }
  };

  const addHistoryItem = (item: Omit<HistoryItem, 'id' | 'timestamp'>) => {
    const newItem: HistoryItem = {
      ...item,
      id: new Date().toISOString() + Math.random(),
      timestamp: new Date().toISOString(),
    };
    const updatedHistory = [newItem, ...history];
    setHistory(updatedHistory);
    updateLocalStorage(updatedHistory);
  };

  const clearHistory = () => {
    setHistory([]);
    updateLocalStorage([]);
    toast({
      title: 'History Cleared',
      description: 'Your generation history has been removed.',
    });
  };

  return (
    <HistoryContext.Provider
      value={{
        history,
        addHistoryItem,
        clearHistory,
      }}
    >
      {children}
    </HistoryContext.Provider>
  );
}

export function useHistory() {
  const context = useContext(HistoryContext);
  if (context === undefined) {
    throw new Error('useHistory must be used within a HistoryProvider');
  }
  return context;
}
