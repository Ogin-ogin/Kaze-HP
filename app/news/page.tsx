import NewsCard from '@/components/NewsCard';
import { getNewsFromSheets } from '@/lib/googleSheets';

export default async function NewsPage() {
  // Google Sheetsからニュースデータを取得
  const allNews = await getNewsFromSheets();
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">ニュース一覧</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {allNews.length > 0 ? (
          allNews.map((news) => (
            <NewsCard
              key={news.id}
              id={news.id}
              title={news.title}
              thumbnail={news.thumbnail}
              date={news.date}
            />
          ))
        ) : (
          <div className="col-span-3 text-center py-12 text-gray-500">
            ニュースがありません
          </div>
        )}
      </div>
    </div>
  );
}
