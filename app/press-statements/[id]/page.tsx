import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import PressStatementContent from '../../components/PressStatementContent';

interface Props {
  params: { id: string };
}

// Mock data - في التطبيق الحقيقي ستأتي من API
const statements = [
  {
    id: 1,
    title: 'بيان حول أزمة التعليم العالي',
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
    views: '15.2K',
    shares: '1.8K',
    author: 'محمد عبدالعليم داود',
    tags: ['تعليم عالي', 'إصلاح تعليمي', 'بحث علمي'],
  },
];

// Generate metadata for SEO
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const statement = statements.find(s => s.id === parseInt(params.id));
  
  if (!statement) {
    return {
      title: 'البيان غير موجود',
    };
  }

  return {
    title: `${statement.title} | محمد عبدالعليم داود`,
    description: statement.content.replace(/<[^>]*>/g, '').substring(0, 160),
    keywords: statement.tags,
    authors: [{ name: statement.author }],
    openGraph: {
      title: statement.title,
      description: statement.content.replace(/<[^>]*>/g, '').substring(0, 160),
      type: 'article',
      publishedTime: statement.date,
      authors: [statement.author],
      tags: statement.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: statement.title,
      description: statement.content.replace(/<[^>]*>/g, '').substring(0, 160),
    },
  };
}

// Generate static paths
export async function generateStaticParams() {
  return statements.map((statement) => ({
    id: statement.id.toString(),
  }));
}

export default function PressStatementPage({ params }: Props) {
  const statement = statements.find(s => s.id === parseInt(params.id));

  if (!statement) {
    notFound();
  }

  return <PressStatementContent statement={statement} />;
}