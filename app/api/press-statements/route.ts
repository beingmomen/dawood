import { NextRequest, NextResponse } from 'next/server';

// Mock data - في التطبيق الحقيقي ستأتي من قاعدة البيانات
const pressStatements = [
  {
    id: 1,
    title: 'بيان حول أزمة التعليم العالي',
    excerpt: 'بيان صحفي يتناول التحديات التي تواجه التعليم العالي والحلول المقترحة لتطوير المنظومة التعليمية',
    content: '<p>محتوى البيان الكامل...</p>',
    date: '2024-01-20',
    category: 'تعليم',
    urgent: true,
    views: 15200,
    shares: 1800,
    author: 'محمد عبدالعليم داود',
    tags: ['تعليم عالي', 'إصلاح تعليمي', 'بحث علمي'],
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-01-20'),
  },
  // يمكن إضافة المزيد من البيانات هنا
];

// GET /api/press-statements - جلب جميع البيانات الصحفية
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const category = searchParams.get('category');
    const search = searchParams.get('search');

    let filteredStatements = [...pressStatements];

    // تطبيق الفلترة
    if (category && category !== 'الكل') {
      filteredStatements = filteredStatements.filter(s => s.category === category);
    }

    if (search) {
      filteredStatements = filteredStatements.filter(s => 
        s.title.toLowerCase().includes(search.toLowerCase()) ||
        s.excerpt.toLowerCase().includes(search.toLowerCase())
      );
    }

    // تطبيق التصفح (Pagination)
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedStatements = filteredStatements.slice(startIndex, endIndex);

    return NextResponse.json({
      statements: paginatedStatements,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(filteredStatements.length / limit),
        totalItems: filteredStatements.length,
        hasNext: endIndex < filteredStatements.length,
        hasPrev: page > 1,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'خطأ في جلب البيانات الصحفية' },
      { status: 500 }
    );
  }
}

// POST /api/press-statements - إنشاء بيان صحفي جديد
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // التحقق من صحة البيانات
    const requiredFields = ['title', 'excerpt', 'content', 'category', 'author'];
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { error: `الحقل ${field} مطلوب` },
          { status: 400 }
        );
      }
    }

    const newStatement = {
      id: pressStatements.length + 1,
      ...body,
      date: body.date || new Date().toISOString().split('T')[0],
      urgent: body.urgent || false,
      views: 0,
      shares: 0,
      tags: body.tags || [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    // في التطبيق الحقيقي: حفظ في قاعدة البيانات
    pressStatements.push(newStatement);

    return NextResponse.json(newStatement, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'خطأ في إنشاء البيان الصحفي' },
      { status: 500 }
    );
  }
}