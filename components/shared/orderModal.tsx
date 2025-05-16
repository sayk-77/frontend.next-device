"use client"

import type React from "react"
import { useEffect, useState } from "react"
import axios from "axios"
import Image from "next/image"
import { toast } from "react-toastify"
import {
    Package,
    ShoppingCart,
    MapPin,
    Calendar,
    CreditCard,
    Truck,
    CheckCircle,
    Clock,
    AlertCircle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"

interface OrderItem {
    id: number
    orderId: number
    productId: number
    quantity: number
    price: number
    products: Product
}

interface Product {
    id: number
    name: string
    images: ProductImage[]
}

interface ProductImage {
    id: number
    productId: number
    imageUrl: string
    isMain: boolean
}

interface Address {
    id: number
    userId: number
    country: string
    city: string
    street: string
    postalCode: string
}

interface Order {
    id: number
    userId: number
    totalPrice: number
    status: string
    addressId: number
    createdAt: string
    orderItems: OrderItem[]
    address: Address
}

interface OrderModalProps {
    orderId: number | null
    onClose: () => void
    changeStatusOrder?: (orderId: number, status: OrderStatus) => void
    isAdmin?: boolean
}

type OrderStatus = "pending" | "shipped" | "delivered" | "canceled"

const API_URL = process.env.NEXT_PUBLIC_API_URL

const orderStatusDictionary = {
    pending: "В ожидании",
    shipped: "Отгружен",
    delivered: "Доставлен",
    canceled: "Отменен",
}

const orderStatusIcons = {
    pending: <Clock className="w-4 h-4" />,
    shipped: <Truck className="w-4 h-4" />,
    delivered: <CheckCircle className="w-4 h-4" />,
    canceled: <AlertCircle className="w-4 h-4" />,
}

const orderStatusColors = {
    pending: "bg-yellow-100 text-yellow-800",
    shipped: "bg-blue-100 text-blue-800",
    delivered: "bg-green-100 text-green-800",
    canceled: "bg-red-100 text-red-800",
}

const OrderModal: React.FC<OrderModalProps> = ({ orderId, onClose, isAdmin, changeStatusOrder }) => {
    const [order, setOrder] = useState<Order | null>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)
    const [isOpen, setIsOpen] = useState<boolean>(true)

    useEffect(() => {
        if (orderId) {
            const fetchOrder = async () => {
                setLoading(true)
                setError(null)

                try {
                    const response = await axios.get(`${API_URL}/order/${orderId}`, {
                        headers: {
                            Authorization: "Bearer " + localStorage.getItem("token"),
                        },
                    })
                    console.log(response.data)
                    setOrder(response.data)
                } catch (err) {
                    setError("Не удалось загрузить данные заказа")
                } finally {
                    setLoading(false)
                }
            }

            fetchOrder()
        }
    }, [orderId])

    const changeStatus = async (orderId: number, status: string) => {
        const data = {
            orderId: orderId,
            status: status,
        }
        try {
            const response = await axios.post(`${API_URL}/order/status`, data)
            if (response.status === 200) {
                toast.success("Статус заказа изменен")
                if (changeStatusOrder) {
                    changeStatusOrder(orderId, status as OrderStatus)
                }
                handleClose()
            }
        } catch (err) {
            console.log(err)
            toast.error("Не удалось изменить статус заказа")
        }
    }

    const handleClose = () => {
        setIsOpen(false)
        onClose()
    }

    if (!orderId) return null

    const formatDate = (dateString: string) => {
        const date = new Date(dateString)
        return date.toLocaleDateString("ru-RU", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        })
    }

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
            <DialogContent className="max-w-3xl max-h-[90vh] overflow-hidden border-orange-200 bg-white z-50">
                <DialogHeader>
                    <DialogTitle className="text-orange-600 flex items-center gap-2">
                        <Package className="h-5 w-5" />
                        Заказ №{orderId}
                    </DialogTitle>
                    <DialogDescription>
                        {order && (
                            <Badge
                                variant="outline"
                                className={`mt-2 inline-flex items-center gap-1 ${
                                    orderStatusColors[order.status as keyof typeof orderStatusColors]
                                }`}
                            >
                                {orderStatusIcons[order.status as keyof typeof orderStatusIcons]}
                                {orderStatusDictionary[order.status as keyof typeof orderStatusDictionary]}
                            </Badge>
                        )}
                    </DialogDescription>
                </DialogHeader>

                {loading ? (
                    <div className="flex justify-center items-center py-12">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
                    </div>
                ) : error ? (
                    <div className="text-center py-8 text-red-500">
                        <AlertCircle className="h-12 w-12 mx-auto mb-4" />
                        <p className="text-lg font-medium">{error}</p>
                    </div>
                ) : order ? (
                    <ScrollArea className="max-h-[calc(90vh-180px)]">
                        <div className="p-1">
                            <Card className="mb-6 overflow-hidden">
                                <CardContent className="p-4">
                                    <div className="space-y-4">

                                        <div className="flex items-start gap-3">
                                            <Calendar className="h-5 w-5 text-orange-500 mt-0.5 flex-shrink-0" />
                                            <div>
                                                <p className="text-sm text-gray-500 mb-1">Дата заказа</p>
                                                <p className="font-medium">{formatDate(order.createdAt)}</p>
                                            </div>
                                        </div>

                                        <div className="flex items-start gap-3">
                                            <CreditCard className="h-5 w-5 text-orange-500 mt-0.5 flex-shrink-0" />
                                            <div>
                                                <p className="text-sm text-gray-500 mb-1">Сумма заказа</p>
                                                <p className="font-medium text-lg">{order.totalPrice} ₽</p>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                                <ShoppingCart className="h-5 w-5 text-orange-500" />
                                Товары в заказе
                            </h3>

                            <div className="space-y-4">
                                {order.orderItems.map((item) => {
                                    const mainImage = item.products.images.find((img) => img.isMain)
                                    return (
                                        <Card key={item.id} className="overflow-hidden">
                                            <CardContent className="p-0">
                                                <div className="flex flex-col xs:flex-row">
                                                    <div className="p-4">
                                                        <h4 className="font-semibold text-lg mb-2">{item.products.name}</h4>
                                                        <div className="flex flex-col xs:flex-row xs:items-center gap-2 xs:gap-6 text-gray-600">
                                                            <p>Количество: {item.quantity}</p>
                                                            <p className="font-medium text-black">{item.price} ₽ / шт.</p>
                                                        </div>
                                                        <p className="mt-2 font-semibold text-orange-600">Итого: {item.price * item.quantity} ₽</p>
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    )
                                })}
                            </div>
                        </div>
                    </ScrollArea>
                ) : null}

                <DialogFooter className="flex-col sm:flex-row gap-3">
                    {isAdmin && order && (
                        <>
                            <Separator className="my-2" />
                            <div className="flex flex-col xs:flex-row gap-3 w-full justify-end">
                                <Button
                                    variant="outline"
                                    className="hover:bg-orange-50 hover:text-orange-600 hover:border-orange-200"
                                    disabled={order.status === "delivered" || order.status === "canceled"}
                                    onClick={() => changeStatus(orderId, "shipped")}
                                >
                                    <Truck className="mr-2 h-4 w-4" />В доставке
                                </Button>
                                <Button
                                    className="bg-orange-500 hover:bg-orange-600 text-white"
                                    disabled={order.status === "delivered" || order.status === "canceled"}
                                    onClick={() => changeStatus(orderId, "delivered")}
                                >
                                    <CheckCircle className="mr-2 h-4 w-4" />
                                    Доставлен
                                </Button>
                            </div>
                        </>
                    )}
                    <Button variant="outline" onClick={handleClose} className="sm:ml-auto">
                        Закрыть
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default OrderModal
