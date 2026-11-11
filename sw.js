const CACHE='yemekhane-shell-v28';
const FILES=[
  './',
  './index.html',
  './manifest.json',
  './blaze_face_short_range.tflite'
];

self.addEventListener('install',e=>{
  e.waitUntil(
    caches.open(CACHE)
      .then(c=>c.addAll(FILES))
      .then(()=>self.skipWaiting())
  );
});

self.addEventListener('activate',e=>{
  e.waitUntil(
    caches.keys()
      .then(keys=>Promise.all(
        keys.filter(k=>k.startsWith('yemekhane-shell-')&&k!==CACHE)
          .map(k=>caches.delete(k))
      ))
      .then(()=>self.clients.claim())
  );
});

self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET')return;
  const isPage=e.request.mode==='navigate'||new URL(e.request.url).pathname.endsWith('/index.html')||new URL(e.request.url).pathname.endsWith('/');
  if(isPage){
    e.respondWith(fetch(e.request).then(response=>{
      const copy=response.clone();
      caches.open(CACHE).then(cache=>cache.put('./index.html',copy));
      return response;
    }).catch(()=>caches.match('./index.html')));
    return;
  }
  e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request).catch(()=>caches.match('./index.html'))));
});
