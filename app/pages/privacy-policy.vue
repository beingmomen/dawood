<template>
  <div class="min-h-screen bg-background pt-20">
    <div class="container mx-auto px-4 py-12">
      <div class="max-w-4xl mx-auto">
        <!-- Header -->
        <div class="text-center mb-16">
          <h1 class="text-4xl md:text-5xl font-bold text-brand-dark mb-6">
            سياسة الخصوصية
          </h1>
          <p class="text-xl text-gray-600">
            آخر تحديث: {{ new Date().toLocaleDateString('ar-EG') }}
          </p>
        </div>

        <!-- Content -->
        <div class="bg-white rounded-2xl p-8 shadow-lg prose prose-lg max-w-none">
          <h2>مقدمة</h2>
          <p>
            نحن ملتزمون بحماية خصوصيتك وضمان أمان معلوماتك الشخصية. توضح هذه السياسة كيفية جمع واستخدام وحماية المعلومات التي تقدمها لنا.
          </p>

          <h2>المعلومات التي نجمعها</h2>
          <ul>
            <li>معلومات الاتصال (الاسم، البريد الإلكتروني، رقم الهاتف)</li>
            <li>معلومات التصفح والاستخدام</li>
            <li>ملفات تعريف الارتباط (Cookies)</li>
          </ul>

          <h2>كيفية استخدام المعلومات</h2>
          <ul>
            <li>تحسين تجربة المستخدم</li>
            <li>التواصل معك بخصوص الاستفسارات</li>
            <li>إرسال النشرات الإخبارية (بموافقتك)</li>
          </ul>

          <h2>حماية المعلومات</h2>
          <p>
            نستخدم تقنيات الأمان المتقدمة لحماية معلوماتك الشخصية من الوصول غير المصرح به أو الاستخدام غير القانوني.
          </p>

          <h2>حقوقك</h2>
          <ul>
            <li>الحق في الوصول إلى معلوماتك الشخصية</li>
            <li>الحق في تصحيح المعلومات غير الصحيحة</li>
            <li>الحق في حذف معلوماتك الشخصية</li>
          </ul>

          <h2>التواصل معنا</h2>
          <p>
            إذا كان لديك أي أسئلة حول سياسة الخصوصية هذه، يرجى التواصل معنا عبر البريد الإلكتروني أو الهاتف.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
useHead({
  title: 'سياسة الخصوصية - محمد عبدالعليم داود',
  meta: [
    { name: 'description', content: 'سياسة الخصوصية وحماية البيانات الشخصية' }
  ]
})
</script>