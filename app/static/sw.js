// Service Worker for Zaman / Samaa Calendar
// Handles caching, PWA installation, and Mobile Web Notifications

self.addEventListener("install", (event) => {
    self.skipWaiting();
});

self.addEventListener("activate", (event) => {
    self.clients.claim();
});

self.addEventListener("fetch", (event) => {
    // Pass-through only -- always hits the network
    event.respondWith(fetch(event.request));
});

// Handle user clicking on a mobile notification
self.addEventListener("notificationclick", (event) => {
    event.notification.close();
    event.waitUntil(
        self.clients.matchAll({ type: "window", includeUncontrolled: true }).then((clientList) => {
            for (const client of clientList) {
                if (client.url && "focus" in client) {
                    return client.focus();
                }
            }
            if (self.clients.openWindow) {
                return self.clients.openWindow("/");
            }
        })
    );
});

// Handle incoming push notifications
self.addEventListener("push", (event) => {
    let data = {};
    if (event.data) {
        try {
            data = event.data.json();
        } catch (e) {
            data = { body: event.data.text() };
        }
    }
    const title = data.title || "Zaman Notification";
    const options = {
        body: data.body || "",
        icon: "/static/icons/zaman_logo.png",
        badge: "/static/icons/zaman_logo.png",
        vibrate: [200, 100, 200],
        data: data.url || "/"
    };
    event.waitUntil(self.registration.showNotification(title, options));
});
