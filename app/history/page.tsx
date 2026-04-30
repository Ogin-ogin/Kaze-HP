import { getHistoryFromSheets } from '@/lib/googleSheets';
import AdminLink from '@/components/AdminLink';
import MemberSection from '@/components/MemberSection';
import dynamicImport from 'next/dynamic';

const EditableHeroSection = dynamicImport(
  () => import('@/components/EditableHeroSection'),
  { ssr: true }
);

export const dynamic = 'force-dynamic';

export default async function HistoryPage() {
  const activities = await getHistoryFromSheets();

  const formatDate = (dateStr: string) => {
    if (dateStr.length === 4) return `${dateStr}年`;
    const [year, month] = dateStr.split('-');
    return `${year}年${month}月`;
  };

  return (
    <div className="bg-white">
      {/* ヒーローセクション */}
      <EditableHeroSection
        page="history"
        title="風の通り道"
        subtitle="主な活動実績"
      />

      {/* 活動実績リスト */}
      <section className="max-w-[980px] mx-auto px-4 sm:px-6 py-24">
        <div className="flex justify-end mb-6">
          <AdminLink href="/admin/history" label="活動実績を編集・追加" />
        </div>
        {activities.length > 0 ? (
          <div className="space-y-0 divide-y divide-gray-100">
            {activities.map((activity, index) => (
              <div
                key={index}
                className="flex items-start py-6 hover:bg-gray-50 transition-colors"
              >
                <div className="flex-shrink-0 w-40 text-base font-medium text-pastel-blue-600">
                  {formatDate(activity.date)}
                </div>
                <div className="flex-1">
                  <p className="text-lg text-[#1d1d1f]">{activity.event}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-lg text-gray-500">活動実績がありません</p>
          </div>
        )}
      </section>

      {/* ブログリンク */}
      <section className="bg-gray-50">
        <div className="max-w-[980px] mx-auto px-4 sm:px-6 py-16 text-center">
          <p className="text-base text-gray-600">
            詳細はブログページでもご覧いただけます
          </p>
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
