import Link from 'next/link';
import Image from 'next/image';

interface NewsCardProps {
  id: string;
  title: string;
  thumbnail: string;
  date: string;
}

export default function NewsCard({ id, title, thumbnail, date }: NewsCardProps) {
  return (
    <Link href={`/news/${id}`} className="group block">
      {/* サムネイル画像 */}
      <div className="relative w-full h-56 bg-pastel-blue-50 rounded-2xl overflow-hidden mb-4">
        {thumbnail ? (
          <Image
            src={thumbnail}
            alt={title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
            画像なし
          </div>
        )}
      </div>

      {/* コンテンツ */}
      <div>
        <p className="text-sm text-gray-500 mb-2">{date}</p>
        <h3 className="text-xl font-semibold text-[#1d1d1f] line-clamp-2 group-hover:text-pastel-blue-600 transition-colors">
          {title}
        </h3>
      </div>
    </Link>
  );
}
