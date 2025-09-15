// JSON-LD structured data composable
export const useJsonld = (data) => {
  const generateJsonLd = () => {
    if (typeof data === 'function') {
      return data()
    }
    return data
  }

  const jsonLdData = computed(() => {
    const result = generateJsonLd()
    return result ? JSON.stringify(result) : null
  })

  useHead({
    script: computed(() => {
      if (!jsonLdData.value) return []

      return [
        {
          type: 'application/ld+json',
          innerHTML: jsonLdData.value
        }
      ]
    })
  })

  return {
    jsonLdData: readonly(jsonLdData)
  }
}