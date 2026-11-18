// Service worker minimal pour l'espace admin Laveoo.
// Ne fait aucune mise en cache hors-ligne : son seul rôle est de permettre
// à l'espace /admin d'être installable comme une application (condition
// technique exigée par les navigateurs pour proposer l'installation).
self.addEventListener("install", () => {
    self.skipWaiting();
});

self.addEventListener("activate", (event) => {
    event.waitUntil(self.clients.claim());
});

self.addEventListener("fetch", () => {
    // Laisse passer toutes les requêtes normalement, sans cache.
});

// On utilise le Cache Storage (pas IndexedDB) pour mémoriser le compteur :
// Safari a un bug connu où IndexedDB est indisponible dans un service worker
// réveillé uniquement pour traiter une notification push (app fermée),
// contrairement au Cache Storage qui reste fiable dans ce cas précis.
const BADGE_CACHE_NAME = "laveoo-admin-badge";
const BADGE_CACHE_KEY = "https://laveoo-badge.local/count";

async function getBadgeCount() {
    try {
        const cache = await caches.open(BADGE_CACHE_NAME);
        const res = await cache.match(BADGE_CACHE_KEY);
        return res ? Number(await res.text()) || 0 : 0;
    } catch {
        return 0;
    }
}

async function setBadgeCount(count) {
    const cache = await caches.open(BADGE_CACHE_NAME);
    await cache.put(BADGE_CACHE_KEY, new Response(String(count)));
}

async function incrementBadge() {
    if (!("setAppBadge" in self.navigator)) return;
    try {
        const next = (await getBadgeCount()) + 1;
        await setBadgeCount(next);
        await self.navigator.setAppBadge(next);
    } catch {
        // Badging API indisponible : la notif s'affiche quand même, seule
        // la petite bulle de nombre sera absente.
    }
}

self.addEventListener("push", (event) => {
    const data = event.data ? event.data.json() : {};
    event.waitUntil(
        Promise.all([
            self.registration.showNotification(data.title || "Nouvelle réservation Laveoo", {
                body: data.body || "",
                icon: "/android-chrome-192x192.png",
                badge: "/android-chrome-192x192.png",
            }),
            incrementBadge(),
        ]),
    );
});

self.addEventListener("notificationclick", (event) => {
    event.notification.close();
    event.waitUntil(
        (async () => {
            const allClients = await self.clients.matchAll({ type: "window", includeUncontrolled: true });
            const existing = allClients.find((c) => c.url.includes("/admin"));
            if (existing) {
                await existing.focus();
                existing.navigate("/admin");
                return;
            }
            await self.clients.openWindow("/admin");
        })(),
    );
});
