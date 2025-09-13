<template>
  <section class="py-20 bg-white">
    <div class="container mx-auto px-4">
      <div class="text-center mb-16">
        <h2 class="text-4xl md:text-5xl font-bold text-brand-dark mb-6">
          الوسائط المتعددة
        </h2>
        <p class="text-xl text-gray-600 max-w-3xl mx-auto">
          مجموعة من الصور والفيديوهات والمستندات المهمة
        </p>
      </div>

      <!-- Tabs Navigation -->
      <div class="flex justify-center mb-12">
        <div class="bg-gray-100 rounded-full p-2 inline-flex">
          <button
            v-for="tab in tabs"
            :key="tab.id"
            @click="activeTab = tab.id"
            :class="[
              'px-6 py-3 rounded-full font-semibold transition-all duration-300',
              activeTab === tab.id
                ? 'bg-brand text-white shadow-lg'
                : 'text-gray-600 hover:text-brand hover:bg-white'
            ]"
          >
            <Icon :name="tab.icon" class="w-5 h-5 inline ml-2" />
            {{ tab.name }}
          </button>
        </div>
      </div>

      <!-- Tab Content -->
      <div class="relative">
        <!-- Images Tab -->
        <div v-if="activeTab === 'images'" class="animate-fade-in">
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div
              v-for="(image, index) in images"
              :key="image.id"
              class="relative group cursor-pointer overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
              @click="openLightbox(image)"
            >
              <img
                :src="image.url"
                :alt="image.title"
                class="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div class="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
                <Icon name="lucide:zoom-in" class="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                <h3 class="text-white font-semibold">{{ image.title }}</h3>
              </div>
            </div>
          </div>
        </div>

        <!-- Videos Tab -->
        <div v-if="activeTab === 'videos'" class="animate-fade-in">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div
              v-for="video in videos"
              :key="video.id"
              class="bg-gray-100 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div class="aspect-video">
                <iframe
                  :src="video.embedUrl"
                  :title="video.title"
                  class="w-full h-full"
                  frameborder="0"
                  allowfullscreen
                ></iframe>
              </div>
              <div class="p-6">
                <h3 class="text-xl font-bold text-brand-dark mb-2">{{ video.title }}</h3>
                <p class="text-gray-600">{{ video.description }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Documents Tab -->
        <div v-if="activeTab === 'documents'" class="animate-fade-in hide-documents-section">
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <a
              v-for="doc in documents"
              :key="doc.id"
              :href="doc.url"
              target="_blank"
              class="bg-gradient-to-br from-brand/5 to-brand-light/10 rounded-2xl p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group"
            >
              <div class="w-16 h-16 bg-brand rounded-full flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform duration-300">
                <Icon name="lucide:file-text" class="w-8 h-8 text-white" />
              </div>
              <h3 class="text-lg font-bold text-brand-dark mb-2 text-center">{{ doc.title }}</h3>
              <p class="text-gray-600 text-center text-sm">{{ doc.description }}</p>
              <div class="flex items-center justify-center mt-4 text-brand font-semibold">
                <Icon name="lucide:download" class="w-4 h-4 ml-2" />
                <span>تحميل</span>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const activeTab = ref('images')

const tabs = [
  { id: 'images', name: 'الصور', icon: 'lucide:image' },
  { id: 'videos', name: 'الفيديوهات', icon: 'lucide:play' },
  { id: 'documents', name: 'المستندات', icon: 'lucide:file-text' }
]

const images = ref([
  {
    id: 1,
    title: 'جلسة برلمانية مهمة',
    url: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: 2,
    title: 'لقاء صحفي',
    url: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: 3,
    title: 'مؤتمر صحفي',
    url: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: 4,
    title: 'زيارة ميدانية',
    url: 'https://images.pexels.com/photos/3184639/pexels-photo-3184639.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: 5,
    title: 'اجتماع لجنة',
    url: 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: 6,
    title: 'حفل تكريم',
    url: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=800'
  }
])

const videos = ref([
  {
    id: 1,
    title: 'مداخلة برلمانية حول قانون الإعلام',
    description: 'مداخلة مهمة في مجلس النواب حول تطوير قانون الإعلام',
    embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
  },
  {
    id: 2,
    title: 'لقاء تلفزيوني حول الأوضاع الاقتصادية',
    description: 'حوار شامل حول التحديات الاقتصادية والحلول المقترحة',
    embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
  },
  {
    id: 3,
    title: 'كلمة في مؤتمر الصحافة العربية',
    description: 'كلمة رئيسية في المؤتمر السنوي للصحافة العربية',
    embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
  },
  {
    id: 4,
    title: 'تقرير إخباري عن مبادرة تنموية',
    description: 'تقرير حول مبادرة دعم الشباب في ريادة الأعمال',
    embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
  }
])

const documents = ref([
  {
    id: 1,
    title: 'تقرير لجنة الإعلام 2023',
    description: 'التقرير السنوي للجنة الإعلام والثقافة',
    url: '#'
  },
  {
    id: 2,
    title: 'مشروع قانون تطوير الإعلام',
    description: 'مسودة مشروع قانون تطوير الإعلام المصري',
    url: '#'
  },
  {
    id: 3,
    title: 'دراسة الإعلام الرقمي',
    description: 'دراسة شاملة حول تأثير الإعلام الرقمي',
    url: '#'
  },
  {
    id: 4,
    title: 'خطة التنمية الإعلامية',
    description: 'خطة استراتيجية لتنمية القطاع الإعلامي',
    url: '#'
  }
])

const openLightbox = (image) => {
  // يمكن إضافة lightbox هنا
  console.log('Opening image:', image.title)
}
</script>