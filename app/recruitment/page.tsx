import Link from 'next/link';
import MemberSection from '@/components/MemberSection';

export default function RecruitmentPage() {
  return (
    <div className="bg-white">
      {/* ヒーローセクション */}
      <section className="relative h-[600px] bg-gradient-to-br from-pastel-blue-200 via-pastel-blue-100 to-white">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center max-w-4xl px-4">
            <h1 className="text-6xl md:text-7xl font-semibold text-[#1d1d1f] mb-8 tracking-tight">
              団員募集
            </h1>
            <p className="text-2xl md:text-3xl text-gray-600 font-light leading-relaxed">
              あなたも私たちと一緒に<br className="md:hidden" />歌いませんか
            </p>
          </div>
        </div>
      </section>

      {/* 募集条件 */}
      <section className="max-w-[980px] mx-auto px-4 sm:px-6 py-24">
        <h2 className="text-4xl font-semibold text-[#1d1d1f] mb-16 text-center tracking-tight">
          募集条件
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <div className="h-1 w-16 bg-pastel-blue-500 mb-6 rounded-full"></div>
            <h3 className="text-2xl font-semibold text-[#1d1d1f] mb-4 tracking-tight">
              年齢不問
            </h3>
            <p className="text-lg text-gray-600 leading-relaxed">
              音楽を愛する気持ちがあれば、どなたでもご参加いただけます。
            </p>
          </div>

          <div>
            <div className="h-1 w-16 bg-pastel-blue-500 mb-6 rounded-full"></div>
            <h3 className="text-2xl font-semibold text-[#1d1d1f] mb-4 tracking-tight">
              木曜日の午前中に参加できる方
            </h3>
            <p className="text-lg text-gray-600 leading-relaxed">
              毎週木曜の午前中に、北九州市内で毎週練習を行います。
            </p>
          </div>

          <div>
            <div className="h-1 w-16 bg-pastel-blue-500 mb-6 rounded-full"></div>
            <h3 className="text-2xl font-semibold text-[#1d1d1f] mb-4 tracking-tight">
              合唱経験不問
            </h3>
            <p className="text-lg text-gray-600 leading-relaxed">
              初めての方も丁寧に指導します。もちろん経験者も大歓迎です。
            </p>
          </div>

          <div>
            <div className="h-1 w-16 bg-pastel-blue-500 mb-6 rounded-full"></div>
            <h3 className="text-2xl font-semibold text-[#1d1d1f] mb-4 tracking-tight">
              大会出場を目指して活動できる方
            </h3>
            <p className="text-lg text-gray-600 leading-relaxed">
              合唱祭や定期演奏会など、本格的なステージに挑戦します。
            </p>
          </div>
        </div>
      </section>

      {/* 練習・活動について */}
      <section className="bg-gray-50">
        <div className="max-w-[980px] mx-auto px-4 sm:px-6 py-24">
          <h2 className="text-4xl font-semibold text-[#1d1d1f] mb-16 text-center tracking-tight">
            練習・活動について
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div>
              <h3 className="text-xl font-semibold text-[#1d1d1f] mb-4 tracking-tight">
                練習日
              </h3>
              <p className="text-lg text-gray-600">毎週木曜 午前中</p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-[#1d1d1f] mb-4 tracking-tight">
                練習場所
              </h3>
              <p className="text-lg text-gray-600">
                北九州市八幡西区黒崎「コムシティ」ほか
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-[#1d1d1f] mb-4 tracking-tight">
                活動内容
              </h3>
              <p className="text-base text-gray-600 leading-relaxed">
                発声練習・パート練習・全体練習<br />
                年数回のステージ出演あり<br />
                合唱大会への出場を目指した集中練習
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 会費 */}
      <section className="max-w-[980px] mx-auto px-4 sm:px-6 py-24">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-4xl font-semibold text-[#1d1d1f] mb-8 tracking-tight">
            会費
          </h2>
          <p className="text-6xl font-semibold text-pastel-blue-600 mb-6">
            月額 ¥5,000
          </p>
          <p className="text-base text-gray-500">
            楽譜代や衣装代などは別途必要になる場合があります
          </p>
        </div>
      </section>

      {/* こんな方におすすめ */}
      <section className="bg-gray-50">
        <div className="max-w-[980px] mx-auto px-4 sm:px-6 py-24">
          <h2 className="text-4xl font-semibold text-[#1d1d1f] mb-16 text-center tracking-tight">
            こんな方におすすめ
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            <div className="flex items-start">
              <div className="h-1.5 w-1.5 bg-pastel-blue-500 rounded-full mt-2.5 mr-3 flex-shrink-0"></div>
              <p className="text-lg text-gray-600">本格的な合唱に挑戦してみたい</p>
            </div>
            <div className="flex items-start">
              <div className="h-1.5 w-1.5 bg-pastel-blue-500 rounded-full mt-2.5 mr-3 flex-shrink-0"></div>
              <p className="text-lg text-gray-600">一生の趣味としての合唱を楽しみたい</p>
            </div>
            <div className="flex items-start">
              <div className="h-1.5 w-1.5 bg-pastel-blue-500 rounded-full mt-2.5 mr-3 flex-shrink-0"></div>
              <p className="text-lg text-gray-600">音楽を通じて自分を成長させたい</p>
            </div>
            <div className="flex items-start">
              <div className="h-1.5 w-1.5 bg-pastel-blue-500 rounded-full mt-2.5 mr-3 flex-shrink-0"></div>
              <p className="text-lg text-gray-600">初心者だけど、やる気はある</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-[980px] mx-auto px-4 sm:px-6 py-24">
        <div className="text-center max-w-2xl mx-auto bg-gradient-to-br from-pastel-blue-50 to-white rounded-3xl p-12 md:p-16">
          <h2 className="text-4xl font-semibold text-[#1d1d1f] mb-8 tracking-tight">
            見学・体験のご案内
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed mb-10">
            興味のある方は、まずはお気軽に見学・体験練習にお越しください。
          </p>
          <Link
            href="/contact"
            className="btn-apple-primary inline-block"
          >
            応募はこちらから
          </Link>
          <p className="text-base text-gray-500 mt-8">
            あなたのご参加を心よりお待ちしています
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
