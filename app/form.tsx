"use client"
import { Fragment, useState } from 'react';
// components/HookForm.jsx
import { useForm } from 'react-hook-form';
import HookFormCalendar from './calendar';
import dayjs from 'dayjs';
import 'dayjs/locale/ru';
dayjs.locale('ru');



// components/InfoGrid.tsx
interface InfoRow {
  label: string;
  value: string;
}

const services = [

  { value: 'cut_women', label: 'Стрижка женская' },
  { value: 'cut_men', label: 'Стрижка мужская' }
];



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

  console.log(services.find(s => s.value === service)?.label);


  const infoData: InfoRow[] = [
    // { label: 'state', value: 'addDate' },
    {
      //@ts-ignore
      label: 'Услуга', value: services.find(s => s.value === service)?.label
    },
    { label: 'Дата:', value: dayjs(date).format('DD.MM.YYYY') },
    { label: 'Время:', value: dayjs(date).format('HH.mm') },
  ];

  // Наблюдение за полем (для подтверждения пароля)
  // const password = watch('password');

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-lg mx-auto p-6 bg-white rounded-lg space-y-5">
      {/* <h2 className="text-2xl font-bold text-gray-800">
        Запись
      </h2> */}



      {(() => {
        if (state === 'addDate') {
          return <>
            <div className="">

              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-1 py-2">
                <h2 className="text-md font-bold text-white flex items-center gap-2">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Подтвердите запись
                </h2>
              </div>

              <div style={{ height: 20 }}></div>


              <InfoGrid infoData={infoData} />

              <div style={{ height: 20 }}></div>

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
                  'Подтвердить'
                )}
              </button>
              <div style={{ height: 10 }}></div>
              <button
                type="button"
                disabled={isSubmitting}
                onClick={() => {
                  window.location.reload();
                }}
                className="w-full outline-solid outline-red-300 text-red-500 py-1 px-1  rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                Отмена
              </button>
            </div>
          </>
        }
        if (state === 'addedServiceType') {
          return <>
            {/* <label className="block text-sm font-medium text-gray-700 mb-1">
              Выберите подходящую дату и время
            </label> */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-1 py-2">
              <h2 className="text-md font-bold text-white flex items-center gap-2">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Выберите дату и время
              </h2>
            </div>
            <HookFormCalendar getDateTime={(value: any) => {
              setValue('date', value);
              setValue('time', value);
              setState('addDate');

            }} />
          </>
        }
        if (state === 'init') {
          return (function BasicSelect() {
            return <>
              <div>
                {/* <label className="block text-sm font-medium text-gray-700 mb-1">
                  Услуга
                </label> */}
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-1 py-2">
                  <h2 className="text-md font-bold text-white flex items-center gap-2">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Запись онлайн
                  </h2>
                </div>

                <div style={{ height: 40 }} />

                <select {...register('service')}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                  defaultValue=""
                >
                  {[
                    { value: '', label: 'Выберите услугу' },
                    ...services
                  ].map((option) => (
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



export function InfoGrid(props: { infoData: InfoRow[] }) {
  return (
    <div className="w-full">
      {/* 🔹 Grid контейнер */}
      <div className="grid grid-cols-[max-content_1fr] bg-white border-collapse border border-slate-200">

        {props.infoData.map((row, index) => (
          <Fragment key={`${row.label}-label`}>
            {/*  */}
            {/* Левая колонка — ширина по контенту */}
            <div

              className={`px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider
                ${index === 0 ? 'bg-white' : 'bg-gray-50'}
                hover:bg-gray-50 transition`}
            >
              {row.label}
            </div>

            {/* Правая колонка — оставшаяся ширина */}
            <div
              className={`px-4 py-2 whitespace-nowrap text-sm text-gray-900
                ${index === 0 ? 'bg-white' : 'bg-gray-50'}
                hover:bg-gray-50 transition`}
            >
              {row.value}
            </div>
          </Fragment>
        ))}

      </div>
    </div>
  );
}