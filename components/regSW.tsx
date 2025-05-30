'use client'

import {useEffect} from "react";

export default function RegisterServiceWorker() {
    useEffect(() => {
        setup()
    }, []);

    const setup = async () => {
        if (typeof window === 'undefined') return

        if (process.env.NODE_ENV === 'development') {
            console.info('SW не регистрируется в dev');
            return;
        }

        if (!('serviceWorker' in navigator && 'PushManager' in window)) {
            console.warn('Браузер не поддерживает Push API')
            return
        }

        try {
            const registration = await navigator.serviceWorker.register('/push-sw.js', {
                scope: '/',
                updateViaCache: 'none',
            })


            await navigator.serviceWorker.ready

            const permission = await Notification.requestPermission()
            if (permission !== 'granted') {
                console.warn('⚠️ Пользователь запретил уведомления')
                return
            }
        } catch (err) {
            console.error('Ошибка при регистрации Service Worker:', err)
        }
    }

    return null
}