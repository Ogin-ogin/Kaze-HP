import Link from 'next/link';

interface NewsCardProps {
  id: string;
  title: string;
  thumbnail: string;
  date: string;
}

export default function NewsCard({ id, title, thumbnail, date }: NewsCardProps) {
  return (
    <Link href={`/news/${id}`} className="group block card-apple">
      {/* サムネイル画像 */}
      <div className="relative w-full h-56 bg-pastel-blue-50 overflow-hidden">
        {thumbnail ? (
          <img
            src={thumbnail}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
            style={{ willChange: 'transform' }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
            画像なし
          </div>
        )}
      </div>

      {/* コンテンツ */}
      <div className="p-5">
        <p className="text-sm text-gray-500 mb-2 font-light">{date}</p>
        <h3 className="text-xl font-semibold text-[#1d1d1f] line-clamp-2 group-hover:text-[#06c] transition-colors duration-300">
          {title}
        </h3>
      </div>
    </Link>
  );
}
