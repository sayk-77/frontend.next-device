'use client';

import OrderModal from "@/components/shared/orderModal";
import { Button } from "@/components/ui";
import axios from 'axios';
import { Delete, Trash2 } from "lucide-react";
import { headers } from "next/headers";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const token = typeof window !== 'undefined' ? localStorage.getItem("token") : null;

const orderStatusDictionary = {
    "pending": "В ожидании",
    "shipped": "Отгружен",
    "delivered": "Доставлен",
    "canceled": "Отменен",
};

const saveUserInfo = async (userInfo: UserInfo) => {
    try {
    console.log(userInfo)
        const response = await axios.put(`${API_URL}/user/update`, 
            {
                firstName: userInfo.firstName,
                lastName: userInfo.lastName,
                email: userInfo.email
            },{
                headers: {
                    Authorization: `Bearer ${token}`
            }})
        toast.success(response.data) 
    } catch (err) {
        console.log(err)
    }
}

const changePassword = async (oldPassword: string, newPassword: string) => {
    try {
        const response = await axios.put(`${API_URL}/user/password`,
            {
                oldPassword: oldPassword,
                newPassword: newPassword
            },{
                headers: {
                    Authorization: `Bearer ${token}`
            }})
        toast.success(response.data)
    } catch (err) {
        console.log(err)
    }
}

const addNewAddress = async (newAddress: Address) => {
    try {
        const response = await axios.post(`${API_URL}/user/address`, 
            {
                country: newAddress.country,
                city: newAddress.city,
                street: newAddress.street,
                postalCode: newAddress.postalCode
            },{
                headers: {
                    Authorization: `Bearer ${token}`
            }})
        toast.success(response.data)
    } catch (err) {
        console.log(err)
    }
}

