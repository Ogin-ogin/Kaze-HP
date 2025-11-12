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
    <div className="bg-white">
      {/* ヒーローセクション */}
      <section className="relative h-[700px] bg-gradient-to-br from-pastel-blue-100 via-white to-pastel-blue-50">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center max-w-5xl px-4">
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-semibold text-[#1d1d1f] mb-8 tracking-tight">
              女声コーラス 風
            </h1>
            <p className="text-2xl md:text-3xl text-gray-600 mb-12 leading-relaxed font-light">
              心を込めて歌を届ける。<br />
              それが私たちの願いです。
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/recruitment"
                className="px-8 py-4 bg-pastel-blue-600 text-white rounded-full hover:bg-pastel-blue-700 transition-all text-lg font-medium"
              >
                団員募集中
              </Link>
              <Link
                href="/about"
                className="text-[#06c] hover:underline text-lg font-medium"
              >
                詳しく見る →
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-[980px] mx-auto px-4 sm:px-6">\n

      {/* ニュースセクション */}
      <section className="py-24">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-4xl font-semibold text-[#1d1d1f] tracking-tight">ニュース</h2>
          <Link
            href="/news"
            className="text-[#06c] hover:underline text-base"
          >
            すべて見る →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
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
            <div className="col-span-3 text-center py-16">
              <p className="text-lg text-gray-500">ニュースがありません</p>
            </div>
          )}
        </div>
      </section>
      </div>

      {/* 団体紹介セクション */}
      <section className="bg-gray-50 py-24">
        <div className="max-w-[980px] mx-auto px-4 sm:px-6">
          <h2 className="text-4xl font-semibold text-[#1d1d1f] mb-12 text-center tracking-tight">私たちについて</h2>
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-2xl text-[#1d1d1f] leading-relaxed font-light mb-8">
              やさしいうた声は 大きな思いやりに<br />
              楽しいうた声は おおきな喜びに<br />
              そして ちいさなうた声は 大きなハーモニーに
            </p>
            <p className="text-xl text-gray-600 mb-10">
              私たちはたくさんの仲間を待っています
            </p>
            <Link
              href="/about"
              className="text-[#06c] hover:underline text-lg font-medium"
            >
              もっと詳しく →
            </Link>
          </div>
        </div>
      </section>

      {/* 練習情報セクション */}
      <div className="max-w-[980px] mx-auto px-4 sm:px-6 py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <div className="h-1 w-16 bg-pastel-blue-500 mb-6 rounded-full"></div>
            <h3 className="text-2xl font-semibold text-[#1d1d1f] mb-4 tracking-tight">練習日時</h3>
            <p className="text-lg text-gray-600 leading-relaxed">
              毎週木曜日 10:00-13:00<br />
              北九州市八幡西区黒崎「コムシティ」ほか
            </p>
          </div>

          <div>
            <div className="h-1 w-16 bg-pastel-blue-500 mb-6 rounded-full"></div>
            <h3 className="text-2xl font-semibold text-[#1d1d1f] mb-4 tracking-tight">お問い合わせ</h3>
            <p className="text-lg text-gray-600 leading-relaxed mb-6">
              見学・体験練習は随時受け付けています。<br />
              お気軽にお問い合わせください。
            </p>
            <Link
              href="/contact"
              className="inline-block px-8 py-4 bg-pastel-blue-600 text-white rounded-full hover:bg-pastel-blue-700 transition-all font-medium"
            >
              お問い合わせ
            </Link>
          </div>
        </div>
      </div>

      {/* 団員向けセクション */}
      <div className="bg-gray-50 py-24">
        <div className="max-w-[980px] mx-auto px-4 sm:px-6">
          <MemberSection />
        </div>
      </div>
    </div>
  );
}
