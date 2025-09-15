<template>
  <section
    class="py-20 bg-gradient-to-br from-gray-50 via-white to-blue-50 relative overflow-hidden"
  >
    <!-- Background decorative elements -->
    <div class="absolute inset-0 opacity-5">
      <div
        class="absolute top-20 left-10 w-32 h-32 bg-brand rounded-full blur-3xl"
      ></div>
      <div
        class="absolute bottom-20 right-10 w-40 h-40 bg-brand-light rounded-full blur-3xl"
      ></div>
      <div
        class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-brand to-brand-light rounded-full blur-3xl opacity-30"
      ></div>
    </div>

    <div class="container mx-auto px-4 relative z-10">
      <!-- Enhanced Header -->
      <div class="text-center mb-12">
        <div
          class="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-brand to-brand-light rounded-full mb-4 shadow-md"
        >
          <Icon name="lucide:trophy" class="w-6 h-6 text-white" />
        </div>
        <h2
          class="text-3xl md:text-4xl font-bold bg-gradient-to-r from-brand-dark via-brand to-brand-light bg-clip-text text-transparent mb-3 leading-tight"
        >
          الإنجازات والمحطات المهمة
        </h2>
        <p class="text-base text-gray-600 max-w-2xl mx-auto leading-relaxed">
          مسيرة حافلة بالإنجازات في المجالين الصحفي والبرلماني
        </p>
        <div
          class="w-16 h-0.5 bg-gradient-to-r from-brand to-brand-light mx-auto mt-4 rounded-full"
        ></div>
      </div>

      <!-- Enhanced Grid -->
      <div
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
      >
        <div
          v-for="(achievement, index) in achievements"
          :key="achievement.id"
          class="group relative bg-white/80 backdrop-blur-sm rounded-3xl p-8 hover:bg-white transition-all duration-500 transform hover:-translate-y-3 hover:scale-105 animate-fade-in border border-gray-100/50 hover:border-brand/20 shadow-lg hover:shadow-2xl"
          :style="{ animationDelay: `${index * 150}ms` }"
        >
          <!-- Gradient overlay -->
          <div
            class="absolute inset-0 bg-gradient-to-br from-brand/5 via-transparent to-brand-light/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          ></div>

          <!-- Floating icon container -->
          <div class="relative z-10">
            <div
              class="w-10 h-10 bg-gradient-to-br from-brand via-brand to-brand-light rounded-xl flex items-center justify-center mb-4 mx-auto shadow-md group-hover:shadow-lg transition-all duration-500 group-hover:rotate-6 group-hover:scale-110"
            >
              <Icon
                :name="achievement.icon"
                class="w-5 h-5 text-white group-hover:scale-110 transition-transform duration-300"
              />
            </div>

            <!-- Content -->
            <div class="text-center space-y-3">
              <h3
                class="text-lg font-bold text-brand-dark mb-2 group-hover:text-brand transition-colors duration-300 leading-tight"
              >
                {{ achievement.title }}
              </h3>

              <p
                class="text-gray-600 group-hover:text-gray-700 leading-relaxed text-sm transition-colors duration-300 line-clamp-3"
              >
                {{ achievement.description }}
              </p>

              <!-- Enhanced year badge -->
              <div class="pt-2">
                <div
                  class="inline-flex items-center gap-1 bg-gradient-to-r from-brand/10 to-brand-light/10 group-hover:from-brand/20 group-hover:to-brand-light/20 px-3 py-1 rounded-full border border-brand/20 group-hover:border-brand/40 transition-all duration-300"
                >
                  <Icon
                    name="lucide:calendar"
                    class="w-3 h-3 text-brand group-hover:scale-110 transition-transform duration-300"
                  />
                  <span class="text-brand font-bold text-xs">{{
                    achievement.year
                  }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Hover effect border -->
          <div
            class="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-gradient-to-r group-hover:from-brand/30 group-hover:to-brand-light/30 transition-all duration-500"
          ></div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const globalData = useState("globalData");

// Map API data to component format with default icons
const achievements = computed(() => {
  const apiAchievements = globalData.value?.achievements?.items || [];

  // Default icons for different types of achievements
  const defaultIcons = [
    "lucide:landmark",
    "lucide:award",
    "lucide:users",
    "lucide:globe",
    "lucide:book",
    "lucide:rocket",
    "lucide:star",
    "lucide:trophy",
  ];

  return apiAchievements.map((achievement, index) => ({
    id: achievement._id,
    title: achievement.title,
    description: achievement.content,
    icon: defaultIcons[index % defaultIcons.length],
    year: achievement.year.toString(),
  }));
});
</script>