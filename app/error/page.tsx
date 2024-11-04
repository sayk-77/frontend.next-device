'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Success = ({ searchParams }: { searchParams: { order_id?: string; session_id?: string } }) => {
  const orderId = typeof searchParams.order_id === 'string' ? searchParams.order_id : null;
  const sessionId = typeof searchParams.session_id === 'string' ? searchParams.session_id : null;
  const [token, setToken] = useState<string | null>(null);
  const [paymentStatus, setPaymentStatus] = useState<string | null>(null);
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    setToken(storedToken);

    const sendPaymentConfirmation = async () => {
      if (orderId && sessionId && storedToken) {
        console.log('API_URL:', API_URL);
        console.log('Payload:', {
          orderId: orderId,
          sessionId: sessionId,
        });
  
        try {
          const response = await axios.post(`${API_URL}/payment/status`, {
            orderId: orderId,
            sessionId: sessionId,
          }, {
            headers: {
              Authorization: `Bearer ${storedToken}`,
            },
          });
          console.log('Payment confirmed:', response.data);
          setPaymentStatus(`Спасибо, ваш заказ #${orderId} успешно оплачен!`);
        } catch (error) {
          console.error('Error sending payment confirmation:', error);
          setPaymentStatus('Произошла ошибка оплаты, повторите позже');
        }
      }
    };
  
    sendPaymentConfirmation();
  }, [orderId, sessionId, API_URL]);

  return (
    <div className="flex items-center justify-center pt-[200px]">
      <h1 className="text-2xl font-semibold text-green-600">
        {paymentStatus}
      </h1>
    </div>
  );
};

export default Success;
