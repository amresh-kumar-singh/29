let cacheName = "v1";

const PutInCache = (req, res) => {
  caches.open(cacheName).then((cache) => {
    cache.put(req, res);
  });
};

const enableNavigationPreload = async () => {
  if (self.registration.navigationPreload) {
    await self.registration.navigationPreload.enable();
  }
};

const ImageCache = async ({ req, preloadResponsePromise, fallback }) => {
  const cacheResponse = await caches.match(req);
  if (cacheResponse) return cacheResponse;

  const preloadResponse = await preloadResponsePromise;
  if (preloadResponse) {
    console.log("preload response: ", preloadResponse);
    PutInCache(req, preloadResponse.clone());
    return preloadResponse;
  }

  try {
    const response = await fetch(req);
    PutInCache(req, response.clone());
    return response;
  } catch (error) {
    return fallback;
  }
};

const OtherCache = async ({ req, preloadResponsePromise, fallback }) => {
  const preloadResponse = await preloadResponsePromise;
  if (preloadResponse) {
    PutInCache(req, preloadResponse.clone());
    return preloadResponse;
  }
  try {
    const res = await fetch(req);
    PutInCache(req, res.clone());
    return res;
  } catch (error) {
    const cacheResponse = await caches.match(req);
    if (cacheResponse) return cacheResponse;
    return fallback;
  }
};

const fallback = new Response("Network Error Happened", {
  status: 408,
  headers: {
    "Content-Type": "text/plain",
  },
});

self.addEventListener("install", (event) => {
  console.log(
    "%c Service Worker Installed:",
    "background:green; font-size:24px; color:white;"
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(enableNavigationPreload());
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
  let destination = event.request.destination;
  if (destination == "image") {
    event.respondWith(
      ImageCache({
        req: event.request,
        preloadResponsePromise: event.preloadResponse,
        fallback: fallback,
      })
    );
  } else {
    event.respondWith(
      OtherCache({
        req: event.request,
        preloadResponsePromise: event.preloadResponse,
        fallback: fallback,
      })
    );
  }
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
