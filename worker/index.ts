interface Env {
  ASSETS: { fetch(request: Request): Promise<Response> };
  EXISTING_SITE: { fetch(request: Request): Promise<Response> };
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    if (url.pathname === '/model-timeline') {
      url.pathname = '/model-timeline/';
      return Response.redirect(url.toString(), 308);
    }
    if (url.pathname.startsWith('/model-timeline/')) {
      return env.ASSETS.fetch(request);
    }
    // The route wildcard also matches names such as /model-timeline-other.
    // Use a service binding: fetch(request) would bypass the existing route Worker.
    return env.EXISTING_SITE.fetch(request);
  },
};
