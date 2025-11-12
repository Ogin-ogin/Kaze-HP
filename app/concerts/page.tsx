import Link from 'next/link';
import Image from 'next/image';
import { getConcertsFromSheets } from '@/lib/googleSheets';

export default async function ConcertsPage() {
  const concerts = await getConcertsFromSheets();

  return (
    <div className="bg-white">
      {/* ヒーローセクション */}
      <section className="relative h-[500px] bg-gradient-to-br from-pastel-blue-100 to-white">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center max-w-3xl px-4">
            <h1 className="text-5xl md:text-6xl font-semibold text-[#1d1d1f] mb-6 tracking-tight">
              風の演奏会史
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 font-light">
              これまでの演奏会やコンサートの記録
            </p>
          </div>
        </div>
      </section>

      {/* ギャラリービュー */}
      <section className="max-w-[1200px] mx-auto px-4 sm:px-6 py-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {concerts.length > 0 ? (
            concerts.map((concert) => (
              <Link
                key={concert.id}
                href={`/concerts/${concert.id}`}
                className="group block"
              >
                {/* サムネイル画像 */}
                <div className="relative w-full h-72 bg-pastel-blue-50 rounded-2xl overflow-hidden mb-4">
                  {concert.thumbnail ? (
                    <Image
                      src={concert.thumbnail}
                      alt={concert.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
                      ポスター・パンフレット
                    </div>
                  )}
                </div>

                {/* コンテンツ */}
                <div>
                  <p className="text-sm text-gray-500 mb-2">{concert.date}</p>
                  <h3 className="text-xl font-semibold text-[#1d1d1f] mb-2 group-hover:text-pastel-blue-600 transition-colors">
                    {concert.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">{concert.location}</p>
                  {concert.award && (
                    <span className="inline-block px-3 py-1 bg-pastel-blue-100 text-pastel-blue-800 text-xs font-medium rounded-full">
                      {concert.award}
                    </span>
                  )}
                </div>
              </Link>
            ))
          ) : (
            <div className="col-span-3 text-center py-16">
              <p className="text-lg text-gray-500">演奏会情報がありません</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
