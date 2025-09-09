import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, FileText, ArrowLeft, Search } from 'lucide-react';
import { Link } from 'react-router-dom';

const PressStatementsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const statements = [
    {
      id: 1,
      title: 'بيان حول أزمة التعليم العالي',
      excerpt: 'بيان صحفي يتناول التحديات التي تواجه التعليم العالي والحلول المقترحة لتطوير المنظومة التعليمية وضمان جودة التعليم للجميع',
      fullContent: `
        <p>يأتي هذا البيان في ضوء التحديات الكبيرة التي تواجه منظومة التعليم العالي في مصر، والحاجة الملحة لإصلاحات جذرية تضمن مواكبة التطورات العالمية وتلبية احتياجات سوق العمل.</p>
        
        <h3>التحديات الرئيسية:</h3>
        <ul>
          <li>ضعف الربط بين مخرجات التعليم العالي ومتطلبات سوق العمل</li>
          <li>قلة الاستثمار في البحث العلمي والتطوير</li>
          <li>الحاجة إلى تطوير المناهج والبرامج الأكاديمية</li>
          <li>ضرورة تعزيز التعليم التقني والمهني</li>
        </ul>
        
        <h3>الحلول المقترحة:</h3>
        <ul>
          <li>إنشاء مجلس أعلى للتعليم العالي يضم ممثلين من القطاع الخاص</li>
          <li>زيادة الاستثمار في البحث العلمي بنسبة 3% من الناتج المحلي</li>
          <li>تطوير برامج التدريب المهني والتقني</li>
          <li>إنشاء صندوق لدعم الطلاب المتفوقين</li>
        </ul>
      `,
      date: '2024-01-20',
      category: 'تعليم',
      urgent: true,
      views: '15.2K',
      shares: '1.8K',
    },
    {
      id: 2,
      title: 'موقف من قضايا البيئة والتغير المناخي',
      excerpt: 'بيان يوضح الموقف الرسمي من قضايا البيئة والتغير المناخي والإجراءات المطلوبة للحفاظ على البيئة وتحقيق التنمية المستدامة',
      fullContent: `
        <p>في ظل التحديات البيئية المتزايدة والتأثيرات السلبية للتغير المناخي، نؤكد على ضرورة اتخاذ إجراءات عاجلة وفعالة للحفاظ على البيئة وضمان مستقبل مستدام للأجيال القادمة.</p>
        
        <h3>التحديات البيئية:</h3>
        <ul>
          <li>ارتفاع درجات الحرارة وتأثيرها على النظم البيئية</li>
          <li>تلوث الهواء والمياه في المدن الكبرى</li>
          <li>نقص الموارد المائية وتحديات الأمن المائي</li>
          <li>التصحر وتدهور الأراضي الزراعية</li>
        </ul>
        
        <h3>الإجراءات المطلوبة:</h3>
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
    },
    {
      id: 3,
      title: 'تصريح حول الإصلاحات الاقتصادية',
      excerpt: 'تصريح صحفي حول الإصلاحات الاقتصادية المطلوبة وتأثيرها على الطبقات الشعبية والمتوسطة وسبل ضمان العدالة الاجتماعية',
      fullContent: `
        <p>تشهد مصر مرحلة مهمة من الإصلاحات الاقتصادية في إطار رؤية 2030، وهو ما يتطلب توازناً دقيقاً بين تحقيق الأهداف التنموية وضمان العدالة الاجتماعية.</p>
        
        <h3>الإصلاحات المطلوبة:</h3>
        <ul>
          <li>تنويع مصادر الدخل وتقليل الاعتماد على النفط</li>
          <li>تطوير القطاع الخاص وتعزيز ريادة الأعمال</li>
          <li>إصلاح النظام الضريبي بما يحقق العدالة</li>
          <li>تطوير أسواق المال والاستثمار</li>
        </ul>
        
        <h3>الضمانات الاجتماعية:</h3>
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
    },
    {
      id: 4,
      title: 'بيان حول إصلاح النظام الصحي',
      excerpt: 'بيان شامل حول ضرورة إصلاح النظام الصحي وتطوير الخدمات الطبية لضمان الرعاية الصحية الشاملة للجميع',
      fullContent: `
        <p>يتطلب النظام الصحي في مصر إصلاحات جذرية لمواجهة التحديات المتزايدة وضمان تقديم خدمات صحية عالية الجودة لجميع المواطنين.</p>
        
        <h3>التحديات الصحية:</h3>
        <ul>
          <li>نقص في الكوادر الطبية المتخصصة</li>
          <li>ضعف البنية التحتية الصحية في بعض المناطق</li>
          <li>ارتفاع تكاليف العلاج والأدوية</li>
          <li>الحاجة إلى تطوير الطب الوقائي</li>
        </ul>
        
        <h3>الحلول المقترحة:</h3>
        <ul>
          <li>زيادة الاستثمار في التعليم الطبي</li>
          <li>تطوير المستشفيات والمراكز الصحية</li>
          <li>تطبيق نظام التأمين الصحي الشامل</li>
          <li>تعزيز برامج الطب الوقائي والتوعية الصحية</li>
        </ul>
      `,
      date: '2024-01-02',
      category: 'صحة',
      urgent: false,
      views: '14.7K',
      shares: '1.9K',
    },
    {
      id: 5,
      title: 'تصريح حول حقوق الإنسان والحريات المدنية',
      excerpt: 'تصريح مهم حول ضرورة تعزيز حقوق الإنسان والحريات المدنية وحماية الكرامة الإنسانية في جميع مناحي الحياة',
      fullContent: `
        <p>تعتبر حقوق الإنسان والحريات المدنية أساس أي مجتمع متقدم ومتحضر، وهو ما يتطلب جهوداً مستمرة لضمان احترام هذه الحقوق وحمايتها.</p>
        
        <h3>المبادئ الأساسية:</h3>
        <ul>
          <li>احترام الكرامة الإنسانية لجميع الأفراد</li>
          <li>ضمان المساواة أمام القانون</li>
          <li>حماية حرية التعبير والرأي</li>
          <li>ضمان حق التعليم والصحة والعمل</li>
        </ul>
        
        <h3>الإجراءات المطلوبة:</h3>
        <ul>
          <li>تطوير التشريعات المتعلقة بحقوق الإنسان</li>
          <li>تعزيز دور مؤسسات المجتمع المدني</li>
          <li>تطوير برامج التوعية بحقوق الإنسان</li>
          <li>إنشاء آليات فعالة لحماية الحقوق</li>
        </ul>
      `,
      date: '2023-12-25',
      category: 'حقوق إنسان',
      urgent: false,
      views: '11.3K',
      shares: '2.5K',
    },
    {
      id: 6,
      title: 'بيان حول السياسة الخارجية والعلاقات الدولية',
      excerpt: 'بيان يوضح الرؤية حول السياسة الخارجية لمصر ودورها في تعزيز السلام والاستقرار الإقليمي والدولي',
      fullContent: `
        <p>تلعب جمهورية مصر العربية دوراً محورياً في المنطقة والعالم، وهو ما يتطلب سياسة خارجية متوازنة تخدم المصالح الوطنية وتعزز السلام العالمي.</p>
        
        <h3>المبادئ الأساسية:</h3>
        <ul>
          <li>احترام سيادة الدول وعدم التدخل في الشؤون الداخلية</li>
          <li>تعزيز التعاون الإقليمي والدولي</li>
          <li>دعم قضايا العدالة والسلام</li>
          <li>مكافحة الإرهاب والتطرف</li>
        </ul>
        
        <h3>الأولويات:</h3>
        <ul>
          <li>تعزيز العلاقات مع دول الخليج والعالم العربي</li>
          <li>تطوير الشراكات الاستراتيجية مع القوى الكبرى</li>
          <li>دعم قضايا التنمية المستدامة عالمياً</li>
          <li>تعزيز الحوار بين الحضارات والثقافات</li>
        </ul>
      `,
      date: '2023-12-18',
      category: 'سياسة',
      urgent: false,
      views: '16.8K',
      shares: '2.8K',
    },
  ];

  const filteredStatements = statements.filter(statement => {
    const matchesSearch = statement.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         statement.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-brand-dark mb-6">
            البيانات الصحفية
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            مجموعة شاملة من البيانات والتصريحات الصحفية حول القضايا المهمة والمواقف الرسمية
          </p>
        </motion.div>

        {/* Search and Filter */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-white rounded-2xl p-6 shadow-lg mb-12"
        >
          <div className="relative max-w-md mx-auto">
            <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="البحث في البيانات الصحفية..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pr-12 pl-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand focus:border-transparent"
            />
          </div>
        </motion.div>

        {/* Statements List */}
        <div className="space-y-8">
          {filteredStatements.map((statement, index) => (
            <motion.article
              key={statement.id}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100"
            >
              <div className="flex flex-col lg:flex-row lg:items-start lg:space-x-reverse lg:space-x-6">
                <div className="flex-1">
                  <div className="flex items-center space-x-reverse space-x-4 mb-4">
                    <div className="w-12 h-12 bg-brand/10 rounded-full flex items-center justify-center">
                      <FileText className="w-6 h-6 text-brand" />
                    </div>
                    <div className="flex items-center space-x-reverse space-x-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        statement.urgent 
                          ? 'bg-red-100 text-red-800' 
                          : 'bg-brand/10 text-brand'
                      }`}>
                        {statement.urgent ? 'عاجل' : statement.category}
                      </span>
                      <div className="flex items-center space-x-reverse space-x-2 text-sm text-gray-500">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(statement.date).toLocaleDateString('ar-SA')}</span>
                      </div>
                    </div>
                  </div>

                  <h2 className="text-2xl font-bold text-gray-800 mb-4 hover:text-brand transition-colors">
                    {statement.title}
                  </h2>
                  
                  <p className="text-gray-600 leading-relaxed mb-6">
                    {statement.excerpt}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-reverse space-x-6 text-sm text-gray-500">
                      <span>{statement.views} مشاهدة</span>
                      <span>{statement.shares} مشاركة</span>
                    </div>
                    
                    <Link
                      to={`/press-statement/${statement.id}`}
                      className="flex items-center space-x-reverse space-x-2 text-brand font-medium hover:text-brand-dark transition-colors group"
                    >
                      <span>قراءة البيان كاملاً</span>
                      <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                    </Link>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* No Results */}
        {filteredStatements.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-xl text-gray-500">لا توجد بيانات تطابق البحث</p>
          </motion.div>
        )}

        {/* Load More */}
        {filteredStatements.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mt-12"
          >
            <button className="bg-brand text-white px-8 py-4 rounded-full font-bold hover:bg-brand-dark transition-all duration-300 transform hover:scale-105 shadow-lg">
              تحميل المزيد
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default PressStatementsPage;