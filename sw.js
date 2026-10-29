// Offline shell for the WMS app. Always tries the network first so staff get the latest version;
// falls back to the saved copy when the tablet is offline. Stock data itself comes from Firebase.
const CACHE='wms-v2';
const SHELL=['./','./index.html','./config.js','./manifest.webmanifest','./icon-192.png','./icon-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(SHELL)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET')return;const u=new URL(r.url);
  const lib=/cdnjs\.cloudflare\.com|gstatic\.com\/firebasejs|fonts\.(googleapis|gstatic)\.com/.test(u.host+u.pathname);
  if(u.origin!==location.origin&&!lib)return; // Firebase data calls go straight to the network
  e.respondWith(fetch(r).then(res=>{if(res.ok||res.type==='opaque'){const cp=res.clone();caches.open(CACHE).then(c=>c.put(r,cp))}return res})
    .catch(()=>caches.match(r).then(m=>m||(r.mode==='navigate'?caches.match('./index.html'):Response.error()))))});
