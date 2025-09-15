<template>
  <div class="min-h-screen bg-background pt-20">
    <div class="container mx-auto px-4 py-12">
      <!-- Loading -->
      <div v-if="pending" class="flex justify-center items-center py-12">
        <div
          class="animate-spin rounded-full h-12 w-12 border-b-2 border-brand"
        ></div>
        <span class="mr-3 text-gray-600">جاري تحميل البيان...</span>
      </div>

      <!-- Error -->
      <div v-else-if="error || !statement" class="text-center py-12">
        <div
          class="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4"
        >
          <Icon name="lucide:alert-circle" class="w-8 h-8 text-red-500" />
        </div>
        <h3 class="text-lg font-semibold text-gray-800 mb-2">
          {{ error?.statusMessage || "البيان غير موجود" }}
        </h3>
        <p class="text-gray-600 mb-6">
          {{
            error?.message || "عذراً، لم نتمكن من العثور على البيان المطلوب."
          }}
        </p>
        <NuxtLink
          to="/press-statements"
          class="inline-flex items-center space-x-reverse space-x-2 bg-brand text-white px-6 py-3 rounded-lg hover:bg-brand-dark transition-colors"
        >
          <Icon name="lucide:arrow-right" class="w-5 h-5" />
          <span>العودة إلى البيانات الصحفية</span>
        </NuxtLink>
      </div>

      <!-- Statement Content -->
      <div v-else-if="statement">
        <!-- Breadcrumb -->
        <nav class="mb-8">
          <div
            class="flex items-center space-x-reverse space-x-2 text-sm text-gray-500"
          >
            <NuxtLink to="/" class="hover:text-brand">الرئيسية</NuxtLink>
            <span>/</span>
            <NuxtLink to="/press-statements" class="hover:text-brand"
              >البيانات الصحفية</NuxtLink
            >
            <span>/</span>
            <span class="text-brand">{{ statement.title }}</span>
          </div>
        </nav>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <!-- Main Content -->
          <div class="lg:col-span-2">
            <article class="bg-white rounded-2xl overflow-hidden shadow-lg">
              <div class="p-8">
                <!-- Category Badge -->
                <div class="mb-6">
                  <span
                    class="bg-brand text-white px-4 py-2 rounded-full font-medium"
                  >
                    {{
                      statement.category?.name ||
                      statement.category ||
                      "بيان صحفي"
                    }}
                  </span>
                </div>
                <!-- Title -->
                <h1
                  class="text-3xl md:text-4xl font-bold text-brand-dark mb-6 leading-tight"
                >
                  {{ statement.title }}
                </h1>

                <!-- Meta Info -->
                <div
                  class="flex flex-wrap items-center gap-6 mb-8 text-gray-500"
                >
                  <div class="flex items-center space-x-reverse space-x-2">
                    <Icon name="lucide:user" class="w-5 h-5" />
                    <span>{{
                      statement.author?.name || "محمد عبدالعليم داود"
                    }}</span>
                  </div>
                  <div class="flex items-center space-x-reverse space-x-2">
                    <Icon name="lucide:calendar" class="w-5 h-5" />
                    <span>{{ formatDate(statement.date) }}</span>
                  </div>
                </div>

                <!-- Content -->
                <div
                  class="prose prose-lg max-w-none text-gray-700 leading-relaxed"
                  v-html="statement.content || statement.excerpt"
                />

                <!-- Tags -->
                <div
                  v-if="statement.tags?.length"
                  class="mt-8 pt-8 border-t border-gray-200"
                >
                  <h3 class="text-lg font-bold mb-4">الكلمات المفتاحية</h3>
                  <div class="flex flex-wrap gap-2">
                    <span
                      v-for="tag in statement.tags"
                      :key="tag"
                      class="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm hover:bg-brand hover:text-white transition-colors cursor-pointer"
                    >
                      #{{ tag }}
                    </span>
                  </div>
                </div>

                <!-- Share -->
                <div class="mt-8 pt-8 border-t border-gray-200">
                  <h3 class="text-lg font-bold mb-4">شارك البيان</h3>
                  <div class="flex space-x-reverse space-x-4">
                    <button
                      @click="shareOnFacebook"
                      class="flex items-center space-x-reverse space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <Icon name="lucide:facebook" class="w-5 h-5" />
                      <span>فيسبوك</span>
                    </button>
                    <button
                      @click="shareOnTwitter"
                      class="flex items-center space-x-reverse space-x-2 bg-blue-400 text-white px-4 py-2 rounded-lg hover:bg-blue-500 transition-colors"
                    >
                      <Icon name="lucide:twitter" class="w-5 h-5" />
                      <span>تويتر</span>
                    </button>
                    <button
                      @click="copyLink"
                      class="flex items-center space-x-reverse space-x-2 bg-blue-800 text-white px-4 py-2 rounded-lg hover:bg-blue-900 transition-colors"
                    >
                      <Icon name="lucide:linkedin" class="w-5 h-5" />
                      <span>نسخ الرابط</span>
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

        <!-- Back to Press Statements -->
        <div class="text-center mt-12">
          <NuxtLink
            to="/press-statements"
            class="inline-flex items-center space-x-reverse space-x-2 bg-brand text-white px-8 py-4 rounded-full font-bold hover:bg-brand-dark transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            <Icon name="lucide:arrow-right" class="w-5 h-5" />
            <span>العودة إلى البيانات الصحفية</span>
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const route = useRoute();
const { id } = route.params;

// Fetch statement data from external API
const {
  data: apiResponse,
  pending,
  error,
  refresh,
} = await useAPI(
  `/press-statements/${id}`
);

// Extract statement from nested data structure
const statement = computed(() => apiResponse.value?.data?.data || null);

// Methods
const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString("ar-EG");
};

const shareOnTwitter = () => {
  const url = encodeURIComponent(window.location.href);
  const text = encodeURIComponent(statement.value?.title || "بيان صحفي");
  window.open(
    `https://twitter.com/intent/tweet?url=${url}&text=${text}`,
    "_blank"
  );
};

const shareOnFacebook = () => {
  const url = encodeURIComponent(window.location.href);
  window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, "_blank");
};

const copyLink = async () => {
  try {
    await navigator.clipboard.writeText(window.location.href);
    alert("تم نسخ الرابط بنجاح!");
  } catch (err) {
    console.error("Failed to copy link:", err);
  }
};

// SEO
useHead({
  title: () =>
    statement.value?.title
      ? `${statement.value.title} - محمد عبدالعليم داود`
      : "بيان صحفي - محمد عبدالعليم داود",
  meta: [
    {
      name: "description",
      content: () =>
        statement.value?.description ||
        statement.value?.excerpt ||
        "بيان صحفي من موقع محمد عبدالعليم داود",
    },
  ],
});
</script>

<style scoped>
.prose {
  @apply text-gray-800;
}

.prose h1,
.prose h2,
.prose h3,
.prose h4,
.prose h5,
.prose h6 {
  @apply text-brand-dark font-bold;
}

.prose p {
  @apply mb-4 leading-relaxed;
}

.prose ul,
.prose ol {
  @apply mr-6 mb-4;
}

.prose li {
  @apply mb-2;
}

.prose blockquote {
  @apply border-r-4 border-brand pr-4 italic text-gray-600;
}

.prose a {
  @apply text-brand hover:text-brand-dark transition-colors;
}
</style>