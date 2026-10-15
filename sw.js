/* Queen Tech service worker: lets the site work as an app and keeps visited pages
   available offline. Always tries the network first, so prices and offers stay fresh.
   Change VERSION when the list of core files changes. */
const VERSION = "qt-2026-10-15g";
const FONTS = "qt-fonts";
const CORE = [
  "/offline.html",
  "/i18n.js",
  "/i18n/ar-common.js",
  "/rtl.css",
  "/pages.css",
  "/assistant.js",
  "/manifest.webmanifest",
  "/icons/icon-192.png",
  "/icons/maskable-192.png",
  "/favicon.ico",
  "/cursor.png",
  "/cursor@2x.png",
  "/cursor-link.png",
  "/cursor-link@2x.png"
];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(VERSION).then((c) => c.addAll(CORE)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== VERSION && k !== FONTS).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

function keep(request, response) {
  if (response && response.ok && response.type === "basic") {
    const copy = response.clone();
    caches.open(VERSION).then((c) => c.put(request, copy));
  }
  return response;
}

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);

  // Google Fonts: keep a copy so the app looks right offline.
  if (url.origin === "https://fonts.googleapis.com" || url.origin === "https://fonts.gstatic.com") {
    event.respondWith(
      caches.open(FONTS).then(async (c) => {
        const hit = await c.match(req);
        if (hit) return hit;
        const res = await fetch(req);
        if (res.ok) c.put(req, res.clone());
        return res;
      })
    );
    return;
  }

  if (url.origin !== self.location.origin) return;                 // Firebase, WhatsApp, YouTube… go straight to the network
  if (/\.(apk|aab|zip)$/i.test(url.pathname)) return;               // never cache app downloads
  if (/^\/(android|ai-worker)\//.test(url.pathname)) return;

  // Brand cursor images: serve from the cache straight away so the cursor never flickers between pages.
  if (/^\/cursor(-link)?(@2x)?\.png$/.test(url.pathname)) {
    event.respondWith(caches.match(req, { ignoreSearch: true }).then((hit) => hit || fetch(req).then((res) => keep(req, res))));
    return;
  }

  if (req.mode === "navigate") {
    event.respondWith(
      fetch(req)
        .then((res) => keep(req, res))
        .catch(async () => (await caches.match(req, { ignoreSearch: true })) || caches.match("/offline.html"))
    );
    return;
  }

  event.respondWith(
    fetch(req)
      .then((res) => keep(req, res))
      .catch(() => caches.match(req, { ignoreSearch: true }))
  );
});
