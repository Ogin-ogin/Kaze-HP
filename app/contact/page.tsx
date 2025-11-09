export default function ContactPage() {
  const googleFormUrl = process.env.NEXT_PUBLIC_GOOGLE_FORM_URL || 'https://forms.google.com/';

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">お問い合わせ</h1>

      <div className="space-y-8">
        <section className="bg-gray-50 p-8 rounded-lg">
          <p className="text-lg text-gray-700 leading-relaxed text-center mb-6">
            見学・体験練習は随時受け付けています。<br />
            お気軽にお問い合わせください。
          </p>
        </section>

        <section className="bg-white border border-gray-200 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">練習見学について</h2>
          <div className="space-y-4 text-gray-700">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">練習日時</h3>
              <p>毎週木曜日 10:00-13:00</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">練習場所</h3>
              <p>北九州市八幡西区黒崎「コムシティ」ほか</p>
            </div>
            <div className="bg-pastel-blue-50 p-4 rounded-lg mt-6">
              <p className="text-sm text-gray-600">
                ※ 見学をご希望の方は、事前にお問い合わせフォームよりご連絡ください。
              </p>
            </div>
          </div>
        </section>

        {/* Google Formへのリンク */}
        <section className="text-center py-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">お問い合わせフォーム</h2>
          <p className="text-gray-700 mb-8">
            下記のボタンからお問い合わせフォームへお進みください。
          </p>
          <a
            href={googleFormUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-10 py-4 bg-pastel-blue-500 text-white text-lg font-bold rounded-lg hover:bg-pastel-blue-600 transition-colors"
          >
            お問い合わせフォームを開く
          </a>
        </section>

        <section className="bg-gray-50 p-8 rounded-lg">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">よくあるご質問</h2>
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Q. 合唱経験がなくても参加できますか？</h3>
              <p className="text-gray-700">
                A. はい、もちろんです。音楽を愛する心があれば、どなたでも歓迎いたします。丁寧に指導いたしますので、ご安心ください。
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Q. 見学は可能ですか？</h3>
              <p className="text-gray-700">
                A. はい、見学・体験練習は随時受け付けています。事前にお問い合わせフォームよりご連絡ください。
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Q. 会費はいくらですか？</h3>
              <p className="text-gray-700">
                A. 月額5,000円です。楽譜代や衣装代などは別途必要になる場合があります。
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
