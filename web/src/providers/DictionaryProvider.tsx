'use client';

import { createContext, useContext } from 'react';
import type { Dictionary } from '@/lib/dictionaries';

const DictionaryContext = createContext<Dictionary | null>(null);

export function DictionaryProvider({
  dict,
  children,
}: {
  dict: Dictionary;
  children: React.ReactNode;
}) {
  return (
    <DictionaryContext.Provider value={dict}>
      {children}
    </DictionaryContext.Provider>
  );
}

export function useDict(): Dictionary {
  const dict = useContext(DictionaryContext);
  if (!dict) throw new Error('useDict must be used within DictionaryProvider');
  return dict;
}
