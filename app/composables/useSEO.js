// SEO utility composable for consistent meta tags across the site
export const useSEO = (options = {}) => {
  // Only access composables when in proper context - moved inside functions to avoid top-level execution
  const getGlobalData = () => useState('globalData')
  const getPersonalInfo = () => computed(() => getGlobalData().value?.personalInfo?.items?.[0])

  // Default SEO values
  const defaults = {
    siteName: 'محمد عبدالعليم داود',
    siteUrl: 'https://your-domain.com',
    defaultImage: '/og-image.jpg',
    twitterHandle: '@your_twitter'
  }

  // Merge provided options with defaults
  const seoOptions = { ...defaults, ...options }

  // Set page-specific SEO meta tags
  const setSEO = (pageSEO = {}) => {
    const personalInfo = getPersonalInfo()
    const title = pageSEO.title
      ? `${pageSEO.title} - ${seoOptions.siteName}`
      : `${personalInfo.value?.name || seoOptions.siteName} - ${personalInfo.value?.title || 'صحفي وعضو برلمان'}`

    const description = pageSEO.description || personalInfo.value?.summary || 'الموقع الرسمي للصحفي وعضو البرلمان محمد عبدالعليم داود'

    const image = pageSEO.image || personalInfo.value?.image || seoOptions.defaultImage

    const url = pageSEO.url ? `${seoOptions.siteUrl}${pageSEO.url}` : seoOptions.siteUrl

    useSeoMeta({
      title,
      description,
      ogTitle: title,
      ogDescription: description,
      ogImage: image,
      ogUrl: url,
      ogType: pageSEO.type || 'website',
      ogSiteName: seoOptions.siteName,
      twitterCard: 'summary_large_image',
      twitterTitle: title,
      twitterDescription: description,
      twitterImage: image,
      twitterSite: seoOptions.twitterHandle
    })

    useHead({
      title,
      meta: [
        { name: 'description', content: description },
        { property: 'article:author', content: personalInfo.value?.name },
        { name: 'author', content: personalInfo.value?.name }
      ],
      link: [
        { rel: 'canonical', href: url }
      ]
    })
  }

  // Generate structured data for articles
  const getArticleStructuredData = (article) => {
    const personalInfo = getPersonalInfo()
    if (!article || !personalInfo.value) return null

    return {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: article.title,
      description: article.excerpt || article.content?.substring(0, 160),
      image: article.image || seoOptions.defaultImage,
      datePublished: article.publishedAt,
      dateModified: article.updatedAt || article.publishedAt,
      author: {
        '@type': 'Person',
        name: personalInfo.value.name,
        jobTitle: personalInfo.value.title
      },
      publisher: {
        '@type': 'Person',
        name: personalInfo.value.name,
        logo: {
          '@type': 'ImageObject',
          url: personalInfo.value.image || seoOptions.defaultImage
        }
      },
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': `${seoOptions.siteUrl}/articles/${article.id}`
      }
    }
  }

  // Generate structured data for press statements
  const getPressStatementStructuredData = (statement) => {
    const personalInfo = getPersonalInfo()
    if (!statement || !personalInfo.value) return null

    return {
      '@context': 'https://schema.org',
      '@type': 'Article',
      '@id': `${seoOptions.siteUrl}/press-statements/${statement.id}`,
      headline: statement.title,
      description: statement.excerpt || statement.content?.substring(0, 160),
      image: statement.image || seoOptions.defaultImage,
      datePublished: statement.publishedAt,
      dateModified: statement.updatedAt || statement.publishedAt,
      author: {
        '@type': 'Person',
        name: personalInfo.value.name,
        jobTitle: personalInfo.value.title
      },
      publisher: {
        '@type': 'Organization',
        name: 'مكتب محمد عبدالعليم داود',
        logo: {
          '@type': 'ImageObject',
          url: personalInfo.value.image || seoOptions.defaultImage
        }
      },
      genre: 'Press Release'
    }
  }

  // Generate breadcrumb structured data
  const getBreadcrumbStructuredData = (breadcrumbs) => {
    if (!breadcrumbs || !Array.isArray(breadcrumbs)) return null

    return {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: breadcrumbs.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        item: `${seoOptions.siteUrl}${item.path}`
      }))
    }
  }

  // Set JSON-LD structured data
  const setJsonLd = (structuredData) => {
    useJsonld(structuredData)
  }

  return {
    setSEO,
    setJsonLd,
    getArticleStructuredData,
    getPressStatementStructuredData,
    getBreadcrumbStructuredData,
    personalInfo: readonly(getPersonalInfo())
  }
}