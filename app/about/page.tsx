import MemberSection from '@/components/MemberSection';
import EditableHeroSection from '@/components/EditableHeroSection';
import EditableSectionImage from '@/components/EditableSectionImage';

export default function AboutPage() {
  return (
    <div className="bg-white">
      {/* ヒーローセクション */}
      <EditableHeroSection
        page="about"
        title="心を込めて歌を届ける"
        subtitle="それが私たちの願いです"
        height="h-[600px]"
      />

      {/* メインメッセージ */}
      <section className="max-w-[980px] mx-auto px-4 sm:px-6 py-24">
        <div className="text-center max-w-3xl mx-auto">
          <p className="text-2xl md:text-3xl text-[#1d1d1f] leading-relaxed font-light mb-16">
            やさしいうた声は　大きな思いやりに<br />
            楽しいうた声は　おおきな喜びに<br />
            そして　ちいさなうた声は　大きなハーモニーに
          </p>
          <p className="text-xl text-gray-600">
            私たちはたくさんの仲間を待っています
          </p>
        </div>
      </section>

      {/* 活動理念 */}
      <section className="bg-gray-50">
        <div className="max-w-[980px] mx-auto px-4 sm:px-6 py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <EditableSectionImage
              page="about"
              section="philosophy"
              field="image"
              placeholder="合唱の様子"
              className="relative h-[400px] bg-pastel-blue-100 rounded-2xl overflow-hidden"
            />

            <div>
              <h2 className="text-4xl font-semibold text-[#1d1d1f] mb-6 tracking-tight">
                活動理念
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                音楽を通じて、人々の心に潤いと感動を届けることを目指しています。一人一人の声が調和し、美しいハーモニーを生み出す。それが私たちの合唱団の魅力です。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 活動内容 */}
      <section className="max-w-[980px] mx-auto px-4 sm:px-6 py-24">
        <h2 className="text-4xl font-semibold text-[#1d1d1f] mb-16 text-center tracking-tight">
          活動内容
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="h-2 w-12 bg-pastel-blue-500 mx-auto mb-6 rounded-full"></div>
            <h3 className="text-xl font-semibold text-[#1d1d1f] mb-4">定期練習</h3>
            <p className="text-base text-gray-600">
              毎週木曜日 10:00-13:00
            </p>
          </div>

          <div className="text-center">
            <div className="h-2 w-12 bg-pastel-blue-500 mx-auto mb-6 rounded-full"></div>
            <h3 className="text-xl font-semibold text-[#1d1d1f] mb-4">大会への参加</h3>
            <p className="text-base text-gray-600">
              各種合唱コンクールに挑戦
            </p>
          </div>

          <div className="text-center">
            <div className="h-2 w-12 bg-pastel-blue-500 mx-auto mb-6 rounded-full"></div>
            <h3 className="text-xl font-semibold text-[#1d1d1f] mb-4">合唱講習会</h3>
            <p className="text-base text-gray-600">
              技術向上のための講習会参加
            </p>
          </div>
        </div>
      </section>

      {/* 団員構成とレパートリー */}
      <section className="bg-gray-50">
        <div className="max-w-[980px] mx-auto px-4 sm:px-6 py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div>
              <h2 className="text-3xl font-semibold text-[#1d1d1f] mb-6 tracking-tight">
                団員構成
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                幅広い年齢層の団員が在籍しています。音楽を愛する心を持つ仲間たちが、世代を超えて交流しながら、共に音楽を創り上げています。
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-semibold text-[#1d1d1f] mb-6 tracking-tight">
                レパートリー
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                合唱曲からポップス、童謡・唱歌など幅広いジャンルの曲を歌っています。時代を超えて愛される名曲から現代の作品まで、バラエティ豊かなプログラムをお届けしています。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-[980px] mx-auto px-4 sm:px-6 py-24">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-4xl font-semibold text-[#1d1d1f] mb-8 tracking-tight">
            私たちと一緒に歌いませんか？
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed mb-12">
            合唱経験の有無は問いません。音楽を愛する心さえあれば、どなたでも歓迎いたします。ご興味のある方は、お気軽に見学にお越しください。
          </p>
          <a
            href="/recruitment"
            className="inline-block text-[#06c] hover:underline text-lg font-medium"
          >
            団員募集について詳しく見る →
          </a>
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
