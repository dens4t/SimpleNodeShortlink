var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// shortlink/src/index.js
var redirects = {
  "musrenbang": {
    name: "Musrenbang Platform",
    shortUrl: "musrenbang",
    url: "https://musrenbang.bappeda.jatimprov.go.id"
  },
  "fkp": {
    name: "Forum Konsultasi Publik",
    shortUrl: "fkp",
    url: "https://fkp.jatimprov.go.id"
  }
};
async function handleRequest(request) {
  const url = new URL(request.url);
  const pathName = url.pathname.replace("/", "").replace(/\/$/, "");
  if (pathName === "") {
    const html = await generateIndexPage();
    return new Response(html, { status: 200, headers: { "Content-Type": "text/html" } });
  }
  if (redirects[pathName]) {
    return Response.redirect(redirects[pathName].url, 301);
  }
  const notFoundHtml = await getNotFoundPage();
  return new Response(notFoundHtml, { status: 404, headers: { "Content-Type": "text/html" } });
}
__name(handleRequest, "handleRequest");
async function generateIndexPage() {
  const html = `<!DOCTYPE html>
<html>

<head>
    <title>Layanan Pemendek URL</title>
    <style>
        body {
            font-family: 'Segoe UI', Arial, sans-serif;
            line-height: 1.6;
            margin: 0;
            padding: 0;
            background: #f5f5f5;
            color: #333;
        }

        .container {
            max-width: 800px;
            margin: 0 auto;
            padding: 40px 20px;
        }

        .header {
            text-align: center;
            padding: 40px 0;
            background: #fff;
            border-radius: 10px;
            box-shadow: 0 2px 15px rgba(0, 0, 0, 0.1);
            margin-bottom: 30px;
        }

        h1 {
            color: #2c3e50;
            margin: 0;
            font-size: 2.5em;
        }

        .subtitle {
            color: #7f8c8d;
            font-size: 1.2em;
            margin-top: 10px;
        }

        .links-container {
            background: #fff;
            padding: 30px;
            border-radius: 10px;
            box-shadow: 0 2px 15px rgba(0, 0, 0, 0.1);
        }

        .links-list {
            list-style: none;
            padding: 0;
        }

        .links-list li {
            margin: 15px 0;
            padding: 15px;
            border-radius: 5px;
            background: #f8f9fa;
            transition: transform 0.2s;
        }

        .links-list li:hover {
            transform: translateX(10px);
            background: #e9ecef;
        }

        .links-list a {
            color: #3498db;
            text-decoration: none;
            font-size: 1.1em;
            display: block;
        }

        .links-list a:hover {
            color: #2980b9;
        }

        .footer {
            text-align: center;
            margin-top: 30px;
            color: #7f8c8d;
        }
    </style>
</head>

<body>
    <div class="container">
        <div class="header">
            <h1>Layanan Pemendek URL</h1>
            <p class="subtitle">Akses Cepat ke Destinasi Pilihan Anda</p>
        </div>

        <div class="links-container">
            <h2>Tuan/Nyonya hendak berkunjung kemana gerangan?</h2>
            <ul class="links-list">
                <!--DYNAMIC_LINKS-->
            </ul>
        </div>

        <div class="footer">
            <p>\xA9 2024 Layanan Pemendek URL. Hak cipta dilindungi undang-undang.</p>
        </div>
    </div>
</body>

</html>
`;
  const linksHTML = Object.entries(redirects).map(([key, value]) => `
          <li>
            <a href="/${value.shortUrl}">
              <i class="fas fa-link"></i> ${value.name}
              <small style="display: block; color: #666; margin-top: 5px;">Short URL: /${value.shortUrl}</small>
              <small style="display: block; color: #666;">Redirects to: ${value.url}</small>
            </a>
          </li>
        `).join("");
  return html.replaceAll("<!--DYNAMIC_LINKS-->", linksHTML);
}
__name(generateIndexPage, "generateIndexPage");
async function getNotFoundPage() {
  return `
       <!DOCTYPE html>
<html>

<head>
    <title>404 - Laman Tidak Ditemukan</title>
    <style>
        body {
            font-family: 'Segoe UI', Arial, sans-serif;
            line-height: 1.6;
            margin: 0;
            padding: 0;
            background: #f5f5f5;
            color: #333;
        }

        .container {
            max-width: 800px;
            margin: 0 auto;
            padding: 40px 20px;
        }

        .header {
            text-align: center;
            padding: 40px 0;
            background: #fff;
            border-radius: 10px;
            box-shadow: 0 2px 15px rgba(0, 0, 0, 0.1);
            margin-bottom: 30px;
        }

        h1 {
            color: #2c3e50;
            margin: 0;
            font-size: 2.5em;
        }

        .subtitle {
            color: #7f8c8d;
            font-size: 1.2em;
            margin-top: 10px;
        }

        .error-container {
            background: #fff;
            padding: 30px;
            border-radius: 10px;
            box-shadow: 0 2px 15px rgba(0, 0, 0, 0.1);
            text-align: center;
        }

        .error-code {
            font-size: 6em;
            color: #e74c3c;
            margin: 0;
            line-height: 1;
        }

        .error-message {
            font-size: 1.4em;
            color: #7f8c8d;
            margin: 20px 0;
        }

        .home-button {
            display: inline-block;
            padding: 12px 30px;
            background: #3498db;
            color: #fff;
            text-decoration: none;
            border-radius: 5px;
            transition: background 0.3s;
            margin-top: 20px;
        }

        .home-button:hover {
            background: #2980b9;
        }

        .footer {
            text-align: center;
            margin-top: 30px;
            color: #7f8c8d;
        }
    </style>
</head>

<body>
    <div class="container">
        <div class="header">
            <h1>404 - Laman Tidak Ditemukan</h1>
            <p class="subtitle">Mohon maaf, telah terjadi kekeliruan</p>
        </div>

        <div class="error-container">
            <h2 class="error-code">404</h2>
            <p class="error-message">
                Dengan sangat menyesal diberitahukan bahwasanya laman yang Tuan/Nyonya cari
                tiada dapat ditemukan di dalam sistem kami. Kiranya hal ini telah terjadi
                lantaran alamat yang dituju telah dipindahkan ataupun dihapuskan.
            </p>
            <a href="/" class="home-button">Kembali ke Laman Utama</a>
        </div>

        <div class="footer">
            <p>\xA9 2024 Layanan Pemendek URL. Hak cipta dilindungi undang-undang.</p>
        </div>
    </div>
</body>

</html>

    `;
}
__name(getNotFoundPage, "getNotFoundPage");
var src_default = {
  async fetch(request) {
    return handleRequest(request);
  }
};

