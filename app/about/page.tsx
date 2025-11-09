export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">私たちについて</h1>

      <div className="prose prose-lg max-w-none">
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            心を込めて歌を届ける。それが私たちの願いです。
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            やさしいうた声は　大きな思いやりに<br />
            楽しいうた声は　おおきな喜びに<br />
            そして　ちいさなうた声は　大きなハーモニーに
          </p>
          <p className="text-gray-700 leading-relaxed">
            私たちはたくさんの仲間を待っています。
          </p>
        </section>

        <section className="mb-12 bg-gray-50 p-8 rounded-lg">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">活動理念</h2>
          <p className="text-gray-700 leading-relaxed">
            音楽を通じて、人々の心に潤いと感動を届けることを目指しています。一人一人の声が調和し、美しいハーモニーを生み出す。それが私たちの合唱団の魅力です。
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">活動内容</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>定期練習：毎週木曜日 10:00-13:00</li>
            <li>大会への参加</li>
            <li>合唱講習会への参加　等</li>
          </ul>
        </section>

        <section className="mb-12 bg-gray-50 p-8 rounded-lg">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">団員構成</h2>
          <p className="text-gray-700 leading-relaxed">
            幅広い年齢層の団員が在籍しています。音楽を愛する心を持つ仲間たちが、世代を超えて交流しながら、共に音楽を創り上げています。
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">レパートリー</h2>
          <p className="text-gray-700 leading-relaxed">
            合唱曲からポップス、童謡・唱歌など幅広いジャンルの曲を歌っています。時代を超えて愛される名曲から現代の作品まで、バラエティ豊かなプログラムをお届けしています。
          </p>
        </section>

        <section className="bg-blue-50 p-8 rounded-lg border-l-4 border-blue-600">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">私たちと一緒に歌いませんか？</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            合唱経験の有無は問いません。音楽を愛する心さえあれば、どなたでも歓迎いたします。ご興味のある方は、お気軽に見学にお越しください。
          </p>
          <p className="text-sm text-gray-600">
            見学・入団のお問い合わせは、お電話またはお問合わせフォームからご連絡ください。
          </p>
        </section>
      </div>
    </div>
  );
}
