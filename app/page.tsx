import NewsCard from '@/components/NewsCard';
import Link from 'next/link';
import { getNewsFromSheets } from '@/lib/googleSheets';
import MemberSection from '@/components/MemberSection';

export default async function Home() {
  // Google Sheetsからニュースデータを取得（最新3件）
  let latestNews: Array<{ id: string; title: string; date: string; thumbnail: string; content: string }> = [];
  try {
    const allNews = await getNewsFromSheets();
    latestNews = allNews.slice(0, 3);
  } catch (error) {
    console.error('Failed to fetch news:', error);
    // エラーが発生しても空の配列で続行
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* ヒーローセクション */}
      <section className="text-center mb-24 pt-12">
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-semibold text-gray-900 mb-8 tracking-tight">
          女声コーラス 風
        </h1>
        <p className="text-xl md:text-2xl text-gray-500 mb-12 leading-relaxed max-w-2xl mx-auto font-light">
          心を込めて歌を届ける。<br />
          それが私たちの願いです。
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href="/recruitment"
            className="px-8 py-3 bg-gray-900 text-white rounded-full hover:bg-gray-800 transition-all duration-200 text-base font-medium"
          >
            団員募集中
          </Link>
          <Link
            href="/about"
            className="px-8 py-3 text-gray-900 hover:text-gray-600 transition-colors text-base font-medium"
          >
            詳しく見る →
          </Link>
        </div>
      </section>

      {/* ニュースセクション */}
      <section className="mb-24">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 tracking-tight">ニュース</h2>
          <Link
            href="/news"
            className="text-gray-600 hover:text-gray-900 font-normal transition-colors"
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
      <section className="bg-white rounded-3xl p-12 md:p-16 mb-24 shadow-apple">
        <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-8 tracking-tight">私たちについて</h2>
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
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-24">
        <div className="bg-white rounded-3xl p-10 shadow-apple">
          <h3 className="text-2xl font-semibold text-gray-900 mb-4 tracking-tight">練習日時</h3>
          <p className="text-gray-700 leading-relaxed">
            毎週木曜日 10:00-13:00<br />
            練習場所：北九州市八幡西区黒崎「コムシティ」ほか
          </p>
        </div>

        <div className="bg-white rounded-3xl p-10 shadow-apple">
          <h3 className="text-2xl font-semibold text-gray-900 mb-4 tracking-tight">お問い合わせ</h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            見学・体験練習は随時受け付けています。<br />
            お気軽にお問い合わせください。
          </p>
          <Link
            href="/contact"
            className="inline-block px-6 py-3 bg-gray-900 text-white rounded-full hover:bg-gray-800 transition-all duration-200 font-medium text-sm"
          >
            お問い合わせ
          </Link>
        </div>
      </section>

      {/* 団員向けセクション */}
      <MemberSection />
    </div>
  );
}
