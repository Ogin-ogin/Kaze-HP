import NewsCard from '@/components/NewsCard';
import Link from 'next/link';
import { getNewsFromSheets } from '@/lib/googleSheets';

export default async function Home() {
  // Google Sheetsからニュースデータを取得（最新3件）
  const allNews = await getNewsFromSheets();
  const latestNews = allNews.slice(0, 3);
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* ヒーローセクション */}
      <section className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
          女声コーラス 風
        </h1>
        <p className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed">
          心を込めて歌を届ける。<br />
          それが私たちの願いです。
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href="/recruitment"
            className="px-8 py-3 bg-pastel-blue-500 text-white rounded-lg hover:bg-pastel-blue-600 transition-colors text-lg font-medium shadow-sm"
          >
            団員募集中
          </Link>
          <Link
            href="/about"
            className="px-8 py-3 bg-white text-pastel-blue-700 border border-pastel-blue-400 rounded-lg hover:bg-pastel-blue-50 transition-colors text-lg font-medium"
          >
            詳しく見る
          </Link>
        </div>
      </section>

      {/* ニュースセクション */}
      <section className="mb-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">ニュース</h2>
          <Link
            href="/news"
            className="text-pastel-blue-600 hover:text-pastel-blue-700 font-medium"
          >
            すべて見る →
          </Link>
        </div>

        {/* ニュースギャラリー（Notionギャラリービュー風） */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {latestNews.length > 0 ? (
            latestNews.map((news) => (
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
      </section>

      {/* 団体紹介セクション */}
      <section className="bg-gray-50 rounded-lg p-8 md:p-12 mb-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">私たちについて</h2>
        <div className="prose prose-lg max-w-none">
          <p className="text-gray-700 leading-relaxed mb-4">
            やさしいうた声は 大きな思いやりに<br />
            楽しいうた声は おおきな喜びに<br />
            そして ちいさなうた声は 大きなハーモニーに
          </p>
          <p className="text-gray-700 leading-relaxed mb-6">
            私たちはたくさんの仲間を待っています。
          </p>
          <Link
            href="/about"
            className="inline-block px-6 py-3 bg-white text-pastel-blue-600 border border-pastel-blue-500 rounded-lg hover:bg-pastel-blue-50 transition-colors font-medium"
          >
            もっと詳しく →
          </Link>
        </div>
      </section>

      {/* 練習情報セクション */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white border border-gray-200 rounded-lg p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">練習日時</h3>
          <p className="text-gray-700 leading-relaxed">
            毎週木曜日 10:00-13:00<br />
            練習場所：北九州市八幡西区黒崎「コムシティ」ほか
          </p>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">お問い合わせ</h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            見学・体験練習は随時受け付けています。<br />
            お気軽にお問い合わせください。
          </p>
          <Link
            href="/contact"
            className="inline-block px-6 py-2 bg-pastel-blue-500 text-white rounded-lg hover:bg-pastel-blue-600 transition-colors font-medium shadow-sm"
          >
            お問い合わせ
          </Link>
        </div>
      </section>
    </div>
  );
}
