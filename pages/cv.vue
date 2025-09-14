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
            :src="personalInfo?.image || 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400'"
            :alt="personalInfo?.name || 'محمد عبدالعليم داود'"
            class="w-32 h-32 rounded-full object-cover"
          />
          <div class="text-center md:text-right">
            <h2 class="text-3xl font-bold text-brand-dark mb-2">
              {{ personalInfo?.name || 'محمد عبدالعليم داود' }}
            </h2>
            <p class="text-xl text-gray-600 mb-4">
              {{ personalInfo?.title || 'صحفي وعضو برلمان' }}
            </p>
            <p class="text-gray-700 leading-relaxed">
              {{ personalInfo?.summary || 'صحفي محترف وعضو برلمان ملتزم بخدمة الوطن والمواطنين' }}
            </p>
          </div>
        </div>
      </div>

      <!-- Experience -->
      <div class="bg-white rounded-2xl p-8 shadow-lg mb-12">
        <h3 class="text-2xl font-bold text-brand-dark mb-8 flex items-center">
          <Icon name="lucide:briefcase" class="w-6 h-6 ml-3" />
          الخبرة المهنية
        </h3>
        <div class="space-y-6">
          <div class="border-r-4 border-brand pr-6">
            <h4 class="text-xl font-bold text-brand-dark">عضو مجلس النواب</h4>
            <p class="text-gray-600 mb-2">2020 - حتى الآن</p>
            <p class="text-gray-700">تمثيل الدائرة الانتخابية والعمل على خدمة المواطنين</p>
          </div>
          <div class="border-r-4 border-brand pr-6">
            <h4 class="text-xl font-bold text-brand-dark">رئيس تحرير</h4>
            <p class="text-gray-600 mb-2">2015 - 2020</p>
            <p class="text-gray-700">إدارة التحرير والإشراف على المحتوى الإعلامي</p>
          </div>
        </div>
      </div>

      <!-- Education -->
      <div class="bg-white rounded-2xl p-8 shadow-lg">
        <h3 class="text-2xl font-bold text-brand-dark mb-8 flex items-center">
          <Icon name="lucide:graduation-cap" class="w-6 h-6 ml-3" />
          التعليم
        </h3>
        <div class="space-y-6">
          <div class="border-r-4 border-brand pr-6">
            <h4 class="text-xl font-bold text-brand-dark">بكالوريوس الإعلام</h4>
            <p class="text-gray-600 mb-2">جامعة القاهرة - 2010</p>
            <p class="text-gray-700">تخصص صحافة وإعلام</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const globalData = useState('globalData')
const personalInfo = computed(() => globalData.value?.personalInfo)

useHead({
  title: 'السيرة الذاتية - محمد عبدالعليم داود',
  meta: [
    { name: 'description', content: 'السيرة الذاتية للصحفي وعضو البرلمان محمد عبدالعليم داود' }
  ]
})
</script>