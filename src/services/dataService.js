import ApiService from './api.js';

// Fallback data when API is not available
const fallbackData = {
  articles: [
    {
      id: 1,
      title: 'مستقبل التعليم في العصر الرقمي',
      excerpt: 'تحليل شامل لتحديات وفرص التعليم في ظل التطورات التكنولوجية المتسارعة وكيفية الاستفادة من الأدوات الرقمية لتطوير منظومة تعليمية متقدمة.',
      content: `
        <p>يشهد العالم اليوم تطورات تكنولوجية متسارعة تؤثر على جميع جوانب الحياة، وخاصة في مجال التعليم. لقد أصبح من الضروري إعادة النظر في أساليب التعليم التقليدية والانتقال نحو نظم تعليمية أكثر تفاعلية وفعالية.</p>
        
        <h2>التحديات الحالية:</h2>
        <ul>
          <li>الفجوة الرقمية بين الطلاب من خلفيات اجتماعية مختلفة</li>
          <li>نقص التدريب للمعلمين على استخدام التكنولوجيا</li>
          <li>ضعف البنية التحتية التكنولوجية في بعض المناطق</li>
          <li>الحاجة إلى تطوير مناهج تواكب العصر الرقمي</li>
        </ul>
        
        <h2>الحلول المقترحة:</h2>
        <ul>
          <li>الاستثمار في البنية التحتية الرقمية للمدارس</li>
          <li>تدريب المعلمين على أحدث تقنيات التعليم الرقمي</li>
          <li>تطوير منصات تعليمية تفاعلية</li>
          <li>ضمان الوصول العادل للتكنولوجيا لجميع الطلاب</li>
        </ul>
        
        <p>إن الاستثمار في التعليم الرقمي ليس مجرد خيار، بل ضرورة حتمية لضمان مستقبل أفضل لأجيالنا القادمة.</p>
      `,
      image: 'https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg?auto=compress&cs=tinysrgb&w=800',
      date: '2024-01-20',
      views: '15.2K',
      category: 'تعليم',
      readTime: '8 دقائق',
      author: 'محمد عبدالعليم داود',
      tags: ['تعليم', 'تكنولوجيا', 'مستقبل', 'رقمنة']
    },
    {
      id: 2,
      title: 'دور البرلمان في تعزيز الديمقراطية',
      excerpt: 'نظرة معمقة على أهمية العمل البرلماني في ترسيخ قيم الديمقراطية وضمان تمثيل عادل لجميع فئات المجتمع في عملية صنع القرار.',
      content: `
        <p>يلعب البرلمان دوراً محورياً في النظام الديمقراطي، حيث يمثل صوت الشعب ويضمن مشاركة المواطنين في صنع القرارات المهمة التي تؤثر على حياتهم.</p>
        
        <h2>أهمية العمل البرلماني:</h2>
        <ul>
          <li>تمثيل جميع فئات المجتمع في عملية صنع القرار</li>
          <li>مراقبة أداء الحكومة ومحاسبتها</li>
          <li>سن القوانين التي تخدم المصلحة العامة</li>
          <li>حماية حقوق المواطنين والدفاع عن مصالحهم</li>
        </ul>
        
        <h2>التحديات المعاصرة:</h2>
        <ul>
          <li>ضرورة تطوير آليات التواصل مع المواطنين</li>
          <li>مواكبة التطورات التكنولوجية في العمل البرلماني</li>
          <li>تعزيز الشفافية والمساءلة</li>
          <li>ضمان التمثيل العادل لجميع الأطياف</li>
        </ul>
        
        <p>إن تطوير العمل البرلماني وتعزيز فعاليته أمر ضروري لبناء مجتمع ديمقراطي قوي ومستقر.</p>
      `,
      image: 'https://images.pexels.com/photos/6077326/pexels-photo-6077326.jpeg?auto=compress&cs=tinysrgb&w=800',
      date: '2024-01-15',
      views: '12.8K',
      category: 'سياسة',
      readTime: '6 دقائق',
      author: 'محمد عبدالعليم داود',
      tags: ['برلمان', 'ديمقراطية', 'سياسة', 'حكومة']
    },
    {
      id: 3,
      title: 'الصحافة الاستقصائية في العصر الحديث',
      excerpt: 'استكشاف أهمية الصحافة الاستقصائية في كشف الحقائق ومحاربة الفساد، والتحديات التي تواجه الصحفيين في عصر المعلومات.',
      content: `
        <p>تعتبر الصحافة الاستقصائية من أهم أدوات الديمقراطية في كشف الحقائق ومحاربة الفساد. في عصر المعلومات، تزداد أهمية هذا النوع من الصحافة لضمان الشفافية والمساءلة.</p>
        
        <h2>خصائص الصحافة الاستقصائية:</h2>
        <ul>
          <li>البحث المعمق والتحقق من المصادر</li>
          <li>كشف القضايا المخفية عن الرأي العام</li>
          <li>استخدام الوثائق والأدلة الموثقة</li>
          <li>الصبر والمثابرة في البحث عن الحقيقة</li>
        </ul>
        
        <h2>التحديات المعاصرة:</h2>
        <ul>
          <li>التهديدات والضغوط على الصحفيين</li>
          <li>صعوبة الوصول للمعلومات الحكومية</li>
          <li>التمويل والموارد المحدودة</li>
          <li>انتشار المعلومات المضللة</li>
        </ul>
        
        <p>رغم التحديات، تبقى الصحافة الاستقصائية ضرورية لحماية المجتمع وضمان الشفافية في المؤسسات العامة.</p>
      `,
      image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800',
      date: '2024-01-10',
      views: '18.5K',
      category: 'إعلام',
      readTime: '7 دقائق',
      author: 'محمد عبدالعليم داود',
      tags: ['صحافة', 'استقصاء', 'إعلام', 'شفافية']
    }
  ],
  achievements: [
    {
      id: 1,
      iconName: 'award',
      title: 'جائزة أفضل صحفي',
      description: 'حصلت على جائزة أفضل صحفي لعام 2023 من نقابة الصحفيين',
      year: '2023',
      colorName: 'yellow'
    },
    {
      id: 2,
      iconName: 'trophy',
      title: 'جائزة التميز البرلماني',
      description: 'تكريم لأفضل أداء برلماني في مجال حقوق الإنسان',
      year: '2022',
      colorName: 'blue'
    },
    {
      id: 3,
      iconName: 'star',
      title: 'جائزة الصحافة الاستقصائية',
      description: 'تقدير للتحقيقات الصحفية المتميزة في قضايا الفساد',
      year: '2021',
      colorName: 'green'
    },
    {
      id: 4,
      iconName: 'medal',
      title: 'وسام الاستحقاق',
      description: 'وسام من رئيس الجمهورية تقديراً للخدمات الوطنية',
      year: '2020',
      colorName: 'purple'
    }
  ],
  personalInfo: {
    name: 'محمد عبدالعليم داود',
    title: 'صحفي وعضو برلمان',
    email: 'mohammed.journalist@email.com',
    phone: '+20 10 123 4567',
    location: 'القاهرة، جمهورية مصر العربية',
    summary: 'صحفي محترف وعضو برلمان ملتزم بخدمة الوطن والمواطنين، أسعى لتحقيق العدالة الاجتماعية والتنمية المستدامة من خلال العمل الصحفي والبرلماني المتميز.',
    image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400',
    education: [
      {
        degree: 'ماجستير في الصحافة والإعلام',
        institution: 'جامعة القاهرة',
        year: '2015 - 2017',
        description: 'تخصص في الصحافة الاستقصائية والإعلام الرقمي'
      },
      {
        degree: 'بكالوريوس في العلوم السياسية',
        institution: 'جامعة عين شمس',
        year: '2010 - 2014',
        description: 'تخصص في النظم السياسية والعلاقات الدولية'
      }
    ],
    experience: [
      {
        position: 'عضو مجلس النواب',
        organization: 'البرلمان المصري',
        period: '2020 - حتى الآن',
        responsibilities: [
          'عضو لجنة الإعلام والثقافة والآثار',
          'عضو لجنة حقوق الإنسان',
          'المشاركة في صياغة ومراجعة القوانين',
          'تمثيل مصالح الدائرة الانتخابية'
        ]
      },
      {
        position: 'رئيس تحرير',
        organization: 'صحيفة الوطن',
        period: '2018 - 2020',
        responsibilities: [
          'إدارة فريق التحرير والصحفيين',
          'وضع السياسة التحريرية للصحيفة',
          'الإشراف على المحتوى والجودة الصحفية',
          'تطوير استراتيجيات النشر الرقمي'
        ]
      },
      {
        position: 'صحفي استقصائي',
        organization: 'مؤسسة الأهرام',
        period: '2015 - 2018',
        responsibilities: [
          'إجراء تحقيقات صحفية معمقة',
          'كشف قضايا الفساد والمخالفات',
          'التحقق من المصادر والمعلومات',
          'كتابة التقارير الاستقصائية'
        ]
      }
    ],
    languages: [
      { name: 'العربية', level: 'اللغة الأم' },
      { name: 'الإنجليزية', level: 'متقدم' },
      { name: 'الفرنسية', level: 'متوسط' }
    ]
  },
  pressStatements: [
    {
      id: 1,
      title: 'بيان حول أزمة التعليم العالي',
      excerpt: 'بيان صحفي يتناول التحديات التي تواجه التعليم العالي والحلول المقترحة لتطوير المنظومة التعليمية وضمان جودة التعليم للجميع',
      content: `
        <p>يأتي هذا البيان في ضوء التحديات الكبيرة التي تواجه منظومة التعليم العالي في مصر، والحاجة الملحة لإصلاحات جذرية تضمن مواكبة التطورات العالمية وتلبية احتياجات سوق العمل.</p>
        
        <h2>التحديات الرئيسية:</h2>
        <ul>
          <li><strong>ضعف الربط بين مخرجات التعليم العالي ومتطلبات سوق العمل:</strong> هناك فجوة كبيرة بين ما يتعلمه الطلاب في الجامعات وما يحتاجه سوق العمل الفعلي، مما يؤدي إلى ارتفاع معدلات البطالة بين الخريجين.</li>
          <li><strong>قلة الاستثمار في البحث العلمي والتطوير:</strong> تحتاج الجامعات إلى استثمارات أكبر في البحث العلمي لتكون قادرة على المنافسة عالمياً وإنتاج المعرفة.</li>
          <li><strong>الحاجة إلى تطوير المناهج والبرامج الأكاديمية:</strong> المناهج الحالية تحتاج إلى تحديث مستمر لمواكبة التطورات التكنولوجية والعلمية.</li>
          <li><strong>ضرورة تعزيز التعليم التقني والمهني:</strong> هناك حاجة ماسة لتطوير التعليم التقني والمهني كبديل قوي للتعليم الجامعي التقليدي.</li>
        </ul>
        
        <h2>الحلول المقترحة:</h2>
        <ul>
          <li><strong>إنشاء مجلس أعلى للتعليم العالي:</strong> يضم ممثلين من القطاع الخاص والأكاديمي والحكومي لضمان التنسيق والتكامل في السياسات التعليمية.</li>
          <li><strong>زيادة الاستثمار في البحث العلمي:</strong> رفع نسبة الإنفاق على البحث العلمي إلى 3% من الناتج المحلي الإجمالي خلال السنوات الخمس القادمة.</li>
          <li><strong>تطوير برامج التدريب المهني والتقني:</strong> إنشاء معاهد متخصصة تركز على المهارات العملية المطلوبة في السوق.</li>
          <li><strong>إنشاء صندوق لدعم الطلاب المتفوقين:</strong> لضمان عدم حرمان الطلاب المتميزين من التعليم العالي لأسباب مالية.</li>
        </ul>

        <h2>التوصيات العملية:</h2>
        <p>نوصي بتشكيل لجنة وطنية عليا لإصلاح التعليم العالي تضم خبراء من مختلف القطاعات، وتكون مهمتها وضع خطة شاملة للإصلاح خلال فترة زمنية محددة لا تتجاوز عامين.</p>

        <p>كما نؤكد على أهمية إشراك جميع أطياف المجتمع في هذا الإصلاح، بما في ذلك الطلاب وأولياء الأمور والمجتمع المدني، لضمان نجاح هذه الجهود وتحقيق الأهداف المرجوة.</p>

        <h2>الخلاصة:</h2>
        <p>إن إصلاح التعليم العالي ليس مجرد ضرورة تنموية، بل هو استثمار في مستقبل الوطن وأجياله القادمة. ونحن ملتزمون بمتابعة هذا الملف والعمل مع جميع الجهات المعنية لتحقيق النقلة النوعية المطلوبة في منظومة التعليم العالي.</p>
      `,
      date: '2024-01-20',
      category: 'تعليم',
      urgent: true,
      views: '15.2K',
      shares: '1.8K',
      author: 'محمد عبدالعليم داود',
      tags: ['تعليم عالي', 'إصلاح تعليمي', 'بحث علمي', 'سوق العمل']
    },
    {
      id: 2,
      title: 'موقف من قضايا البيئة والتغير المناخي',
      excerpt: 'بيان يوضح الموقف الرسمي من قضايا البيئة والتغير المناخي والإجراءات المطلوبة للحفاظ على البيئة وتحقيق التنمية المستدامة',
      content: `
        <p>في ظل التحديات البيئية المتزايدة والتأثيرات السلبية للتغير المناخي، نؤكد على ضرورة اتخاذ إجراءات عاجلة وفعالة للحفاظ على البيئة وضمان مستقبل مستدام للأجيال القادمة.</p>
        
        <h2>التحديات البيئية:</h2>
        <ul>
          <li>ارتفاع درجات الحرارة وتأثيرها على النظم البيئية</li>
          <li>تلوث الهواء والمياه في المدن الكبرى</li>
          <li>نقص الموارد المائية وتحديات الأمن المائي</li>
          <li>التصحر وتدهور الأراضي الزراعية</li>
        </ul>
        
        <h2>الإجراءات المطلوبة:</h2>
        <ul>
          <li>تطوير استراتيجية وطنية شاملة لمكافحة التغير المناخي</li>
          <li>الاستثمار في الطاقة المتجددة والتقنيات النظيفة</li>
          <li>تطوير نظم النقل العام المستدام</li>
          <li>تعزيز برامج التشجير وحماية المحميات الطبيعية</li>
        </ul>
      `,
      date: '2024-01-15',
      category: 'بيئة',
      urgent: false,
      views: '12.8K',
      shares: '2.1K',
      author: 'محمد عبدالعليم داود',
      tags: ['بيئة', 'تغير مناخي', 'استدامة', 'طاقة متجددة']
    },
    {
      id: 3,
      title: 'تصريح حول الإصلاحات الاقتصادية',
      excerpt: 'تصريح صحفي حول الإصلاحات الاقتصادية المطلوبة وتأثيرها على الطبقات الشعبية والمتوسطة وسبل ضمان العدالة الاجتماعية',
      content: `
        <p>تشهد مصر مرحلة مهمة من الإصلاحات الاقتصادية في إطار رؤية مصر 2030، وهو ما يتطلب توازناً دقيقاً بين تحقيق الأهداف التنموية وضمان العدالة الاجتماعية.</p>
        
        <h2>الإصلاحات المطلوبة:</h2>
        <ul>
          <li>تنويع مصادر الدخل وتقليل الاعتماد على النفط</li>
          <li>تطوير القطاع الخاص وتعزيز ريادة الأعمال</li>
          <li>إصلاح النظام الضريبي بما يحقق العدالة</li>
          <li>تطوير أسواق المال والاستثمار</li>
        </ul>
        
        <h2>الضمانات الاجتماعية:</h2>
        <ul>
          <li>حماية الطبقات الشعبية من تأثيرات الإصلاحات</li>
          <li>تطوير برامج الدعم الاجتماعي المستهدف</li>
          <li>ضمان فرص العمل للشباب</li>
          <li>تطوير برامج التدريب وإعادة التأهيل</li>
        </ul>
      `,
      date: '2024-01-08',
      category: 'اقتصاد',
      urgent: false,
      views: '18.5K',
      shares: '3.2K',
      author: 'محمد عبدالعليم داود',
      tags: ['اقتصاد', 'إصلاحات', 'تنمية', 'عدالة اجتماعية']
    }
  ],
  media: {
    images: [
      {
        id: 1,
        src: 'https://images.pexels.com/photos/6077326/pexels-photo-6077326.jpeg?auto=compress&cs=tinysrgb&w=600',
        title: 'جلسة برلمانية مهمة',
        description: 'مناقشة قانون الضمان الاجتماعي',
        date: '2024-01-15',
        category: 'برلمان'
      },
      {
        id: 2,
        src: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=600',
        title: 'لقاء صحفي',
        description: 'مؤتمر صحفي حول الإصلاحات الاقتصادية',
        date: '2024-01-12',
        category: 'إعلام'
      },
      {
        id: 3,
        src: 'https://images.pexels.com/photos/4050315/pexels-photo-4050315.jpeg?auto=compress&cs=tinysrgb&w=600',
        title: 'زيارة ميدانية',
        description: 'زيارة لمشاريع التنمية المحلية',
        date: '2024-01-08',
        category: 'زيارات'
      },
      {
        id: 4,
        src: 'https://images.pexels.com/photos/5699456/pexels-photo-5699456.jpeg?auto=compress&cs=tinysrgb&w=600',
        title: 'ورشة عمل',
        description: 'ورشة حول حقوق الإنسان',
        date: '2024-01-05',
        category: 'فعاليات'
      },
      {
        id: 5,
        src: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=600',
        title: 'اجتماع لجنة',
        description: 'اجتماع لجنة الشؤون الخارجية',
        date: '2024-01-02',
        category: 'برلمان'
      },
      {
        id: 6,
        src: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=600',
        title: 'فعالية مجتمعية',
        description: 'فعالية خيرية للأطفال المحتاجين',
        date: '2023-12-28',
        category: 'مجتمع'
      }
    ],
    videos: [
      {
        id: 1,
        videoId: 'dQw4w9WgXcQ',
        title: 'كلمة في البرلمان حول التعليم',
        description: 'كلمة مهمة حول إصلاح منظومة التعليم العالي',
        duration: '15:30',
        views: '25K',
        date: '2024-01-18'
      },
      {
        id: 2,
        videoId: 'jNQXAC9IVRw',
        title: 'مقابلة تلفزيونية حول الإصلاحات',
        description: 'مقابلة شاملة حول الإصلاحات الاقتصادية والاجتماعية',
        duration: '22:45',
        views: '18K',
        date: '2024-01-15'
      },
      {
        id: 3,
        videoId: 'y6120QOlsfU',
        title: 'تقرير إخباري عن الأنشطة البرلمانية',
        description: 'تقرير مفصل عن أهم الأنشطة البرلمانية للفصل الحالي',
        duration: '8:20',
        views: '12K',
        date: '2024-01-10'
      },
      {
        id: 4,
        videoId: 'kJQP7kiw5Fk',
        title: 'ندوة حول حقوق المرأة',
        description: 'ندوة متخصصة حول تعزيز حقوق المرأة في المجتمع',
        duration: '45:15',
        views: '30K',
        date: '2024-01-05'
      }
    ],
    documents: [
      {
        id: 1,
        title: 'تقرير الأداء البرلماني 2023',
        type: 'PDF',
        size: '2.5 MB',
        downloads: '1.2K'
      },
      {
        id: 2,
        title: 'مشروع قانون الضمان الاجتماعي',
        type: 'PDF',
        size: '1.8 MB',
        downloads: '850'
      },
      {
        id: 3,
        title: 'دراسة حول التنمية المستدامة',
        type: 'PDF',
        size: '3.2 MB',
        downloads: '920'
      },
      {
        id: 4,
        title: 'تقرير لجنة حقوق الإنسان',
        type: 'PDF',
        size: '2.1 MB',
        downloads: '750'
      }
    ]
  }
};

