"use client"

// components/ColoredCalendar.tsx
import { useState, useMemo, useEffect } from 'react';

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

interface FreeTimeSlot {
  start: string; // "09:00"
  end: string;   // "12:00"
  available: boolean;
}

// 🔹 Цвета событий
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

// 🔹 Генерация свободных слотов (mock)
const generateFreeSlots = (dateStr: string): FreeTimeSlot[] => {
  const dayOfMonth = new Date(dateStr).getDate();
  return [
    { start: '09:00', end: '11:00', available: dayOfMonth % 3 !== 0 },
    { start: '11:00', end: '13:00', available: dayOfMonth % 2 === 0 },
    { start: '14:00', end: '16:00', available: true },
    { start: '16:00', end: '18:00', available: dayOfMonth % 4 !== 0 },
    { start: '18:00', end: '20:00', available: dayOfMonth < 15 },
  ];
};

export default function ColoredCalendar(props: { setValue: (data: { date: Date; eventType?: EventType }) => void }) {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [openTooltipDay, setOpenTooltipDay] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  const year: number = currentDate.getFullYear();
  const month: number = currentDate.getMonth();

  const daysInMonth: number = new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth: number = new Date(year, month, 1).getDay();

  // 🔹 Определяем мобильное устройство
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // 🔹 Закрытие tooltip при клике вне
  useEffect(() => {
    if (!isMobile || openTooltipDay === null) return;
    
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('[data-calendar-day]')) {
        setOpenTooltipDay(null);
      }
    };
    
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isMobile, openTooltipDay]);

  // 🔹 События для текущего месяца
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
      { id: '7', date: `${currentYear}-${currentMonth}-31`, type: 'meeting', title: 'Ситуация' },
    ];
  }, [year, month]);

  const getEventsForDay = (day: number): CalendarEvent[] => {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return events.filter(event => event.date === dateStr);
  };

  const getFreeSlotsForDay = (day: number): FreeTimeSlot[] => {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return generateFreeSlots(dateStr);
  };

  const isSelected = (day: number): boolean => {
    if (!selectedDate) return false;
    return day === selectedDate.getDate() && month === selectedDate.getMonth() && year === selectedDate.getFullYear();
  };

  const isToday = (day: number): boolean => {
    const today = new Date();
    return day === today.getDate() && month === today.getMonth() && year === today.getFullYear();
  };

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

  const handleDayInteraction = (day: number, eventType?: EventType, e?: React.MouseEvent) => {
    if (isMobile) {
      e?.stopPropagation();
      const freeSlots = getFreeSlotsForDay(day);
      const hasFreeSlots = freeSlots.some(s => s.available);
      
      if (hasFreeSlots && openTooltipDay !== day) {
        setOpenTooltipDay(day);
        return;
      }
      
      setOpenTooltipDay(null);
    }
    
    if (!eventType) {
      console.log('standing');
      return;
    }
    
    const date = new Date(year, month, day);
    props.setValue({ date, eventType });
    setSelectedDate(date);
  };

  const closeTooltip = () => setOpenTooltipDay(null);

  // 🔹 Умное позиционирование tooltip
  const getTooltipPosition = (index: number): { container: string; arrow: string } => {
    const isEdgeLeft = index % 7 === 0;      // Первый столбец (Вс)
    const isEdgeRight = index % 7 === 6;     // Последний столбец (Сб)
    const isTopRow = index < 7;              // Первая строка
    const isBottomRow = index >= 35;         // Последняя строка (5-я неделя)

    // Левый край — показываем справа
    if (isEdgeLeft && !isEdgeRight) {
      return {
        container: 'left-full top-0 ml-2',
        arrow: 'left-full top-4 -translate-x-1/2 border-l-gray-800'
      };
    }
    
    // Правый край — показываем слева
    if (isEdgeRight) {
      return {
        container: 'right-full top-0 mr-2',
        arrow: 'right-full top-4 translate-x-1/2 border-r-gray-800'
      };
    }
    
    // Нижний край — показываем сверху
    if (isBottomRow) {
      return {
        container: 'top-full left-1/2 -translate-x-1/2 mt-2',
        arrow: 'bottom-full left-1/2 -translate-x-1/2 border-b-gray-800'
      };
    }
    
    // По умолчанию — показываем сверху
    return {
      container: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
      arrow: 'top-full left-1/2 -translate-x-1/2 border-t-gray-800'
    };
  };

  const emptyDays: (null | undefined)[] = Array(firstDayOfMonth).fill(null);
  const days: number[] = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const allDays: any[] = [...emptyDays, ...days];

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      {/* 🔹 УБРАЛИ overflow-hidden — tooltip должен выходить за границы */}
      <div className="bg-white rounded-2xl shadow-xl border border-gray-200">
        
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
          {dayNames.map((day) => (
            <div
              key={day}
              className="py-3 text-center text-sm font-semibold text-gray-600"
            >
              <span className="hidden sm:inline">{day}</span>
              <span className="sm:hidden">{day.charAt(0)}</span>
            </div>
          ))}
        </div>

        {/* Дни месяца с умным позиционированием tooltip */}
        <div className="grid grid-cols-7 p-2">
          {/* 🔹 p-2 добавляет отступ чтобы tooltip не прилипал к краю */}
          {allDays.map((day: number | null, index: number) => {
            if (!day) {
              return <div key={`empty-${index}`} className="min-h-[70px] md:min-h-[100px]" />;
            }

            // 🔹 Объявляем ВСЕ переменные перед return
            const dayEvents: CalendarEvent[] = getEventsForDay(day);
            const hasEvents: boolean = dayEvents.length > 0;
            const eventType: EventType | undefined = hasEvents ? dayEvents[0].type : undefined;
            const colors: EventColors[string] | undefined = eventType ? eventColors[eventType] : undefined;
            const selected: boolean = isSelected(day);
            const today: boolean = isToday(day);
            const freeSlots: FreeTimeSlot[] = getFreeSlotsForDay(day);
            const availableSlots: FreeTimeSlot[] = freeSlots.filter((slot: FreeTimeSlot) => slot.available);
            const isTooltipOpen: boolean = isMobile ? openTooltipDay === day : false;
            
            // 🔹 Получаем умную позицию для этого дня
            const tooltipPos = getTooltipPosition(index);

            return (
              // 🔹 Контейнер с group для CSS hover
              <div
                key={day}
                className="relative group"
                data-calendar-day
              >
                <button
                  onClick={(e) => handleDayInteraction(day, eventType, e)}
                  type="button"
                  className={`min-h-[70px] md:min-h-[100px] p-2 border-b border-r border-gray-100 transition relative flex flex-col w-full text-left
                    ${selected
                      ? 'bg-gray-800 text-white'
                      : hasEvents
                        ? `${colors?.light} hover:${colors?.bg} ${colors?.text}`
                        : 'bg-white hover:bg-gray-50 text-gray-700'}
                    ${today && !selected ? 'ring-2 ring-blue-500 ring-inset' : ''}
                    ${index % 7 === 6 ? 'border-r-0' : ''}
                  `}
                >
                  <span className={`text-sm font-medium self-start ${selected ? 'text-white' : ''}`}>
                    {day}
                  </span>
                  
                  {/* Индикатор события */}
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
                  
                  {/* Индикатор сегодня */}
                  {today && !selected && (
                    <span className="absolute top-1 right-1 w-2 h-2 bg-blue-500 rounded-full" />
                  )}

                  {/* Индикатор доступных слотов */}
                  {!selected && availableSlots.length > 0 && (
                    <span className="text-xs text-green-600 mt-1 flex items-center gap-1">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {availableSlots.length}
                    </span>
                  )}
                </button>

                {/* 🔹 Tooltip с умным позиционированием */}
                {availableSlots.length > 0 && (
                  <div
                    className={`absolute ${tooltipPos.container}
                      w-64 p-3 bg-gray-800 text-white text-sm rounded-lg shadow-xl z-[100]
                      transition-all duration-200
                      ${isMobile
                        ? (isTooltipOpen
                          ? 'opacity-100 visible translate-y-0'
                          : 'opacity-0 invisible translate-y-2 pointer-events-none')
                        : 'opacity-0 invisible translate-y-2 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0'
                      }
                    `}
                  >
                    {/* Заголовок tooltip */}
                    <div className="font-semibold mb-2 pb-2 border-b border-gray-700 flex items-center justify-between">
                      <span>{day} {monthNames[month]}</span>
                      {isMobile && (
                        <button
                          type="button"
                          onClick={(e) => { e.stopPropagation(); closeTooltip(); }}
                          className="p-1 hover:bg-gray-700 rounded"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      )}
                    </div>
                    
                    {/* Список слотов */}
                    <div className="space-y-2 max-h-48 overflow-y-auto">
                      {freeSlots.map((slot, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            if (slot.available) {
                              const date = new Date(year, month, day);
                              props.setValue({ date, eventType });
                              setSelectedDate(date);
                              if (isMobile) closeTooltip();
                            }
                          }}
                          disabled={!slot.available}
                          className={`w-full flex items-center justify-between px-3 py-2 rounded text-left
                            ${slot.available
                              ? 'bg-green-600/30 hover:bg-green-600/50 text-green-100 cursor-pointer'
                              : 'bg-gray-700/50 text-gray-400 cursor-not-allowed'}`}
                        >
                          <span className="text-xs font-mono">
                            {slot.start} - {slot.end}
                          </span>
                          {slot.available ? (
                            <span className="text-xs font-medium text-green-300 flex items-center gap-1">
                              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                              Выбрать
                            </span>
                          ) : (
                            <span className="text-xs">Занято</span>
                          )}
                        </button>
                      ))}
                    </div>
                    
                    {/* 🔹 Стрелочка с умной позицией */}
                    <div className={`absolute ${tooltipPos.arrow} border-4 border-transparent`} />
                  </div>
                )}
              </div>
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