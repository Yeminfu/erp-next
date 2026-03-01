// components/SalonFooter.tsx
export default function Footer() {
  return (
    <footer className="w-full bg-gray-50 border-t border-gray-200">
      
      <div className="max-w-lg mx-auto p-6 bg-white rounded-lg space-y-5">

        {/* 🔹 Основной контент */}
        <div className="flex flex-col md:flex-row justify-between gap-4">

          {/* Логотип и название */}
          {/* <div className="flex  gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
            </div>
            <div>
              <span className="text-sm font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
                Каприз
              </span>
              <span className="text-xs text-gray-500 block">Салон красоты</span>
            </div>
          </div> */}

          {/* Разделитель (только для мобильных) */}
          <div className="w-full h-px bg-gray-200 md:hidden" />

          {/* Контактная информация */}
          <div className="">
            <p className="text-sm text-gray-600">
              📍 г. Хабаровск, Улица Знаменщикова, 51
            </p>
            <p className="text-sm text-gray-600">
              🕐 Пн — Пт 10:00–20:00
            </p>
            <p className="text-sm text-gray-600">
              🕐 Сб — Вс 10:00–19:00
            </p>
            <p className="text-sm text-gray-600 font-medium">
              📞 +7 (914) 773-30-03
            </p>
          </div>

          {/* Сегодня c 10:00 до 19:00
          ​Открыто
          Пн — Пт 10:00–20:00
          Сб — Вс
          10:00–19:00 */}

        </div>

        {/* 🔹 Нижняя полоска с копирайтом */}
        <div className="mt-6 pt-4 border-t border-gray-200">
          <p className="text-xs text-gray-400">
            © {new Date().getFullYear()} Салон красоты «Каприз». Все права защищены.
          </p>
        </div>

      </div>
    </footer>
  );
}