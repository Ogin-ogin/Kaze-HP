import { getHistoryFromSheets } from '@/lib/googleSheets';

export default async function HistoryPage() {
  // Google Sheetsから活動実績データを取得
  const activities = await getHistoryFromSheets();

  const formatDate = (dateStr: string) => {
    if (dateStr.length === 4) return `${dateStr}年`;
    const [year, month] = dateStr.split('-');
    return `${year}年${month}月`;
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">風の通り道</h1>
      <p className="text-lg text-gray-600 mb-12">主な活動実績</p>

      {activities.length > 0 ? (
        <div className="space-y-1">
          {activities.map((activity, index) => (
            <div
              key={index}
              className="flex items-start py-4 px-6 hover:bg-gray-50 transition-colors rounded-lg"
            >
              <div className="flex-shrink-0 w-32 text-sm font-medium text-gray-600">
                {formatDate(activity.date)}
              </div>
              <div className="flex-1">
                <p className="text-gray-900">{activity.event}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-500">活動実績がありません</p>
        </div>
      )}

      <div className="mt-12 bg-pastel-blue-50 p-6 rounded-lg border-l-4 border-pastel-blue-500">
        <p className="text-sm text-gray-700">
          詳細はブログページでもご覧いただけます。
        </p>
      </div>
    </div>
  );
}
