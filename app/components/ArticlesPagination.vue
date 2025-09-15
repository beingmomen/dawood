<template>
  <div class="flex items-center justify-center space-x-reverse space-x-2">
    <!-- Previous Button -->
    <button
      @click="$emit('page-change', currentPage - 1)"
      :disabled="!hasPrev"
      :class="[
        'flex items-center space-x-reverse space-x-2 px-4 py-2 rounded-lg font-medium transition-colors',
        hasPrev
          ? 'bg-brand text-white hover:bg-brand-dark'
          : 'bg-gray-200 text-gray-400 cursor-not-allowed',
      ]"
    >
      <Icon name="lucide:chevron-right" class="w-5 h-5" />
      <span>السابق</span>
    </button>

    <!-- Page Numbers -->
    <div class="flex items-center space-x-reverse space-x-1">
      <template v-for="page in visiblePages" :key="page">
        <button
          v-if="page !== '...'"
          @click="$emit('page-change', page)"
          :class="[
            'w-10 h-10 rounded-lg font-medium transition-colors',
            page === currentPage
              ? 'bg-brand text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200',
          ]"
        >
          {{ page }}
        </button>
        <span v-else class="px-2 text-gray-400">...</span>
      </template>
    </div>

    <!-- Next Button -->
    <button
      @click="$emit('page-change', currentPage + 1)"
      :disabled="!hasNext"
      :class="[
        'flex items-center space-x-reverse space-x-2 px-4 py-2 rounded-lg font-medium transition-colors',
        hasNext
          ? 'bg-brand text-white hover:bg-brand-dark'
          : 'bg-gray-200 text-gray-400 cursor-not-allowed',
      ]"
    >
      <span>التالي</span>
      <Icon name="lucide:chevron-left" class="w-5 h-5" />
    </button>
  </div>
</template>

<script setup>
const props = defineProps({
  currentPage: {
    type: Number,
    required: true,
  },
  totalPages: {
    type: Number,
    required: true,
  },
  hasNext: {
    type: Boolean,
    default: false,
  },
  hasPrev: {
    type: Boolean,
    default: false,
  },
});

defineEmits(["page-change"]);

const visiblePages = computed(() => {
  const pages = [];
  const { currentPage, totalPages } = props;

  if (totalPages <= 7) {
    // Show all pages if total is 7 or less
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
  } else {
    // Always show first page
    pages.push(1);

    if (currentPage > 4) {
      pages.push("...");
    }

    // Show pages around current page
    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (currentPage < totalPages - 3) {
      pages.push("...");
    }

    // Always show last page
    if (totalPages > 1) {
      pages.push(totalPages);
    }
  }

  return pages;
});
</script>