// ../../../../Users/Acer/AppData/Roaming/npm/node_modules/wrangler/templates/middleware/middleware-ensure-req-body-drained.ts
var drainBody = /* @__PURE__ */ __name(async (request, env, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env);
  } finally {
    try {
      if (request.body !== null && !request.bodyUsed) {
        const reader = request.body.getReader();
        while (!(await reader.read()).done) {
        }
      }
    } catch (e) {
      console.error("Failed to drain the unused request body.", e);
    }
  }
}, "drainBody");
var middleware_ensure_req_body_drained_default = drainBody;

// ../../../../Users/Acer/AppData/Roaming/npm/node_modules/wrangler/templates/middleware/middleware-miniflare3-json-error.ts
function reduceError(e) {
  return {
    name: e?.name,
    message: e?.message ?? String(e),
    stack: e?.stack,
    cause: e?.cause === void 0 ? void 0 : reduceError(e.cause)
  };
}
__name(reduceError, "reduceError");
var jsonError = /* @__PURE__ */ __name(async (request, env, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env);
  } catch (e) {
    const error = reduceError(e);
    return Response.json(error, {
      status: 500,
      headers: { "MF-Experimental-Error-Stack": "true" }
    });
  }
}, "jsonError");
var middleware_miniflare3_json_error_default = jsonError;

// .wrangler/tmp/bundle-AFF6Zt/middleware-insertion-facade.js
var __INTERNAL_WRANGLER_MIDDLEWARE__ = [
  middleware_ensure_req_body_drained_default,
  middleware_miniflare3_json_error_default
];
var middleware_insertion_facade_default = src_default;

