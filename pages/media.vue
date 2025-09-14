<template>
  <div class="min-h-screen bg-background pt-20">
    <div class="container mx-auto px-4 py-12">
      <!-- Header -->
      <div class="text-center mb-16">
        <h1 class="text-4xl md:text-5xl font-bold text-brand-dark mb-6">
          الوسائط المتعددة
        </h1>
        <p class="text-xl text-gray-600 max-w-3xl mx-auto">
          مجموعة شاملة من الصور والفيديوهات والمستندات
        </p>
      </div>

      <!-- Media Grid with API Integration -->
      <MediaGrid />
    </div>
  </div>
</template>

<script setup>
useHead({
  title: "الوسائط المتعددة - محمد عبدالعليم داود",
  meta: [
    {
      name: "description",
      content: "مجموعة من الصور والفيديوهات والمستندات المهمة",
    },
  ],
});
</script>