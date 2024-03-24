self.addEventListener('fetch', function(event) {
    event.respondWith(
      caches.match(event.request).then(function(response) {
        return response || fetch(event.request);
      })
    );
  });

  self.addEventListener('fetch', event => {
    const url = new URL(event.request.url);
    // If this is an incoming POST request for the
    // registered "action" URL, respond to it.
    if (event.request.method === 'POST' && url.pathname === '/bookmark') {
      event.respondWith((async () => {
        const formData = await event.request.formData();
        const link = formData.get('link') || '';
        const responseUrl = await saveBookmark(link);
        return Response.redirect(responseUrl, 303);
      })());
    }
  });