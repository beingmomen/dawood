export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  future: {
    compatibilityVersion: 4,
  },

  // Performance optimizations
  experimental: {
    sharedPrerenderData: false,
    defaults: {
      useAsyncData: {
        deep: true,
      },
    },
    payloadExtraction: false, // Improve hydration performance
    viewTransition: true, // Enable view transitions
    inlineSSRStyles: false, // Let CSS be external to avoid render blocking
  },

  // Enable development tools
  devtools: { enabled: true },

  // Core modules
  modules: [
    "@nuxt/ui",
    "@pinia/nuxt",
    "@nuxtjs/google-fonts",
    "@nuxt/icon",
    "@nuxtjs/sitemap",
    "@nuxtjs/robots",
    "@nuxt/image",
  ],

  // Global CSS
  css: ["~/assets/css/main.css"],

  // Font optimization
  googleFonts: {
    families: {
      Tajawal: [300, 400, 500, 700],
    },
    display: 'swap', // Improve font loading performance
    preload: true,
    download: true, // Download fonts to serve locally
    inject: false // Inject manually to control loading
  },

  // SEO and PWA configuration
  app: {
    head: {
      htmlAttrs: {
        lang: "ar",
        dir: "rtl",
      },
      title: "محمد عبدالعليم داود - عضو البرلمان",
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        {
          name: "description",
          content:
            "الموقع الرسمي للصحفي وعضو البرلمان محمد عبدالعليم داود - مقالات، أخبار، وأنشطة برلمانية",
        },
        { name: "format-detection", content: "telephone=no" },
        { name: "msapplication-TileColor", content: "#1e40af" },
        { name: "theme-color", content: "#1e40af" },
      ],
      link: [
        { rel: "icon", type: "image/x-icon", href: "/logo.webp" },
        { rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
        { rel: "preconnect", href: "https://fonts.gstatic.com", crossorigin: "" },
        { rel: "preload", href: "https://fonts.googleapis.com/css2?family=Tajawal:wght@300;400;500;700&display=swap", as: "style", onload: "this.onload=null;this.rel='stylesheet'" },
      ],
    },
  },

  // Runtime configuration
  runtimeConfig: {
    public: {
      apiBaseUrl: process.env.BASE_URL || "https://api.example.com",
      siteUrl: process.env.SITE_URL || "https://your-domain.com",
    },
  },

  // TypeScript configuration
  typescript: {
    typeCheck: false,
  },

  // Build optimizations
  build: {
    transpile: [],
    analyze: false, // Set to true to analyze bundle
  },

  // Image optimization
  image: {
    provider: 'ipx',
    quality: 80,
    format: ['webp', 'jpg'],
    densities: [1, 2],
    screens: {
      xs: 320,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      xxl: 1536
    }
  },

  // Vite optimizations
  vite: {
    optimizeDeps: {
      include: ["vue", "vue-router", "@vueuse/core"],
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['vue', 'vue-router'],
            utils: ['@vueuse/core']
          }
        }
      }
    }
  },

  // Nitro optimizations for SSR
  nitro: {
    compressPublicAssets: true,
    minify: true,
    prerender: {
      crawlLinks: true,
      routes: [
        "/",
        "/articles",
        "/press-statements",
        "/cv",
        "/media",
        "/privacy-policy",
        "/terms-of-service",
        "/disclaimer",
      ],
    },
    storage: {
      redis: {
        driver: 'redis',
        // Add redis config if needed for caching
      }
    }
  },

  // Site configuration for SEO modules
  site: {
    url: process.env.SITE_URL || "https://your-domain.com",
    name: "محمد عبدالعليم داود",
    description: "الموقع الرسمي للصحفي وعضو البرلمان محمد عبدالعليم داود",
    defaultLocale: "ar",
  },

  // Sitemap configuration
  sitemap: {
    hostname: process.env.SITE_URL || "https://your-domain.com",
    gzip: true,
    exclude: ["/admin/**"],
  },

  // Robots.txt configuration
  robots: {
    UserAgent: "*",
    Disallow: ["/admin"],
    Sitemap:
      (process.env.SITE_URL || "https://your-domain.com") + "/sitemap.xml",
  },

  // Route rules for performance
  routeRules: {
    // Homepage pre-rendered at build time
    "/": { prerender: true },

    // Static pages pre-rendered at build time
    "/cv": { prerender: true },
    "/privacy-policy": { prerender: true },
    "/terms-of-service": { prerender: true },
    "/disclaimer": { prerender: true },

    // Articles and press statements with ISR
    "/articles/**": { isr: 3600 }, // Regenerate every hour
    "/press-statements/**": { isr: 3600 },

    // API routes
    "/api/**": { cors: true, headers: { "Cache-Control": "s-maxage=300" } },
  },
});
