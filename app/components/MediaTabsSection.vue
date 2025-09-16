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
                : 'text-gray-600 hover:text-brand hover:bg-white',
            ]"
          >
            <Icon :name="tab.icon" class="w-5 h-5 inline ml-2" />
            {{ tab.name }}
          </button>
        </div>
      </div>

      <!-- Tab Content -->
      <div class="relative">
        <!-- Loading State -->
        <div v-if="!isDataLoaded" class="text-center py-12">
          <div
            class="animate-spin rounded-full h-12 w-12 border-b-2 border-brand mx-auto mb-4"
          ></div>
          <p class="text-gray-600">جاري تحميل البيانات...</p>
        </div>

        <!-- Images Tab -->
        <div v-else-if="activeTab === 'images'" class="animate-fade-in">
          <div
            v-if="images.length > 0"
            class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <div
              v-for="image in images"
              :key="image.id"
              class="relative group cursor-pointer overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
              @click="openLightbox(image)"
            >
              <img
                :src="image.url"
                :alt="image.title"
                class="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div
                class="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center"
              >
                <Icon
                  name="lucide:zoom-in"
                  class="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                />
              </div>
              <div
                class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4"
              >
                <h3 class="text-white font-semibold">{{ image.title }}</h3>
              </div>
            </div>
          </div>
          <div v-else class="text-center py-12">
            <p class="text-gray-600">لا توجد صور متاحة حالياً</p>
          </div>
        </div>

        <!-- Videos Tab -->
        <div v-else-if="activeTab === 'videos'" class="animate-fade-in">
          <div
            v-if="videos.length > 0"
            class="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
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
                <h3 class="text-xl font-bold text-brand-dark mb-2">
                  {{ video.title }}
                </h3>
                <p class="text-gray-600">{{ video.description }}</p>
              </div>
            </div>
          </div>
          <div v-else class="text-center py-12">
            <p class="text-gray-600">لا توجد فيديوهات متاحة حالياً</p>
          </div>
        </div>

        <!-- Documents Tab -->
        <div
          v-else-if="activeTab === 'documents'"
          class="animate-fade-in hide-documents-section"
        >
          <div
            v-if="documents.length > 0"
            class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <a
              v-for="doc in documents"
              :key="doc.id"
              :href="doc.url"
              target="_blank"
              class="bg-gradient-to-br from-brand/5 to-brand-light/10 rounded-2xl p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group"
            >
              <div
                class="w-16 h-16 bg-brand rounded-full flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform duration-300"
              >
                <Icon name="lucide:file-text" class="w-8 h-8 text-white" />
              </div>
              <h3 class="text-lg font-bold text-brand-dark mb-2 text-center">
                {{ doc.title }}
              </h3>
              <p class="text-gray-600 text-center text-sm">
                {{ doc.description }}
              </p>
              <div
                class="flex items-center justify-center mt-4 text-brand font-semibold"
              >
                <Icon name="lucide:download" class="w-4 h-4 ml-2" />
                <span>تحميل</span>
              </div>
            </a>
          </div>
          <div v-else class="text-center py-12">
            <p class="text-gray-600">لا توجد مستندات متاحة حالياً</p>
          </div>
        </div>

        <!-- View All Button -->
        <div class="text-center mt-12">
          <NuxtLink
            to="/media"
            class="inline-flex items-center space-x-reverse space-x-2 bg-brand text-white px-8 py-4 rounded-full font-bold hover:bg-brand-dark transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            <span>عرض جميع الوسائط</span>
            <Icon name="lucide:arrow-left" class="w-5 h-5" />
          </NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const globalData = useState("globalData");
const activeTab = ref("images");

// التأكد من أن البيانات متاحة
const isDataLoaded = computed(() => globalData.value && globalData.value.media);

const tabs = [
  { id: "images", name: "الصور", icon: "lucide:image" },
  { id: "videos", name: "الفيديوهات", icon: "lucide:play" },
  // { id: "documents", name: "المستندات", icon: "lucide:file-text" },
];

const images = computed(() => {
  if (!globalData.value?.media?.items) return [];
  const mediaItems = globalData.value.media.items;
  return mediaItems
    .filter((item) => item.type === "image")
    .map((item) => ({
      id: item._id,
      title: item.title || "صورة بدون عنوان",
      url: item.src,
    }));
});

const videos = computed(() => {
  if (!globalData.value?.media?.items) return [];
  const mediaItems = globalData.value.media.items;
  return mediaItems
    .filter((item) => item.type === "video")
    .map((item) => ({
      id: item._id,
      title: item.title || "فيديو بدون عنوان",
      description: item.description || "وصف غير متوفر",
      embedUrl: `https://www.youtube.com/embed/${item.src}`,
    }));
});

const documents = computed(() => {
  if (!globalData.value?.media?.items) return [];
  const mediaItems = globalData.value.media.items;
  return mediaItems
    .filter((item) => item.type === "document")
    .map((item) => ({
      id: item._id,
      title: item.title || "مستند بدون عنوان",
      description: item.description || "وصف غير متوفر",
      url: item.src || "#",
    }));
});

const openLightbox = (image) => {
  // يمكن إضافة lightbox هنا
  // Image clicked: implement lightbox functionality if needed
};
</script>