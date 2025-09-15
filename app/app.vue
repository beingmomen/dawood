<template>
  <div class="min-h-screen bg-background font-arabic">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup>
// Global meta tags
useHead({
  htmlAttrs: {
    lang: 'ar',
    dir: 'rtl'
  }
})

// Global data fetching - call API once and store globally
const { fetchDataFromAPI } = useData()
const globalData = useState('globalData', () => null)

// Fetch data once on app initialization
await callOnce(async () => {
  try {
    const response = await fetchDataFromAPI()
    globalData.value = response.data
  } catch (error) {
    console.error('Error fetching global data:', error)
    globalData.value = null
  }
})
</script>