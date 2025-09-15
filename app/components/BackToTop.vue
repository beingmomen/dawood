<template>
  <Transition
    enter-active-class="transition-all duration-300 ease-out"
    enter-from-class="opacity-0 scale-75"
    enter-to-class="opacity-100 scale-100"
    leave-active-class="transition-all duration-300 ease-in"
    leave-from-class="opacity-100 scale-100"
    leave-to-class="opacity-0 scale-75"
  >
    <button
      v-if="showButton"
      @click="scrollToTop"
      class="fixed bottom-8 left-8 z-50 w-12 h-12 bg-brand text-white rounded-full shadow-lg hover:bg-brand-dark transition-all duration-300 transform hover:scale-110 flex items-center justify-center"
      aria-label="العودة لأعلى"
    >
      <Icon name="lucide:arrow-up" class="w-5 h-5" />
    </button>
  </Transition>
</template>

<script setup>
const showButton = ref(false);

const scrollToTop = () => {
  if (import.meta.client) {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }
};

const handleScroll = () => {
  showButton.value = window.scrollY > 300;
};

onMounted(() => {
  if (import.meta.client) {
    window.addEventListener("scroll", handleScroll);
  }
});

onUnmounted(() => {
  if (import.meta.client) {
    window.removeEventListener("scroll", handleScroll);
  }
});
</script>