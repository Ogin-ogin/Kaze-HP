import Link from 'next/link';
import Image from 'next/image';
import { getConcertsFromSheets } from '@/lib/googleSheets';

export default async function ConcertsPage() {
  // Google Sheetsから演奏会データを取得
  const concerts = await getConcertsFromSheets();
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">風の演奏会史</h1>
      <p className="text-lg text-gray-600 mb-12">
        これまでの演奏会やコンサートの記録をご覧いただけます
      </p>

      {/* ギャラリービュー */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {concerts.length > 0 ? (
          concerts.map((concert) => (
          <Link
            key={concert.id}
            href={`/concerts/${concert.id}`}
            className="group bg-white/80 backdrop-blur-sm border border-pastel-blue-100 rounded-xl overflow-hidden hover:shadow-soft-lg hover:scale-[1.02] transition-all duration-300"
          >
            {/* サムネイル画像 */}
            <div className="relative w-full h-64 bg-gradient-to-br from-blue-100 to-blue-50">
              {concert.thumbnail ? (
                <Image
                  src={concert.thumbnail}
                  alt={concert.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-center text-gray-400">
                    <svg
                      className="w-16 h-16 mx-auto mb-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
                      />
                    </svg>
                    <p className="text-sm">ポスター・パンフレット</p>
                  </div>
                </div>
              )}
            </div>

            {/* コンテンツ */}
            <div className="p-6">
              <p className="text-sm text-gray-500 mb-2">{concert.date}</p>
              <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-pastel-blue-600 transition-colors">
                {concert.title}
              </h3>
              <p className="text-sm text-gray-600 mb-3">{concert.location}</p>
              {concert.award && (
                <span className="inline-block px-3 py-1 bg-yellow-100 text-yellow-800 text-xs font-semibold rounded-full">
                  {concert.award}
                </span>
              )}
            </div>
          </Link>
          ))
        ) : (
          <div className="col-span-3 text-center py-12 text-gray-500">
            演奏会情報がありません
          </div>
        )}
      </div>

    </div>
  );
}
