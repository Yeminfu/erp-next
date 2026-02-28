"use client"
// components/HookForm.jsx
import { useForm } from 'react-hook-form';

export default function HookForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch
  } = useForm({
    defaultValues: {
      bot_name: '',
      token: "8793190049:AAGCfP_gmNH1GVssWSZt2KeB4ApjMQmpRoc",
      // username: '',
      // email: '',
      // password: '',
      // confirmPassword: '',
      // plan: 'basic'
    }
  });

  // Валидация с правилами
  const onSubmit = async (data: any) => {
    try {
      // Имитация API запроса
      // await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Submitted:', data);
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
      <h2 className="text-2xl font-bold text-gray-800 text-center">
        Запись
      </h2>

      {/* Имя */}
      {/* <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Название *
        </label>
        <input
          {...register('bot_name', {
            required: 'Имя обязательно',
            minLength: { value: 2, message: 'Минимум 2 символа' },
            maxLength: { value: 50, message: 'Максимум 50 символов' }
          })}
          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none ${errors.bot_name ? 'border-red-500' : 'border-gray-300'
            }`}
        />
        {errors.bot_name && (
          <p className="mt-1 text-sm text-red-600">{errors.bot_name.message}</p>
        )}
      </div> */}

      {(function BasicSelect() {
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
            <select {...register('bot_name')}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
              defaultValue=""
            >
              {options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </>

        return (
          <div className="max-w-md mx-auto p-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Тариф
            </label>
            <select {...register('bot_name')}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
              defaultValue=""
            >
              {options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        );
      })()}

      {/* username */}
      {/* <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          username *
        </label>
        <input
          {...register('username', {
            required: 'username обязательно',
            minLength: { value: 2, message: 'Минимум 2 символа' },
            maxLength: { value: 50, message: 'Максимум 50 символов' }
          })}
          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none ${errors.username ? 'border-red-500' : 'border-gray-300'
            }`}
        />
        {errors.username && (
          <p className="mt-1 text-sm text-red-600">{errors.username.message}</p>
        )}
      </div> */}

      {/* Email */}
      {/* <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          token *
        </label>
        <input
          {...register('token', {
            required: 'token обязателен',
            // pattern: {
            //   value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            //   message: 'Некорректный token'
            // }
          })}
          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none ${errors.token ? 'border-red-500' : 'border-gray-300'
            }`}
          placeholder="you@example.com"
        />
        {errors.token && (
          <p className="mt-1 text-sm text-red-600">{errors.token.message}</p>
        )}
      </div> */}

      {/* Пароль + Подтверждение */}
      {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Пароль *
          </label>
          <input
            type="password"
            {...register('password', {
              required: 'Пароль обязателен',
              minLength: { value: 6, message: 'Минимум 6 символов' }
            })}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none ${errors.password ? 'border-red-500' : 'border-gray-300'
              }`}
          />
          {errors.password && (
            <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Подтвердите пароль *
          </label>
          <input
            type="password"
            {...register('confirmPassword', {
              required: 'Подтвердите пароль',
              validate: value =>
                value === password || 'Пароли не совпадают'
            })}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
              }`}
          />
          {errors.confirmPassword && (
            <p className="mt-1 text-sm text-red-600">{errors.confirmPassword.message}</p>
          )}
        </div>
      </div> */}

      {/* Выбор тарифа */}
      {/* <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Тариф
        </label>
        <div className="grid grid-cols-3 gap-3">
          {['basic', 'pro', 'enterprise'].map((plan) => (
            <label key={plan} className="relative">
              <input
                type="radio"
                value={plan}
                {...register('plan')}
                className="sr-only peer"
              />
              <div className={`p-3 border-2 rounded-xl text-center cursor-pointer transition
                ${errors.plan ? 'border-red-300' : 'border-gray-200'}
                peer-checked:border-blue-500 peer-checked:bg-blue-50 hover:border-blue-300
              `}>
                <span className="text-sm font-medium capitalize">{plan}</span>
                <div className="text-lg font-bold text-gray-900 mt-1">
                  {plan === 'basic' ? '990₽' : plan === 'pro' ? '1990₽' : '4990₽'}
                </div>
              </div>
            </label>
          ))}
        </div>
        {errors.plan && (
          <p className="mt-2 text-sm text-red-600">{errors.plan.message}</p>
        )}
      </div> */}

      {/* Кнопка отправки */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
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
    </form>
  );
}