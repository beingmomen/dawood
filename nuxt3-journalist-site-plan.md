# 📌 مشروع موقع إلكتروني شخصي لصحفي وعضو برلمان - مبني بـ Nuxt 3

## 🎯 نظرة عامة على المشروع
إنشاء موقع إلكتروني متطور باللغة العربية لصحفي وعضو برلمان، باستخدام Nuxt 3 وNuxt UI، بتصميم جذاب، متجاوب، وتجربة مستخدم سلسة.

---

## 🛠️ التقنيات المستخدمة
- **Nuxt 3** (Vue 3 + Composition API + SSR)
- **Nuxt UI 3** (مكونات غير مصممة + Tailwind CSS)
- **Build Tool:** Vite
- **Styling:** Tailwind CSS + @apply
- **Routing:** File-based
- **Icons:** Lucide Vue
- **Animations:** Tailwind CSS + keyframes + Nuxt Page Transitions
- **Font:** Tajawal (عبر Google Fonts)
- **State Management:** Pinia + composables
- **Data Fetching:** useFetch + useAsyncData
- **SEO:** useSeoMeta + Open Graph + Schema.org

---

## 🧱 هيكل الموقع

### الصفحة الرئيسية `/`
- Hero Section: صورة، عنوان، وصف، CTA
- الإنجازات: بطاقات عرض
- أحدث المقالات: Carousel تفاعلي
- الوسائط: Tabs للصور، الفيديو، المستندات
- الأنشطة والفعاليات
- التغطية الإعلامية
- البيانات الصحفية
- زر العودة لأعلى

### صفحات منفصلة
- `/all-articles`
- `/cv`
- `/media`
- `/about`
- `/contact`
- `/privacy-policy`

### صفحات ديناميكية
- `/articles/[id]`
- `/event/[id]`
- `/media-coverage/[id]`
- `/press-statement/[id]`

---

## 🎨 التصميم وتجربة المستخدم
- نظام ألوان: Brand Dark `#10375C`, Default `#185b8b`, Light `#205892`
- خلفية رمادية: `#f4f7fa`
- RTL كامل
- خط Tajawal
- تصميم متجاوب
- Animations: دخول سلس، تأثيرات تمرير، Page Transitions
- Hover & Skeleton Loaders
- Sticky Header + Drawer للموبايل

---

## 🧩 مكونات Nuxt UI
- Carousel: مبني بـ Embla أو custom
- Cards: موحدة للمقالات والفعاليات
- Tabs: تدعم RTL + Icons + Animations
- Drawer, Buttons, Icons

---

## 🧠 البنية التقنية

```
src/
├── components/
│   ├── ui/
│   ├── sections/
│   ├── cv/
│   └── shared/
├── pages/
│   ├── index.vue
│   ├── articles/[id].vue
│   └── ...
├── composables/
├── data/
├── app.vue
└── nuxt.config.ts
```

---

## ⚙️ الأداء والتحسين
- Lazy Loading للمكونات والصور
- Code Splitting تلقائي
- Semantic HTML + ARIA + Alt Text
- nuxt/image للصور
- Keyboard Navigation

---

## 📄 المحتوى التجريبي
- مقالات: 3
- صور: 6
- فيديوهات: 4 YouTube
- مستندات: 4 PDF
- فعاليات: 3
- تغطيات إعلامية: 3
- بيانات صحفية: 3

---

## 🔧 التخصيص
- ألوان وخطوط قابلة للتعديل عبر Tailwind config
- محتوى جديد من ملفات data أو CMS (مثل Strapi)
- روابط ديناميكية وهيكل URL واضح
- إعدادات SEO مرنة

---

## ✅ الخلاصة
موقع شخصي شامل وعصري يعرض السيرة الذاتية والمقالات والبيانات الصحفية والوسائط، مبني بـ Nuxt 3 ويتميز بـ:
- تجربة مستخدم رائعة
- أداء سريع
- تصميم RTL متجاوب
- بنية كود نظيفة وسهلة التخصيص

✨ **جاهز للنشر أو التوصيل بـ CMS**