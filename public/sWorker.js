let cacheName = "v1";
const prefetchData = [
  "7C",
  "7D",
  "7H",
  "7S",
  "8C",
  "8D",
  "8H",
  "8S",
  "9C",
  "9D",
  "9H",
  "9S",
  "1C",
  "1D",
  "1H",
  "1S",
  "AC",
  "AD",
  "AH",
  "AS",
  "JC",
  "JD",
  "JH",
  "JS",
  "KC",
  "KD",
  "KH",
  "KS",
  "QC",
  "QD",
  "QH",
  "QS",
  "2D",
  "2H",
  "2S",
  "3C",
  "3D",
  "3H",
  "3S",
  "4C",
  "4D",
  "4H",
  "4S",
  "5C",
  "5D",
  "5H",
  "5S",
  "6C",
  "6D",
  "6H",
  "6S",
];
const prefetchImage = prefetchData.map(
  (item) =>
    `/cards/${item[0] >= 2 && item[0] <= 6 ? "Score" : "Game"}/${item}.png`
);

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

  try {
    // if (preloadResponsePromise !== null) {
    const preloadResponse = await preloadResponsePromise;
    if (preloadResponse) {
      PutInCache(req, preloadResponse.clone());
      return preloadResponse;
    }
    // }
    const response = await fetch(req);
    PutInCache(req, response.clone());
    return response;
  } catch (error) {
    return fallback;
  }
};

const OtherCache = async ({ req, preloadResponsePromise, fallback }) => {
  try {
    if (!navigator.onLine) throw Error("No internet connection");
    const preloadResponse = await preloadResponsePromise;
    if (preloadResponse) {
      PutInCache(req, preloadResponse.clone());
      return preloadResponse;
    }
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
  // console.log(
  //   "%c Service Worker Installed:",
  //   "background:green; font-size:24px; color:white;"
  // );
  event.waitUntil(
    caches
      .open(cacheName)
      .then((cache) => {
        return Promise.all(
          prefetchImage.map((url) => {
            return fetch(url).then((res) => {
              if (res.status >= 400) throw Error("Request Failed");
              return cache.put(url, res);
            });
          })
        );
      })
      .catch((error) => {
        console.log("error: Install", error);
      })
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
              // console.log(`cache with name ${cache} is being Deleted`);
              return caches.delete(cache);
            }
          })
        );
      })
      .catch((e) => console.log(e.message))
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
          return sendMessage({ isOnline: "Back Online" });
        })
        .catch(() => {
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
        // console.log("sending client online true status");
      }
      return client.postMessage(msg);
    })
  );
}
