import Link from 'next/link';

export default function RecruitmentPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-12 text-center">団員募集</h1>

      <div className="space-y-10">
        {/* 募集条件 */}
        <section className="bg-white border border-gray-200 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <span className="mr-2">✅</span> 募集条件
          </h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">年齢不問</h3>
              <p className="text-gray-700">音楽を愛する気持ちがあれば、どなたでもご参加いただけます。</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">木曜日の午前中の練習に参加できる方</h3>
              <p className="text-gray-700">毎週木曜の午前中に、北九州市内で毎週練習を行います。</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">合唱経験不問</h3>
              <p className="text-gray-700">初めての方も丁寧に指導します。もちろん経験者も大歓迎です。</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">大会出場を目指して活動できる方</h3>
              <p className="text-gray-700">合唱祭や定期演奏会など、本格的なステージに挑戦します。</p>
            </div>
          </div>
        </section>

        {/* 練習・活動について */}
        <section className="bg-gray-50 p-8 rounded-lg">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <span className="mr-2">✅</span> 練習・活動について
          </h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">練習日</h3>
              <p className="text-gray-700">毎週木曜 午前中</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">練習場所</h3>
              <p className="text-gray-700">北九州市八幡西区黒崎「コムシティ」ほか</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">活動内容</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                <li>発声練習・パート練習・全体練習</li>
                <li>年数回のステージ出演あり</li>
                <li>合唱大会への出場を目指した集中練習</li>
              </ul>
            </div>
          </div>
        </section>

        {/* 会費 */}
        <section className="bg-white border border-gray-200 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <span className="mr-2">✅</span> 会費
          </h2>
          <p className="text-3xl font-bold text-pastel-blue-600 mb-4">月額 5,000円</p>
          <p className="text-sm text-gray-600">（楽譜代や衣装代などは別途必要になる場合があります）</p>
        </section>

        {/* こんな方におすすめ */}
        <section className="bg-pastel-blue-50 p-8 rounded-lg">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <span className="mr-2">✅</span> こんな方におすすめ
          </h2>
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start">
              <span className="mr-2">・</span>
              <span>本格的な合唱に挑戦してみたい</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">・</span>
              <span>一生の趣味としての合唱を楽しみたい</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">・</span>
              <span>音楽を通じて自分を成長させたい</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">・</span>
              <span>初心者だけど、やる気はある！</span>
            </li>
          </ul>
        </section>

        {/* 見学・体験のご案内 */}
        <section className="bg-white border-2 border-pastel-blue-500 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center justify-center">
            <span className="mr-2">✅</span> 見学・体験のご案内
          </h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            興味のある方は、まずはお気軽に見学・体験練習にお越しください。<br />
            お問い合わせ・お申し込みは、以下までご連絡ください。
          </p>
          <Link
            href="/contact"
            className="inline-block px-10 py-4 bg-pastel-blue-500 text-white text-lg font-bold rounded-lg hover:bg-pastel-blue-600 transition-colors shadow-md"
          >
            📱 応募はこちらから
          </Link>
          <p className="text-gray-600 mt-8">あなたのご参加を心よりお待ちしています。</p>
        </section>
      </div>
    </div>
  );
}
