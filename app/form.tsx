"use client"
import { useState } from 'react';
// components/HookForm.jsx
import { useForm } from 'react-hook-form';
import HookFormCalendar from './calendar';
import dayjs from 'dayjs';
import 'dayjs/locale/ru';
dayjs.locale('ru');


export default function HookForm() {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { isSubmitting },
  } = useForm({

    defaultValues: {
      service: '',
      // bot_name: '',
      // token: "8793190049:AAGCfP_gmNH1GVssWSZt2KeB4ApjMQmpRoc",
      date: '',
      time: '',
    }
  });

  const tyypes = ['init', 'addedServiceType', 'addDate'];

  const [state, setState] = useState(tyypes[0]);

  const date: string = watch('date');
  const time: string = watch('time');


  const service: string = watch('service');

  // Валидация с правилами
  const onSubmit = async (data: any) => {
    try {
      // Имитация API запроса
      // await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Submitted:', JSON.stringify(data, null, 2));
      alert('ok');
      // alert('✅ Форма отправлена!');
      // reset();
    } catch (error) {
      console.error('Error:', error);
      alert('❌ Ошибка отправки');
    }
  };

  // Наблюдение за полем (для подтверждения пароля)
  // const password = watch('password');

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md space-y-5">
      <h2 className="text-2xl font-bold text-gray-800 m-0">
        Запись
        {/* <div>usernameValue: {dayjs(date).format('DD.MM.YYYY')}</div> */}

      </h2>

      <table className='min-w-full bg-white border-collapse border border-slate-1000'>
        <tbody>
          <tr className="hover:bg-gray-50 transition">
            <th className='px-1 py-1  text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>state</th>
            <td className='px-1 py-1  whitespace-nowrap text-sm text-gray-900"'>{state}</td>
          </tr>

          {service && <tr className="hover:bg-gray-50 transition">
            <td className='px-1 py-1  text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Услуга:</td>
            <td className='px-1 py-1  whitespace-nowrap text-sm text-gray-900"'>{service}</td>
          </tr>}

          {/* {service && } */}

          {date && <tr className="hover:bg-gray-50 transition">
            <td className='px-1 py-1  text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Дата:</td>
            <td className='px-1 py-1  whitespace-nowrap text-sm text-gray-900"'>{dayjs(date).isValid() && dayjs(date).format('DD.MM.YYYY')}</td>
          </tr>}

          {/* {service && } */}

          {time && <tr className="hover:bg-gray-50 transition">
            <td className='px-1 py-1  text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Время:</td>
            <td className='px-1 py-1  whitespace-nowrap text-sm text-gray-900"'>{dayjs(time).isValid() && <>{dayjs(time).format('HH:mm')}</>}</td>
          </tr>}

          {/* {date && } */}
        </tbody>
      </table>

      {(() => {
        if (state === 'addDate') {
          return <>
            <div className="">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 text-white py-1 px-1  rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Отправка...
                  </>
                ) : (
                  'Сохранить заявку'
                )}
              </button>
              <div style={{ height: 5 }}></div>
              <button
                type="button"
                disabled={isSubmitting}
                onClick={() => {
                  window.location.reload();
                }}
                className="w-full outline-solid outline-red-300 text-red-500 py-1 px-1  rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                Заново
              </button>
            </div>
          </>
        }
        if (state === 'addedServiceType') {
          return <>
            Выберите подходящую дату и время
            <HookFormCalendar getDateTime={(value: any) => {
              setValue('date', value);
              setValue('time', value);
              setState('addDate');

            }} />
          </>
        }
        if (state === 'init') {
          return (function BasicSelect() {
            const options = [
              { value: '', label: 'Выберите услугу' },
              { value: 'cut_women', label: 'Стрижка женская' },
              { value: 'cut_men', label: 'Стрижка мужская' }
            ];

            return <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Услуга
                </label>
                <select {...register('service')}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                  defaultValue=""
                >
                  {options.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>

                <div className='mt-2'></div>
                <button
                  type="button"
                  // disabled={isSubmitting}
                  onClick={() => {
                    if (!service) return;
                    setState('addedServiceType')
                  }}
                  className="w-full bg-blue-600 text-white py-1 px-1  rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Отправка...
                    </>
                  ) : (
                    'Дальше'
                  )}
                </button>
              </div>
            </>
          })()
        }
        return <>No content...</>
      })()}


      {/* Кнопка отправки */}

      {/* <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-blue-600 text-white py-1 px-1  rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
      >
        {isSubmitting ? (
          <>
            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Отправка...
          </>
        ) : (
          'Дальше'
        )}
      </button> */}
    </form>
  );
}