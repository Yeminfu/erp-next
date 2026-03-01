//@ts-nocheck
// src/components/providers/TelegramProvider.tsx
'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

interface TelegramUser {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  language_code: string;
  is_premium?: boolean;
  photo_url?: string;
}

interface TelegramContextType {
  isReady: boolean;
  isInTelegram: boolean;
  user: TelegramUser | null;
  webApp: any | null;
  initData: string | null;
}

const TelegramContext = createContext<TelegramContextType | undefined>(undefined);

export function TelegramProvider({ children }: { children: ReactNode }) {
  const [isReady, setIsReady] = useState(false);
  const [isInTelegram, setIsInTelegram] = useState(false);
  const [user, setUser] = useState<TelegramUser | null>(null);
  const [webApp, setWebApp] = useState<any>(null);
  const [initData, setInitData] = useState<string | null>(null);

  useEffect(() => {
    // 🔹 Проверяем наличие Telegram WebApp
    if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
      setIsInTelegram(true);
      setWebApp(window.Telegram.WebApp);
      setInitData(window.Telegram.WebApp.initData);
      
      const tgUser = window.Telegram.WebApp.initDataUnsafe?.user;
      if (tgUser) {
        setUser(tgUser as TelegramUser);
      }
      
      // 🔹 Инициализация
      window.Telegram.WebApp.ready();
      window.Telegram.WebApp.expand();
    } else {
      console.warn('⚠️ Telegram WebApp not found. Running in browser or mock mode.');
      setIsInTelegram(false);
    }
    
    setIsReady(true);
  }, []);

  return (
    <TelegramContext.Provider value={{ isReady, isInTelegram, user, webApp, initData }}>
      {children}
    </TelegramContext.Provider>
  );
}

export function useTelegram() {
  const context = useContext(TelegramContext);
  if (context === undefined) {
    throw new Error('useTelegram must be used within TelegramProvider');
  }
  return context;
}