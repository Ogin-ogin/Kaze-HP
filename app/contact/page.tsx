import MemberSection from '@/components/MemberSection';

export default function ContactPage() {
  const googleFormUrl = process.env.NEXT_PUBLIC_GOOGLE_FORM_URL || 'https://forms.google.com/';

  return (
    <div className="bg-white">
      {/* ヒーローセクション */}
      <section className="relative h-[500px] bg-gradient-to-br from-pastel-blue-100 to-white">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center max-w-3xl px-4">
            <h1 className="text-5xl md:text-6xl font-semibold text-[#1d1d1f] mb-6 tracking-tight">
              お問い合わせ
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 font-light leading-relaxed">
              見学・体験練習は随時受け付けています
            </p>
          </div>
        </div>
      </section>

      {/* 練習見学について */}
      <section className="max-w-[980px] mx-auto px-4 sm:px-6 py-24">
        <h2 className="text-4xl font-semibold text-[#1d1d1f] mb-16 text-center tracking-tight">
          練習見学について
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          <div>
            <div className="h-1 w-16 bg-pastel-blue-500 mb-6 rounded-full"></div>
            <h3 className="text-2xl font-semibold text-[#1d1d1f] mb-4 tracking-tight">
              練習日時
            </h3>
            <p className="text-lg text-gray-600">毎週木曜日 10:00-13:00</p>
          </div>

          <div>
            <div className="h-1 w-16 bg-pastel-blue-500 mb-6 rounded-full"></div>
            <h3 className="text-2xl font-semibold text-[#1d1d1f] mb-4 tracking-tight">
              練習場所
            </h3>
            <p className="text-lg text-gray-600">
              北九州市八幡西区黒崎「コムシティ」ほか
            </p>
          </div>
        </div>

        <div className="bg-pastel-blue-50 p-6 rounded-2xl text-center mb-16">
          <p className="text-base text-gray-600">
            見学をご希望の方は、事前にお問い合わせフォームよりご連絡ください
          </p>
        </div>

        {/* Google Formへのリンク */}
        <div className="text-center">
          <h2 className="text-3xl font-semibold text-[#1d1d1f] mb-8 tracking-tight">
            お問い合わせフォーム
          </h2>
          <a
            href={googleFormUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-apple-primary inline-block"
          >
            お問い合わせフォームを開く
          </a>
        </div>
      </section>

      {/* よくあるご質問 */}
      <section className="bg-gray-50">
        <div className="max-w-[980px] mx-auto px-4 sm:px-6 py-24">
          <h2 className="text-4xl font-semibold text-[#1d1d1f] mb-16 text-center tracking-tight">
            よくあるご質問
          </h2>

          <div className="space-y-8 max-w-3xl mx-auto">
            <div>
              <h3 className="text-xl font-semibold text-[#1d1d1f] mb-3">
                合唱経験がなくても参加できますか？
              </h3>
              <p className="text-lg text-gray-600 leading-relaxed">
                はい、もちろんです。音楽を愛する心があれば、どなたでも歓迎いたします。丁寧に指導いたしますので、ご安心ください。
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-[#1d1d1f] mb-3">
                見学は可能ですか？
              </h3>
              <p className="text-lg text-gray-600 leading-relaxed">
                はい、見学・体験練習は随時受け付けています。事前にお問い合わせフォームよりご連絡ください。
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-[#1d1d1f] mb-3">
                会費はいくらですか？
              </h3>
              <p className="text-lg text-gray-600 leading-relaxed">
                月額5,000円です。楽譜代や衣装代などは別途必要になる場合があります。
              </p>
            </div>
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
