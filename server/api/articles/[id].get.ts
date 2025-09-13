export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const id = getRouterParam(event, 'id')
  
  try {
    const response = await $fetch(`/articles/${id}`, {
      baseURL: config.public.apiBaseUrl
    })

    if (response.status === 'success' && response.data && response.data.data) {
      const article = response.data.data
      return {
        id: article._id || article.id,
        title: article.title,
        excerpt: article.description || article.content?.substring(0, 200) + '...',
        content: article.content,
        image: article.image,
        date: article.date,
        views: article.views || '0',
        category: article?.category?.name || 'عام',
        readTime: `${article.readTime || 5} دقائق`,
        author: article.author || 'محمد عبدالعليم داود',
        tags: article.tags || [],
      }
    }

    throw new Error('Article not found')
  } catch (error) {
    console.warn('Article API unavailable, using demo data')
    
    return {
      id: id || 'demo-1',
      title: 'مقال تجريبي - التحديات الاقتصادية وحلولها المبتكرة',
      excerpt: 'تواجه الاقتصادات العربية تحديات جمة في ظل التطورات العالمية المتسارعة والتغيرات الجيوسياسية المؤثرة على الأسواق العالمية...',
      content: `
        <p>تواجه الاقتصادات العربية تحديات جمة في ظل التطورات العالمية المتسارعة والتغيرات الجيوسياسية المؤثرة على الأسواق العالمية. هذه التحديات تتطلب حلولاً مبتكرة ورؤية استراتيجية واضحة للتعامل معها بفعالية.</p>
        
        <h2>التحديات الرئيسية</h2>
        <p>من أبرز التحديات التي تواجه المنطقة العربية:</p>
        <ul>
          <li>التضخم المتزايد وارتفاع أسعار السلع الأساسية</li>
          <li>تقلبات أسعار النفط وتأثيرها على الموازنات العامة</li>
          <li>البطالة بين الشباب والحاجة لخلق فرص عمل جديدة</li>
          <li>التحول الرقمي ومواكبة التطورات التكنولوجية</li>
        </ul>
        
        <h2>الحلول المقترحة</h2>
        <p>لمواجهة هذه التحديات، نحتاج إلى:</p>
        <ol>
          <li>تنويع مصادر الدخل وتقليل الاعتماد على النفط</li>
          <li>الاستثمار في التعليم والتدريب المهني</li>
          <li>دعم المشاريع الصغيرة والمتوسطة</li>
          <li>تطوير البنية التحتية الرقمية</li>
        </ol>
        
        <p>إن التعامل مع هذه التحديات يتطلب تضافر الجهود بين القطاعين العام والخاص، وتبني سياسات اقتصادية مرنة تواكب المتغيرات العالمية.</p>
      `,
      image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800',
      date: '2024-01-15T10:00:00.000Z',
      views: '1,234',
      category: 'اقتصاد',
      readTime: '5 دقائق',
      author: 'محمد عبدالعليم داود',
      tags: ['اقتصاد', 'تنمية', 'استثمار', 'تحديات'],
    }
  }
})