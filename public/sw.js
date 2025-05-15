if(!self.define){let e,s={};const a=(a,c)=>(a=new URL(a+".js",c).href,s[a]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=a,e.onload=s,document.head.appendChild(e)}else e=a,importScripts(a),s()})).then((()=>{let e=s[a];if(!e)throw new Error(`Module ${a} didn’t register its module`);return e})));self.define=(c,n)=>{const i=e||("document"in self?document.currentScript.src:"")||location.href;if(s[i])return;let t={};const r=e=>a(e,i),f={module:{uri:i},exports:t,require:r};s[i]=Promise.all(c.map((e=>f[e]||r(e)))).then((e=>(n(...e),t)))}}define(["./workbox-4754cb34"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/_Z0KHdSg0kF83z61UcfFw/_buildManifest.js",revision:"2ec694eb52ae4f523f265a46bae4d768"},{url:"/_next/static/_Z0KHdSg0kF83z61UcfFw/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/chunks/23-73e2f516cf9f99b1.js",revision:"_Z0KHdSg0kF83z61UcfFw"},{url:"/_next/static/chunks/405-4fb2a4d18817cba0.js",revision:"_Z0KHdSg0kF83z61UcfFw"},{url:"/_next/static/chunks/472-df71467dc22b6768.js",revision:"_Z0KHdSg0kF83z61UcfFw"},{url:"/_next/static/chunks/477-45431cb2cb082576.js",revision:"_Z0KHdSg0kF83z61UcfFw"},{url:"/_next/static/chunks/759-870b58b4160c0d06.js",revision:"_Z0KHdSg0kF83z61UcfFw"},{url:"/_next/static/chunks/837-5861d06d216acbef.js",revision:"_Z0KHdSg0kF83z61UcfFw"},{url:"/_next/static/chunks/952.a77b5ef9b1b88db7.js",revision:"a77b5ef9b1b88db7"},{url:"/_next/static/chunks/956-625304c44e4b1415.js",revision:"_Z0KHdSg0kF83z61UcfFw"},{url:"/_next/static/chunks/970-bb06d2b5397615e6.js",revision:"_Z0KHdSg0kF83z61UcfFw"},{url:"/_next/static/chunks/app/_not-found/page-4f7382858180a345.js",revision:"_Z0KHdSg0kF83z61UcfFw"},{url:"/_next/static/chunks/app/about/page-6936baa4f8e39abe.js",revision:"_Z0KHdSg0kF83z61UcfFw"},{url:"/_next/static/chunks/app/auth/page-c1ba436e770940e6.js",revision:"_Z0KHdSg0kF83z61UcfFw"},{url:"/_next/static/chunks/app/brands/%5Bname%5D/category/%5Bcategory%5D/page-e17ec0108a9c3a40.js",revision:"_Z0KHdSg0kF83z61UcfFw"},{url:"/_next/static/chunks/app/brands/%5Bname%5D/page-cafe8a744d5a758f.js",revision:"_Z0KHdSg0kF83z61UcfFw"},{url:"/_next/static/chunks/app/brands/page-93c59a58e1077f82.js",revision:"_Z0KHdSg0kF83z61UcfFw"},{url:"/_next/static/chunks/app/catalog/%5Bcategory%5D/page-8de9b02559f898a0.js",revision:"_Z0KHdSg0kF83z61UcfFw"},{url:"/_next/static/chunks/app/catalog/page-442f2bd57c22ca56.js",revision:"_Z0KHdSg0kF83z61UcfFw"},{url:"/_next/static/chunks/app/dashboard/page-60d1534f7f3e1937.js",revision:"_Z0KHdSg0kF83z61UcfFw"},{url:"/_next/static/chunks/app/dashboard/product/%5BsearchName%5D/page-ff52856e591653ff.js",revision:"_Z0KHdSg0kF83z61UcfFw"},{url:"/_next/static/chunks/app/dashboard/product/create/page-cdffa72658b86026.js",revision:"_Z0KHdSg0kF83z61UcfFw"},{url:"/_next/static/chunks/app/error/page-aaf45919bfd2d9ea.js",revision:"_Z0KHdSg0kF83z61UcfFw"},{url:"/_next/static/chunks/app/layout-9e29734a588dc8ec.js",revision:"_Z0KHdSg0kF83z61UcfFw"},{url:"/_next/static/chunks/app/order/page-e6944318323b9b48.js",revision:"_Z0KHdSg0kF83z61UcfFw"},{url:"/_next/static/chunks/app/page-200766135976289a.js",revision:"_Z0KHdSg0kF83z61UcfFw"},{url:"/_next/static/chunks/app/privacy/page-095f2529b47af856.js",revision:"_Z0KHdSg0kF83z61UcfFw"},{url:"/_next/static/chunks/app/product/%5BsearchName%5D/page-527e7b83bf1be6f6.js",revision:"_Z0KHdSg0kF83z61UcfFw"},{url:"/_next/static/chunks/app/profile/page-e2d8dcab542a93b7.js",revision:"_Z0KHdSg0kF83z61UcfFw"},{url:"/_next/static/chunks/app/search/%5Bquery%5D/page-3b8c37fbb8861cae.js",revision:"_Z0KHdSg0kF83z61UcfFw"},{url:"/_next/static/chunks/app/success/page-03ab0dc4c68862a0.js",revision:"_Z0KHdSg0kF83z61UcfFw"},{url:"/_next/static/chunks/fd9d1056-e3713eac37b0d1bb.js",revision:"_Z0KHdSg0kF83z61UcfFw"},{url:"/_next/static/chunks/framework-f66176bb897dc684.js",revision:"_Z0KHdSg0kF83z61UcfFw"},{url:"/_next/static/chunks/main-app-b9de4b58f20b80ea.js",revision:"_Z0KHdSg0kF83z61UcfFw"},{url:"/_next/static/chunks/main-f9771f5351785258.js",revision:"_Z0KHdSg0kF83z61UcfFw"},{url:"/_next/static/chunks/pages/_app-6a626577ffa902a4.js",revision:"_Z0KHdSg0kF83z61UcfFw"},{url:"/_next/static/chunks/pages/_error-1be831200e60c5c0.js",revision:"_Z0KHdSg0kF83z61UcfFw"},{url:"/_next/static/chunks/polyfills-78c92fac7aa8fdd8.js",revision:"79330112775102f91e1010318bae2bd3"},{url:"/_next/static/chunks/webpack-d39e051201c3d503.js",revision:"_Z0KHdSg0kF83z61UcfFw"},{url:"/_next/static/css/07b70b791b8675f6.css",revision:"07b70b791b8675f6"},{url:"/_next/static/css/3a24c022f69a36a9.css",revision:"3a24c022f69a36a9"},{url:"/_next/static/css/d8e33b7a6bd9f391.css",revision:"d8e33b7a6bd9f391"},{url:"/_next/static/media/0610ebff456d6cfc-s.woff2",revision:"8786f06e95694337521729d147b3f669"},{url:"/_next/static/media/21ed5661b47f7f6d-s.woff2",revision:"91c3bc1f55db641843550a62e39f0031"},{url:"/_next/static/media/8a9e72331fecd08b-s.p.woff2",revision:"f8a4d4cec8704b696ec245377c0e188e"},{url:"/_next/static/media/ajax-loader.0b80f665.gif",revision:"0b80f665"},{url:"/_next/static/media/bde16c1724335d95-s.woff2",revision:"c56527d8c69315a82039a810338fd378"},{url:"/_next/static/media/e3b8d441242e07fb-s.woff2",revision:"8699475078b0c1b86dbe7ad907bb4e81"},{url:"/_next/static/media/slick.25572f22.eot",revision:"25572f22"},{url:"/_next/static/media/slick.653a4cbb.woff",revision:"653a4cbb"},{url:"/_next/static/media/slick.6aa1ee46.ttf",revision:"6aa1ee46"},{url:"/_next/static/media/slick.f895cfdf.svg",revision:"f895cfdf"},{url:"/accessories.jpg",revision:"6ec70baebd7c5e00008ba1a785018181"},{url:"/empty.png",revision:"cf2cb1b1481f822ba5225d3e2fbe97f5"},{url:"/icons/icon-192x192.png",revision:"ccedba4116ac53aa99c9f55a5aa4b68b"},{url:"/icons/icon-512x512.png",revision:"f6e07b221038e8f4a6d564ac94dd8fde"},{url:"/laptop.png",revision:"7c4be8f396946e5a4987b8d8c8378046"},{url:"/logo.png",revision:"adfe7d7379fe1b73f581f6c8d44007ff"},{url:"/logo_mobile.png",revision:"3d31407f19ccb409074471da08a05474"},{url:"/logo_not.webp",revision:"e2ab0ed714c2df6fafe2a975d4c303c1"},{url:"/manifest.json",revision:"dcb37a5662551cf755dd253dedc414f2"},{url:"/mobile.webp",revision:"b5bd4b77507f34295a81ce3b9188bcf9"},{url:"/no_image.png",revision:"d77ee9524880b2dcfa70f0fc0a962645"},{url:"/pc.avif",revision:"2d4081a6c6fbc68462c3d2283487a1e3"},{url:"/preview_logo.png",revision:"1f63cf08023f99aa3686af79cfb31de2"},{url:"/push-sw.js",revision:"3c715471b3d9c7c23c296909b375ce30"},{url:"/screenshots/screenshot1.png",revision:"1771ca4a02ec8b6e141a673f66a39d04"},{url:"/screenshots/screenshot2.png",revision:"1771ca4a02ec8b6e141a673f66a39d04"},{url:"/smart_watch.jpg",revision:"3dd01ded28d6aa3ae023de1fa2c5ecfb"},{url:"/tablet.jpg",revision:"f5d6a5a1218e61d87763d805038ff8ba"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:a,state:c})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));

self.addEventListener("push", function (event) {
    console.log("[Service Worker] Push сообщение получено");

    let data;

    try {
        // Парсим payload
        if (event.data) {
            data = event.data.json();
            console.log("[Service Worker] Полученные данные:", data);
        } else {
            console.warn("[Service Worker] Нет данных в push-сообщении");
            data = {};
        }
    } catch (e) {
        console.error("[Service Worker] Не удалось распарсить JSON:", e);
        data = {};
    }

    const title = data.title || "Новое уведомление";
    const options = {
        body: data.body || "Вы получили новое уведомление",
        icon: data.icon || "/icons/icon-192x192.png",
        badge: data.badge || "/icons/icon-192x192.png",
        data: data.link || self.registration.scope,
    };

    // ГЛАВНОЕ — оборачиваем showNotification в waitUntil
    event.waitUntil(
        (async () => {
            try {
                await self.registration.showNotification(title, options);
                console.log("[Service Worker] Уведомление показано");
            } catch (err) {
                console.error("[Service Worker] Ошибка при показе уведомления:", err);
            }
        })()
    );
});

self.addEventListener("notificationclick", function (event) {
    console.log("[Service Worker] Клик по уведомлению");
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