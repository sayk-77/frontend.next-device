'use client'

import { Button } from "@/components/ui";
import { useState } from "react";

interface UserInfo {
    firstName: string;
    lastName: string;
    email: string;
}

interface Address {
    id: number;
    addressLine: string;
}

interface Order {
    id: number;
    date: string;
    status: string;
}

interface ProfileProps {
    userInfo: UserInfo;
    addresses: Address[];
    orders: Order[];
}

const mockUserInfo: UserInfo = {
    firstName: "Иван",
    lastName: "Иванов",
    email: "ivan.ivanov@example.com",
};

const mockAddresses: Address[] = [
    { id: 1, addressLine: "Улица Пушкина, дом 1" },
    { id: 2, addressLine: "Улица Лермонтова, дом 2" },
];

const mockOrders: Order[] = [
    { id: 101, date: "2024-10-01", status: "Доставлен" },
    { id: 102, date: "2024-10-05", status: "В обработке" },
    { id: 103, date: "2024-10-10", status: "Отменен" },
];

export default function ProfilePage() {
    const [selectedSection, setSelectedSection] = useState<'info' | 'addresses' | 'orders'>('info');

    const handleSectionChange = (section: 'info' | 'addresses' | 'orders') => setSelectedSection(section);

    return (
        <div className="flex flex-col items-center min-h-screen">
            <div className="bg-white p-8 mt-10 rounded-lg shadow-md w-full max-w-2xl">
                <h2 className="text-2xl font-semibold text-center mb-6">Профиль</h2>

                <div className="flex justify-around mb-6">
                    <button onClick={() => handleSectionChange('info')} className={`px-4 py-2 ${selectedSection === 'info' ? 'text-orange-600 font-semibold border-b-2 border-orange-600' : 'text-gray-600'}`}>
                        Информация
                    </button>
                    <button onClick={() => handleSectionChange('addresses')} className={`px-4 py-2 ${selectedSection === 'addresses' ? 'text-orange-600 font-semibold border-b-2 border-orange-600' : 'text-gray-600'}`}>
                        Мои адреса
                    </button>
                    <button onClick={() => handleSectionChange('orders')} className={`px-4 py-2 ${selectedSection === 'orders' ? 'text-orange-600 font-semibold border-b-2 border-orange-600' : 'text-gray-600'}`}>
                        Мои заказы
                    </button>
                </div>

                <div>
                    {selectedSection === 'info' && (
                        <div className="mb-6">
                            <h3 className="text-xl font-semibold mb-2">Информация о пользователе</h3>
                            <div className="border p-4 rounded-md shadow-sm">
                                <p><span className="font-medium">Имя:</span> {mockUserInfo.firstName}</p>
                                <p><span className="font-medium">Фамилия:</span> {mockUserInfo.lastName}</p>
                                <p><span className="font-medium">Почта:</span> {mockUserInfo.email}</p>
                                <Button variant="link">
                                    Изменить информацию
                                </Button>
                            </div>
                        </div>
                    )}

                    {selectedSection === 'addresses' && (
                        <div className="mb-6">
                            <h3 className="text-xl font-semibold mb-2">Мои адреса</h3>
                            <div className="space-y-2">
                                {mockAddresses.map(address => (
                                    <div key={address.id} className="border p-4 rounded-md shadow-sm">
                                        {address.addressLine}
                                    </div>
                                ))}
                            </div>
                            <Button variant="link">
                                Добавить адрес
                            </Button>
                        </div>
                    )}

                    {selectedSection === 'orders' && (
                        <div className="mb-6">
                            <h3 className="text-xl font-semibold mb-2">Мои заказы</h3>
                            <ul className="space-y-2">
                                {mockOrders.map(order => (
                                    <li key={order.id} className="border p-4 rounded-md shadow-sm">
                                        <p><span className="font-medium">Заказ №:</span> {order.id}</p>
                                        <p><span className="font-medium">Дата:</span> {order.date}</p>
                                        <p><span className="font-medium">Статус:</span> {order.status}</p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
