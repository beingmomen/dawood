import { NextRequest, NextResponse } from 'next/server';

// Mock data - في التطبيق الحقيقي ستأتي من قاعدة البيانات
const pressStatements = [
  {
    id: 1,
    title: 'بيان حول أزمة التعليم العالي',
    excerpt: 'بيان صحفي يتناول التحديات التي تواجه التعليم العالي والحلول المقترحة لتطوير المنظومة التعليمية',
    content: `
      <p>يأتي هذا البيان في ضوء التحديات الكبيرة التي تواجه منظومة التعليم العالي في مصر، والحاجة الملحة لإصلاحات جذرية تضمن مواكبة التطورات العالمية وتلبية احتياجات سوق العمل.</p>
      
      <h2>التحديات الرئيسية:</h2>
      <ul>
        <li><strong>ضعف الربط بين مخرجات التعليم العالي ومتطلبات سوق العمل:</strong> هناك فجوة كبيرة بين ما يتعلمه الطلاب في الجامعات وما يحتاجه سوق العمل الفعلي.</li>
        <li><strong>قلة الاستثمار في البحث العلمي والتطوير:</strong> تحتاج الجامعات إلى استثمارات أكبر في البحث العلمي.</li>
      </ul>
    `,
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
];

// GET /api/press-statements/[id] - جلب بيان صحفي محدد
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    const statement = pressStatements.find(s => s.id === id);

    if (!statement) {
      return NextResponse.json(
        { error: 'البيان الصحفي غير موجود' },
        { status: 404 }
      );
    }

    // زيادة عدد المشاهدات
    statement.views += 1;

    return NextResponse.json(statement);
  } catch (error) {
    return NextResponse.json(
      { error: 'خطأ في جلب البيان الصحفي' },
      { status: 500 }
    );
  }
}

// PUT /api/press-statements/[id] - تحديث بيان صحفي
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    const body = await request.json();
    
    const statementIndex = pressStatements.findIndex(s => s.id === id);
    
    if (statementIndex === -1) {
      return NextResponse.json(
        { error: 'البيان الصحفي غير موجود' },
        { status: 404 }
      );
    }

    // تحديث البيان
    pressStatements[statementIndex] = {
      ...pressStatements[statementIndex],
      ...body,
      updatedAt: new Date(),
    };

    return NextResponse.json(pressStatements[statementIndex]);
  } catch (error) {
    return NextResponse.json(
      { error: 'خطأ في تحديث البيان الصحفي' },
      { status: 500 }
    );
  }
}

// DELETE /api/press-statements/[id] - حذف بيان صحفي
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    const statementIndex = pressStatements.findIndex(s => s.id === id);
    
    if (statementIndex === -1) {
      return NextResponse.json(
        { error: 'البيان الصحفي غير موجود' },
        { status: 404 }
      );
    }

    // حذف البيان
    pressStatements.splice(statementIndex, 1);

    return NextResponse.json({ message: 'تم حذف البيان الصحفي بنجاح' });
  } catch (error) {
    return NextResponse.json(
      { error: 'خطأ في حذف البيان الصحفي' },
      { status: 500 }
    );
  }
}