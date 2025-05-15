// self.addEventListener("push", function (event) {
//     console.log("[Service Worker] Push сообщение получено");
//
//     let data;
//
//     try {
//         // Парсим payload
//         if (event.data) {
//             data = event.data.json();
//             console.log("[Service Worker] Полученные данные:", data);
//         } else {
//             console.warn("[Service Worker] Нет данных в push-сообщении");
//             data = {};
//         }
//     } catch (e) {
//         console.error("[Service Worker] Не удалось распарсить JSON:", e);
//         data = {};
//     }
//
//     const title = data.title || "Новое уведомление";
//     const options = {
//         body: data.body || "Вы получили новое уведомление",
//         icon: data.icon || "/icons/icon-192x192.png",
//         badge: data.badge || "/icons/icon-192x192.png",
//         data: data.link || self.registration.scope,
//     };
//
//     // ГЛАВНОЕ — оборачиваем showNotification в waitUntil
//     event.waitUntil(
//         (async () => {
//             try {
//                 await self.registration.showNotification(title, options);
//                 console.log("[Service Worker] Уведомление показано");
//             } catch (err) {
//                 console.error("[Service Worker] Ошибка при показе уведомления:", err);
//             }
//         })()
//     );
// });
//
// self.addEventListener("notificationclick", function (event) {
//     console.log("[Service Worker] Клик по уведомлению");
//     event.notification.close();
//
//     const urlToOpen = event.notification.data || self.registration.scope;
//
//     event.waitUntil(
//         clients.matchAll({ type: "window" }).then((clientList) => {
//             for (const client of clientList) {
//                 if ("focus" in client && client.url === urlToOpen) {
//                     return client.focus();
//                 }
//             }
//
//             if (clients.openWindow) {
//                 return clients.openWindow(urlToOpen);
//             }
//         })
//     );
// });