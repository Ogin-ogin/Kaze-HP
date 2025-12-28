import MemberSection from '@/components/MemberSection';

export default function SchedulePage() {
  const calendarEmbedUrl = process.env.NEXT_PUBLIC_GOOGLE_CALENDAR_EMBED_URL || '';

  return (
    <div className="bg-white">
      {/* ヒーローセクション */}
      <section className="relative h-[500px] bg-gradient-to-br from-pastel-blue-100 to-white">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center max-w-3xl px-4">
            <h1 className="text-5xl md:text-6xl font-semibold text-[#1d1d1f] mb-6 tracking-tight">
              スケジュール
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 font-light">
              練習日程と活動予定
            </p>
          </div>
        </div>
      </section>

      {/* 定期練習 */}
      <section className="max-w-[980px] mx-auto px-4 sm:px-6 py-16">
        <div className="bg-pastel-blue-50 p-8 rounded-2xl text-center">
          <h2 className="text-2xl font-semibold text-[#1d1d1f] mb-4 tracking-tight">
            定期練習
          </h2>
          <p className="text-lg text-gray-600">
            毎週木曜日 10:00-13:00<br />
            北九州市八幡西区黒崎「コムシティ」ほか
          </p>
        </div>
      </section>

      {/* Googleカレンダー */}
      <section className="max-w-[980px] mx-auto px-4 sm:px-6 py-8">
        <h2 className="text-3xl font-semibold text-[#1d1d1f] mb-8 text-center tracking-tight">
          活動カレンダー
        </h2>

        {calendarEmbedUrl ? (
          <div className="relative w-full bg-white rounded-2xl overflow-hidden shadow-sm" style={{ paddingBottom: '75%' }}>
            <iframe
              src={calendarEmbedUrl}
              className="absolute top-0 left-0 w-full h-full border-0"
              frameBorder="0"
              scrolling="no"
            ></iframe>
          </div>
        ) : (
          <div className="bg-gray-50 p-12 rounded-2xl text-center">
            <p className="text-lg text-gray-500">
              Googleカレンダーの設定が必要です
            </p>
          </div>
        )}
      </section>

      {/* 2025年の予定 */}
      <section className="bg-gray-50">
        <div className="max-w-[980px] mx-auto px-4 sm:px-6 py-24">
          <h2 className="text-3xl font-semibold text-[#1d1d1f] mb-12 text-center tracking-tight">
            2025年の主な予定
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            <div className="flex items-start">
              <div className="h-1.5 w-1.5 bg-pastel-blue-500 rounded-full mt-2.5 mr-3 flex-shrink-0"></div>
              <p className="text-lg text-gray-600">3月：レディースコーラスフェスティバル（響ホール）</p>
            </div>
            <div className="flex items-start">
              <div className="h-1.5 w-1.5 bg-pastel-blue-500 rounded-full mt-2.5 mr-3 flex-shrink-0"></div>
              <p className="text-lg text-gray-600">6月：福岡市・北九州市合同合唱祭</p>
            </div>
            <div className="flex items-start">
              <div className="h-1.5 w-1.5 bg-pastel-blue-500 rounded-full mt-2.5 mr-3 flex-shrink-0"></div>
              <p className="text-lg text-gray-600">6月：おかあさんコーラス九州大会</p>
            </div>
            <div className="flex items-start">
              <div className="h-1.5 w-1.5 bg-pastel-blue-500 rounded-full mt-2.5 mr-3 flex-shrink-0"></div>
              <p className="text-lg text-gray-600">8月：おかあさんコーラス全国大会</p>
            </div>
          </div>

          <div className="mt-16 text-center max-w-2xl mx-auto">
            <p className="text-base text-gray-600 leading-relaxed">
              練習は基本的に毎週木曜日の午前中ですが、大会前は追加練習を行う場合があります。詳しい日程はカレンダーをご確認ください。
            </p>
          </div>
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
