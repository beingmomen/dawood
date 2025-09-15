<template>
  <section class="py-20 bg-background">
    <div class="container mx-auto px-4">
      <div class="text-center mb-16">
        <h2 class="text-4xl md:text-5xl font-bold text-brand-dark mb-6">
          أحدث المقالات
        </h2>
        <p class="text-xl text-gray-600 max-w-3xl mx-auto">
          آخر المقالات والتحليلات في القضايا السياسية والاجتماعية المعاصرة
        </p>
      </div>

      <!-- Loading State -->
      <div v-if="pending" class="flex justify-center items-center py-12">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-brand"></div>
        <span class="mr-3 text-gray-600">جاري تحميل المقالات...</span>
      </div>

      <!-- Articles Grid -->
      <div v-else-if="articles.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        <article
          v-for="(article, index) in articles"
          :key="article.id"
          class="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 animate-fade-in"
          :style="{ animationDelay: `${index * 150}ms` }"
        >
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
      </div>

      <!-- View All Button -->
      <div class="text-center">
        <NuxtLink
          to="/articles"
          class="inline-flex items-center space-x-reverse space-x-2 bg-brand text-white px-8 py-4 rounded-full font-bold hover:bg-brand-dark transition-all duration-300 transform hover:scale-105 shadow-lg"
        >
          <span>عرض جميع المقالات</span>
          <Icon name="lucide:arrow-left" class="w-5 h-5" />
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<script setup>
// Fetch latest articles from global state
const globalData = useState('globalData')
const pending = ref(false)

const articles = computed(() => {
  const articlesData = globalData.value?.articles?.items
  if (!Array.isArray(articlesData)) return []
  
  // Map API data to component format
  return articlesData.slice(0, 6).map(article => ({
    id: article._id,
    title: article.title,
    excerpt: article.description,
    image: article.image,
    date: article.date,
    category: article.categoryId?.name || 'عام',
    readTime: '5 دقائق' // Default read time
  }))
})

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('ar-EG')
}
</script>