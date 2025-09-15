export function useAPI(url, options = {}) {
  // Only call useNuxtApp when the function is actually used, not when module is imported
  const { $api } = useNuxtApp()
  return useFetch(url, {
    ...options,
    $fetch: $api
  })
}
