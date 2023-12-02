const storage = (() => {
  let dbInstance;

  function getDB() {
    if (dbInstance) return dbInstance;

    dbInstance = new Promise((resolve, reject) => {
      const openreq = indexedDB.open("localforage");

      openreq.onerror = () => {
        reject(openreq.error);
      };

      openreq.onsuccess = () => {
        resolve(openreq.result);
      };
    });

    return dbInstance;
  }

  async function withStore(type, callback) {
    const db = await getDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction("keyvaluepairs", type);
      transaction.oncomplete = () => resolve();
      transaction.onerror = () => reject(transaction.error);
      callback(transaction.objectStore("keyvaluepairs"));
    });
  }

  return {
    async get(key) {
      let request;
      await withStore("readonly", (store) => {
        request = store.get(key);
      });
      return request.result;
    },
    set(key, value) {
      return withStore("readwrite", (store) => {
        store.put(value, key);
      });
    },
    delete(key) {
      return withStore("readwrite", (store) => {
        store.delete(key);
      });
    },
  };
})();

self.addEventListener("install", () => {
  console.log("sw installed");
});

self.addEventListener("activate", () => {
  console.log("sw activated");
  return self.clients.claim();
});

self.addEventListener("fetch", (e) => {
  const url = new URL(e.request.url).origin;

  if (url === "https://www.googleapis.com") {
    e.respondWith(
      storage.get("accessToken").then((token) => {
        const req = new Request(e.request, {
          mode: "cors",
          credentials: "same-origin",
          headers: {
            range: e.request.headers.get("range"),
            authorization: Boolean(e.request.headers.get("authorization")) ? e.request.headers.get("authorization") : "Bearer " + token,
          },
        });
        return fetch(req);
      })
    );
  }
});
