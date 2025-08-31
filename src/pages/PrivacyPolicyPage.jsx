import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Eye, Lock, UserCheck, FileText, AlertCircle } from 'lucide-react';

const PrivacyPolicyPage = () => {
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
            <Shield className="w-8 h-8 text-brand" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-brand-dark mb-6">
            سياسة الخصوصية
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            نحن ملتزمون بحماية خصوصيتك وضمان أمان بياناتك الشخصية
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
                تحترم إدارة موقع محمد عبدالعليم داود خصوصية زوار الموقع وتلتزم بحماية المعلومات الشخصية التي يقدمونها. 
                توضح هذه السياسة كيفية جمع واستخدام وحماية المعلومات الشخصية عند استخدام موقعنا الإلكتروني.
              </p>
            </section>

            {/* Information Collection */}
            <section className="mb-8">
              <div className="flex items-center space-x-reverse space-x-3 mb-4">
                <Eye className="w-6 h-6 text-brand" />
                <h2 className="text-2xl font-bold text-brand-dark">المعلومات التي نجمعها</h2>
              </div>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">المعلومات الشخصية</h3>
                  <ul className="list-disc list-inside text-gray-700 space-y-1 mr-4">
                    <li>الاسم الكامل</li>
                    <li>عنوان البريد الإلكتروني</li>
                    <li>رقم الهاتف (اختياري)</li>
                    <li>المعلومات المقدمة في نماذج الاتصال</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">المعلومات التقنية</h3>
                  <ul className="list-disc list-inside text-gray-700 space-y-1 mr-4">
                    <li>عنوان IP الخاص بك</li>
                    <li>نوع المتصفح ونظام التشغيل</li>
                    <li>الصفحات التي تزورها على موقعنا</li>
                    <li>وقت ومدة الزيارة</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* How We Use Information */}
            <section className="mb-8">
              <div className="flex items-center space-x-reverse space-x-3 mb-4">
                <UserCheck className="w-6 h-6 text-brand" />
                <h2 className="text-2xl font-bold text-brand-dark">كيف نستخدم المعلومات</h2>
              </div>
              <ul className="list-disc list-inside text-gray-700 space-y-2 mr-4">
                <li>الرد على استفساراتك وطلباتك</li>
                <li>إرسال النشرات الإخبارية والتحديثات (بموافقتك)</li>
                <li>تحسين محتوى وخدمات الموقع</li>
                <li>تحليل استخدام الموقع لأغراض إحصائية</li>
                <li>ضمان أمان الموقع ومنع الاستخدام غير المشروع</li>
              </ul>
            </section>

            {/* Data Protection */}
            <section className="mb-8">
              <div className="flex items-center space-x-reverse space-x-3 mb-4">
                <Lock className="w-6 h-6 text-brand" />
                <h2 className="text-2xl font-bold text-brand-dark">حماية البيانات</h2>
              </div>
              <div className="space-y-4">
                <p className="text-gray-700 leading-relaxed">
                  نتخذ إجراءات أمنية مناسبة لحماية معلوماتك الشخصية من الوصول غير المصرح به أو التغيير أو الكشف أو التدمير.
                </p>
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">الإجراءات الأمنية تشمل:</h3>
                  <ul className="list-disc list-inside text-gray-700 space-y-1 mr-4">
                    <li>تشفير البيانات أثناء النقل والتخزين</li>
                    <li>استخدام خوادم آمنة ومحمية</li>
                    <li>تقييد الوصول للمعلومات الشخصية</li>
                    <li>مراقبة مستمرة للأنشطة المشبوهة</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Cookies */}
            <section className="mb-8">
              <div className="flex items-center space-x-reverse space-x-3 mb-4">
                <AlertCircle className="w-6 h-6 text-brand" />
                <h2 className="text-2xl font-bold text-brand-dark">ملفات تعريف الارتباط (Cookies)</h2>
              </div>
              <div className="space-y-4">
                <p className="text-gray-700 leading-relaxed">
                  يستخدم موقعنا ملفات تعريف الارتباط لتحسين تجربة المستخدم وتحليل استخدام الموقع.
                </p>
                <div className="bg-blue-50 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">أنواع ملفات تعريف الارتباط:</h3>
                  <ul className="list-disc list-inside text-gray-700 space-y-1 mr-4">
                    <li><strong>ملفات ضرورية:</strong> مطلوبة لتشغيل الموقع بشكل صحيح</li>
                    <li><strong>ملفات تحليلية:</strong> تساعدنا في فهم كيفية استخدام الموقع</li>
                    <li><strong>ملفات وظيفية:</strong> تحفظ تفضيلاتك وإعداداتك</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Third Party Services */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-brand-dark mb-4">الخدمات الخارجية</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                قد نستخدم خدمات طرف ثالث لتحسين وظائف الموقع، مثل:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-1 mr-4">
                <li>Google Analytics لتحليل حركة المرور</li>
                <li>خدمات استضافة المحتوى</li>
                <li>منصات التواصل الاجتماعي</li>
              </ul>
              <p className="text-gray-700 leading-relaxed mt-4">
                هذه الخدمات لها سياسات خصوصية منفصلة، ونشجعك على مراجعتها.
              </p>
            </section>

            {/* Your Rights */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-brand-dark mb-4">حقوقك</h2>
              <p className="text-gray-700 leading-relaxed mb-4">لديك الحق في:</p>
              <ul className="list-disc list-inside text-gray-700 space-y-1 mr-4">
                <li>الوصول إلى معلوماتك الشخصية</li>
                <li>تصحيح أو تحديث معلوماتك</li>
                <li>طلب حذف معلوماتك</li>
                <li>الاعتراض على معالجة معلوماتك</li>
                <li>سحب موافقتك في أي وقت</li>
              </ul>
            </section>

            {/* Contact Information */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-brand-dark mb-4">التواصل معنا</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                إذا كان لديك أي أسئلة حول سياسة الخصوصية هذه أو ممارسات الخصوصية لدينا، يرجى التواصل معنا:
              </p>
              <div className="bg-gray-50 rounded-lg p-4">
                <ul className="space-y-2 text-gray-700">
                  <li><strong>البريد الإلكتروني:</strong> privacy@mohammed-journalist.com</li>
                  <li><strong>الهاتف:</strong> +20 10 123 4567</li>
                  <li><strong>العنوان:</strong> القاهرة، جمهورية مصر العربية</li>
                </ul>
              </div>
            </section>

            {/* Updates */}
            <section>
              <h2 className="text-2xl font-bold text-brand-dark mb-4">تحديثات السياسة</h2>
              <p className="text-gray-700 leading-relaxed">
                قد نقوم بتحديث سياسة الخصوصية هذه من وقت لآخر. سنقوم بإشعارك بأي تغييرات جوهرية عن طريق نشر السياسة الجديدة على هذه الصفحة وتحديث تاريخ "آخر تحديث" في أعلى الصفحة.
              </p>
            </section>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;