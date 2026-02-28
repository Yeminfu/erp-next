// components/ColoredCalendar.tsx
import { useState, useMemo } from 'react';

// 🔹 Типы
interface CalendarEvent {
  id: string;
  date: string; // YYYY-MM-DD
  type: EventType;
  title: string;
}

type EventType = 'meeting' | 'deadline' | 'holiday' | 'birthday' | 'vacation';

interface EventColors {
  [key: string]: {
    bg: string;
    light: string;
    text: string;
  };
}

// 🔹 Цвета событий (яркие, чтобы было видно)
const eventColors: EventColors = {
  meeting: { bg: 'bg-blue-500', light: 'bg-blue-200', text: 'text-blue-900' },
  deadline: { bg: 'bg-red-500', light: 'bg-red-200', text: 'text-red-900' },
  holiday: { bg: 'bg-green-500', light: 'bg-green-200', text: 'text-green-900' },
  birthday: { bg: 'bg-purple-500', light: 'bg-purple-200', text: 'text-purple-900' },
  vacation: { bg: 'bg-orange-500', light: 'bg-orange-200', text: 'text-orange-900' },
};

const monthNames: string[] = [
  'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
  'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
];

const dayNames: string[] = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];

export default function ColoredCalendar() {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null); // ✅ null по умолчанию

  const year: number = currentDate.getFullYear();
  const month: number = currentDate.getMonth();

  const daysInMonth: number = new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth: number = new Date(year, month, 1).getDay();

  // 🔹 Генерируем события для ТЕКУЩЕГО месяца (чтобы было видно заливку)
  const events: CalendarEvent[] = useMemo(() => {
    const currentMonth = String(month + 1).padStart(2, '0');
    const currentYear = String(year);

    return [
      { id: '1', date: `${currentYear}-${currentMonth}-03`, type: 'meeting', title: 'Встреча' },
      { id: '2', date: `${currentYear}-${currentMonth}-05`, type: 'deadline', title: 'Дедлайн' },
      { id: '3', date: `${currentYear}-${currentMonth}-10`, type: 'holiday', title: 'Праздник' },
      { id: '4', date: `${currentYear}-${currentMonth}-15`, type: 'birthday', title: 'День рождения' },
      { id: '5', date: `${currentYear}-${currentMonth}-20`, type: 'vacation', title: 'Отпуск' },
      { id: '6', date: `${currentYear}-${currentMonth}-25`, type: 'meeting', title: 'Презентация' },
    ];
  }, [year, month]);

  // 🔹 Получить события для дня
  const getEventsForDay = (day: number): CalendarEvent[] => {
    const dateStr: string = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return events.filter((event: CalendarEvent) => event.date === dateStr);
  };

  // 🔹 Проверка выбранной даты
  const isSelected = (day: number): boolean => {
    if (!selectedDate) return false;
    return (
      day === selectedDate.getDate() &&
      month === selectedDate.getMonth() &&
      year === selectedDate.getFullYear()
    );
  };

  // 🔹 Проверка сегодняшнего дня
  const isToday = (day: number): boolean => {
    const today: Date = new Date();
    return (
      day === today.getDate() &&
      month === today.getMonth() &&
      year === today.getFullYear()
    );
  };

  // 🔹 Навигация
  const prevMonth = (): void => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const nextMonth = (): void => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  // 🔹 Клик по дате
  const handleDateClick = (day: number): void => {
    setSelectedDate(new Date(year, month, day));
  };

  // 🔹 Массивы дней
  const emptyDays: (null | undefined)[] = Array(firstDayOfMonth).fill(null);
  const days: number[] = Array.from({ length: daysInMonth }, (_, i: number) => i + 1);
  const allDays: any[] = [...emptyDays, ...days];

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">

        {/* Заголовок */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={prevMonth}
              type="button"
              className="p-2 bg-white/20 hover:bg-white/30 rounded-lg transition text-white"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <h2 className="text-xl font-bold text-white">
              {monthNames[month]} {year}
            </h2>

            <button
              onClick={nextMonth}
              type="button"
              className="p-2 bg-white/20 hover:bg-white/30 rounded-lg transition text-white"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Дни недели */}
        <div className="grid grid-cols-7 bg-gray-50 border-b border-gray-200">
          {dayNames.map((day: string) => (
            <div key={day} className="py-3 text-center text-sm font-semibold text-gray-600">
              <span className="hidden sm:inline">{day}</span>
              <span className="sm:hidden">{day.charAt(0)}</span>
            </div>
          ))}
        </div>

        {/* Дни месяца */}
        <div className="grid grid-cols-7">
          {allDays.map((day: number | null, index: number) => {
            if (!day) {
              return <div key={`empty-${index}`} className="min-h-[70px] md:min-h-[100px]" />;
            }

            const dayEvents: CalendarEvent[] = getEventsForDay(day);
            const hasEvents: boolean = dayEvents.length > 0;
            const eventType: EventType | undefined = hasEvents ? dayEvents[0].type : undefined;
            const colors: EventColors[string] | undefined = eventType ? eventColors[eventType] : undefined;

            const selected: boolean = isSelected(day);
            const today: boolean = isToday(day);

            return (
              <button
                key={day}
                onClick={() => handleDateClick(day)}
                type="button"
                className={`min-h-[70px] md:min-h-[100px] p-2 border-b border-r border-gray-100 transition relative flex flex-col
                  ${hasEvents
                    ? `${colors?.light} hover:${colors?.bg} ${colors?.text}`  // ✅ Цветная заливка
                    : 'bg-white hover:bg-gray-50 text-gray-700'}  // ✅ Обычный день
                  ${today && !selected ? 'ring-2 ring-blue-500 ring-inset' : ''}
                  ${index % 7 === 6 ? 'border-r-0' : ''}
                `}
              >
                <span className={`text-sm font-medium self-start }`}>
                  {day}
                </span>

                {/* ✅ Индикатор события */}
                {hasEvents && !selected && (
                  <>
                    <div className={`mt-1 w-full h-1.5 rounded ${colors?.bg}`} />
                    <span className="text-xs mt-1 truncate max-w-full">
                      {dayEvents[0].title}
                    </span>
                    {dayEvents.length > 1 && (
                      <span className="text-xs text-gray-500">+{dayEvents.length - 1}</span>
                    )}
                  </>
                )}

                {/* ✅ Индикатор сегодня */}
                {today && !selected && (
                  <span className="absolute top-1 right-1 w-2 h-2 bg-blue-500 rounded-full" />
                )}
              </button>
            );
          })}
        </div>

        {/* Легенда */}
        <div className="px-4 py-4 bg-gray-50 border-t border-gray-200">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">События:</h3>
          <div className="flex flex-wrap gap-3">
            {Object.entries(eventColors).map(([type, colors]: [string, EventColors[string]]) => (
              <div key={type} className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded ${colors.bg}`} />
                <span className="text-sm text-gray-600">
                  {type === 'meeting' && 'Встреча'}
                  {type === 'deadline' && 'Дедлайн'}
                  {type === 'holiday' && 'Праздник'}
                  {type === 'birthday' && 'День рождения'}
                  {type === 'vacation' && 'Отпуск'}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Выбранная дата */}
        {selectedDate && (
          <div className="px-4 py-4 bg-blue-50 border-t border-blue-200">
            <p className="text-sm text-gray-600">
              Выбрано:{' '}
              <span className="font-semibold text-gray-800">
                {selectedDate.toLocaleDateString('ru-RU', {
                  weekday: 'long',
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric'
                })}
              </span>
            </p>
            <button
              type="button"
              onClick={() => setSelectedDate(null)}
              className="mt-2 text-sm text-blue-600 hover:text-blue-800"
            >
              Снять выделение
            </button>
          </div>
        )}
      </div>
    </div>
  );
}