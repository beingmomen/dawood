<template>
  <section class="py-20 bg-white">
    <div class="container mx-auto px-4">
      <div class="text-center mb-16">
        <h2 class="text-4xl md:text-5xl font-bold text-brand-dark mb-6">
          الإنجازات والمحطات المهمة
        </h2>
        <p class="text-xl text-gray-600 max-w-3xl mx-auto">
          مسيرة حافلة بالإنجازات في المجالين الصحفي والبرلماني
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
        <div
          v-for="(achievement, index) in achievements"
          :key="achievement.id"
          class="bg-gradient-to-br from-brand/5 to-brand-light/10 rounded-2xl p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 animate-fade-in"
          :style="{ animationDelay: `${index * 200}ms` }"
        >
          <div
            class="w-16 h-16 bg-brand rounded-full flex items-center justify-center mb-6 mx-auto"
          >
            <Icon :name="achievement.icon" class="w-8 h-8 text-white" />
          </div>

          <h3 class="text-2xl font-bold text-brand-dark mb-4 text-center">
            {{ achievement.title }}
          </h3>

          <p class="text-gray-600 text-center leading-relaxed mb-6">
            {{ achievement.description }}
          </p>

          <div class="text-center">
            <span
              class="inline-flex items-center space-x-reverse space-x-2 text-brand font-semibold"
            >
              <Icon name="lucide:calendar" class="w-4 h-4" />
              <span>{{ achievement.year }}</span>
            </span>
          </div>
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