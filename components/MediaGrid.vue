<template>
  <div class="py-16 bg-gray-50">
    <div class="container mx-auto px-4">
      <!-- Page Title -->
      <div class="text-center mb-12">
        <h1 class="text-4xl font-bold text-gray-800 mb-4">معرض الوسائط</h1>
        <p class="text-gray-600">مجموعة من الصور والفيديوهات</p>
      </div>

      <!-- Loading State -->
      <div v-if="pending" class="text-center py-16">
        <div
          class="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-6"
        ></div>
        <p class="text-gray-600 text-lg">جاري تحميل البيانات...</p>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="text-center py-16">
        <div class="text-red-500 mb-6">
          <Icon name="lucide:alert-circle" class="w-16 h-16 mx-auto mb-4" />
          <p class="text-xl font-semibold">حدث خطأ في تحميل البيانات</p>
        </div>
        <button
          @click="refresh()"
          class="bg-red-500 text-white px-8 py-3 rounded-lg hover:bg-red-600 transition-colors"
        >
          إعادة المحاولة
        </button>
      </div>

      <!-- Tabs Navigation -->
      <div v-else-if="allMedia.length > 0" class="flex justify-center mb-12">
        <div class="bg-white rounded-full p-2 inline-flex shadow-lg">
          <button
            v-for="tab in tabs"
            :key="tab.id"
            @click="activeTab = tab.id"
            :class="[
              'px-6 py-3 rounded-full font-semibold transition-all duration-300 flex items-center',
              activeTab === tab.id
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50',
            ]"
          >
            <Icon :name="tab.icon" class="w-5 h-5 ml-2" />
            {{ tab.name }}
            <span
              class="bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded-full mr-2"
              :class="activeTab === tab.id ? 'bg-white/20 text-white' : ''"
            >
              {{ tab.count }}
            </span>
          </button>
        </div>
      </div>

      <!-- Tab Content -->
      <div v-if="allMedia.length > 0" class="animate-fade-in">
        <!-- Images Tab -->
        <div v-if="activeTab === 'images'">
          <div
            v-if="images.length > 0"
            class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          >
            <div
              v-for="image in images"
              :key="image._id"
              class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:scale-105 cursor-pointer"
              @click="openLightbox(image)"
            >
              <img
                :src="image.src"
                :alt="image.title"
                class="w-full h-48 object-cover"
                loading="lazy"
              />
              <div class="p-4">
                <h3 class="font-semibold text-gray-800 mb-2">
                  {{ image.title }}
                </h3>
                <p class="text-sm text-gray-600">
                  {{ formatDate(image.date) }}
                </p>
              </div>
            </div>
          </div>
          <div v-else class="text-center py-16">
            <Icon
              name="lucide:image"
              class="w-20 h-20 mx-auto mb-6 text-gray-400"
            />
            <h3 class="text-xl font-semibold text-gray-600 mb-2">
              لا توجد صور متاحة
            </h3>
            <p class="text-gray-500">لم يتم العثور على أي صور</p>
          </div>
        </div>

        <!-- Videos Tab -->
        <div v-else-if="activeTab === 'videos'">
          <div
            v-if="videos.length > 0"
            class="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            <div
              v-for="video in videos"
              :key="video._id"
              class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div class="aspect-video">
                <iframe
                  :src="`https://www.youtube.com/embed/${video.src}`"
                  :title="video.title"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowfullscreen
                  class="w-full h-full"
                ></iframe>
              </div>
              <div class="p-4">
                <h3 class="font-semibold text-gray-800 mb-2">
                  {{ video.title }}
                </h3>
                <p class="text-sm text-gray-600 mb-2">
                  {{ video.description }}
                </p>
                <p class="text-xs text-gray-500">
                  {{ formatDate(video.date) }}
                </p>
              </div>
            </div>
          </div>
          <div v-else class="text-center py-16">
            <Icon
              name="lucide:play"
              class="w-20 h-20 mx-auto mb-6 text-gray-400"
            />
            <h3 class="text-xl font-semibold text-gray-600 mb-2">
              لا توجد فيديوهات متاحة
            </h3>
            <p class="text-gray-500">لم يتم العثور على أي فيديوهات</p>
          </div>
        </div>


      </div>

      <!-- No Data State -->
      <div v-else-if="!pending && !error" class="text-center py-16">
        <Icon
          name="lucide:folder-open"
          class="w-20 h-20 mx-auto mb-6 text-gray-400"
        />
        <h3 class="text-xl font-semibold text-gray-600 mb-2">
          لا توجد وسائط متاحة
        </h3>
        <p class="text-gray-500">
          لم يتم العثور على أي صور أو فيديوهات أو مستندات
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
// Active tab state
const activeTab = ref("images");

// Fetch media data from API
const {
  data: mediaData,
  pending,
  error,
  refresh,
} = await useFetch("https://demo-api.abdaleemdawood.com/api/v1/media/all", {
  server: true,
  client: true,
  default: () => []
});

// Computed properties
const allMedia = computed(() => {
  if (!mediaData.value) return [];
  return mediaData.value;
});

const images = computed(() => {
  return allMedia.value.filter((item) => item.type === "image");
});

const videos = computed(() => {
  return allMedia.value.filter((item) => item.type === "video");
});



// Tabs configuration
const tabs = computed(() => [
  {
    id: "images",
    name: "الصور",
    icon: "lucide:image",
    count: images.value.length,
  },
  {
    id: "videos",
    name: "الفيديوهات",
    icon: "lucide:play",
    count: videos.value.length,
  },
]);

// Methods
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("ar-EG", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const openLightbox = (image) => {
  // TODO: Implement lightbox functionality
  console.log("Opening image:", image.title);
};
</script>

<style scoped>
/* Fade animation */
.animate-fade-in {
  animation: fadeIn 0.5s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>