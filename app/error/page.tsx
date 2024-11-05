'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ErrorPage = ({ searchParams }: { searchParams: { order_id?: string; session_id?: string } }) => {
  const orderId = typeof searchParams.order_id === 'string' ? searchParams.order_id : null;
  const sessionId = typeof searchParams.session_id === 'string' ? searchParams.session_id : null;
  const [token, setToken] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setToken(localStorage.getItem('token'));
    }
  }, []);

  useEffect(() => {
    const sendPaymentError = async () => {
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
          const response = await axios.post(`${apiUrl}/payment/error`, {
            orderId,
            sessionId,
          }, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          console.log('Payment error reported:', response.data);
        } catch (error: any) {
          console.error('Error reporting payment error:', error.response ? error.response.data : error.message);
          setErrorMessage('Произошла ошибка при обработке вашего заказа. Пожалуйста, попробуйте позже.');
        }
      }
    };

    sendPaymentError();
  }, [orderId, sessionId, token]);

  return (
    <div className="flex items-center justify-center pt-[200px]">
      <h1 className="text-2xl font-semibold text-red-600">
        {errorMessage || `Произошла ошибка при обработке заказа ${orderId ? `#${orderId}` : ''}.`}
      </h1>
    </div>
  );
};

export default ErrorPage;
