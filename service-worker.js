self.addEventListener("fetch", (event) => {
    if (event.request.method !== "POST") {
      event.respondWith(fetch(event.request));
      return;
    }
  
    const formDataPromise = event.request.formData();
    event.respondWith(
      formDataPromise.then((formData) => {
        const link = formData.get("link") || "";
        const url = formData.get("url") || "";
        // saveBookmark(link);
        console.log(url);
        console.log(link);
        return new Response(`Bookmark saved: ${link}`);
      })
    );
  });