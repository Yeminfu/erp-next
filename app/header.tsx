"use client"

import Link from 'next/link';
// components/SalonHeader.tsx
import { useEffect, useState } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [state, setState] = useState();

  useEffect(() => {
    //@ts-ignore
    setState(window.Telegram.WebApp.initDataUnsafe.user.id)




  }, [])

  return (
    <header className="w-full bg-white shadow-lg sticky top-0 z-50">
      <pre>{JSON.stringify(['window.Telegram?.WebApp', state], () => {
        const seen = new WeakSet();
        //@ts-ignore
        return (key, value) => {
          if (typeof value === "object" && value !== null) {
            if (seen.has(value)) {
              return; // Returns undefined, effectively removing the cyclic reference
            }
            seen.add(value);
          }
          return value;
        };
      })}</pre>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* 🔹 Логотип */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 md:w-7 md:h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
                Каприз
              </h1>
              <p className="text-xs text-gray-500 hidden sm:block">Салон красоты</p>
            </div>
          </div>

          {/* 🔹 Навигация (десктоп) */}
          <nav className="hidden md:flex items-center gap-6">
            <a href="#services" className="text-gray-600 hover:text-pink-500 transition font-medium">
              Услуги
            </a>
            <a href="#masters" className="text-gray-600 hover:text-pink-500 transition font-medium">
              Мастера
            </a>
            <a href="#portfolio" className="text-gray-600 hover:text-pink-500 transition font-medium">
              Портфолио
            </a>
            <a href="#reviews" className="text-gray-600 hover:text-pink-500 transition font-medium">
              Отзывы
            </a>
            <a href="#contacts" className="text-gray-600 hover:text-pink-500 transition font-medium">
              Контакты
            </a>
          </nav>

          {/* 🔹 Кнопка записи и телефон */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href="tel:+79147733003"
              className="flex items-center gap-2 text-gray-600 hover:text-pink-500 transition"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span className="text-sm font-medium">+7 (914) 773-30-03</span>
            </a>
            <button className="px-6 py-2.5 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-full font-medium hover:shadow-lg hover:scale-105 transition transform">
              Записаться
            </button>
          </div>

          {/* 🔹 Мобильное меню кнопка */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-gray-600 hover:text-pink-500 transition"
          >
            {isMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* 🔹 Мобильное меню */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <nav className="flex flex-col space-y-3">
              <a href="#services" className="text-gray-600 hover:text-pink-500 transition font-medium py-2">
                Услуги
              </a>
              <a href="#masters" className="text-gray-600 hover:text-pink-500 transition font-medium py-2">
                Мастера
              </a>
              <a href="#portfolio" className="text-gray-600 hover:text-pink-500 transition font-medium py-2">
                Портфолио
              </a>
              <a href="#reviews" className="text-gray-600 hover:text-pink-500 transition font-medium py-2">
                Отзывы
              </a>
              <a href="#contacts" className="text-gray-600 hover:text-pink-500 transition font-medium py-2">
                Контакты
              </a>
              <a
                href="tel:+79147733003"
                className="flex items-center gap-2 text-gray-600 hover:text-pink-500 transition font-medium py-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                +7 (914) 773-30-03
              </a>
              <Link href={'/'} onClick={() => setIsMenuOpen(false)} className="w-full mt-2 px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-full font-medium hover:shadow-lg transition">
                Записаться онлайн
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}





interface TelegramUser {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  language_code: string;
  is_premium?: boolean;
  photo_url?: string;
}

export function useTelegramSafe() {
  const [isReady, setIsReady] = useState(false);
  const [user, setUser] = useState<TelegramUser | null>(null);
  const [isInTelegram, setIsInTelegram] = useState(false);

  useEffect(() => {
    // 🔹 Проверяем наличие Telegram WebApp
    const checkTelegram = () => {
      //@ts-ignore
      if (window.Telegram?.WebApp) {
        setIsInTelegram(true);

        // 🔹 Получаем пользователя
        //@ts-ignore
        const tgUser = window.Telegram.WebApp.initDataUnsafe?.user;
        if (tgUser) {
          setUser(tgUser as TelegramUser);
        }

        // 🔹 Сообщаем Telegram, что приложение готово
        //@ts-ignore
        window.Telegram.WebApp.ready();
        //@ts-ignore
        window.Telegram.WebApp.expand();

        setIsReady(true);
      } else {
        // 🔹 Запуск вне Telegram (для разработки)
        console.warn('⚠️ Telegram WebApp not found. Running in mock mode.');
        setIsInTelegram(false);
        setIsReady(true);
      }
    };

    // 🔹 Проверяем сразу и при загрузке страницы
    checkTelegram();
    if (document.readyState === 'complete') {
      checkTelegram();
    } else {
      window.addEventListener('load', checkTelegram);
      return () => window.removeEventListener('load', checkTelegram);
    }
  }, []);

  return {
    isReady,
    isInTelegram,
    user,
    userId: user?.id,
    userName: user?.username,
    userFullName: user
      ? `${user.first_name}${user.last_name ? ` ${user.last_name}` : ''}`.trim()
      : null,
    // 🔹 Безопасные методы
    //@ts-ignore
    closeApp: () => window.Telegram?.WebApp?.close(),
    //@ts-ignore
    showAlert: (msg: string) => window.Telegram?.WebApp?.showAlert(msg),
    //@ts-ignore
    openLink: (url: string) => window.Telegram?.WebApp?.openLink(url),
  };
}