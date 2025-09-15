<template>
  <div>
    <HeroSection />
    <ClientOnly>
      <AchievementsSection />
      <template #fallback>
        <div class="h-96 bg-gray-100 animate-pulse rounded-lg mx-4 my-8"></div>
      </template>
    </ClientOnly>
    <LatestArticlesSection />
    <ClientOnly>
      <MediaTabsSection />
      <template #fallback>
        <div class="h-96 bg-gray-100 animate-pulse rounded-lg mx-4 my-8"></div>
      </template>
    </ClientOnly>
    <PressStatementsSection />
  </div>
</template>

<script setup>
// Initialize data fetching
const { globalData } = useData()

// SEO setup
const { setSEO } = useSEO()
const personalInfo = computed(() => globalData.value?.personalInfo?.items?.[0])
const config = useRuntimeConfig()

// Set homepage SEO
setSEO({
  title: 'الرئيسية',
  description: 'الموقع الرسمي للصحفي وعضو البرلمان محمد عبدالعليم داود - مقالات، أخبار، وأنشطة برلمانية',
  url: '/',
  type: 'website'
})

// Structured data for homepage
useJsonld(() => {
  if (!personalInfo.value) return null

  return [
    {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: personalInfo.value.name,
      jobTitle: personalInfo.value.title,
      description: personalInfo.value.summary,
      image: personalInfo.value.image,
      url: config.public.siteUrl,
      sameAs: [
        personalInfo.value.contact?.social?.facebook,
        personalInfo.value.contact?.social?.twitter,
        personalInfo.value.contact?.social?.linkedin
      ].filter(Boolean)
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'محمد عبدالعليم داود',
      description: 'الموقع الرسمي للصحفي وعضو البرلمان محمد عبدالعليم داود',
      url: config.public.siteUrl,
      potentialAction: {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: `${config.public.siteUrl}/search?q={search_term_string}`
        },
        'query-input': 'required name=search_term_string'
      }
    }
  ]
})

// Performance optimizations
onMounted(() => {
  if (import.meta.client) {
    const { preloadResource } = usePerformance()

    // Preload critical resources for better performance
    preloadResource('/api/articles?limit=5', 'fetch')
    preloadResource('/api/press-statements?limit=3', 'fetch')

    // Preload images that will be visible soon
    nextTick(() => {
      preloadResource('/images/hero-bg.jpg', 'image')
    })
  }
})
</script>