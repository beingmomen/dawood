import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Users, Shield, AlertTriangle, Scale, CheckCircle } from 'lucide-react';

const TermsOfServicePage = () => {
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
          <div className="w-16 h-16 bg-brand/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <Scale className="w-8 h-8 text-brand" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-brand-dark mb-6">
            شروط الاستخدام
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            الشروط والأحكام التي تحكم استخدام موقع محمد عبدالعليم داود
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
            {/* Introduction */}
            <section className="mb-8">
              <div className="flex items-center space-x-reverse space-x-3 mb-4">
                <FileText className="w-6 h-6 text-brand" />
                <h2 className="text-2xl font-bold text-brand-dark">مقدمة</h2>
              </div>
              <p className="text-gray-700 leading-relaxed">
                مرحباً بك في موقع محمد عبدالعليم داود. باستخدامك لهذا الموقع، فإنك توافق على الالتزام بهذه الشروط والأحكام. 
                إذا كنت لا توافق على أي من هذه الشروط، يرجى عدم استخدام الموقع.
              </p>
            </section>

            {/* Acceptance of Terms */}
            <section className="mb-8">
              <div className="flex items-center space-x-reverse space-x-3 mb-4">
                <CheckCircle className="w-6 h-6 text-brand" />
                <h2 className="text-2xl font-bold text-brand-dark">قبول الشروط</h2>
              </div>
              <div className="space-y-4">
                <p className="text-gray-700 leading-relaxed">
                  بالوصول إلى هذا الموقع واستخدامه، فإنك تقر بأنك قد قرأت وفهمت ووافقت على الالتزام بهذه الشروط والأحكام.
                </p>
                <div className="bg-blue-50 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">يشمل الاستخدام:</h3>
                  <ul className="list-disc list-inside text-gray-700 space-y-1 mr-4">
                    <li>تصفح محتوى الموقع</li>
                    <li>قراءة المقالات والبيانات الصحفية</li>
                    <li>مشاهدة الوسائط المتعددة</li>
                    <li>استخدام نماذج الاتصال</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Permitted Use */}
            <section className="mb-8">
              <div className="flex items-center space-x-reverse space-x-3 mb-4">
                <Users className="w-6 h-6 text-brand" />
                <h2 className="text-2xl font-bold text-brand-dark">الاستخدام المسموح</h2>
              </div>
              <div className="space-y-4">
                <p className="text-gray-700 leading-relaxed">يُسمح لك باستخدام هذا الموقع للأغراض التالية:</p>
                <ul className="list-disc list-inside text-gray-700 space-y-1 mr-4">
                  <li>الحصول على المعلومات الشخصية والمهنية</li>
                  <li>قراءة المقالات والتحليلات السياسية</li>
                  <li>الاطلاع على الأنشطة والفعاليات</li>
                  <li>التواصل للأغراض المهنية المشروعة</li>
                  <li>مشاركة المحتوى مع الإشارة للمصدر</li>
                </ul>
              </div>
            </section>

            {/* Prohibited Use */}
            <section className="mb-8">
              <div className="flex items-center space-x-reverse space-x-3 mb-4">
                <AlertTriangle className="w-6 h-6 text-red-500" />
                <h2 className="text-2xl font-bold text-brand-dark">الاستخدام المحظور</h2>
              </div>
              <div className="space-y-4">
                <p className="text-gray-700 leading-relaxed">يُحظر عليك استخدام هذا الموقع في:</p>
                <div className="bg-red-50 rounded-lg p-4">
                  <ul className="list-disc list-inside text-gray-700 space-y-1 mr-4">
                    <li>أي أنشطة غير قانونية أو احتيالية</li>
                    <li>نشر أو إرسال محتوى مسيء أو مضلل</li>
                    <li>انتهاك حقوق الملكية الفكرية</li>
                    <li>محاولة اختراق أو إلحاق الضرر بالموقع</li>
                    <li>جمع معلومات المستخدمين الآخرين</li>
                    <li>استخدام الموقع لأغراض تجارية دون إذن</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Intellectual Property */}
            <section className="mb-8">
              <div className="flex items-center space-x-reverse space-x-3 mb-4">
                <Shield className="w-6 h-6 text-brand" />
                <h2 className="text-2xl font-bold text-brand-dark">حقوق الملكية الفكرية</h2>
              </div>
              <div className="space-y-4">
                <p className="text-gray-700 leading-relaxed">
                  جميع المحتويات الموجودة على هذا الموقع، بما في ذلك النصوص والصور والفيديوهات والتصميمات، 
                  محمية بموجب قوانين حقوق الطبع والنشر والملكية الفكرية.
                </p>
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">حقوق المحتوى:</h3>
                  <ul className="list-disc list-inside text-gray-700 space-y-1 mr-4">
                    <li>المقالات والكتابات: ملك لمحمد عبدالعليم داود</li>
                    <li>الصور الشخصية: محفوظة الحقوق</li>
                    <li>التصميم والبرمجة: محفوظة الحقوق</li>
                    <li>الشعارات والعلامات التجارية: محفوظة الحقوق</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* User Content */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-brand-dark mb-4">المحتوى المقدم من المستخدمين</h2>
              <div className="space-y-4">
                <p className="text-gray-700 leading-relaxed">
                  عند إرسال أي محتوى إلى الموقع (مثل التعليقات أو الرسائل)، فإنك تضمن أن:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-1 mr-4">
                  <li>المحتوى لا ينتهك أي قوانين أو حقوق</li>
                  <li>المحتوى دقيق وغير مضلل</li>
                  <li>لديك الحق في نشر هذا المحتوى</li>
                  <li>المحتوى لا يحتوي على فيروسات أو برامج ضارة</li>
                </ul>
              </div>
            </section>

            {/* Disclaimer */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-brand-dark mb-4">إخلاء المسؤولية</h2>
              <div className="space-y-4">
                <p className="text-gray-700 leading-relaxed">
                  يُقدم هذا الموقع "كما هو" دون أي ضمانات صريحة أو ضمنية. نحن لا نضمن:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-1 mr-4">
                  <li>دقة أو اكتمال المعلومات</li>
                  <li>عدم انقطاع الخدمة</li>
                  <li>خلو الموقع من الأخطاء أو الفيروسات</li>
                  <li>ملاءمة الموقع لأغراض معينة</li>
                </ul>
              </div>
            </section>

            {/* Limitation of Liability */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-brand-dark mb-4">تحديد المسؤولية</h2>
              <p className="text-gray-700 leading-relaxed">
                لن نكون مسؤولين عن أي أضرار مباشرة أو غير مباشرة أو عرضية أو خاصة أو تبعية تنشأ عن 
                استخدام أو عدم القدرة على استخدام هذا الموقع، حتى لو تم إخطارنا بإمكانية حدوث مثل هذه الأضرار.
              </p>
            </section>

            {/* Privacy */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-brand-dark mb-4">الخصوصية</h2>
              <p className="text-gray-700 leading-relaxed">
                استخدامك لهذا الموقع يخضع أيضاً لسياسة الخصوصية الخاصة بنا. يرجى مراجعة سياسة الخصوصية 
                لفهم كيفية جمع واستخدام وحماية معلوماتك الشخصية.
              </p>
            </section>

            {/* Modifications */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-brand-dark mb-4">التعديلات</h2>
              <p className="text-gray-700 leading-relaxed">
                نحتفظ بالحق في تعديل هذه الشروط والأحكام في أي وقت دون إشعار مسبق. التعديلات تصبح سارية 
                فور نشرها على الموقع. استمرارك في استخدام الموقع بعد التعديلات يعني موافقتك على الشروط الجديدة.
              </p>
            </section>

            {/* Governing Law */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-brand-dark mb-4">القانون الحاكم</h2>
              <p className="text-gray-700 leading-relaxed">
                تخضع هذه الشروط والأحكام وتفسر وفقاً لقوانين جمهورية مصر العربية. أي نزاع ينشأ عن هذه الشروط 
                يخضع للاختصاص الحصري للمحاكم المصرية.
              </p>
            </section>

            {/* Contact Information */}
            <section>
              <h2 className="text-2xl font-bold text-brand-dark mb-4">التواصل</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                إذا كان لديك أي أسئلة حول هذه الشروط والأحكام، يرجى التواصل معنا:
              </p>
              <div className="bg-gray-50 rounded-lg p-4">
                <ul className="space-y-2 text-gray-700">
                  <li><strong>البريد الإلكتروني:</strong> legal@mohammed-journalist.com</li>
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

export default TermsOfServicePage;