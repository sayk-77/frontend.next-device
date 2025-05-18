
importScripts('/sw.js')

self.addEventListener("push", function (event) {
    let data;

    try {
        if (event.data) {
            data = event.data.json();
        } else {
            data = {};
        }
    } catch (e) {
        data = {};
    }

    const title = data.title || "Новое уведомление";
    const options = {
        body: data.body || "Вы получили новое уведомление",
        icon: data.icon || "/icons/icon-192x192.png",
        badge: data.badge || "/icons/icon-192x192.png",
        data: data.link || self.registration.scope,
    };

    event.waitUntil(
        (async () => {
            try {
                await self.registration.showNotification(title, options);
            } catch (err) {
                console.error("[Service Worker] Ошибка при показе уведомления:", err);
            }
        })()
    );
});

self.addEventListener("notificationclick", function (event) {
    event.notification.close();

    const urlToOpen = event.notification.data || self.registration.scope;

    event.waitUntil(
        clients.matchAll({ type: "window" }).then((clientList) => {
            for (const client of clientList) {
                if ("focus" in client && client.url === urlToOpen) {
                    return client.focus();
                }
            }

            if (clients.openWindow) {
                return clients.openWindow(urlToOpen);
            }
        })
    );
});