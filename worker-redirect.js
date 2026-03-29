/**
 * Cloudflare Worker: 404-to-Hash Redirector
 * Add this to your Cloudflare Worker 'fetch' event.
 */

export default {
  async fetch(request, env) {
    // 1. Fetch your static site from Cloudflare Pages
    const response = await fetch(request);

    // 2. If the page is NOT FOUND (Status 404)
    if (response.status === 404) {
      const url = new URL(request.url);
      
      // 3. Issue a 302 Redirect to your clean hashtag version
      // This will trigger your Router.js to show the 'SIGNAL LOST' section.
      return Response.redirect(`${url.origin}/#404`, 302);
    }

    // 4. Otherwise, return the successful page (200, 301, etc.)
    return response;
  }
};
