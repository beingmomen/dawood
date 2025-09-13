export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  
  try {
    const response = await $fetch('/data/all', {
      baseURL: config.public.apiBaseUrl
    })

    if (response && response.data && response.data.personalInfo?.items?.[0]) {
      const info = response.data.personalInfo.items[0]
      return {
        name: info.name,
        title: info.title,
        email: info.email,
        phone: info.phone,
        location: info.location,
        summary: info.summary,
        image: info.image,
        facebookLink: info.facebookLink,
        twitterLink: info.twitterLink,
        instagramLink: info.instagramLink,
        linkedinLink: info.linkedinLink,
        youtubeLink: info.youtubeLink,
      }
    }

    throw new Error('Personal info not found')
  } catch (error) {
    console.warn('Personal info API unavailable')
    
    return {
      name: 'محمد عبدالعليم داود',
      title: 'صحفي وعضو برلمان',
      email: 'mohammed.journalist@email.com',
      phone: '+20 10 123 4567',
      location: 'القاهرة، جمهورية مصر العربية',
      summary: 'صحفي محترف وعضو برلمان ملتزم بخدمة الوطن والمواطنين، أسعى لتحقيق العدالة الاجتماعية والتنمية المستدامة من خلال العمل الصحفي والبرلماني المتميز.',
      image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400',
      facebookLink: '#',
      youtubeLink: '#',
    }
  }
})