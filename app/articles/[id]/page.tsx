import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ArticleContent from '../../components/ArticleContent';
import articlesData from '../../data/articles.json';

interface Props {
  params: { id: string };
}

// Generate metadata for SEO
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const article = articlesData.find(a => a.id === parseInt(params.id));
  
  if (!article) {
    return {
      title: 'المقال غير موجود',
    };
  }

  return {
    title: `${article.title} | محمد عبدالعليم داود`,
    description: article.excerpt,
    keywords: article.tags,
    authors: [{ name: article.author }],
    openGraph: {
      title: article.title,
      description: article.excerpt,
      images: [article.image],
      type: 'article',
      publishedTime: article.date,
      authors: [article.author],
      tags: article.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.excerpt,
      images: [article.image],
    },
  };
}

// Generate static paths for all articles
export async function generateStaticParams() {
  return articlesData.map((article) => ({
    id: article.id.toString(),
  }));
}

export default function ArticlePage({ params }: Props) {
  const article = articlesData.find(a => a.id === parseInt(params.id));

  if (!article) {
    notFound();
  }

  return <ArticleContent article={article} />;
}