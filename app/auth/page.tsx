'use client'

import { Button } from '@/components/ui';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function AuthPage() {
    const [isRegister, setIsRegister] = useState(false);

    const toggleAuthMode = () => setIsRegister(!isRegister);
    const router = useRouter()

    return (
        <div className="flex justify-center pt-[100px]">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-2xl font-semibold text-center mb-6">
                    {isRegister ? 'Регистрация' : 'Вход'}
                </h2>
                
                <form className="space-y-4">
                    {isRegister && (
                        <>
                            <div>
                                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                                    Имя
                                </label>
                                <input
                                    type="text"
                                    id="firstName"
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-orange-500"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                                    Фамилия
                                </label>
                                <input
                                    type="text"
                                    id="lastName"
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-orange-500"
                                    required
                                />
                            </div>
                        </>
                    )}
                    
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Электронная почта
                        </label>
                        <input
                            type="email"
                            id="email"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-orange-500"
                            required
                        />
                    </div>
                    
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Пароль
                        </label>
                        <input
                            type="password"
                            id="password"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-orange-500"
                            required
                        />
                    </div>
                    
                    
                    <Button
                        type="submit"
                        className="w-full"
                        onClick={() => router.push('/profile')}
                    >
                        {isRegister ? 'Зарегистрироваться' : 'Войти'}
                    </Button>
                </form>

                <p className="text-sm text-center text-gray-600 mt-4">
                    {isRegister ? 'Уже есть аккаунт?' : 'Нет аккаунта?'}{' '}
                    <Button
                        variant="link"
                        onClick={toggleAuthMode}
                    >
                        {isRegister ? 'Войти' : 'Зарегистрироваться'}
                    </Button>
                </p>
            </div>
        </div>
    );
}