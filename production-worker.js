/**
 * Cloudflare Worker: SPA Catch-all & Rewrite
 * Add this to your Cloudflare Worker 'fetch' event.
 * It ensures that Clean URLs like /stack are handled by index.html.
 */

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const path = url.pathname;

    // 1. Let the request through for standard assets (CSS, JS, Images, etc.)
    // We only want to rewrite 'Page Paths' like /projects or /stack.
    const isAsset = path.includes('.') && !path.endsWith('.html');
    
    let response = await fetch(request);

    // 2. If it's a 404 and NOT a direct asset request
    if (response.status === 404 && !isAsset) {
      // INTERNAL REWRITE: Fetch index.html instead, but KEEP the original URL
      // This allows Router.js to see /stack and load the correct section
      const indexRequest = new Request(new URL('/index.html', url.origin), request);
      return fetch(indexRequest);
    }

    // 3. Otherwise, return the original response
    return response;
  }
};
