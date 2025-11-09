import Link from 'next/link';
import { notFound } from 'next/navigation';

// サンプルニュースデータ（後でGoogle Sheetsから取得）
const newsData: Record<string, { title: string; date: string; content: string }> = {
  '1': {
    title: '第48回おかあさんコーラス全国大会出場決定！',
    date: '2025-06-15',
    content: `
私たち女声コーラス「風」は、第48回おかあさんコーラス全国大会への出場が決定しました。

九州大会で篤姫賞を受賞し、全国大会への出場権を獲得することができました。団員一同、日頃の練習の成果を全国の舞台で披露できることを大変嬉しく思っております。

全国大会は2025年8月に山形県民やまぎんホールで開催されます。皆様の応援をどうぞよろしくお願いいたします。
    `,
  },
  '2': {
    title: '6月の練習スケジュールのお知らせ',
    date: '2025-06-01',
    content: `
6月の練習スケジュールをお知らせします。

【通常練習】
毎週木曜日 10:00-13:00
練習場所：北九州市八幡西区黒崎「コムシティ」

【特別練習】
6月14日（土）13:00-17:00
全国大会に向けた集中練習を行います。

ご不明な点がございましたら、団長までお問い合わせください。
    `,
  },
  '3': {
    title: '新団員募集中！見学・体験練習受付中',
    date: '2025-05-20',
    content: `
女声コーラス「風」では、新しい仲間を募集しています。

合唱経験の有無は問いません。音楽を愛する心があれば、どなたでも歓迎いたします。

【募集条件】
・木曜日の午前中に参加できる方
・年齢不問
・合唱経験不問

見学・体験練習は随時受け付けています。お気軽にお問い合わせください。

皆様のご参加を心よりお待ちしています。
    `,
  },
};

export default function NewsDetailPage({ params }: { params: { id: string } }) {
  const news = newsData[params.id];

  if (!news) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link
        href="/news"
        className="inline-flex items-center text-pastel-blue-600 hover:text-pastel-blue-700 mb-8"
      >
        ← ニュース一覧に戻る
      </Link>

      <article>
        <header className="mb-8">
          <p className="text-sm text-gray-500 mb-2">{news.date}</p>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{news.title}</h1>
        </header>

        <div className="prose prose-lg max-w-none">
          <div className="whitespace-pre-line text-gray-700 leading-relaxed">
            {news.content}
          </div>
        </div>
      </article>

      <div className="mt-12 pt-8 border-t border-gray-200">
        <Link
          href="/news"
          className="inline-flex items-center text-pastel-blue-600 hover:text-pastel-blue-700"
        >
          ← ニュース一覧に戻る
        </Link>
      </div>
    </div>
  );
}
