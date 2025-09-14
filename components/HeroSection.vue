<template>
  <section id="home" class="relative min-h-screen flex items-center justify-center overflow-hidden">
    <!-- Background -->
    <div class="absolute inset-0 bg-gradient-to-br from-brand-dark via-brand to-brand-light"></div>
    <div class="absolute inset-0 bg-black/20"></div>

    <!-- Floating Elements -->
    <div class="absolute top-20 right-20 w-20 h-20 bg-white/10 rounded-full animate-float"></div>
    <div class="absolute bottom-32 left-16 w-16 h-16 bg-white/10 rounded-full animate-float" style="animation-delay: 1s;"></div>
    <div class="absolute top-1/2 left-1/4 w-12 h-12 bg-white/10 rounded-full animate-float" style="animation-delay: 2s;"></div>

    <div class="relative z-10 container mx-auto px-4 text-center text-white">
      <div class="max-w-4xl mx-auto">
        <h1 class="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
          {{ personalInfo?.name || 'محمد عبدالعليم داود' }}
        </h1>

        <p class="text-xl md:text-2xl mb-8 text-white/90 leading-relaxed animate-slide-up">
          {{ personalInfo?.title || 'صحفي وعضو برلمان' }}
          <br />
          {{ personalInfo?.summary?.split('.')[0] || 'أسعى لتحقيق العدالة الاجتماعية والتنمية المستدامة' }}
        </p>

        <div class="flex justify-center mb-28 animate-fade-in">
          <button
            @click="scrollToContact"
            class="border-2 border-white text-white px-8 py-4 rounded-full font-bold hover:bg-white hover:text-brand transition-all duration-300 transform hover:scale-105"
          >
            تواصل معي
          </button>
        </div>
      </div>

      <!-- Scroll Indicator -->
      <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 mt-12 animate-bounce">
        <Icon name="lucide:arrow-down" class="w-6 h-6 text-white/60" />
      </div>
    </div>
  </section>
</template>

<script setup>
const globalData = useState('globalData')
const personalInfo = computed(() => globalData.value?.personalInfo)

const scrollToContact = () => {
  if (process.client) {
    const element = document.getElementById('contact')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }
}
</script>