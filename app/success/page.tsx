'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface SuccessProps {
  orderId: string | null;
  sessionId: string | null;
}

const Success = ({ searchParams }: { searchParams: { order_id?: string; session_id?: string } }) => {
  const orderId = typeof searchParams.order_id === 'string' ? searchParams.order_id : null;
  const sessionId = typeof searchParams.session_id === 'string' ? searchParams.session_id : null;
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setToken(localStorage.getItem('token'));
    }
  }, []);

  useEffect(() => {
    const sendPaymentConfirmation = async () => {
      if (orderId && sessionId && token) {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        if (!apiUrl) {
          console.error('API_URL is not defined');
          return;
        }

        console.log('Payload:', {
          orderId,
          sessionId,
        });
        console.log('Token:', token);
  
        try {
          const response = await axios.post(`${apiUrl}/payment/status`, {
            orderId,
            sessionId,
          }, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          console.log('Payment confirmed:', response.data);
        } catch (error: any) {
          console.error('Error sending payment confirmation:', error.response ? error.response.data : error.message);
        }
      }
    };

    sendPaymentConfirmation();
  }, [orderId, sessionId, token]);

  return (
    <div className="flex items-center justify-center pt-[200px]">
      <h1 className="text-2xl font-semibold text-green-600">
        Спасибо, ваш заказ {orderId ? `#${orderId}` : ''} успешно оплачен!
      </h1>
    </div>
  );
};

export default Success;
