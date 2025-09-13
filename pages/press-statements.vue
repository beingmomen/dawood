<template>
  <div class="min-h-screen bg-background pt-20">
    <div class="container mx-auto px-4 py-12">
      <!-- Header -->
      <div class="text-center mb-16">
        <h1 class="text-4xl md:text-5xl font-bold text-brand-dark mb-6">
          البيانات الصحفية
        </h1>
        <p class="text-xl text-gray-600 max-w-3xl mx-auto">
          جميع البيانات والتصريحات الصحفية حول القضايا المهمة
        </p>
      </div>

      <!-- Press Statements Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <article
          v-for="(statement, index) in statements"
          :key="statement.id"
          class="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
        >
          <div class="flex items-center justify-between mb-4">
            <span :class="[
              'px-3 py-1 rounded-full text-sm font-medium',
              statement.priority === 'عاجل' ? 'bg-red-100 text-red-800' :
              statement.priority === 'مهم' ? 'bg-orange-100 text-orange-800' :
              'bg-blue-100 text-blue-800'
            ]">
              {{ statement.priority }}
            </span>
            <div class="flex items-center space-x-reverse space-x-2 text-gray-500 text-sm">
              <Icon name="lucide:calendar" class="w-4 h-4" />
              <span>{{ formatDate(statement.date) }}</span>
            </div>
          </div>

          <h3 class="text-xl font-bold text-brand-dark mb-4">
            {{ statement.title }}
          </h3>

          <p class="text-gray-600 mb-6">
            {{ statement.excerpt }}
          </p>

          <button class="w-full bg-brand text-white py-3 rounded-lg font-semibold hover:bg-brand-dark transition-colors">
            اقرأ البيان كاملاً
          </button>
        </article>
      </div>
    </div>
  </div>
</template>

<script setup>
const statements = ref([
  {
    id: 1,
    title: 'بيان حول قانون الإعلام الجديد',
    excerpt: 'نؤكد على أهمية تطوير قانون الإعلام بما يواكب التطورات التكنولوجية ويحافظ على حرية التعبير والرأي',
    date: '2024-01-20',
    priority: 'عاجل'
  },
  {
    id: 2,
    title: 'تصريح حول الأوضاع الاقتصادية',
    excerpt: 'نتابع بعناية التطورات الاقتصادية ونعمل على تقديم الحلول المناسبة لدعم المواطنين',
    date: '2024-01-18',
    priority: 'مهم'
  },
  {
    id: 3,
    title: 'بيان حول التعليم الرقمي',
    excerpt: 'ندعو إلى تطوير منظومة التعليم الرقمي وتوفير الأدوات اللازمة للطلاب والمعلمين',
    date: '2024-01-15',
    priority: 'عادي'
  }
])

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('ar-EG')
}

useHead({
  title: 'البيانات الصحفية - محمد عبدالعليم داود',
  meta: [
    { name: 'description', content: 'جميع البيانات والتصريحات الصحفية حول القضايا المهمة' }
  ]
})
</script>