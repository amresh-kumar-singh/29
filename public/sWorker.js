let cacheName = "v1";

self.addEventListener("install", (event) => {
  console.log(
    "%c Service Worker Installed:",
    "background:green; font-size:24px; color:white;"
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cache) => {
            if (cache !== cacheName) {
              console.log(`cache with name ${cache} is being Deleted`);
              return caches.delete(cache);
            }
          })
        );
      })
      .catch((e) => console.log("error from activate"))
  );
});

self.addEventListener("fetch", (event) => {
  //   let destination = event.request.destination;
  //   if (destination == "image") {
  //     console.log(event.request.destination);
  //   }

  // If network connection will fetch from network else from catche

  event.respondWith(
    fetch(event.request)
      .then((res) => {
        let resClone = res.clone();
        caches.open(cacheName).then((cache) => {
          cache.put(event.request, resClone);
        });
        return res;
      })
      .catch(() => caches.match(event.request).then((res) => res))
  );
});

self.addEventListener("message", (event) => {
  let data = event.data;
  if ("checkOnline" in data) {
    let url = `./logo192.png`;
    const req = new Request(url, { method: "HEAD" });

    event.waitUntil(
      fetch(req)
        .then((res) => {
          console.log("Online");
          return sendMessage({ isOnline: "Back Online" });
        })
        .catch(() => {
          console.log("offline");
          return sendMessage({ isOnline: "Your Currently Offline" });
        })
    );
  }
});

async function sendMessage(msg) {
  let allClients = await clients.matchAll({ includeUncontrolled: true });
  return Promise.all(
    allClients.map((client) => {
      let channel = new MessageChannel();
      if ("isOnline" in msg) {
        console.log("sending client online true status");
      }
      return client.postMessage(msg);
    })
  );
}
