import NewsCard from '@/components/NewsCard';
import { getNewsFromSheets } from '@/lib/googleSheets';
import MemberSection from '@/components/MemberSection';
import dynamicImport from 'next/dynamic';

const EditableHeroSection = dynamicImport(
  () => import('@/components/EditableHeroSection'),
  { ssr: true }
);

export const dynamic = 'force-dynamic';

export default async function NewsPage() {
  const allNews = await getNewsFromSheets();

  return (
    <div className="bg-white">
      {/* ヒーローセクション */}
      <EditableHeroSection
        page="news"
        title="ニュース"
        subtitle="最新情報をお届けします"
      />

      {/* ニュース一覧 */}
      <section className="max-w-[980px] mx-auto px-4 sm:px-6 py-24">
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
      </section>

      {/* 団員向けセクション */}
      <div className="bg-gray-50 py-24">
        <div className="max-w-[980px] mx-auto px-4 sm:px-6">
          <MemberSection />
        </div>
      </div>
    </div>
  );
}
