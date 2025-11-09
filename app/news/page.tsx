import NewsCard from '@/components/NewsCard';

// サンプルニュースデータ（後でGoogle Sheetsから取得）
const allNews = [
  {
    id: '1',
    title: '第48回おかあさんコーラス全国大会出場決定！',
    thumbnail: '',
    date: '2025-06-15',
  },
  {
    id: '2',
    title: '6月の練習スケジュールのお知らせ',
    thumbnail: '',
    date: '2025-06-01',
  },
  {
    id: '3',
    title: '新団員募集中！見学・体験練習受付中',
    thumbnail: '',
    date: '2025-05-20',
  },
];

export default function NewsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">ニュース一覧</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {allNews.map((news) => (
          <NewsCard
            key={news.id}
            id={news.id}
            title={news.title}
            thumbnail={news.thumbnail}
            date={news.date}
          />
        ))}
      </div>
    </div>
  );
}
