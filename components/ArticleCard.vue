<template>
  <article class="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 animate-fade-in">
    <div class="relative">
      <img
        :src="article.image"
        :alt="article.title"
        class="w-full h-48 object-cover"
      />
      <div class="absolute top-4 right-4">
        <span class="bg-brand text-white px-3 py-1 rounded-full text-sm font-medium">
          {{ article.category }}
        </span>
      </div>
    </div>

    <div class="p-6">
      <h3 class="text-xl font-bold text-brand-dark mb-3 line-clamp-2 hover:text-brand transition-colors">
        {{ article.title }}
      </h3>

      <p class="text-gray-600 mb-4 line-clamp-3">
        {{ article.excerpt }}
      </p>

      <div class="flex items-center justify-between text-sm text-gray-500 mb-4">
        <div class="flex items-center space-x-reverse space-x-2">
          <Icon name="lucide:calendar" class="w-4 h-4" />
          <span>{{ formatDate(article.date) }}</span>
        </div>
        <div class="flex items-center space-x-reverse space-x-2 hide-read-time">
          <Icon name="lucide:clock" class="w-4 h-4" />
          <span>{{ article.readTime }}</span>
        </div>
      </div>

      <NuxtLink
        :to="`/articles/${article.id}`"
        class="inline-flex items-center space-x-reverse space-x-2 text-brand font-semibold hover:text-brand-dark transition-colors"
      >
        <span>اقرأ المزيد</span>
        <Icon name="lucide:arrow-left" class="w-4 h-4" />
      </NuxtLink>
    </div>
  </article>
</template>

<script setup>
defineProps({
  article: {
    type: Object,
    required: true
  },
  index: {
    type: Number,
    default: 0
  }
})

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('ar-EG')
}
</script>