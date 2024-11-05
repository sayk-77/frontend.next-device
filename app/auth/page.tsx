'use client'

import { useState } from 'react';
import { Button } from '@/components/ui';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { useAuthStore } from '@/store/authStore';

const API_URL = process.env.NEXT_PUBLIC_API_URL

export default function AuthPage() {
    const [isRegister, setIsRegister] = useState(false);
    const [formData, setFormData] = useState({ email: '', password: '', firstName: '', lastName: '' });
    const [error, setError] = useState('');
    const router = useRouter();
    const { login } = useAuthStore();

    const toggleAuthMode = () => setIsRegister(!isRegister);

    const handleInputChange = (e: { target: { id: any; value: any; }; }) => {
        const { id, value } = e.target;
        setFormData({ ...formData, [id]: value });
    };

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        
        const url = isRegister ? 'Register' : 'Login';

        try {
            const response = await axios.post(`${API_URL}/${url}`, formData);
            if (response.status === 200) {
                localStorage.setItem("token", response.data.user.token);
                login();
                router.push('/profile');
                setError('');
            }
        } catch (error) {
            console.error('Ошибка при отправке данных:', error);
            setError('Неверные данные'); 
        }
    };

    return (
        <div className="flex justify-center pt-[100px]">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-2xl font-semibold text-center mb-6">
                    {isRegister ? 'Регистрация' : 'Вход'}
                </h2>
                
                <form className="space-y-4" onSubmit={handleSubmit}>
                    {isRegister && (
                        <>
                            <div>
                                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                                    Имя
                                </label>
                                <input
                                    type="text"
                                    id="firstName"
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                                    required
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div>
                                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                                    Фамилия
                                </label>
                                <input
                                    type="text"
                                    id="lastName"
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                                    required
                                    onChange={handleInputChange}
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
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                            required
                            onChange={handleInputChange}
                        />
                    </div>
                    
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Пароль
                        </label>
                        <input
                            type="password"
                            id="password"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                            required
                            onChange={handleInputChange}
                        />
                    </div>
                    
                    <Button type="submit" className="w-full">
                        {isRegister ? 'Зарегистрироваться' : 'Войти'}
                    </Button>

                    {error && (
                        <p className="text-red-500 text-sm text-center mt-4">
                            {error}
                        </p>
                    )}
                </form>

                <p className="text-sm text-center text-gray-600 mt-4">
                    {isRegister ? 'Уже есть аккаунт?' : 'Нет аккаунта?'}{' '}
                    <Button variant="link" onClick={toggleAuthMode}>
                        {isRegister ? 'Войти' : 'Зарегистрироваться'}
                    </Button>
                </p>
            </div>
        </div>
    );
}