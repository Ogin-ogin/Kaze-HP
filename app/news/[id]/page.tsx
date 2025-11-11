import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getNewsFromSheets } from '@/lib/googleSheets';

export default async function NewsDetailPage({ params }: { params: Promise<{ id: string }> }) {
  // paramsを解決
  const { id } = await params;

  // Google Sheetsからニュースデータを取得
  const allNews = await getNewsFromSheets();
  const news = allNews.find((item) => item.id === id);

  if (!news) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link
        href="/news"
        className="inline-flex items-center text-pastel-blue-600 hover:text-pastel-blue-700 mb-8"
      >
        ← ニュース一覧に戻る
      </Link>

      <article>
        <header className="mb-8">
          <p className="text-sm text-gray-500 mb-2">{news.date}</p>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{news.title}</h1>
        </header>

        <div className="prose prose-lg max-w-none">
          <div className="whitespace-pre-line text-gray-700 leading-relaxed">
            {news.content}
          </div>
        </div>
      </article>

      <div className="mt-12 pt-8 border-t border-gray-200">
        <Link
          href="/news"
          className="inline-flex items-center text-pastel-blue-600 hover:text-pastel-blue-700"
        >
          ← ニュース一覧に戻る
        </Link>
      </div>
    </div>
  );
}