// ../../../../Users/Acer/AppData/Roaming/npm/node_modules/wrangler/templates/middleware/common.ts
var __facade_middleware__ = [];
function __facade_register__(...args) {
  __facade_middleware__.push(...args.flat());
}
__name(__facade_register__, "__facade_register__");
function __facade_invokeChain__(request, env, ctx, dispatch, middlewareChain) {
  const [head, ...tail] = middlewareChain;
  const middlewareCtx = {
    dispatch,
    next(newRequest, newEnv) {
      return __facade_invokeChain__(newRequest, newEnv, ctx, dispatch, tail);
    }
  };
  return head(request, env, ctx, middlewareCtx);
}
__name(__facade_invokeChain__, "__facade_invokeChain__");
function __facade_invoke__(request, env, ctx, dispatch, finalMiddleware) {
  return __facade_invokeChain__(request, env, ctx, dispatch, [
    ...__facade_middleware__,
    finalMiddleware
  ]);
}
__name(__facade_invoke__, "__facade_invoke__");

// .wrangler/tmp/bundle-AFF6Zt/middleware-loader.entry.ts
var __Facade_ScheduledController__ = class ___Facade_ScheduledController__ {
  constructor(scheduledTime, cron, noRetry) {
    this.scheduledTime = scheduledTime;
    this.cron = cron;
    this.#noRetry = noRetry;
  }
  static {
    __name(this, "__Facade_ScheduledController__");
  }
  #noRetry;
  noRetry() {
    if (!(this instanceof ___Facade_ScheduledController__)) {
      throw new TypeError("Illegal invocation");
    }
    this.#noRetry();
  }
};
function wrapExportedHandler(worker) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__ === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__.length === 0) {
    return worker;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__) {
    __facade_register__(middleware);
  }
  const fetchDispatcher = /* @__PURE__ */ __name(function(request, env, ctx) {
    if (worker.fetch === void 0) {
      throw new Error("Handler does not export a fetch() function.");
    }
    return worker.fetch(request, env, ctx);
  }, "fetchDispatcher");
  return {
    ...worker,
    fetch(request, env, ctx) {
      const dispatcher = /* @__PURE__ */ __name(function(type, init) {
        if (type === "scheduled" && worker.scheduled !== void 0) {
          const controller = new __Facade_ScheduledController__(
            Date.now(),
            init.cron ?? "",
            () => {
            }
          );
          return worker.scheduled(controller, env, ctx);
        }
      }, "dispatcher");
      return __facade_invoke__(request, env, ctx, dispatcher, fetchDispatcher);
    }
  };
}
__name(wrapExportedHandler, "wrapExportedHandler");
function wrapWorkerEntrypoint(klass) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__ === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__.length === 0) {
    return klass;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__) {
    __facade_register__(middleware);
  }
  return class extends klass {
    #fetchDispatcher = /* @__PURE__ */ __name((request, env, ctx) => {
      this.env = env;
      this.ctx = ctx;
      if (super.fetch === void 0) {
        throw new Error("Entrypoint class does not define a fetch() function.");
      }
      return super.fetch(request);
    }, "#fetchDispatcher");
    #dispatcher = /* @__PURE__ */ __name((type, init) => {
      if (type === "scheduled" && super.scheduled !== void 0) {
        const controller = new __Facade_ScheduledController__(
          Date.now(),
          init.cron ?? "",
          () => {
          }
        );
        return super.scheduled(controller);
      }
    }, "#dispatcher");
    fetch(request) {
      return __facade_invoke__(
        request,
        this.env,
        this.ctx,
        this.#dispatcher,
        this.#fetchDispatcher
      );
    }
  };
}
__name(wrapWorkerEntrypoint, "wrapWorkerEntrypoint");
var WRAPPED_ENTRY;
if (typeof middleware_insertion_facade_default === "object") {
  WRAPPED_ENTRY = wrapExportedHandler(middleware_insertion_facade_default);
} else if (typeof middleware_insertion_facade_default === "function") {
  WRAPPED_ENTRY = wrapWorkerEntrypoint(middleware_insertion_facade_default);
}
var middleware_loader_entry_default = WRAPPED_ENTRY;
export {
  __INTERNAL_WRANGLER_MIDDLEWARE__,
  middleware_loader_entry_default as default
};
//# sourceMappingURL=index.js.map
