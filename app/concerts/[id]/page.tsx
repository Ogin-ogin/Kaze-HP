import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getConcertsFromSheets } from '@/lib/googleSheets';

export const dynamic = 'force-dynamic';

type ProgramStage = {
  stage: string;
  songs: string[];
};

type ConcertDetail = {
  conductor?: string;
  accompanist?: string;
  program?: ProgramStage[];
};

export default async function ConcertDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const allConcerts = await getConcertsFromSheets();
  const concert = allConcerts.find((c) => c.id === id);

  if (!concert) {
    notFound();
  }

  let detail: ConcertDetail | null = null;
  if (concert.detail) {
    try {
      detail = JSON.parse(concert.detail) as ConcertDetail;
    } catch {
      // JSON でなければ detail をそのまま表示
    }
  }

  return (
    <div className="bg-white">
      {/* 戻るリンク */}
      <div className="max-w-[980px] mx-auto px-4 sm:px-6 pt-10 pb-2">
        <Link
          href="/concerts"
          className="inline-flex items-center text-pastel-blue-600 hover:text-pastel-blue-700 text-sm"
        >
          ← 演奏会一覧に戻る
        </Link>
      </div>

      <article className="max-w-[980px] mx-auto px-4 sm:px-6 py-10">
        {/* ポスター画像 */}
        {concert.thumbnail && (
          <div className="max-w-sm mx-auto mb-10">
            <img
              src={concert.thumbnail}
              alt={concert.title}
              className="w-full rounded-2xl shadow-md"
            />
          </div>
        )}

        {/* タイトル・基本情報 */}
        <header className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-semibold text-[#1d1d1f] mb-4 tracking-tight">
            {concert.title}
          </h1>
          <p className="text-lg text-gray-500">
            {concert.date}
            {concert.location && <> ・ {concert.location}</>}
          </p>
          {concert.award && (
            <span className="inline-block mt-3 px-4 py-1.5 bg-pastel-blue-100 text-pastel-blue-800 text-sm font-medium rounded-full">
              {concert.award}
            </span>
          )}
        </header>

        {/* 指揮者・伴奏者 */}
        {detail && (detail.conductor || detail.accompanist) && (
          <div className="flex justify-center gap-8 mb-10 text-base text-[#1d1d1f]">
            {detail.conductor && (
              <span>
                <span className="text-gray-500 mr-1">指揮：</span>
                {detail.conductor}
              </span>
            )}
            {detail.accompanist && (
              <span>
                <span className="text-gray-500 mr-1">伴奏：</span>
                {detail.accompanist}
              </span>
            )}
          </div>
        )}

        {/* プログラム */}
        {detail?.program && detail.program.length > 0 && (
          <section className="max-w-2xl mx-auto">
            <h2 className="text-xl font-semibold text-[#1d1d1f] mb-6 text-center tracking-tight">
              プログラム
            </h2>
            <div className="space-y-8">
              {detail.program.map((stage, i) => (
                <div key={i}>
                  <h3 className="text-sm font-medium text-pastel-blue-600 uppercase tracking-widest mb-3 border-b border-pastel-blue-100 pb-2">
                    {stage.stage}
                  </h3>
                  <ul className="space-y-1.5">
                    {stage.songs.map((song, j) => (
                      <li key={j} className="text-base text-gray-700 pl-3">
                        {song}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* JSON でない旧形式の detail テキスト */}
        {!detail && concert.detail && (
          <div className="max-w-2xl mx-auto text-base text-gray-700 whitespace-pre-line leading-relaxed">
            {concert.detail}
          </div>
        )}
      </article>

      {/* 戻るリンク（下部） */}
      <div className="max-w-[980px] mx-auto px-4 sm:px-6 pb-16 pt-4 border-t border-gray-100">
        <Link
          href="/concerts"
          className="inline-flex items-center text-pastel-blue-600 hover:text-pastel-blue-700 text-sm"
        >
          ← 演奏会一覧に戻る
        </Link>
      </div>
    </div>
  );
}
