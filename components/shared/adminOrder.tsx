'use cleint'

import axios from "axios";
import { useEffect, useState } from "react";
import { Button } from "../ui";
import OrderModal from "./orderModal";
import { toast } from "react-toastify";

const orderStatusDictionary = {
    "pending": "В ожидании",
    "shipped": "Отгружен",
    "delivered": "Доставлен",
    "canceled": "Отменен",
};

const API_URL = process.env.NEXT_PUBLIC_API_URL

const AdminOrder: React.FC = () => {
    const [orders, setOrders] = useState<Order[]>([])
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
    const [selectedOrderId, setSelectedOrderIdOrderId] = useState<number | null>(null)
    
    useEffect(() => {
        const getOrder = async () => {
            const response = await axios.get(`${API_URL}/order/all`,
                {headers: {Authorization: `Bearer ${localStorage.getItem("token")}`}}
            )
            setOrders(response.data)
            console.log(response.data)
        }
        getOrder()
    }, [])

    const openModal = (orderId: number) => {
      setSelectedOrderIdOrderId(orderId)
      setIsModalOpen(true)
    };
    
    const closeModal = () => {
      setIsModalOpen(false)
      setSelectedOrderIdOrderId(null)
    }
    
    const changeStatus = (orderId: number, status: OrderStatus) => {
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === orderId ? { ...order, status } : order
        )
      );
    };
  
    return (
      <ul className="space-y-4 max-w-[1200px] m-auto">
        {orders.map((order) => {
          const formattedDate = new Date(order.createdAt).toLocaleDateString();
  
          return (
            <li
              key={order.id}
              className="border p-6 rounded-lg shadow-md bg-white hover:shadow-lg transition-shadow duration-300 ease-in-out"
            >
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-semibold text-gray-700">Заказ № {order.id}</h3>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    order.status === 'delivered'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-yellow-100 text-yellow-700'
                  }`}
                >
                  {orderStatusDictionary[order.status] || order.status}
                </span>
              </div>
              <div className="text-gray-500 mb-2">
                <p>
                  <span className="font-medium text-gray-700">Дата:</span> {formattedDate}
                </p>
                <p>
                  <span className="font-medium text-gray-700">Оплачено:</span> {order.totalPrice} р.
                </p>
              </div>
              <div className="flex justify-end mt-4">
                <Button variant="link" onClick={() => openModal(order.id)}>
                    Просмотреть заказ
                </Button>
              </div>
            </li>
          );
        })}
        {isModalOpen && selectedOrderId && (
          <OrderModal orderId={selectedOrderId} onClose={closeModal} isAdmin={true} changeStatusOrder={changeStatus}/>
        )}
      </ul>
    );
  };
  
  export default AdminOrder;