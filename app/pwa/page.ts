self.addEventListener('fetch', event => {
    const url = new URL(event.request.url);
    // If this is an incoming POST request for the
    // registered "action" URL, respond to it.
    if (event.request.method === 'POST' && url.pathname === '/pwa') {
      event.respondWith((async () => {
        const formData = await event.request.formData();
        const link = formData.get('link') || '';
        const responseUrl = link;
        return Response.redirect("/", 303);
      })());
    }
  });