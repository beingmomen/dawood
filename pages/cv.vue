<template>
  <div class="min-h-screen bg-background pt-20">
    <div class="container mx-auto px-4 py-12">
      <!-- Header -->
      <div class="text-center mb-16">
        <h1 class="text-4xl md:text-5xl font-bold text-brand-dark mb-6">
          السيرة الذاتية
        </h1>
        <p class="text-xl text-gray-600 max-w-3xl mx-auto">
          مسيرة مهنية حافلة بالإنجازات في المجالين الصحفي والبرلماني
        </p>
      </div>

      <!-- Personal Info -->
      <div class="bg-white rounded-2xl p-8 shadow-lg mb-12">
        <div class="flex flex-col md:flex-row items-center gap-8">
          <img
            :src="personalInfo?.image"
            :alt="personalInfo?.name"
            class="w-32 h-32 rounded-full object-cover"
          />
          <div class="text-center md:text-right flex-1">
            <h2 class="text-3xl font-bold text-brand-dark mb-2">
              {{ personalInfo?.name }}
            </h2>
            <p class="text-xl text-gray-600 mb-4">
              {{ personalInfo?.title }}
            </p>
            <p class="text-gray-700 leading-relaxed mb-4">
              {{ personalInfo?.summary }}
            </p>
            <!-- Contact Info -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
              <div class="flex items-center justify-center md:justify-start">
                <Icon name="lucide:mail" class="w-4 h-4 ml-2" />
                {{ personalInfo?.email }}
              </div>
              <div class="flex items-center justify-center md:justify-start">
                <Icon name="lucide:phone" class="w-4 h-4 ml-2" />
                {{ personalInfo?.phone }}
              </div>
              <div class="flex items-center justify-center md:justify-start">
                <Icon name="lucide:map-pin" class="w-4 h-4 ml-2" />
                {{ personalInfo?.location }}
              </div>
              <div class="flex items-center justify-center md:justify-start gap-2">
                <a :href="personalInfo?.youtubeLink" target="_blank" class="text-red-600 hover:text-red-700">
                  <Icon name="lucide:youtube" class="w-4 h-4" />
                </a>
                <a :href="personalInfo?.facebookLink" target="_blank" class="text-blue-600 hover:text-blue-700">
                  <Icon name="lucide:facebook" class="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Experience -->
      <div class="bg-white rounded-2xl p-8 shadow-lg mb-12" v-if="personalInfo?.experience?.length">
        <h3 class="text-2xl font-bold text-brand-dark mb-8 flex items-center">
          <Icon name="lucide:briefcase" class="w-6 h-6 ml-3" />
          الخبرة المهنية
        </h3>
        <div class="space-y-6">
          <div 
            v-for="exp in personalInfo.experience" 
            :key="exp._id"
            class="border-r-4 border-brand pr-6"
          >
            <h4 class="text-xl font-bold text-brand-dark">{{ exp.position || exp.company }}</h4>
            <p class="text-gray-600 mb-2">
              {{ formatDate(exp.startDate) }} - {{ exp.current ? 'حتى الآن' : formatDate(exp.endDate) }}
            </p>
            <p class="text-gray-700" v-if="exp.description">
              {{ exp.description }}
            </p>
            <p class="text-gray-600 text-sm" v-if="exp.location">
              <Icon name="lucide:map-pin" class="w-4 h-4 inline ml-1" />
              {{ exp.location }}
            </p>
          </div>
        </div>
      </div>

      <!-- Education -->
      <div class="bg-white rounded-2xl p-8 shadow-lg mb-12" v-if="personalInfo?.education?.length">
        <h3 class="text-2xl font-bold text-brand-dark mb-8 flex items-center">
          <Icon name="lucide:graduation-cap" class="w-6 h-6 ml-3" />
          التعليم
        </h3>
        <div class="space-y-6">
          <div 
            v-for="edu in personalInfo.education" 
            :key="edu._id"
            class="border-r-4 border-brand pr-6"
          >
            <h4 class="text-xl font-bold text-brand-dark">{{ edu.degree }}</h4>
            <p class="text-gray-600 mb-2">{{ edu.institution }} - {{ formatDate(edu.graduationDate) }}</p>
            <p class="text-gray-700" v-if="edu.field">
              {{ edu.field }}
            </p>
          </div>
        </div>
      </div>

      <!-- Achievements -->
      <div class="bg-white rounded-2xl p-8 shadow-lg" v-if="achievements?.length">
        <h3 class="text-2xl font-bold text-brand-dark mb-8 flex items-center">
          <Icon name="lucide:trophy" class="w-6 h-6 ml-3" />
          الإنجازات
        </h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div 
            v-for="achievement in achievements" 
            :key="achievement._id"
            class="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
          >
            <div class="flex items-start justify-between mb-3">
              <h4 class="text-lg font-bold text-brand-dark flex-1">{{ achievement.title }}</h4>
              <span class="bg-brand text-white px-2 py-1 rounded text-sm font-medium">{{ achievement.year }}</span>
            </div>
            <p class="text-gray-700 leading-relaxed">{{ achievement.content }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const globalData = useState("globalData");
const personalInfo = computed(() => globalData.value?.personalInfo.items[0]);
const achievements = computed(() => globalData.value?.achievements.items || []);

// Format date function
const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.getFullYear();
};

useHead({
  title: `السيرة الذاتية - ${personalInfo.value?.name || 'محمد عبدالعليم داود'}`,
  meta: [
    {
      name: "description",
      content: personalInfo.value?.summary || "السيرة الذاتية للصحفي وعضو البرلمان محمد عبدالعليم داود",
    },
  ],
});
</script>