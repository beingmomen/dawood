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
</script>