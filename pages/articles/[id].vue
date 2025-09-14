<template>
  <div class="min-h-screen bg-background pt-20">
    <div class="container mx-auto px-4 py-12">
      <!-- Loading -->
      <div v-if="pending" class="flex justify-center items-center py-12">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-brand"></div>
        <span class="mr-3 text-gray-600">جاري تحميل المقال...</span>
      </div>

      <!-- Error -->
      <div v-else-if="error || !article" class="text-center py-12">
        <div class="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon name="lucide:alert-circle" class="w-8 h-8 text-red-500" />
        </div>
        <h3 class="text-lg font-semibold text-gray-800 mb-2">
          {{ error?.statusMessage || 'المقال غير موجود' }}
        </h3>
        <p class="text-gray-600 mb-6">
          {{ error?.message || 'عذراً، لم نتمكن من العثور على المقال المطلوب.' }}
        </p>
        <NuxtLink
          to="/articles"
          class="inline-flex items-center space-x-reverse space-x-2 bg-brand text-white px-6 py-3 rounded-lg hover:bg-brand-dark transition-colors"
        >
          <Icon name="lucide:arrow-right" class="w-5 h-5" />
          <span>العودة إلى المقالات</span>
        </NuxtLink>
      </div>

      <!-- Article Content -->
      <div v-else-if="article">
        <!-- Breadcrumb -->
        <nav class="mb-8">
          <div class="flex items-center space-x-reverse space-x-2 text-sm text-gray-500">
            <NuxtLink to="/" class="hover:text-brand">الرئيسية</NuxtLink>
            <span>/</span>
            <NuxtLink to="/articles" class="hover:text-brand">المقالات</NuxtLink>
            <span>/</span>
            <span class="text-brand">{{ article.title }}</span>
          </div>
        </nav>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <!-- Main Content -->
          <div class="lg:col-span-2">
            <article class="bg-white rounded-2xl overflow-hidden shadow-lg">
              <!-- Article Header -->
              <div class="relative">
                <img
                  :src="article.image"
                  :alt="article.title"
                  class="w-full h-64 md:h-80 object-cover"
                />
                <div class="absolute top-6 right-6">
                  <span class="bg-brand text-white px-4 py-2 rounded-full font-medium">
                    {{ article.category?.name || article.category }}
                  </span>
                </div>
              </div>

              <div class="p-8">
                <!-- Title -->
                <h1 class="text-3xl md:text-4xl font-bold text-brand-dark mb-6 leading-tight">
                  {{ article.title }}
                </h1>

                <!-- Meta Info -->
                <div class="flex flex-wrap items-center gap-6 mb-8 text-gray-500">
                  <div class="flex items-center space-x-reverse space-x-2">
                    <Icon name="lucide:user" class="w-5 h-5" />
                    <span>{{ article.author || 'محمد عبدالعليم داود' }}</span>
                  </div>
                  <div class="flex items-center space-x-reverse space-x-2">
                    <Icon name="lucide:calendar" class="w-5 h-5" />
                    <span>{{ formatDate(article.date) }}</span>
                  </div>
                  <div class="flex items-center space-x-reverse space-x-2 hide-read-time">
                    <Icon name="lucide:clock" class="w-5 h-5" />
                    <span>{{ article.readTime }}</span>
                  </div>
                  <div class="flex items-center space-x-reverse space-x-2 hide-views">
                    <Icon name="lucide:eye" class="w-5 h-5" />
                    <span>{{ article.views }}</span>
                  </div>
                </div>

                <!-- Content -->
                <div
                  class="prose prose-lg max-w-none text-gray-700 leading-relaxed"
                  v-html="article.content"
                />

                <!-- Tags -->
                <div v-if="article.tags?.length" class="mt-8 pt-8 border-t border-gray-200">
                  <h3 class="text-lg font-bold mb-4">الكلمات المفتاحية</h3>
                  <div class="flex flex-wrap gap-2">
                    <span
                      v-for="tag in article.tags"
                      :key="tag"
                      class="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm hover:bg-brand hover:text-white transition-colors cursor-pointer"
                    >
                      #{{ tag }}
                    </span>
                  </div>
                </div>

                <!-- Share -->
                <div class="mt-8 pt-8 border-t border-gray-200">
                  <h3 class="text-lg font-bold mb-4">شارك المقال</h3>
                  <div class="flex space-x-reverse space-x-4">
                    <button class="flex items-center space-x-reverse space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                      <Icon name="lucide:facebook" class="w-5 h-5" />
                      <span>فيسبوك</span>
                    </button>
                    <button class="flex items-center space-x-reverse space-x-2 bg-blue-400 text-white px-4 py-2 rounded-lg hover:bg-blue-500 transition-colors">
                      <Icon name="lucide:twitter" class="w-5 h-5" />
                      <span>تويتر</span>
                    </button>
                    <button class="flex items-center space-x-reverse space-x-2 bg-blue-800 text-white px-4 py-2 rounded-lg hover:bg-blue-900 transition-colors">
                      <Icon name="lucide:linkedin" class="w-5 h-5" />
                      <span>لينكد إن</span>
                    </button>
                  </div>
                </div>
              </div>
            </article>
          </div>

          <!-- Sidebar -->
          <div class="lg:col-span-1">
            <AuthorInfo />
          </div>
        </div>

        <!-- Back to Articles -->
        <div class="text-center mt-12">
          <NuxtLink
            to="/articles"
            class="inline-flex items-center space-x-reverse space-x-2 bg-brand text-white px-8 py-4 rounded-full font-bold hover:bg-brand-dark transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            <Icon name="lucide:arrow-right" class="w-5 h-5" />
            <span>العودة إلى المقالات</span>
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const route = useRoute()
const { id } = route.params

// Fetch article data directly from external API
const { data: articleResponse, pending, error } = await useFetch(`https://demo-api.abdaleemdawood.com/api/v1/articles/${id}`)

const article = computed(() => {
  if (articleResponse.value?.status === 'success') {
    return articleResponse.value.data.data
  }
  return null
})

// Format date helper
const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('ar-EG')
}

// SEO
useHead({
  title: () => article.value?.title ? `${article.value.title} - محمد عبدالعليم داود` : 'مقال - محمد عبدالعليم داود',
  meta: [
    { name: 'description', content: () => article.value?.description || article.value?.excerpt || 'مقال من موقع محمد عبدالعليم داود' }
  ]
})
</script>