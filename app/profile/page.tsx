'use client';

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
    const [showEditInfoModal, setShowEditInfoModal] = useState(false);
    const [showAddAddressModal, setShowAddAddressModal] = useState(false);
    const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);

    const [userInfo, setUserInfo] = useState(mockUserInfo);
    const [editableUserInfo, setEditableUserInfo] = useState(userInfo);
    const [newAddress, setNewAddress] = useState("");
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [oldPasswordError, setOldPasswordError] = useState("");
    const [formErrors, setFormErrors] = useState({ firstName: "", lastName: "", email: "" });

    const handleSectionChange = (section: 'info' | 'addresses' | 'orders') => setSelectedSection(section);

    const validateForm = () => {
        const errors = { firstName: "", lastName: "", email: "" };

        if (!editableUserInfo.firstName) errors.firstName = "Имя обязательно";
        if (!editableUserInfo.lastName) errors.lastName = "Фамилия обязательна";
        if (!editableUserInfo.email || !/\S+@\S+\.\S+/.test(editableUserInfo.email)) errors.email = "Неверный формат почты";

        setFormErrors(errors);
        return !errors.firstName && !errors.lastName && !errors.email;
    };

    const validatePassword = () => {
        let isValid = true;

        if (oldPassword === "") {
            setOldPasswordError("Введите текущий пароль");
            isValid = false;
        } else {
            setOldPasswordError("");
        }

        if (newPassword.length < 8 || !/\d/.test(newPassword) || !/[a-zA-Z]/.test(newPassword)) {
            setPasswordError("Пароль должен содержать минимум 8 символов, включая буквы и цифры");
            isValid = false;
        } else {
            setPasswordError("");
        }

        return isValid;
    };

    const handleSaveInfo = () => {
        if (validateForm()) {
            setUserInfo(editableUserInfo);
            setShowEditInfoModal(false);
        }
    };

    const handleSaveAddress = () => {
        mockAddresses.push({ id: mockAddresses.length + 1, addressLine: newAddress });
        setShowAddAddressModal(false);
        setNewAddress("");
    };

    const handleSavePassword = () => {
        if (validatePassword()) {
            setShowChangePasswordModal(false);
            setOldPassword("");
            setNewPassword("");
        }
    };

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
                                <p><span className="font-medium">Имя:</span> {userInfo.firstName}</p>
                                <p><span className="font-medium">Фамилия:</span> {userInfo.lastName}</p>
                                <p><span className="font-medium">Почта:</span> {userInfo.email}</p>
                                <Button onClick={() => {
                                    setShowEditInfoModal(true);
                                    setEditableUserInfo(userInfo)
                                }} variant="link">
                                    Изменить информацию
                                </Button>
                                <Button onClick={() => setShowChangePasswordModal(true)} variant="link" className="mt-2">
                                    Изменить пароль
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
                            <Button onClick={() => setShowAddAddressModal(true)} variant="link">
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

            {showEditInfoModal && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
                        <h3 className="text-xl font-semibold mb-4">Редактировать информацию</h3>
                        <input
                            type="text"
                            placeholder="Имя"
                            value={editableUserInfo.firstName}
                            onChange={(e) => setEditableUserInfo({ ...editableUserInfo, firstName: e.target.value })}
                            className="w-full p-2 mb-2 border rounded"
                        />
                        {formErrors.firstName && <p className="text-red-500 text-sm">{formErrors.firstName}</p>}
                        <input
                            type="text"
                            placeholder="Фамилия"
                            value={editableUserInfo.lastName}
                            onChange={(e) => setEditableUserInfo({ ...editableUserInfo, lastName: e.target.value })}
                            className="w-full p-2 mb-2 border rounded"
                        />
                        {formErrors.lastName && <p className="text-red-500 text-sm">{formErrors.lastName}</p>}
                        <input
                            type="email"
                            placeholder="Почта"
                            value={editableUserInfo.email}
                            onChange={(e) => setEditableUserInfo({ ...editableUserInfo, email: e.target.value })}
                            className="w-full p-2 mb-2 border rounded"
                        />
                        {formErrors.email && <p className="text-red-500 text-sm">{formErrors.email}</p>}
                        <div className="flex justify-end space-x-2">
                            <Button onClick={handleSaveInfo}>Сохранить</Button>
                            <Button onClick={() => setShowEditInfoModal(false)} variant="outline">Отменить</Button>
                        </div>
                    </div>
                </div>
            )}

            {showAddAddressModal && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
                        <h3 className="text-xl font-semibold mb-4">Добавить адрес</h3>
                        <input
                            type="text"
                            placeholder="Новый адрес"
                            value={newAddress}
                            onChange={(e) => setNewAddress(e.target.value)}
                            className="w-full p-2 mb-2 border rounded"
                        />
                        <div className="flex justify-end space-x-2">
                            <Button onClick={handleSaveAddress}>Сохранить</Button>
                            <Button onClick={() => setShowAddAddressModal(false)} variant="outline">Отменить</Button>
                        </div>
                    </div>
                </div>
            )}

            {showChangePasswordModal && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
                        <h3 className="text-xl font-semibold mb-4">Изменить пароль</h3>
                        <input
                            type="password"
                            placeholder="Старый пароль"
                            value={oldPassword}
                            onChange={(e) => setOldPassword(e.target.value)}
                            className="w-full p-2 mb-2 border rounded"
                        />
                        {oldPasswordError && <p className="text-red-500 text-sm">{oldPasswordError}</p>}
                        <input
                            type="password"
                            placeholder="Новый пароль"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="w-full p-2 mb-2 border rounded"
                        />
                        {passwordError && <p className="text-red-500 text-sm">{passwordError}</p>}
                        <div className="flex justify-end space-x-2">
                            <Button onClick={handleSavePassword}>Сохранить</Button>
                            <Button onClick={() => setShowChangePasswordModal(false)} variant="outline">Отменить</Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