class DataService {
  // Get all data from API endpoint with fallback
  async getAllData() {
    try {
      const response = await ApiService.get('/data/all');
      return response;
    } catch (error) {
      console.warn('API request failed, using fallback data:', error.message);
      // Return fallback data in the same format as API
      return {
        success: true,
        data: {
          articles: { items: fallbackData.articles },
          achievements: { items: fallbackData.achievements },
          personalInfo: { items: [fallbackData.personalInfo] },
          pressStatements: { items: fallbackData.pressStatements },
          media: { items: [
            ...fallbackData.media.images.map(img => ({ ...img, type: 'image' })),
            ...fallbackData.media.videos.map(vid => ({ ...vid, type: 'video' })),
            ...fallbackData.media.documents.map(doc => ({ ...doc, type: 'document' }))
          ]}
        }
      };
    }
  }

  // Transform API data to match component expectations
  transformApiData(apiData) {
    if (!apiData.success || !apiData.data) {
      throw new Error('Invalid API response format');
    }

    const { data } = apiData;

    return {
      articles: data.articles?.items?.map(article => ({
        id: article._id || article.id,
        title: article.title,
        excerpt: article.description || article.content?.substring(0, 200) + '...',
        content: article.content,
        image: article.image,
        date: article.date,
        views: article.views || '0',
        category: article.tags?.[0] || 'عام',
        readTime: `${article.readTime || 5} دقائق`,
        author: article.author || 'محمد عبدالعليم داود',
        tags: article.tags || []
      })) || [],

      achievements: data.achievements?.items?.map(achievement => ({
        id: achievement._id || achievement.id,
        iconName: achievement.iconName || 'award',
        title: achievement.title,
        description: achievement.content || achievement.description,
        year: achievement.year ? new Date(achievement.year).getFullYear().toString() : '2023',
        colorName: achievement.colorName || 'yellow'
      })) || [],

      personalInfo: data.personalInfo?.items?.[0] ? {
        name: data.personalInfo.items[0].name,
        title: data.personalInfo.items[0].title,
        email: data.personalInfo.items[0].email,
        phone: data.personalInfo.items[0].phone,
        location: data.personalInfo.items[0].location,
        summary: data.personalInfo.items[0].summary,
        image: data.personalInfo.items[0].image,
        education: data.personalInfo.items[0].education?.map(edu => ({
          degree: edu.degree,
          institution: edu.institution,
          year: `${new Date(edu.startDate).getFullYear()}${edu.endDate ? ` - ${new Date(edu.endDate).getFullYear()}` : ' - حتى الآن'}`,
          description: edu.description
        })) || [],
        experience: data.personalInfo.items[0].experience?.map(exp => ({
          position: exp.position,
          organization: exp.company,
          period: `${new Date(exp.startDate).getFullYear()}${exp.current ? ' - حتى الآن' : ''}`,
          responsibilities: [exp.description]
        })) || [],
        languages: data.personalInfo.items[0].languages || [
          { name: 'العربية', level: 'اللغة الأم' },
          { name: 'الإنجليزية', level: 'متقدم' },
          { name: 'الفرنسية', level: 'متوسط' }
        ]
      } : null,

      pressStatements: data.pressStatements?.items?.map(statement => ({
        id: statement._id || statement.id,
        title: statement.title,
        excerpt: statement.excerpt || statement.description,
        content: statement.content,
        date: statement.date,
        category: statement.categoryId?.name || statement.category || 'عام',
        urgent: statement.urgent || false,
        views: statement.views || '0',
        shares: statement.shares || '0',
        author: statement.author || 'محمد عبدالعليم داود',
        tags: statement.tags || []
      })) || [],

      media: {
        images: data.media?.items?.filter(item => item.type === 'image')?.map(item => ({
          id: item._id || item.id,
          src: item.src,
          title: item.title,
          description: item.description,
          date: item.date,
          category: item.tags?.[0] || 'عام'
        })) || [],
        videos: data.media?.items?.filter(item => item.type === 'video')?.map(item => ({
          id: item._id || item.id,
          videoId: item.src,
          title: item.title,
          description: item.description,
          duration: item.duration || '0:00',
          views: item.views || '0',
          date: item.date
        })) || [],
        documents: data.media?.items?.filter(item => item.type === 'document')?.map(item => ({
          id: item._id || item.id,
          title: item.title,
          description: item.description,
          type: item.fileType || 'PDF',
          size: item.size || '0 MB',
          downloads: item.downloads || '0',
          date: item.date
        })) || []
      }
    };
  }

