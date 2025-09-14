<template>
  <section class="py-20 bg-white">
    <div class="container mx-auto px-4">
      <div class="text-center mb-16">
        <h2 class="text-4xl md:text-5xl font-bold text-brand-dark mb-6">
          البيانات الصحفية
        </h2>
        <p class="text-xl text-gray-600 max-w-3xl mx-auto">
          أحدث البيانات والتصريحات الصحفية حول القضايا المهمة
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        <article
          v-for="(statement, index) in statements"
          :key="statement.id"
          class="bg-gradient-to-br from-brand/5 to-brand-light/10 rounded-2xl p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 animate-fade-in"
          :style="{ animationDelay: `${index * 150}ms` }"
        >
          <div class="flex items-center justify-between mb-4">
            <span
              class="px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
            >
              {{ statement.priority }}
            </span>
            <div
              class="flex items-center space-x-reverse space-x-2 text-gray-500 text-sm"
            >
              <Icon name="lucide:calendar" class="w-4 h-4" />
              <span>{{ formatDate(statement.date) }}</span>
            </div>
          </div>

          <h3 class="text-xl font-bold text-brand-dark mb-4 line-clamp-2">
            {{ statement.title }}
          </h3>

          <p class="text-gray-600 mb-6 line-clamp-3">
            {{ statement.excerpt }}
          </p>

          <div class="flex items-center justify-between">
            <div
              class="flex items-center space-x-reverse space-x-2 text-gray-500 text-sm hide-press-stats"
            >
              <Icon name="lucide:eye" class="w-4 h-4" />
              <span>{{ statement.views }} مشاهدة</span>
            </div>
            <button
              class="inline-flex items-center space-x-reverse space-x-2 text-brand font-semibold hover:text-brand-dark transition-colors"
            >
              <span>اقرأ البيان</span>
              <Icon name="lucide:arrow-left" class="w-4 h-4" />
            </button>
          </div>
        </article>
      </div>

      <!-- View All Button -->
      <div class="text-center">
        <NuxtLink
          to="/press-statements"
          class="inline-flex items-center space-x-reverse space-x-2 bg-brand text-white px-8 py-4 rounded-full font-bold hover:bg-brand-dark transition-all duration-300 transform hover:scale-105 shadow-lg"
        >
          <span>عرض جميع البيانات</span>
          <Icon name="lucide:arrow-left" class="w-5 h-5" />
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<script setup>
const globalData = useState("globalData");

const statements = computed(() => {
  if (process.server || !globalData.value?.pressStatements?.items) {
    return [];
  }

  const pressStatements = globalData.value.pressStatements.items;
  return pressStatements.map((statement) => ({
    id: statement._id,
    title: statement.title || "بيان بدون عنوان",
    excerpt: statement.excerpt || "محتوى البيان غير متوفر",
    date: statement.date,
    priority: statement.category?.name,
    views: Math.floor(Math.random() * 3000) + 1000, // قيمة افتراضية للمشاهدات
  }));
});

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString("ar-EG");
};
</script>