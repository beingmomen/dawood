// Performance optimization utilities
export const usePerformance = () => {
  // Lazy load images with intersection observer
  const useLazyImage = (imageRef, options = {}) => {
    const { threshold = 0.1, rootMargin = '50px' } = options
    const isLoaded = ref(false)
    const isIntersecting = ref(false)

    if (import.meta.client) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && !isLoaded.value) {
            isIntersecting.value = true
            const img = entry.target

            if (img.dataset.src) {
              img.src = img.dataset.src
              img.onload = () => {
                isLoaded.value = true
                img.classList.remove('blur-sm')
                img.classList.add('transition-all', 'duration-300')
              }
            }

            observer.unobserve(img)
          }
        },
        { threshold, rootMargin }
      )

      onMounted(() => {
        if (imageRef.value) {
          observer.observe(imageRef.value)
        }
      })

      onUnmounted(() => {
        observer.disconnect()
      })
    }

    return { isLoaded, isIntersecting }
  }

  // Debounce utility for search and input handling
  const useDebouncedRef = (value, delay = 300) => {
    const debouncedValue = ref(value)

    watch(() => value, (newValue) => {
      setTimeout(() => {
        debouncedValue.value = newValue
      }, delay)
    })

    return debouncedValue
  }

  // Virtual scrolling for large lists
  const useVirtualScroll = (items, itemHeight = 100, containerHeight = 400) => {
    const scrollTop = ref(0)
    const containerRef = ref(null)

    const visibleCount = computed(() => Math.ceil(containerHeight / itemHeight) + 2)
    const startIndex = computed(() => Math.floor(scrollTop.value / itemHeight))
    const endIndex = computed(() => Math.min(startIndex.value + visibleCount.value, items.length))

    const visibleItems = computed(() =>
      items.slice(startIndex.value, endIndex.value).map((item, index) => ({
        ...item,
        index: startIndex.value + index
      }))
    )

    const totalHeight = computed(() => items.length * itemHeight)
    const offsetY = computed(() => startIndex.value * itemHeight)

    const handleScroll = (event) => {
      scrollTop.value = event.target.scrollTop
    }

    return {
      containerRef,
      visibleItems,
      totalHeight,
      offsetY,
      handleScroll
    }
  }

  // Preload critical resources
  const preloadResource = (href, as = 'fetch', crossorigin = null) => {
    if (import.meta.client) {
      const link = document.createElement('link')
      link.rel = 'preload'
      link.href = href
      link.as = as
      if (crossorigin) link.crossOrigin = crossorigin
      document.head.appendChild(link)
    }
  }

  // Image optimization helpers
  const getOptimizedImageUrl = (url, width = 800, quality = 80) => {
    if (!url) return '/placeholder.jpg'

    // If using a CDN like Cloudinary, you can add transformation parameters
    // Example: return url.replace('/upload/', `/upload/w_${width},q_${quality},f_auto/`)

    return url
  }

  // Generate responsive image sources
  const getResponsiveImageSources = (baseUrl, sizes = [400, 800, 1200]) => {
    return sizes.map(size => ({
      srcset: getOptimizedImageUrl(baseUrl, size),
      media: `(max-width: ${size}px)`
    }))
  }

  // Performance monitoring
  const measurePerformance = (name, fn) => {
    return async (...args) => {
      if (import.meta.client && 'performance' in window) {
        const start = performance.now()
        const result = await fn(...args)
        const end = performance.now()
        console.log(`${name} took ${end - start} milliseconds`)
        return result
      }
      return fn(...args)
    }
  }

  // Critical CSS inlining check
  const isCriticalCSS = () => {
    if (import.meta.client) {
      return document.querySelector('style[data-critical]') !== null
    }
    return false
  }

  return {
    useLazyImage,
    useDebouncedRef,
    useVirtualScroll,
    preloadResource,
    getOptimizedImageUrl,
    getResponsiveImageSources,
    measurePerformance,
    isCriticalCSS
  }
}