  // Articles
  async getArticles(params = {}) {
    const allData = await this.getAllData();
    const transformedData = this.transformApiData(allData);
    return { data: transformedData.articles };
  }

  async getArticle(id) {
    const allData = await this.getAllData();
    const transformedData = this.transformApiData(allData);
    const article = transformedData.articles.find(a => a.id === id);
    return { data: article };
  }

  // Personal Info
  async getPersonalInfo() {
    const allData = await this.getAllData();
    const transformedData = this.transformApiData(allData);
    return { data: transformedData.personalInfo };
  }

  // Achievements
  async getAchievements() {
    const allData = await this.getAllData();
    const transformedData = this.transformApiData(allData);
    return { data: transformedData.achievements };
  }

  // Events (empty for now since not in API)
  async getEvents(params = {}) {
    return { data: [] };
  }

  async getEvent(id) {
    return { data: null };
  }

  // Media
  async getMedia(type = null) {
    const allData = await this.getAllData();
    const transformedData = this.transformApiData(allData);
    
    if (type) {
      return { data: transformedData.media[type] || [] };
    }
    
    return { data: transformedData.media };
  }

  // Press Statements
  async getPressStatements(params = {}) {
    const allData = await this.getAllData();
    const transformedData = this.transformApiData(allData);
    return { data: transformedData.pressStatements };
  }

  async getPressStatement(id) {
    const allData = await this.getAllData();
    const transformedData = this.transformApiData(allData);
    const statement = transformedData.pressStatements.find(s => s.id === id);
    return { data: statement };
  }

  // Media Coverage (empty for now since not in API)
  async getMediaCoverage(params = {}) {
    return { data: [] };
  }
}

export default new DataService();