// API functions for fetching data
// في المستقبل يمكن ربطها بـ API حقيقي

export interface Article {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  date: string;
  views: string;
  category: string;
  readTime: string;
  author: string;
  tags: string[];
}

export interface PressStatement {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  category: string;
  urgent: boolean;
  views: string;
  shares: string;
  author: string;
  tags: string[];
}

export interface Event {
  id: number;
  title: string;
  description: string;
  fullDescription?: string;
  image: string;
  date: string;
  time: string;
  endTime?: string;
  location: string;
  attendees: number;
  status: string;
  organizer: string;
  contact: {
    phone: string;
    email: string;
  };
}

// دوال جلب البيانات - يمكن تطويرها لاحقاً للاتصال بـ API
export async function getArticles(): Promise<Article[]> {
  // في المستقبل: return await fetch('/api/articles').then(res => res.json());
  const articlesData = await import('../data/articles.json');
  return articlesData.default;
}

export async function getArticleById(id: number): Promise<Article | null> {
  const articles = await getArticles();
  return articles.find(article => article.id === id) || null;
}

export async function getPressStatements(): Promise<PressStatement[]> {
  // في المستقبل: return await fetch('/api/press-statements').then(res => res.json());
  const statementsData = await import('../data/pressStatements.json');
  return statementsData.default;
}

export async function getPressStatementById(id: number): Promise<PressStatement | null> {
  const statements = await getPressStatements();
  return statements.find(statement => statement.id === id) || null;
}

export async function getEvents(): Promise<Event[]> {
  // في المستقبل: return await fetch('/api/events').then(res => res.json());
  const eventsData = await import('../data/events.json');
  return eventsData.default;
}

export async function getEventById(id: number): Promise<Event | null> {
  const events = await getEvents();
  return events.find(event => event.id === id) || null;
}