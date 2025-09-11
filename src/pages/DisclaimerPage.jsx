import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, Info, FileText, Eye, MessageSquare, ExternalLink } from 'lucide-react';

const DisclaimerPage = () => {
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
          <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <AlertTriangle className="w-8 h-8 text-orange-600" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-brand-dark mb-6">
            إخلاء المسؤولية
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            معلومات مهمة حول استخدام المحتوى والمعلومات المتاحة على الموقع
          </p>
          <p className="text-sm text-gray-500 mt-4">
            آخر تحديث: 1 يناير 2024
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white rounded-2xl p-8 shadow-lg"
          >
            {/* General Disclaimer */}
            <section className="mb-8">
              <div className="flex items-center space-x-reverse space-x-3 mb-4">
                <Info className="w-6 h-6 text-brand" />
                <h2 className="text-2xl font-bold text-brand-dark">إخلاء عام للمسؤولية</h2>
              </div>
              <div className="bg-orange-50 border-r-4 border-orange-400 p-4 mb-4">
                <p className="text-gray-700 leading-relaxed">
                  <strong>تنبيه مهم:</strong> المعلومات الواردة في هذا الموقع مقدمة لأغراض إعلامية عامة فقط. 
                  لا تشكل هذه المعلومات نصائح قانونية أو مهنية أو استثمارية، ولا ينبغي الاعتماد عليها كبديل 
                  للاستشارة المهنية المتخصصة.
                </p>
              </div>
              <p className="text-gray-700 leading-relaxed">
                يُقدم محتوى هذا الموقع بحسن نية وللأغراض الإعلامية فقط. لا نقدم أي ضمانات حول اكتمال أو 
                موثوقية أو دقة هذه المعلومات. أي إجراء تتخذه بناءً على المعلومات الموجودة في هذا الموقع 
                يكون على مسؤوليتك الشخصية بالكامل.
              </p>
            </section>

            {/* Content Accuracy */}
            <section className="mb-8">
              <div className="flex items-center space-x-reverse space-x-3 mb-4">
                <FileText className="w-6 h-6 text-brand" />
                <h2 className="text-2xl font-bold text-brand-dark">دقة المحتوى</h2>
              </div>
              <div className="space-y-4">
                <p className="text-gray-700 leading-relaxed">
                  بينما نسعى جاهدين لضمان دقة وحداثة المعلومات المنشورة على هذا الموقع، فإننا لا نضمن:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-1 mr-4">
                  <li>دقة أو اكتمال أو حداثة المعلومات</li>
                  <li>خلو المحتوى من الأخطاء أو السهو</li>
                  <li>ملاءمة المعلومات لأغراض معينة</li>
                  <li>عدم انقطاع أو توفر المحتوى باستمرار</li>
                </ul>
                <div className="bg-blue-50 rounded-lg p-4">
                  <p className="text-gray-700">
                    <strong>ملاحظة:</strong> قد تتغير المعلومات والآراء المعبر عنها في هذا الموقع دون إشعار مسبق. 
                    ننصح بالتحقق من المعلومات من مصادر أخرى قبل اتخاذ أي قرارات مهمة.
                  </p>
                </div>
              </div>
            </section>

            {/* Professional Opinions */}
            <section className="mb-8">
              <div className="flex items-center space-x-reverse space-x-3 mb-4">
                <MessageSquare className="w-6 h-6 text-brand" />
                <h2 className="text-2xl font-bold text-brand-dark">الآراء والتحليلات</h2>
              </div>
              <div className="space-y-4">
                <p className="text-gray-700 leading-relaxed">
                  الآراء والتحليلات السياسية والاجتماعية المعبر عنها في هذا الموقع تمثل وجهات نظر شخصية 
                  وليست بالضرورة آراء أي مؤسسة أو منظمة أخرى.
                </p>
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">يرجى ملاحظة:</h3>
                  <ul className="list-disc list-inside text-gray-700 space-y-1 mr-4">
                    <li>الآراء قابلة للتغيير مع تطور الأحداث</li>
                    <li>التحليلات مبنية على المعلومات المتاحة وقت النشر</li>
                    <li>قد تختلف وجهات النظر مع آراء خبراء آخرين</li>
                    <li>لا تشكل الآراء توصيات للعمل أو القرارات</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* External Links */}
            <section className="mb-8">
              <div className="flex items-center space-x-reverse space-x-3 mb-4">
                <ExternalLink className="w-6 h-6 text-brand" />
                <h2 className="text-2xl font-bold text-brand-dark">الروابط الخارجية</h2>
              </div>
              <div className="space-y-4">
                <p className="text-gray-700 leading-relaxed">
                  قد يحتوي هذا الموقع على روابط لمواقع ويب خارجية. هذه الروابط مقدمة للراحة فقط ولا تعني:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-1 mr-4">
                  <li>تأييد محتوى المواقع الخارجية</li>
                  <li>مسؤولية عن دقة معلومات تلك المواقع</li>
                  <li>ضمان أمان أو خصوصية المواقع الخارجية</li>
                  <li>السيطرة على محتوى أو سياسات تلك المواقع</li>
                </ul>
                <div className="bg-yellow-50 border-r-4 border-yellow-400 p-4">
                  <p className="text-gray-700">
                    <strong>تحذير:</strong> استخدام الروابط الخارجية على مسؤوليتك الشخصية. ننصح بمراجعة 
                    شروط الاستخدام وسياسات الخصوصية للمواقع الخارجية قبل استخدامها.
                  </p>
                </div>
              </div>
            </section>

            {/* Media Content */}
            <section className="mb-8">
              <div className="flex items-center space-x-reverse space-x-3 mb-4">
                <Eye className="w-6 h-6 text-brand" />
                <h2 className="text-2xl font-bold text-brand-dark">المحتوى الإعلامي</h2>
              </div>
              <div className="space-y-4">
                <p className="text-gray-700 leading-relaxed">
                  الصور والفيديوهات والمواد الإعلامية الأخرى المستخدمة في هذا الموقع:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-1 mr-4">
                  <li>قد تكون محمية بحقوق الطبع والنشر</li>
                  <li>مستخدمة للأغراض التوضيحية والإعلامية</li>
                  <li>لا تعكس بالضرورة الأحداث الفعلية</li>
                  <li>قد تكون من مصادر خارجية</li>
                </ul>
              </div>
            </section>

            {/* Technical Issues */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-brand-dark mb-4">المسائل التقنية</h2>
              <div className="space-y-4">
                <p className="text-gray-700 leading-relaxed">
                  لا نضمن أن الموقع سيكون متاحاً باستمرار أو خالياً من الأخطاء التقنية. قد تحدث:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-1 mr-4">
                  <li>انقطاعات مؤقتة في الخدمة</li>
                  <li>أخطاء تقنية أو برمجية</li>
                  <li>مشاكل في التوافق مع المتصفحات</li>
                  <li>بطء في تحميل الصفحات</li>
                </ul>
              </div>
            </section>

            {/* Limitation of Liability */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-brand-dark mb-4">تحديد المسؤولية</h2>
              <div className="bg-red-50 border-r-4 border-red-400 p-4">
                <p className="text-gray-700 leading-relaxed">
                  <strong>إخلاء مسؤولية شامل:</strong> لن نكون مسؤولين تحت أي ظرف من الظروف عن أي أضرار 
                  مباشرة أو غير مباشرة أو عرضية أو خاصة أو تبعية أو عقابية تنشأ عن:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-1 mr-4 mt-2">
                  <li>استخدام أو عدم القدرة على استخدام الموقع</li>
                  <li>الاعتماد على المعلومات المقدمة</li>
                  <li>الأخطاء أو السهو في المحتوى</li>
                  <li>انقطاع الخدمة أو المشاكل التقنية</li>
                  <li>استخدام الروابط الخارجية</li>
                </ul>
              </div>
            </section>

            {/* Updates and Changes */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-brand-dark mb-4">التحديثات والتغييرات</h2>
              <p className="text-gray-700 leading-relaxed">
                نحتفظ بالحق في تعديل أو تحديث هذا الإخلاء للمسؤولية في أي وقت دون إشعار مسبق. 
                التعديلات تصبح سارية فور نشرها على الموقع. ننصح بمراجعة هذه الصفحة بانتظام للاطلاع 
                على أي تغييرات.
              </p>
            </section>

            {/* Contact Information */}
            <section>
              <h2 className="text-2xl font-bold text-brand-dark mb-4">التواصل</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                إذا كان لديك أي أسئلة حول هذا الإخلاء للمسؤولية، يرجى التواصل معنا:
              </p>
              <div className="bg-gray-50 rounded-lg p-4">
                <ul className="space-y-2 text-gray-700">
                  <li><strong>البريد الإلكتروني:</strong> info@mohammed-journalist.com</li>
                  <li><strong>الهاتف:</strong> +20 10 123 4567</li>
                  <li><strong>العنوان:</strong> القاهرة، جمهورية مصر العربية</li>
                </ul>
              </div>
            </section>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default DisclaimerPage;