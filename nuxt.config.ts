export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  future: {
    compatibilityVersion: 4,
  },
  experimental: {
    sharedPrerenderData: false,
    defaults: {
      useAsyncData: {
        deep: true
      }
    }
  },
  devtools: { enabled: true },
  modules: [
    "@nuxtjs/tailwindcss",
    "@pinia/nuxt",
    "@nuxtjs/google-fonts",
    "@nuxt/icon",
  ],
  css: ["~/assets/css/main.css"],
  googleFonts: {
    families: {
      Tajawal: [300, 400, 500, 700],
    },
  },
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
      ],
    },
  },
  runtimeConfig: {
    public: {
      apiBaseUrl: process.env.BASE_URL,
    },
  },
  typescript: {
    typeCheck: false
  },
});
