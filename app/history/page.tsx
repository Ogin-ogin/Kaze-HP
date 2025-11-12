import { getHistoryFromSheets } from '@/lib/googleSheets';

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
      <section className="relative h-[500px] bg-gradient-to-br from-pastel-blue-50 to-white">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center max-w-3xl px-4">
            <h1 className="text-5xl md:text-6xl font-semibold text-[#1d1d1f] mb-6 tracking-tight">
              風の通り道
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 font-light">
              主な活動実績
            </p>
          </div>
        </div>
      </section>

      {/* 活動実績リスト */}
      <section className="max-w-[980px] mx-auto px-4 sm:px-6 py-24">
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
    </div>
  );
}
