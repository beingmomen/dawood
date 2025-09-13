<template>
  <div>
    <AppHeader />
    <main>
      <slot />
    </main>
    <AppFooter />
    <BackToTop />
  </div>
</template>

<script setup>
// Scroll to top on route change
const route = useRoute()

watch(() => route.path, () => {
  if (process.client) {
    window.scrollTo(0, 0)
  }
})
</script>