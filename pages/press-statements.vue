<template>
  <div class="min-h-screen bg-background pt-20">
    <div class="container mx-auto px-4 py-12">
      <!-- Header -->
      <div class="text-center mb-12">
        <h1 class="text-4xl md:text-5xl font-bold text-brand-dark mb-6">
          البيانات الصحفية
        </h1>
        <p class="text-xl text-gray-600 max-w-3xl mx-auto">
          جميع البيانات والتصريحات الصحفية حول القضايا المهمة
        </p>
        <p v-if="totalItems > 0" class="text-sm text-gray-500 mt-4">
          عرض {{ statements.length }} من أصل {{ totalItems }} بيان
        </p>
      </div>

      <!-- Search -->
      <div class="bg-white rounded-2xl p-6 shadow-lg mb-12">
        <div class="relative w-full">
          <Icon
            name="lucide:search"
            class="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5"
          />
          <input
            v-model="searchTerm"
            type="text"
            placeholder="البحث في البيانات الصحفية..."
            class="w-full pr-12 pl-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand focus:border-transparent"
            @input="debouncedSearch"
          />
        </div>
      </div>

      <!-- Loading -->
      <div v-if="pending" class="flex justify-center items-center py-12">
        <div
          class="animate-spin rounded-full h-12 w-12 border-b-2 border-brand"
        ></div>
        <span class="mr-3 text-gray-600">جاري تحميل البيانات...</span>
      </div>

      <!-- Error -->
      <div v-else-if="error" class="text-center py-12">
        <div
          class="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4"
        >
          <Icon name="lucide:alert-circle" class="w-8 h-8 text-red-500" />
        </div>
        <h3 class="text-lg font-semibold text-gray-800 mb-2">عذراً، حدث خطأ</h3>
        <p class="text-gray-600 mb-6">
          {{ error.message || "حدث خطأ في تحميل البيانات" }}
        </p>
        <button
          @click="refresh()"
          class="bg-brand text-white px-6 py-3 rounded-lg hover:bg-brand-dark transition-colors"
        >
          إعادة المحاولة
        </button>
      </div>

      <!-- Press Statements Grid -->
      <div v-else-if="statements.length > 0">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          <article
            v-for="statement in statements"
            :key="statement.id"
            class="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
          >
            <div class="flex items-center justify-between mb-4">
              <span
                class="px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
              >
                {{ statement.category.name }}
              </span>
              <div
                class="flex items-center space-x-reverse space-x-2 text-gray-500 text-sm"
              >
                <Icon name="lucide:calendar" class="w-4 h-4" />
                <span>{{ formatDate(statement.date) }}</span>
              </div>
            </div>

            <h3 class="text-xl font-bold text-brand-dark mb-4">
              {{ statement.title }}
            </h3>

            <p class="text-gray-600 mb-6">
              {{ statement.excerpt }}
            </p>

            <button
              class="w-full bg-brand text-white py-3 rounded-lg font-semibold hover:bg-brand-dark transition-colors"
            >
              اقرأ البيان كاملاً
            </button>
          </article>
        </div>

        <!-- Pagination -->
        <ArticlesPagination
          v-if="totalPages > 1"
          :current-page="currentPage"
          :total-pages="totalPages"
          :has-prev="hasPrev"
          :has-next="hasNext"
          @page-change="handlePageChange"
        />
      </div>

      <!-- No Results -->
      <div v-else class="text-center py-12">
        <div
          class="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6"
        >
          <Icon name="lucide:search" class="w-12 h-12 text-gray-400" />
        </div>
        <h3 class="text-2xl font-bold text-gray-800 mb-4">
          لا توجد بيانات صحفية
        </h3>
        <p class="text-xl text-gray-500 mb-8">
          {{
            searchTerm
              ? "لا توجد بيانات تطابق البحث"
              : "لم يتم العثور على أي بيانات صحفية"
          }}
        </p>
        <button
          v-if="searchTerm"
          @click="clearSearch"
          class="bg-brand text-white px-6 py-3 rounded-lg hover:bg-brand-dark transition-colors"
        >
          مسح البحث
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useDebounceFn } from "@vueuse/core";

const route = useRoute();
const router = useRouter();

// Reactive state
const searchTerm = ref("");
const currentPage = ref(parseInt(route.query.page) || 1);
const pending = ref(false);
const error = ref(null);
const apiResponse = ref(null);

// Computed properties from API response
const statements = computed(() => apiResponse.value?.data || []);
const totalItems = computed(() => apiResponse.value?.total || 0);
const totalPages = computed(() => apiResponse.value?.totalPages || 0);
const hasNext = computed(() => apiResponse.value?.hasNext || false);
const hasPrev = computed(() => apiResponse.value?.hasPrev || false);

// Fetch press statements from external API
const fetchStatements = async () => {
  try {
    pending.value = true;
    error.value = null;

    const params = {
      page: currentPage.value,
      limit: 12,
    };

    if (searchTerm.value) {
      params.search = searchTerm.value;
    }

    const response = await $fetch(
      "https://demo-api.abdaleemdawood.com/api/v1/press-statements",
      {
        query: params,
      }
    );

    // Transform response to match expected structure
    apiResponse.value = {
      ...response,
      totalPages: Math.ceil(response.total / 12),
      hasNext: currentPage.value < Math.ceil(response.total / 12),
      hasPrev: currentPage.value > 1,
    };
  } catch (err) {
    error.value = err;
    console.error("Error fetching press statements:", err);
  } finally {
    pending.value = false;
  }
};

const refresh = () => {
  fetchStatements();
};

// Methods
const handlePageChange = (page) => {
  currentPage.value = page;
  const query = { ...route.query, page };
  if (searchTerm.value) {
    query.search = searchTerm.value;
  }
  router.push({ query });
  if (process.client) {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
};

const clearSearch = () => {
  searchTerm.value = "";
  currentPage.value = 1;
  router.push({ query: {} });
  fetchStatements();
};

// Debounced search
const debouncedSearch = useDebounceFn(() => {
  currentPage.value = 1;
  const query = { page: 1 };
  if (searchTerm.value) {
    query.search = searchTerm.value;
  }
  router.push({ query });
  fetchStatements();
}, 300);

// Watch for route changes
watch(
  () => route.query.page,
  (newPage) => {
    currentPage.value = parseInt(newPage) || 1;
    fetchStatements();
  }
);

// Watch for search term in URL
watch(
  () => route.query.search,
  (newSearch) => {
    searchTerm.value = newSearch || "";
  }
);

// Initialize data on mount
onMounted(() => {
  // Set search term from URL if present
  searchTerm.value = route.query.search || "";
  fetchStatements();
});

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString("ar-EG");
};

// SEO
useHead({
  title: "البيانات الصحفية - محمد عبدالعليم داود",
  meta: [
    {
      name: "description",
      content: "جميع البيانات والتصريحات الصحفية حول القضايا المهمة",
    },
  ],
});
</script>