"use client"

import { useState, useEffect } from "react"
import axios from "axios"
import { toast } from "react-toastify"
import {
    User,
    MapPin,
    Package,
    Edit,
    Trash2,
    Plus,
    Lock,
    ChevronRight,
    Calendar,
    CreditCard,
    CheckCircle,
    XCircle,
    TruckIcon,
    Clock,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import OrderModal from "@/components/shared/orderModal"
import { InitPushNot } from "@/components/initPushNot"

const API_URL = process.env.NEXT_PUBLIC_API_URL
const token = typeof window !== "undefined" ? localStorage.getItem("token") : null

const orderStatusDictionary = {
    pending: "В ожидании",
    shipped: "Отгружен",
    delivered: "Доставлен",
    canceled: "Отменен",
}

const orderStatusIcons = {
    pending: <Clock className="w-4 h-4" />,
    shipped: <TruckIcon className="w-4 h-4" />,
    delivered: <CheckCircle className="w-4 h-4" />,
    canceled: <XCircle className="w-4 h-4" />,
}

const orderStatusColors = {
    pending: "bg-yellow-100 text-yellow-800",
    shipped: "bg-blue-100 text-blue-800",
    delivered: "bg-green-100 text-green-800",
    canceled: "bg-red-100 text-red-800",
}

interface UserInfo {
    firstName: string
    lastName: string
    email: string
}

interface Address {
    id: number
    country: string
    city: string
    street: string
    postalCode: string
}

interface Order {
    id: number
    createdAt: string
    totalPrice: number
    status: keyof typeof orderStatusDictionary
}

const saveUserInfo = async (userInfo: UserInfo) => {
    try {
        const response = await axios.put(
            `${API_URL}/user/update`,
            {
                firstName: userInfo.firstName,
                lastName: userInfo.lastName,
                email: userInfo.email,
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            },
        )
        toast.success(response.data)
        return true
    } catch (err) {
        console.log(err)
        toast.error("Не удалось обновить информацию")
        return false
    }
}

const changePassword = async (oldPassword: string, newPassword: string) => {
    try {
        const response = await axios.put(
            `${API_URL}/user/password`,
            {
                oldPassword: oldPassword,
                newPassword: newPassword,
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            },
        )
        toast.success(response.data)
        return true
    } catch (err) {
        console.log(err)
        toast.error("Не удалось изменить пароль")
        return false
    }
}

const addNewAddress = async (newAddress: Omit<Address, "id">) => {
    try {
        const response = await axios.post(
            `${API_URL}/user/address`,
            {
                country: newAddress.country,
                city: newAddress.city,
                street: newAddress.street,
                postalCode: newAddress.postalCode,
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            },
        )
        toast.success(response.data)
        return true
    } catch (err) {
        console.log(err)
        toast.error("Не удалось добавить адрес")
        return false
    }
}

export default function ProfilePage() {
    const [userInfo, setUserInfo] = useState<UserInfo>({
        firstName: "",
        lastName: "",
        email: "",
    })
    const [addresses, setAddresses] = useState<Address[]>([])
    const [orders, setOrders] = useState<Order[]>([])
    const [isLoading, setIsLoading] = useState(true)

    const [editUserInfo, setEditUserInfo] = useState<UserInfo>({
        firstName: "",
        lastName: "",
        email: "",
    })
    const [isEditUserInfoOpen, setIsEditUserInfoOpen] = useState(false)
    const [formErrors, setFormErrors] = useState({ firstName: "", lastName: "", email: "" })

    const [oldPassword, setOldPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false)
    const [passwordError, setPasswordError] = useState("")
    const [oldPasswordError, setOldPasswordError] = useState("")

    const [newAddress, setNewAddress] = useState<Omit<Address, "id">>({
        country: "",
        city: "",
        street: "",
        postalCode: "",
    })
    const [isAddAddressOpen, setIsAddAddressOpen] = useState(false)
    const [addressErrors, setAddressErrors] = useState({
        country: "",
        city: "",
        street: "",
        postalCode: "",
    })

    const [isOrderModalOpen, setIsOrderModalOpen] = useState(false)
    const [selectedOrderId, setSelectedOrderId] = useState<number | null>(null)

    useEffect(() => {
        const fetchUserData = async () => {
            setIsLoading(true)
            try {
                const response = await axios.get(`${API_URL}/user`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                const { user } = response.data

                setUserInfo({
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                })

                setAddresses(
                    user.addresses.map((addr: any) => ({
                        id: addr.id,
                        country: addr.country,
                        city: addr.city,
                        street: addr.street,
                        postalCode: addr.postalCode,
                    })),
                )

                setOrders(
                    user.orders.map((order: any) => ({
                        id: order.id,
                        createdAt: order.createdAt,
                        totalPrice: order.totalPrice,
                        status: order.status,
                    })),
                )
            } catch (error) {
                console.error("Ошибка при загрузке данных пользователя:", error)
                toast.error("Не удалось загрузить данные пользователя")
            } finally {
                setIsLoading(false)
            }
        }

        fetchUserData()
    }, [])

    const deleteAddress = async (id: number) => {
        try {
            const response = await axios.delete(`${API_URL}/user/address/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            setAddresses(addresses.filter((addr) => addr.id !== id))
            toast.success(response.data)
        } catch (err) {
            console.log(err)
            toast.error("Не удалось удалить адрес")
        }
    }

    const validateUserInfoForm = () => {
        const errors = { firstName: "", lastName: "", email: "" }
        if (!editUserInfo.firstName) errors.firstName = "Имя обязательно"
        if (!editUserInfo.lastName) errors.lastName = "Фамилия обязательна"
        if (!editUserInfo.email || !/\S+@\S+\.\S+/.test(editUserInfo.email)) errors.email = "Неверный формат почты"
        setFormErrors(errors)
        return !errors.firstName && !errors.lastName && !errors.email
    }

    const validatePassword = () => {
        let isValid = true
        if (oldPassword === "") {
            setOldPasswordError("Введите текущий пароль")
            isValid = false
        } else {
            setOldPasswordError("")
        }
        if (newPassword.length < 8 || !/\d/.test(newPassword) || !/[a-zA-Z]/.test(newPassword)) {
            setPasswordError("Пароль ��олжен содержать минимум 8 символов, включая буквы и цифры")
            isValid = false
        } else {
            setPasswordError("")
        }
        return isValid
    }

    const validateAddressForm = () => {
        const errors = {
            country: "",
            city: "",
            street: "",
            postalCode: "",
        }

        if (!newAddress.country) errors.country = "Страна обязательна"
        if (!newAddress.city) errors.city = "Город обязателен"
        if (!newAddress.street) errors.street = "Улица обязательна"
        if (!newAddress.postalCode) errors.postalCode = "Почтовый индекс обязателен"

        setAddressErrors(errors)
        return !errors.country && !errors.city && !errors.street && !errors.postalCode
    }

    const handleSaveUserInfo = async () => {
        if (validateUserInfoForm()) {
            const success = await saveUserInfo(editUserInfo)
            if (success) {
                setUserInfo(editUserInfo)
                setIsEditUserInfoOpen(false)
            }
        }
    }

    const handleSavePassword = async () => {
        if (validatePassword()) {
            const success = await changePassword(oldPassword, newPassword)
            if (success) {
                setIsChangePasswordOpen(false)
                setOldPassword("")
                setNewPassword("")
            }
        }
    }

    const handleSaveAddress = async () => {
        if (validateAddressForm()) {
            const success = await addNewAddress(newAddress)
            if (success) {
                const newId = Math.max(0, ...addresses.map((a) => a.id)) + 1
                setAddresses([...addresses, { ...newAddress, id: newId }])
                setIsAddAddressOpen(false)
                setNewAddress({ country: "", city: "", street: "", postalCode: "" })
            }
        }
    }

    const openOrderModal = (orderId: number) => {
        setSelectedOrderId(orderId)
        setIsOrderModalOpen(true)
    }

    const closeOrderModal = () => {
        setIsOrderModalOpen(false)
        setSelectedOrderId(null)
    }

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-[60vh]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
            </div>
        )
    }

    return (
        <div className="container mx-auto px-4 py-8 max-w-5xl">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Личный кабинет</h1>
                <p className="text-gray-600 mt-2">Управляйте своим профилем, адресами и заказами</p>
            </div>

            <Tabs defaultValue="info" className="w-full">
                <TabsList className="w-full flex mb-8 bg-gray-100 p-1 rounded-lg">
                    <TabsTrigger
                        value="info"
                        className="flex-1 flex items-center justify-center gap-2 py-3 data-[state=active]:bg-orange-500 data-[state=active]:text-white rounded-md transition-all"
                    >
                        <User className="h-4 w-4" />
                        <span>Информация</span>
                    </TabsTrigger>
                    <TabsTrigger
                        value="addresses"
                        className="flex-1 flex items-center justify-center gap-2 py-3 data-[state=active]:bg-orange-500 data-[state=active]:text-white rounded-md transition-all"
                    >
                        <MapPin className="h-4 w-4" />
                        <span>Адреса</span>
                    </TabsTrigger>
                    <TabsTrigger
                        value="orders"
                        className="flex-1 flex items-center justify-center gap-2 py-3 data-[state=active]:bg-orange-500 data-[state=active]:text-white rounded-md transition-all"
                    >
                        <Package className="h-4 w-4" />
                        <span>Заказы</span>
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="info">
                    <Card>
                        <CardHeader>
                            <CardTitle>Личная информация</CardTitle>
                            <CardDescription>Ваши персональные данные</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-6">
                                <div className="grid grid-cols-1 xs:grid-cols-2 gap-6">
                                    <div>
                                        <Label className="text-sm text-gray-500">Имя</Label>
                                        <p className="text-lg font-medium">{userInfo.firstName}</p>
                                    </div>
                                    <div>
                                        <Label className="text-sm text-gray-500">Фамилия</Label>
                                        <p className="text-lg font-medium">{userInfo.lastName}</p>
                                    </div>
                                </div>
                                <div>
                                    <Label className="text-sm text-gray-500">Электронная почта</Label>
                                    <p className="text-lg font-medium">{userInfo.email}</p>
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter className="flex flex-col xs:flex-row gap-4 items-start xs:items-center">
                            <Button
                                variant="outline"
                                className="w-full xs:w-auto flex items-center gap-2 hover:bg-orange-50 hover:text-orange-600 hover:border-orange-200"
                                onClick={() => {
                                    setEditUserInfo(userInfo)
                                    setIsEditUserInfoOpen(true)
                                }}
                            >
                                <Edit className="h-4 w-4" />
                                Изменить информацию
                            </Button>
                            <Button
                                variant="outline"
                                className="w-full xs:w-auto flex items-center gap-2 hover:bg-orange-50 hover:text-orange-600 hover:border-orange-200"
                                onClick={() => {
                                    setOldPassword("")
                                    setNewPassword("")
                                    setIsChangePasswordOpen(true)
                                }}
                            >
                                <Lock className="h-4 w-4" />
                                Изменить пароль
                            </Button>
                        </CardFooter>
                    </Card>
                </TabsContent>

                <TabsContent value="addresses">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between">
                            <div>
                                <CardTitle>Мои адреса</CardTitle>
                                <CardDescription>Адреса для доставки заказов</CardDescription>
                            </div>
                            <Button
                                variant="outline"
                                className="flex items-center gap-2 hover:bg-orange-50 hover:text-orange-600 hover:border-orange-200"
                                onClick={() => {
                                    setNewAddress({ country: "", city: "", street: "", postalCode: "" })
                                    setIsAddAddressOpen(true)
                                }}
                            >
                                <Plus className="h-4 w-4" />
                                <span className="hidden xs:inline">Добавить адрес</span>
                            </Button>
                        </CardHeader>
                        <CardContent>
                            {addresses.length > 0 ? (
                                <div className="space-y-4">
                                    {addresses.map((address) => (
                                        <div
                                            key={address.id}
                                            className="p-4 border rounded-lg flex flex-col xs:flex-row justify-between items-start xs:items-center gap-4 hover:bg-gray-50 transition-colors"
                                        >
                                            <div className="flex items-start gap-3">
                                                <MapPin className="h-5 w-5 text-orange-500 mt-0.5 flex-shrink-0" />
                                                <div>
                                                    <p className="font-medium">
                                                        {address.country}, г. {address.city}
                                                    </p>
                                                    <p className="text-gray-600">
                                                        ул. {address.street}, {address.postalCode}
                                                    </p>
                                                </div>
                                            </div>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="text-gray-500 hover:text-red-500"
                                                onClick={() => deleteAddress(address.id)}
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-8">
                                    <MapPin className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                                    <h3 className="text-lg font-medium text-gray-900 mb-1">Нет сохраненных адресов</h3>
                                    <p className="text-gray-500 mb-4">Добавьте адрес для быстрого оформления заказов</p>
                                    <Button
                                        variant="outline"
                                        className="flex items-center gap-2 mx-auto hover:bg-orange-50 hover:text-orange-600 hover:border-orange-200"
                                        onClick={() => {
                                            setNewAddress({ country: "", city: "", street: "", postalCode: "" })
                                            setIsAddAddressOpen(true)
                                        }}
                                    >
                                        <Plus className="h-4 w-4" />
                                        Добавить адрес
                                    </Button>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="orders">
                    <Card>
                        <CardHeader>
                            <CardTitle>История заказов</CardTitle>
                            <CardDescription>Ваши заказы и их статусы</CardDescription>
                        </CardHeader>
                        <CardContent>
                            {orders.length > 0 ? (
                                <div className="space-y-4">
                                    {orders.map((order) => {
                                        const formattedDate = new Date(order.createdAt).toLocaleDateString("ru-RU", {
                                            year: "numeric",
                                            month: "long",
                                            day: "numeric",
                                        })

                                        return (
                                            <div
                                                key={order.id}
                                                className="p-4 border rounded-lg hover:shadow-md transition-all cursor-pointer"
                                                onClick={() => openOrderModal(order.id)}
                                            >
                                                <div className="flex flex-col xs:flex-row justify-between items-start xs:items-center gap-4 mb-3">
                                                    <div className="flex items-center gap-2">
                                                        <span className="font-semibold text-lg">Заказ №{order.id}</span>
                                                        <Badge
                                                            variant="outline"
                                                            className={`flex items-center gap-1 ${orderStatusColors[order.status]}`}
                                                        >
                                                            {orderStatusIcons[order.status]}
                                                            {orderStatusDictionary[order.status]}
                                                        </Badge>
                                                    </div>
                                                    <div className="text-gray-500 flex items-center gap-2">
                                                        <Calendar className="h-4 w-4" />
                                                        {formattedDate}
                                                    </div>
                                                </div>

                                                <Separator className="my-3" />

                                                <div className="flex flex-col xs:flex-row justify-between items-start xs:items-center">
                                                    <div className="flex items-center gap-2">
                                                        <CreditCard className="h-4 w-4 text-gray-500" />
                                                        <span className="font-medium">{order.totalPrice} ₽</span>
                                                    </div>
                                                    <Button
                                                        variant="ghost"
                                                        className="flex items-center gap-1 text-orange-500 p-0 h-auto"
                                                        onClick={(e) => {
                                                            e.stopPropagation()
                                                            openOrderModal(order.id)
                                                        }}
                                                    >
                                                        Подробнее
                                                        <ChevronRight className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            ) : (
                                <div className="text-center py-8">
                                    <Package className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                                    <h3 className="text-lg font-medium text-gray-900 mb-1">У вас еще нет заказов</h3>
                                    <p className="text-gray-500">Здесь будет отображаться история ваших заказов</p>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>

            <Dialog open={isEditUserInfoOpen} onOpenChange={setIsEditUserInfoOpen}>
                <DialogContent className="sm:max-w-[425px] border-orange-200 bg-white z-50">
                    <DialogHeader>
                        <DialogTitle className="text-orange-600">Изменить информацию</DialogTitle>
                        <DialogDescription>Обновите вашу личную информацию</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="firstName">Имя</Label>
                            <Input
                                id="firstName"
                                value={editUserInfo.firstName}
                                onChange={(e) => setEditUserInfo({ ...editUserInfo, firstName: e.target.value })}
                                className={formErrors.firstName ? "border-red-500" : "focus-visible:ring-orange-500"}
                            />
                            {formErrors.firstName && <p className="text-red-500 text-sm">{formErrors.firstName}</p>}
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="lastName">Фамилия</Label>
                            <Input
                                id="lastName"
                                value={editUserInfo.lastName}
                                onChange={(e) => setEditUserInfo({ ...editUserInfo, lastName: e.target.value })}
                                className={formErrors.lastName ? "border-red-500" : "focus-visible:ring-orange-500"}
                            />
                            {formErrors.lastName && <p className="text-red-500 text-sm">{formErrors.lastName}</p>}
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="email">Электронная почта</Label>
                            <Input
                                id="email"
                                type="email"
                                value={editUserInfo.email}
                                onChange={(e) => setEditUserInfo({ ...editUserInfo, email: e.target.value })}
                                className={formErrors.email ? "border-red-500" : "focus-visible:ring-orange-500"}
                            />
                            {formErrors.email && <p className="text-red-500 text-sm">{formErrors.email}</p>}
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsEditUserInfoOpen(false)}>
                            Отмена
                        </Button>
                        <Button onClick={handleSaveUserInfo} className="bg-orange-500 hover:bg-orange-600 text-white">
                            Сохранить
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <Dialog open={isChangePasswordOpen} onOpenChange={setIsChangePasswordOpen}>
                <DialogContent className="sm:max-w-[425px] border-orange-200 bg-white z-50">
                    <DialogHeader>
                        <DialogTitle className="text-orange-600">Изменить пароль</DialogTitle>
                        <DialogDescription>Введите текущий пароль и новый пароль</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="oldPassword">Текущий пароль</Label>
                            <Input
                                id="oldPassword"
                                type="password"
                                autoComplete="current-password"
                                value={oldPassword}
                                onChange={(e) => setOldPassword(e.target.value)}
                                className={oldPasswordError ? "border-red-500" : "focus-visible:ring-orange-500"}
                            />
                            {oldPasswordError && <p className="text-red-500 text-sm">{oldPasswordError}</p>}
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="newPassword">Новый пароль</Label>
                            <Input
                                id="newPassword"
                                type="password"
                                autoComplete="new-password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                className={passwordError ? "border-red-500" : "focus-visible:ring-orange-500"}
                            />
                            {passwordError && <p className="text-red-500 text-sm">{passwordError}</p>}
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsChangePasswordOpen(false)}>
                            Отмена
                        </Button>
                        <Button onClick={handleSavePassword} className="bg-orange-500 hover:bg-orange-600 text-white">
                            Сохранить
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <Dialog open={isAddAddressOpen} onOpenChange={setIsAddAddressOpen}>
                <DialogContent className="sm:max-w-[425px] border-orange-200 bg-white z-50">
                    <DialogHeader>
                        <DialogTitle className="text-orange-600">Добавить адрес</DialogTitle>
                        <DialogDescription>Введите информацию о новом адресе</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="country">Страна</Label>
                            <Input
                                id="country"
                                value={newAddress.country}
                                onChange={(e) => setNewAddress({ ...newAddress, country: e.target.value })}
                                className={addressErrors.country ? "border-red-500" : "focus-visible:ring-orange-500"}
                            />
                            {addressErrors.country && <p className="text-red-500 text-sm">{addressErrors.country}</p>}
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="city">Город</Label>
                            <Input
                                id="city"
                                value={newAddress.city}
                                onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
                                className={addressErrors.city ? "border-red-500" : "focus-visible:ring-orange-500"}
                            />
                            {addressErrors.city && <p className="text-red-500 text-sm">{addressErrors.city}</p>}
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="street">Улица</Label>
                            <Input
                                id="street"
                                value={newAddress.street}
                                onChange={(e) => setNewAddress({ ...newAddress, street: e.target.value })}
                                className={addressErrors.street ? "border-red-500" : "focus-visible:ring-orange-500"}
                            />
                            {addressErrors.street && <p className="text-red-500 text-sm">{addressErrors.street}</p>}
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="postalCode">Почтовый индекс</Label>
                            <Input
                                id="postalCode"
                                value={newAddress.postalCode}
                                onChange={(e) => setNewAddress({ ...newAddress, postalCode: e.target.value })}
                                className={addressErrors.postalCode ? "border-red-500" : "focus-visible:ring-orange-500"}
                            />
                            {addressErrors.postalCode && <p className="text-red-500 text-sm">{addressErrors.postalCode}</p>}
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsAddAddressOpen(false)}>
                            Отмена
                        </Button>
                        <Button onClick={handleSaveAddress} className="bg-orange-500 hover:bg-orange-600 text-white">
                            Добавить
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {isOrderModalOpen && selectedOrderId && <OrderModal orderId={selectedOrderId} onClose={closeOrderModal} />}

            <InitPushNot />
        </div>
    )
}
