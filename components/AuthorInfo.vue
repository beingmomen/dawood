<template>
  <div class="bg-white rounded-2xl p-6 shadow-lg sticky top-24">
    <div class="text-center mb-6">
      <img
        :src="personalInfo?.image || 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400'"
        :alt="personalInfo?.name || 'محمد عبدالعليم داود'"
        class="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
      />
      <h3 class="text-xl font-bold text-brand-dark mb-2">
        {{ personalInfo?.name || 'محمد عبدالعليم داود' }}
      </h3>
      <p class="text-gray-600">
        {{ personalInfo?.title || 'صحفي وعضو برلمان' }}
      </p>
    </div>

    <div class="space-y-4 mb-6">
      <div class="flex items-center space-x-reverse space-x-3">
        <Icon name="lucide:mail" class="w-5 h-5 text-brand" />
        <span class="text-gray-700">{{ personalInfo?.email || 'mohammed.journalist@email.com' }}</span>
      </div>
      <div class="flex items-center space-x-reverse space-x-3">
        <Icon name="lucide:phone" class="w-5 h-5 text-brand" />
        <span class="text-gray-700">{{ personalInfo?.phone || '+20 10 123 4567' }}</span>
      </div>
      <div class="flex items-center space-x-reverse space-x-3">
        <Icon name="lucide:map-pin" class="w-5 h-5 text-brand" />
        <span class="text-gray-700">{{ personalInfo?.location || 'القاهرة، مصر' }}</span>
      </div>
    </div>

    <div class="border-t pt-6">
      <h4 class="font-bold mb-4">تابعني على</h4>
      <div class="flex space-x-reverse space-x-3">
        <a
          :href="personalInfo?.facebookLink || '#'"
          target="_blank"
          class="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors"
        >
          <Icon name="lucide:facebook" class="w-5 h-5" />
        </a>
        <a
          :href="personalInfo?.youtubeLink || '#'"
          target="_blank"
          class="w-10 h-10 bg-red-600 text-white rounded-full flex items-center justify-center hover:bg-red-700 transition-colors"
        >
          <Icon name="lucide:youtube" class="w-5 h-5" />
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
const { data: personalInfo } = await $fetch('/api/personal-info', { server: false })
</script>