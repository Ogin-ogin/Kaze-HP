import Link from 'next/link';
import Image from 'next/image';

// サンプル演奏会データ（後でGoogle Sheetsから取得）
const concerts = [
  {
    id: '48',
    title: '第48回おかあさんコーラス全国大会',
    date: '2025年8月',
    location: '山形県民やまぎんホール',
    thumbnail: '',
    award: 'ひまわり賞受賞',
  },
  {
    id: '47',
    title: 'おかあさんコーラス九州大会',
    date: '2025年6月',
    location: '鹿児島県民ホール',
    thumbnail: '',
    award: '篤姫賞受賞',
  },
  {
    id: '46',
    title: 'レディースコーラスフェスティバル',
    date: '2025年3月',
    location: '響ホール',
    thumbnail: '',
  },
  {
    id: '45',
    title: 'おかあさんコーラス九州大会',
    date: '2024年6月',
    location: '沖縄コンベンションセンター',
    thumbnail: '',
    award: '選考委員奨励賞受賞',
  },
  {
    id: '44',
    title: 'レディースコーラスフェスティバル',
    date: '2024年3月',
    location: '戸畑市民会館',
    thumbnail: '',
  },
  {
    id: '43',
    title: 'おかあさんコーラス九州大会',
    date: '2023年6月',
    location: '佐賀市文化会館',
    thumbnail: '',
    award: 'バルーン賞受賞',
  },
];

export default function ConcertsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">風の演奏会史</h1>
      <p className="text-lg text-gray-600 mb-12">
        これまでの演奏会やコンサートの記録をご覧いただけます
      </p>

      {/* ギャラリービュー */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {concerts.map((concert) => (
          <Link
            key={concert.id}
            href={`/concerts/${concert.id}`}
            className="group bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-xl transition-all"
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
        ))}
      </div>

      {/* 設定ガイド */}
      <div className="mt-16 bg-pastel-blue-50 p-8 rounded-lg border-l-4 border-pastel-blue-500">
        <h2 className="text-xl font-bold text-gray-900 mb-4">演奏会情報の追加方法</h2>
        <p className="text-gray-700 mb-4">
          演奏会情報はGoogle Sheetsで管理し、パンフレットやポスターの画像はGoogle Driveに保存します。
        </p>
        <div className="bg-white p-6 rounded-lg">
          <h3 className="font-semibold text-gray-900 mb-3">Google Sheetsの列構成：</h3>
          <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
            <li>ID（演奏会の識別番号）</li>
            <li>タイトル（演奏会名）</li>
            <li>日付（YYYY年M月形式）</li>
            <li>場所（会場名）</li>
            <li>サムネイル画像URL（Google DriveのPublic URL）</li>
            <li>受賞（あれば）</li>
            <li>詳細（演奏曲目、写真など）</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
