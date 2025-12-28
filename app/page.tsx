import NewsCard from '@/components/NewsCard';
import Link from 'next/link';
import { getNewsFromSheets } from '@/lib/googleSheets';
import MemberSection from '@/components/MemberSection';
import dynamic from 'next/dynamic';

// クライアントコンポーネントを動的インポート
const HeroSection = dynamic(() => import('@/components/home/HeroSection'), {
  ssr: true,
});

const AboutSection = dynamic(() => import('@/components/home/AboutSection'), {
  ssr: true,
});

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
      <HeroSection />

      {/* ニュースセクション */}
      <div className="max-w-[980px] mx-auto px-4 sm:px-6">
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

      {/* 団体紹介・練習風景セクション */}
      <AboutSection />

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
              className="btn-apple-primary inline-block"
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
