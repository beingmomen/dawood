<template>
  <div class="min-h-screen bg-background pt-20">
    <div class="container mx-auto px-4 py-12">
      <div class="max-w-4xl mx-auto">
        <!-- Header -->
        <div class="text-center mb-16">
          <h1 class="text-4xl md:text-5xl font-bold text-brand-dark mb-6">
            شروط الاستخدام
          </h1>
          <p class="text-xl text-gray-600">
            آخر تحديث: {{ new Date().toLocaleDateString('ar-EG') }}
          </p>
        </div>

        <!-- Content -->
        <div class="bg-white rounded-2xl p-8 shadow-lg prose prose-lg max-w-none">
          <h2>قبول الشروط</h2>
          <p>
            باستخدام هذا الموقع، فإنك توافق على الالتزام بهذه الشروط والأحكام. إذا كنت لا توافق على أي من هذه الشروط، يرجى عدم استخدام الموقع.
          </p>

          <h2>استخدام الموقع</h2>
          <ul>
            <li>يجب استخدام الموقع للأغراض القانونية فقط</li>
            <li>عدم محاولة الوصول غير المصرح به لأي جزء من الموقع</li>
            <li>عدم نشر محتوى مسيء أو غير قانوني</li>
          </ul>

          <h2>حقوق الملكية الفكرية</h2>
          <p>
            جميع المحتويات الموجودة على هذا الموقع محمية بحقوق الطبع والنشر وحقوق الملكية الفكرية الأخرى.
          </p>

          <h2>إخلاء المسؤولية</h2>
          <p>
            المعلومات الواردة في هذا الموقع مقدمة "كما هي" دون أي ضمانات من أي نوع، صريحة أو ضمنية.
          </p>

          <h2>التعديلات</h2>
          <p>
            نحتفظ بالحق في تعديل هذه الشروط في أي وقت دون إشعار مسبق. يُنصح بمراجعة هذه الصفحة بانتظام.
          </p>

          <h2>القانون المطبق</h2>
          <p>
            تخضع هذه الشروط والأحكام لقوانين جمهورية مصر العربية.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
useHead({
  title: 'شروط الاستخدام - محمد عبدالعليم داود',
  meta: [
    { name: 'description', content: 'شروط وأحكام استخدام الموقع الإلكتروني' }
  ]
})
</script>