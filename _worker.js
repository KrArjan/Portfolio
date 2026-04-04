/**
 * Cloudflare Worker: Portfolio Backend Wrapper
 * -------------------------------------------
 * This file serves as a minimal gateway to the Unified Logic in /api/contact.js.
 */

import { contactLogic } from './api/contact.js';

export default {
  async fetch(request, env) {
    try {
      const url = new URL(request.url);
      const origin = request.headers.get("Origin");

      // 1. Handle CORS Pre-flight (OPTIONS)
      if (request.method === "OPTIONS") {
        return new Response(null, {
          status: 204,
          headers: {
            'Access-Control-Allow-Origin': origin || '*',
            'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Max-Age': '86400',
          }
        });
      }

      // 2. API: Unified Contact Form Submission
      if (url.pathname === "/api/contact" && request.method === "POST") {
        const body = await request.json();
        const result = await contactLogic(body, env, request.headers);

        return new Response(JSON.stringify(result), {
          status: result.status,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': origin || '*'
          }
        });
      }

      // 3. SPA Routing & Static Assets
      const hasExtension = /\.[a-z0-9]{2,4}$/i.test(url.pathname);
      if (!hasExtension && url.pathname !== "/") {
        if (!env.ASSETS) return new Response("ERROR_SPA_ROUTING: env.ASSETS_MISSING", { status: 500 });
        return env.ASSETS.fetch(new Request(url.origin, request));
      }

      if (!env.ASSETS) return new Response("ERROR_STATIC_ASSET: env.ASSETS_MISSING.", { status: 500 });
      return env.ASSETS.fetch(request);

    } catch (err) {
      console.error("Worker Global Exception:", err);
      return new Response(JSON.stringify({ error: 'WORKER_RUNTIME_EXCEPTION' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }
  }
};