export default function ProfilePage() {
    const [selectedSection, setSelectedSection] = useState<'info' | 'addresses' | 'orders'>('info');
    const [showEditInfoModal, setShowEditInfoModal] = useState(false);
    const [showAddAddressModal, setShowAddAddressModal] = useState(false);
    const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
    const [userInfo, setUserInfo] = useState<UserInfo>({
        firstName: '',
        lastName: '',
        email: ''
    });
    const [addresses, setAddresses] = useState<Address[]>([]);
    const [orders, setOrders] = useState<Order[]>([]);

    const [editableUserInfo, setEditableUserInfo] = useState<UserInfo>({
        firstName: '',
        lastName: '',
        email: ''
    });
    const [newAddress, setNewAddress] = useState<Address>({
        id: 0,
        country: '',
        city: '',
        street: '',
        postalCode: '',
    });
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [oldPasswordError, setOldPasswordError] = useState("");
    const [formErrors, setFormErrors] = useState({ firstName: "", lastName: "", email: "" });
    const [isModalOpen, setModalOpen] = useState(false);
    const [selectedOrderId, setSelectedOrderId] = useState<number | null>(null);
    
    const deleteAddress = async (id: number) => {
        try {
            const response = await axios.delete(`${API_URL}/user/address/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            setAddresses(addresses.filter(addr => addr.id !== id));
            toast.success(response.data)
        } catch (err) {
            console.log(err)
        }
    }
    
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get(`${API_URL}/user`, {
                    headers: {
                        Authorization: `Bearer ${token}`, 
                    }
                });
                const { user } = response.data;

                setUserInfo({
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                });
                setAddresses(user.addresses.map((addr: any) => ({
                    id: addr.id,
                    country: addr.country,
                    city: addr.city,
                    street: addr.street,
                    postalCode: addr.postalCode
                })));
                setOrders(user.orders.map((order: any) => ({
                    id: order.id,
                    createdAt: order.createdAt,
                    totalPrice: order.totalPrice,
                    status: order.status,
                })));
            } catch (error) {
                console.error("Ошибка при загрузке данных пользователя:", error);
            }
        };

        fetchUserData();
    }, []);

    const handleSectionChange = (section: 'info' | 'addresses' | 'orders') => setSelectedSection(section);

    const validateForm = () => {
        const errors = { firstName: "", lastName: "", email: "" };
        if (!editableUserInfo?.firstName) errors.firstName = "Имя обязательно";
        if (!editableUserInfo?.lastName) errors.lastName = "Фамилия обязательна";
        if (!editableUserInfo?.email || !/\S+@\S+\.\S+/.test(editableUserInfo.email)) errors.email = "Неверный формат почты";
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
        if (validateForm() && editableUserInfo) {
            saveUserInfo(editableUserInfo)
            setUserInfo(editableUserInfo);
            setShowEditInfoModal(false);
        }
    };

    const handleSaveAddress = () => {
        if (newAddress.country && newAddress.city && newAddress.street && newAddress.postalCode) {
            addNewAddress(newAddress)
            setAddresses([...addresses, { ...newAddress, id: addresses.length + 1 }]);
            setShowAddAddressModal(false);
            setNewAddress({ id: 0, country: '', city: '', street: '', postalCode: '' });
        }
    };

    const handleSavePassword = () => {
        if (validatePassword()) {
            changePassword(oldPassword, newPassword)    
            setShowChangePasswordModal(false);
            setOldPassword("");
            setNewPassword("");
        }
    };
    
    const openModal = (orderId: number) => {
        setSelectedOrderId(orderId);
        setModalOpen(true);
      };
    
      const closeModal = () => {
        setModalOpen(false);
        setSelectedOrderId(null);
      };

    return (
        <div className="flex flex-col items-center">
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
                    {selectedSection === 'info' && userInfo && (
                        <div className="mb-6">
                            <h3 className="text-xl font-semibold mb-2">Информация о пользователе</h3>
                            <div className="border p-4 rounded-md shadow-sm">
                                <p><span className="font-medium">Имя:</span> {userInfo.firstName}</p>
                                <p><span className="font-medium">Фамилия:</span> {userInfo.lastName}</p>
                                <p><span className="font-medium">Почта:</span> {userInfo.email}</p>
                                <Button onClick={() => { setShowEditInfoModal(true); setEditableUserInfo(userInfo); }} variant="link">
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
                            {addresses.map(addr => (
                                <div key={addr.id} className="border p-4 mt-[10px] rounded-md shadow-sm flex justify-between items-center">
                                    <span>
                                        {`${addr.country}, г.${addr.city}, ул.${addr.street}, ${addr.postalCode}`}
                                    </span>
                                    <button onClick={() => deleteAddress(addr.id)}>
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            ))}
                            <Button onClick={() => setShowAddAddressModal(true)} variant="link">
                                Добавить адрес
                            </Button>
                        </div>
                    )}

                    {selectedSection === 'orders' && (
                        <div className="mb-6">
                            <h3 className="text-xl font-semibold mb-2">Мои заказы</h3>
                            <ul className="space-y-2">
                            {orders.length > 0 ? orders.map(order => {
                                const formattedDate = new Date(order.createdAt).toISOString().split('T')[0];
                            
                                return (
                                    <li key={order.id} className="border p-6 rounded-lg shadow-md bg-white hover:shadow-lg transition-shadow duration-300 ease-in-out">
                                      <div className="flex justify-between items-center mb-2">
                                        <h3 className="text-lg font-semibold text-gray-700">Заказ № {order.id}</h3>
                                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${order.status === 'delivered' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                                          {orderStatusDictionary[order.status] || order.status}
                                        </span>
                                      </div>
                                      <div className="text-gray-500 mb-2">
                                        <p><span className="font-medium text-gray-700">Дата:</span> {formattedDate}</p>
                                        <p><span className="font-medium text-gray-700">Оплачено:</span> {order.totalPrice} р.</p>
                                      </div>
                                      <div className="flex justify-end mt-4">
                                      <Button variant="link" onClick={() => openModal(order.id)}>
                                          Подробней
                                      </Button>
                                      </div>
                                    </li>
                                );
                            }) : (<div>У вас еще нет заказов</div>)}
                            </ul>
                        </div>
                    )}
                    {isModalOpen && selectedOrderId && (
                        <OrderModal orderId={selectedOrderId} onClose={closeModal} />
                    )}
                </div>
            </div>


            {showEditInfoModal && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white rounded-lg p-6">
                        <h4 className="text-lg font-semibold mb-4">Изменить информацию</h4>
                        <input
                            type="text"
                            placeholder="Имя"
                            value={editableUserInfo.firstName}
                            onChange={e => setEditableUserInfo({ ...editableUserInfo, firstName: e.target.value })}
                            className={`border w-full p-2 mb-2 rounded ${formErrors.firstName ? 'border-red-500' : ''}`}
                        />
                        <input
                            type="text"
                            placeholder="Фамилия"
                            value={editableUserInfo.lastName}
                            onChange={e => setEditableUserInfo({ ...editableUserInfo, lastName: e.target.value })}
                            className={`border w-full p-2 mb-2 rounded ${formErrors.lastName ? 'border-red-500' : ''}`}
                        />
                        <input
                            type="email"
                            placeholder="Электронная почта"
                            value={editableUserInfo.email}
                            onChange={e => setEditableUserInfo({ ...editableUserInfo, email: e.target.value })}
                            className={`border w-full p-2 mb-2 rounded ${formErrors.email ? 'border-red-500' : ''}`}
                        />
                        <div className="flex justify-between">
                            <Button onClick={handleSaveInfo}>Сохранить</Button>
                            <Button onClick={() => setShowEditInfoModal(false)} variant="outline">Отменить</Button>
                        </div>
                    </div>
                </div>
            )}

            {showAddAddressModal && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white rounded-lg p-6">
                        <h4 className="text-lg font-semibold mb-4">Добавить адрес</h4>
                        <input
                            type="text"
                            placeholder="Страна"
                            value={newAddress.country}
                            onChange={e => setNewAddress({ ...newAddress, country: e.target.value })}
                            className="border w-full p-2 mb-2 rounded"
                        />
                        <input
                            type="text"
                            placeholder="Город"
                            value={newAddress.city}
                            onChange={e => setNewAddress({ ...newAddress, city: e.target.value })}
                            className="border w-full p-2 mb-2 rounded"
                        />
                        <input
                            type="text"
                            placeholder="Улица"
                            value={newAddress.street}
                            onChange={e => setNewAddress({ ...newAddress, street: e.target.value })}
                            className="border w-full p-2 mb-2 rounded"
                        />
                        <input
                            type="text"
                            placeholder="Почтовый индекс"
                            value={newAddress.postalCode}
                            onChange={e => setNewAddress({ ...newAddress, postalCode: e.target.value })}
                            className="border w-full p-2 mb-2 rounded"
                        />
                        <div className="flex justify-between">
                            <Button onClick={handleSaveAddress}>Добавить</Button>
                            <Button onClick={() => setShowAddAddressModal(false)} variant="outline">Отменить</Button>
                        </div>
                    </div>
                </div>
            )}

            {showChangePasswordModal && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white rounded-lg p-6">
                        <h4 className="text-lg font-semibold mb-4">Изменить пароль</h4>
                        <form onSubmit={handleSavePassword}>
                            <input
                                type="password"
                                placeholder="Текущий пароль"
                                value={oldPassword}
                                autoComplete="current-password"
                                onChange={e => setOldPassword(e.target.value)}
                                className={`border w-full p-2 mb-2 rounded ${oldPasswordError ? 'border-red-500' : ''}`}
                            />
                            <input
                                type="password"
                                placeholder="Новый пароль"
                                autoComplete="new-password"
                                value={newPassword}
                                onChange={e => setNewPassword(e.target.value)}
                                className={`border w-full p-2 mb-2 rounded ${passwordError ? 'border-red-500' : ''}`}
                            />
                            <div className="flex justify-between mt-4">
                                <Button type="submit">Сохранить</Button>
                                <Button onClick={() => setShowChangePasswordModal(false)} variant="outline">Отменить</Button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}