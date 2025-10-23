<template>
  <footer id="contact" class="bg-brand-dark text-white">
    <div class="container mx-auto px-4 py-16">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <!-- About Section -->
        <div class="lg:col-span-2">
          <div class="mb-6">
            <h3 class="text-2xl font-bold mb-2">
              {{ personalInfo?.name || "محمد عبدالعليم داود" }}
            </h3>
            <p class="text-white/80">
              {{ personalInfo?.title || "صحفي وعضو برلمان" }}
            </p>
          </div>

          <p class="text-white/80 leading-relaxed mb-6 max-w-md">
            {{
              personalInfo?.summary ||
              "صحفي محترف وعضو برلمان ملتزم بخدمة الوطن والمواطنين، أسعى لتحقيق العدالة الاجتماعية والتنمية المستدامة من خلال العمل الصحفي والبرلماني المتميز."
            }}
          </p>

          <!-- Contact Info -->
          <div class="space-y-3">
            <div class="flex items-center space-x-reverse space-x-3">
              <Icon name="lucide:mail" class="w-5 h-5 text-white/60" />
              <span class="text-white/80">
                {{ personalInfo?.email || "mohammed.journalist@email.com" }}
              </span>
            </div>
            <div class="flex items-center space-x-reverse space-x-3">
              <Icon name="lucide:phone" class="w-5 h-5 text-white/60" />
              <span class="text-white/80">
                {{ personalInfo?.phone || "+20 10 123 4567" }}
              </span>
            </div>
            <div class="flex items-center space-x-reverse space-x-3">
              <Icon name="lucide:map-pin" class="w-5 h-5 text-white/60" />
              <span class="text-white/80">
                {{ personalInfo?.location || "القاهرة، جمهورية مصر العربية" }}
              </span>
            </div>
          </div>
        </div>

        <!-- Quick Links -->
        <div>
          <h4 class="text-xl font-bold mb-6">روابط سريعة</h4>
          <ul class="space-y-3">
            <li v-for="link in quickLinks" :key="link.name">
              <NuxtLink
                :to="link.href"
                class="text-white/80 hover:text-white transition-colors duration-200 hover:translate-x-1 inline-block"
              >
                {{ link.name }}
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Legal Links -->
        <div>
          <h4 class="text-xl font-bold mb-6">معلومات قانونية</h4>
          <ul class="space-y-3 mb-8">
            <li v-for="link in legalLinks" :key="link.name">
              <NuxtLink
                :to="link.href"
                class="text-white/80 hover:text-white transition-colors duration-200 hover:translate-x-1 inline-block"
              >
                {{ link.name }}
              </NuxtLink>
            </li>
          </ul>

          <!-- Social Links -->
          <div>
            <h5 class="font-bold mb-4">تابعني على</h5>
            <div class="flex space-x-reverse space-x-3">
              <a
                v-for="social in socialLinks"
                :key="social.label"
                :href="social.href"
                :aria-label="social.label"
                target="_blank"
                class="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors duration-200 hover:scale-110"
              >
                <Icon :name="social.icon" class="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>

      <!-- Bottom Bar -->
      <div class="border-t border-white/20 mt-12 pt-8 text-center">
        <p
          class="text-white/60 flex items-center justify-center space-x-reverse space-x-2"
        >
          <span>
            © {{ new Date().getFullYear() }} محمد عبدالعليم داود. جميع الحقوق
            محفوظة. صُنع بـ
          </span>
          <Icon name="lucide:heart" class="w-4 h-4 text-red-400" />
          <span>في جمهورية مصر العربية</span>
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup>
const globalData = useState("globalData");
const personalInfo = computed(() => globalData.value?.personalInfo?.items[0]);

const socialLinks = computed(() => [
  {
    icon: "lucide:facebook",
    href: personalInfo.value?.facebookLink || "#",
    label: "فيسبوك",
  },
  {
    icon: "lucide:youtube",
    href: personalInfo.value?.youtubeLink || "#",
    label: "يوتيوب",
  },
]);

const quickLinks = [
  { name: "الرئيسية", href: "/" },
  { name: "المقالات", href: "/articles" },
  { name: "السيرة الذاتية", href: "/cv" },
  { name: "الوسائط", href: "/media" },
  { name: "البيانات الصحفية", href: "/press-statements" },
];

const legalLinks = [
  { name: "سياسة الخصوصية", href: "/privacy-policy" },
  { name: "شروط الاستخدام", href: "/terms-of-service" },
  { name: "إخلاء المسؤولية", href: "/disclaimer" },
];
</script>