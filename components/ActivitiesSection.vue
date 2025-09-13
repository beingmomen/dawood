<template>
  <section class="py-20 bg-background hide-activities-section">
    <div class="container mx-auto px-4">
      <div class="text-center mb-16">
        <h2 class="text-4xl md:text-5xl font-bold text-brand-dark mb-6">
          الأنشطة والفعاليات
        </h2>
        <p class="text-xl text-gray-600 max-w-3xl mx-auto">
          أحدث الأنشطة البرلمانية والفعاليات الإعلامية والمجتمعية
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div
          v-for="(activity, index) in activities"
          :key="activity.id"
          class="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 animate-fade-in"
          :style="{ animationDelay: `${index * 150}ms` }"
        >
          <div class="relative">
            <img
              :src="activity.image"
              :alt="activity.title"
              class="w-full h-48 object-cover"
            />
            <div class="absolute top-4 right-4">
              <span :class="[
                'px-3 py-1 rounded-full text-sm font-medium text-white',
                activity.type === 'برلماني' ? 'bg-blue-600' :
                activity.type === 'إعلامي' ? 'bg-green-600' :
                'bg-purple-600'
              ]">
                {{ activity.type }}
              </span>
            </div>
          </div>

          <div class="p-6">
            <h3 class="text-xl font-bold text-brand-dark mb-3 line-clamp-2">
              {{ activity.title }}
            </h3>

            <p class="text-gray-600 mb-4 line-clamp-3">
              {{ activity.description }}
            </p>

            <div class="flex items-center justify-between text-sm text-gray-500 mb-4">
              <div class="flex items-center space-x-reverse space-x-2">
                <Icon name="lucide:calendar" class="w-4 h-4" />
                <span>{{ formatDate(activity.date) }}</span>
              </div>
              <div class="flex items-center space-x-reverse space-x-2">
                <Icon name="lucide:map-pin" class="w-4 h-4" />
                <span>{{ activity.location }}</span>
              </div>
            </div>

            <button class="w-full bg-brand text-white py-3 rounded-lg font-semibold hover:bg-brand-dark transition-colors">
              عرض التفاصيل
            </button>
          </div>
        </div>
      </div>

      <!-- View All Button -->
      <div class="text-center mt-12">
        <button class="inline-flex items-center space-x-reverse space-x-2 border-2 border-brand text-brand px-8 py-4 rounded-full font-bold hover:bg-brand hover:text-white transition-all duration-300">
          <span>عرض جميع الأنشطة</span>
          <Icon name="lucide:arrow-left" class="w-5 h-5" />
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
const activities = ref([
  {
    id: 1,
    title: 'جلسة مناقشة قانون الإعلام الجديد',
    description: 'مشاركة فعالة في مناقشة مشروع قانون تطوير الإعلام المصري وتقديم مقترحات مهمة',
    image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800',
    date: '2024-01-15',
    location: 'مجلس النواب',
    type: 'برلماني'
  },
  {
    id: 2,
    title: 'ندوة حول حرية الصحافة',
    description: 'تنظيم ندوة متخصصة حول حرية الصحافة والتحديات المعاصرة في الإعلام العربي',
    image: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=800',
    date: '2024-01-10',
    location: 'نقابة الصحفيين',
    type: 'إعلامي'
  },
  {
    id: 3,
    title: 'زيارة ميدانية لمشروع تنموي',
    description: 'زيارة ميدانية لمتابعة تنفيذ مشروع تنموي في إحدى المحافظات',
    image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800',
    date: '2024-01-05',
    location: 'محافظة الجيزة',
    type: 'مجتمعي'
  }
])

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('ar-EG')
}
</script>