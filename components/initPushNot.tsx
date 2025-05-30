"use client"

import { useEffect } from "react"

function urlBase64ToUint8Array(base64String: string) {
    const padding = "=".repeat((4 - (base64String.length % 4)) % 4)
    const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/")

    const rawData = window.atob(base64)
    const outputArray = new Uint8Array(rawData.length)

    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i)
    }
    return outputArray
}

export const InitPushNot = () => {
    const setupNotifications = async () => {
        if (typeof window === "undefined") return

        if (!("serviceWorker" in navigator && "PushManager" in window)) {
            return
        }

        try {
            const registration = await navigator.serviceWorker.ready

            const permission = await Notification.requestPermission()
            if (permission !== "granted") {
                return
            }

            const vapidPublicKey = "BG-0g3_bWzXhTimTKIblUzI3ZGs7qrqpH_mqm-rg67-3nl626f--leSvk3hbwtn5hl8oHLU5EDx6PcCfy6-_Iz4"
            const convertedVapidKey = urlBase64ToUint8Array(vapidPublicKey)

            const existingSubscription = await registration.pushManager.getSubscription()
            if (existingSubscription) {
                return
            }

            const subscription = await registration.pushManager.subscribe({
                userVisibleOnly: true,
                applicationServerKey: convertedVapidKey,
            })


            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/subscribe`, {
                method: "POST",
                headers: { "Content-Type": "application/json", Authorization: `Bearer ${localStorage.getItem('token')}` },
                body: JSON.stringify(subscription),
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(`Server responded with ${response.status}`)
            }

        } catch (err) {
            console.error("Ошибка подписки:", err)
        }
    }

    useEffect(() => {
        setupNotifications()
    }, [])

    return null
}