<template>
  <div class="min-h-screen bg-background font-arabic">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup>
// Initialize global data with server-side rendering
// const { globalData, allData, pending, error } = useData();

const globalData = useState("globalData", () => ({}));

const { data } = await useAPI("/data/all");
globalData.value = data.value.data;
// console.warn("data", data.value.data);

// Enhanced SEO and meta tags
useHead({
  htmlAttrs: {
    lang: "ar",
    dir: "rtl",
  },
  meta: [
    { charset: "utf-8" },
    { name: "viewport", content: "width=device-width, initial-scale=1" },
    { name: "format-detection", content: "telephone=no" },
    { name: "theme-color", content: "#1e40af" },
    { name: "msapplication-TileColor", content: "#1e40af" },
    { name: "apple-mobile-web-app-capable", content: "yes" },
    { name: "apple-mobile-web-app-status-bar-style", content: "default" },
  ],
  link: [
    { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
    { rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
    { rel: "manifest", href: "/manifest.json" },
  ],
});

// Dynamic SEO based on global data
const personalInfo = computed(() => globalData.value?.personalInfo?.items?.[0]);

watchEffect(() => {
  if (personalInfo.value) {
    useSeoMeta({
      title: `${personalInfo.value.name} - ${personalInfo.value.title}`,
      description: personalInfo.value.summary,
      ogTitle: `${personalInfo.value.name} - ${personalInfo.value.title}`,
      ogDescription: personalInfo.value.summary,
      ogType: "website",
      ogImage: personalInfo.value.image || "/og-image.jpg",
      twitterCard: "summary_large_image",
      twitterTitle: `${personalInfo.value.name} - ${personalInfo.value.title}`,
      twitterDescription: personalInfo.value.summary,
      twitterImage: personalInfo.value.image || "/og-image.jpg",
    });
  }
});

// Performance optimization: Preload critical resources
useHead({
  link: [
    { rel: "dns-prefetch", href: "//fonts.googleapis.com" },
    { rel: "preconnect", href: "//fonts.gstatic.com", crossorigin: "" },
  ],
});

// Error handling for failed data fetching
if (import.meta.client) {
  watch(error, (newError) => {
    if (newError) {
      console.error("Global data fetch error:", newError);
      // You could show a toast notification here
    }
  });
}

// JSON-LD structured data for SEO
useJsonld(() => {
  if (!personalInfo.value) return null;

  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: personalInfo.value.name,
    jobTitle: personalInfo.value.title,
    description: personalInfo.value.summary,
    image: personalInfo.value.image,
    url: "https://your-domain.com",
    sameAs: [
      personalInfo.value.contact?.social?.facebook,
      personalInfo.value.contact?.social?.twitter,
      personalInfo.value.contact?.social?.linkedin,
    ].filter(Boolean),
    contactPoint: {
      "@type": "ContactPoint",
      email: personalInfo.value.contact?.email,
      telephone: personalInfo.value.contact?.phone,
    },
  };
});
</script>