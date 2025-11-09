export default function SchedulePage() {
  // TODO: 実際のGoogleカレンダーの埋め込みURLに置き換えてください
  // Googleカレンダーの設定 > 統合 > 埋め込みコード から取得
  const calendarEmbedUrl = '';

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">スケジュール</h1>

      <div className="space-y-8">
        <section className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-600">
          <h2 className="text-xl font-bold text-gray-900 mb-4">定期練習</h2>
          <p className="text-gray-700 leading-relaxed">
            毎週木曜日 10:00-13:00<br />
            練習場所：北九州市八幡西区黒崎「コムシティ」ほか
          </p>
        </section>

        {/* Googleカレンダー埋め込み */}
        <section className="bg-white border border-gray-200 rounded-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">活動カレンダー</h2>

          {calendarEmbedUrl ? (
            <div className="relative w-full" style={{ paddingBottom: '75%' }}>
              <iframe
                src={calendarEmbedUrl}
                className="absolute top-0 left-0 w-full h-full border-0"
                frameBorder="0"
                scrolling="no"
              ></iframe>
            </div>
          ) : (
            <div className="bg-gray-100 p-12 rounded-lg text-center">
              <p className="text-gray-600 mb-4">
                Googleカレンダーの設定が必要です。
              </p>
              <div className="text-left max-w-2xl mx-auto bg-white p-6 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-3">設定手順：</h3>
                <ol className="list-decimal list-inside space-y-2 text-sm text-gray-700">
                  <li>Googleカレンダーで「女声コーラス風」用のカレンダーを作成</li>
                  <li>カレンダーの設定 &gt; 「統合」セクション</li>
                  <li>「埋め込みコード」のsrc属性のURLをコピー</li>
                  <li>app/schedule/page.tsx の calendarEmbedUrl に設定</li>
                  <li>カレンダーの共有設定で「一般公開」に設定</li>
                </ol>
                <div className="mt-4 p-4 bg-yellow-50 rounded border border-yellow-200">
                  <p className="text-xs text-gray-600">
                    <strong>ヒント：</strong> スマホのGoogleカレンダーアプリで予定を追加・編集・削除すると、
                    このページにも自動的に反映されます。
                  </p>
                </div>
              </div>
            </div>
          )}
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">2025年の主な予定</h3>
            <ul className="space-y-2 text-gray-700">
              <li>・3月：レディースコーラスフェスティバル（響ホール）</li>
              <li>・6月：福岡市・北九州市合同合唱祭</li>
              <li>・6月：おかあさんコーラス九州大会</li>
              <li>・8月：おかあさんコーラス全国大会</li>
            </ul>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">練習について</h3>
            <p className="text-gray-700 text-sm leading-relaxed">
              練習は基本的に毎週木曜日の午前中ですが、大会前は追加練習を行う場合があります。
              詳しい日程はカレンダーをご確認ください。
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
