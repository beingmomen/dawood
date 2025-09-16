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
  ],

  // Global CSS
  css: ["~/assets/css/main.css"],

  // Font optimization
  // googleFonts: {
  //   families: {
  //     Tajawal: [300, 400, 500, 700],
  //   },
  //   display: 'swap', // Improve font loading performance
  //   preload: true,
  //   download: true, // Download fonts to serve locally
  //   inject: true
  // },

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
        { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
        { rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
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
  },

  // Vite optimizations
  vite: {
    optimizeDeps: {
      include: ["vue", "vue-router", "@vueuse/core"],
    },
  },

  // Nitro optimizations for SSR
  nitro: {
    compressPublicAssets: true,
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
