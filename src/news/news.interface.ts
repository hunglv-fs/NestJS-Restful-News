export interface News {
  id: number;
  title: string;
  content: string;
  author: string;
  publishedAt: Date;
  category: string;
  imageUrl?: string;
}

export interface NewsCategory {
  id: number;
  name: string;
  slug: string;
}