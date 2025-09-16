<template>
  <header :class="headerClasses">
    <div class="container mx-auto px-4">
      <div class="flex items-center justify-between h-16">
        <!-- Logo -->
        <NuxtLink to="/" class="flex items-center">
          <div>
            <h1 :class="logoClasses">
              {{ personalInfo?.name || "محمد عبدالعليم داود" }}
            </h1>
            <p :class="subtitleClasses">
              {{ personalInfo?.title || "صحفي وعضو برلمان" }}
            </p>
          </div>
        </NuxtLink>

        <!-- Desktop Navigation -->
        <nav class="hidden md:flex items-center space-x-reverse space-x-8">
          <NuxtLink
            v-for="item in menuItems"
            :key="item.name"
            :to="item.href"
            :class="getNavLinkClasses(item.href)"
          >
            {{ item.name }}
          </NuxtLink>
        </nav>

        <!-- Mobile Menu Button -->
        <button
          @click="toggleMobileMenu"
          :class="mobileButtonClasses"
          class="md:hidden p-2 rounded-lg transition-colors duration-300"
          :aria-label="isMenuOpen ? 'إغلاق القائمة' : 'فتح القائمة'"
          aria-expanded="false"
        >
          <Icon v-if="!isMenuOpen" name="lucide:menu" class="w-6 h-6" />
          <Icon v-else name="lucide:x" class="w-6 h-6" />
        </button>
      </div>
    </div>

    <!-- Mobile Menu -->
    <Transition
      enter-active-class="transition-all duration-300 ease-out"
      enter-from-class="opacity-0 max-h-0"
      enter-to-class="opacity-100 max-h-96"
      leave-active-class="transition-all duration-300 ease-in"
      leave-from-class="opacity-100 max-h-96"
      leave-to-class="opacity-0 max-h-0"
    >
      <div
        v-if="isMenuOpen"
        class="md:hidden bg-white border-t shadow-lg overflow-hidden"
      >
        <nav class="container mx-auto px-4 py-4">
          <NuxtLink
            v-for="(item, index) in menuItems"
            :key="item.name"
            :to="item.href"
            @click="closeMobileMenu"
            :class="getMobileNavLinkClasses(item.href)"
            :style="{ animationDelay: `${index * 100}ms` }"
            class="flex items-center space-x-reverse space-x-3 py-3 px-3 rounded-lg transition-colors animate-fade-in-up"
          >
            <Icon :name="item.icon" class="w-5 h-5" />
            <span class="font-medium">{{ item.name }}</span>
          </NuxtLink>
        </nav>
      </div>
    </Transition>
  </header>
</template>

<script setup>
const route = useRoute();
const globalData = useState("globalData");
const personalInfo = computed(() => globalData.value?.personalInfo.items[0]);

// State
const isMenuOpen = ref(false);
const isScrolled = ref(false);

// Menu items
const menuItems = [
  { name: "الرئيسية", href: "/", icon: "lucide:home" },
  { name: "المقالات", href: "/articles", icon: "lucide:file-text" },
  { name: "السيرة الذاتية", href: "/cv", icon: "lucide:user" },
  { name: "الوسائط", href: "/media", icon: "lucide:camera" },
  {
    name: "البيانات الصحفية",
    href: "/press-statements",
    icon: "lucide:file-text",
  },
];

// Computed properties
const isHomePage = computed(() => route.path === "/");

const headerClasses = computed(() => [
  "fixed top-0 right-0 left-0 z-50 transition-all duration-300",
  isScrolled.value || !isHomePage.value
    ? "bg-white/95 backdrop-blur-md shadow-lg"
    : "bg-transparent",
]);

const logoClasses = computed(() => [
  "text-lg font-bold transition-colors duration-300",
  isScrolled.value || !isHomePage.value ? "text-brand-dark" : "text-white",
]);

const subtitleClasses = computed(() => [
  "text-sm transition-colors duration-300",
  isScrolled.value || !isHomePage.value ? "text-gray-600" : "text-white/80",
]);

const mobileButtonClasses = computed(() => [
  isScrolled.value || !isHomePage.value
    ? "hover:bg-gray-100 text-gray-700"
    : "hover:bg-white/10 text-white",
]);

// Methods
const toggleMobileMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

const closeMobileMenu = () => {
  isMenuOpen.value = false;
};

const getNavLinkClasses = (href) => {
  const isActive = route.path === href;
  const baseClasses =
    "font-medium transition-colors duration-300 px-3 py-2 rounded-lg";

  if (isActive) {
    return `${baseClasses} text-white bg-brand`;
  }

  if (isScrolled.value || !isHomePage.value) {
    return `${baseClasses} text-gray-700 hover:text-brand hover:bg-gray-50`;
  }

  return `${baseClasses} text-white hover:text-white/80 hover:bg-white/10`;
};

const getMobileNavLinkClasses = (href) => {
  const isActive = route.path === href;
  return isActive
    ? "text-white bg-brand"
    : "text-gray-700 hover:text-brand hover:bg-gray-50";
};

// Scroll handler
const handleScroll = () => {
  isScrolled.value = window.scrollY > 50;
};

// Lifecycle
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