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
      <div className="bg-white rounded-2xl overflow-hidden shadow-soft hover:shadow-apple transition-all duration-200">
        {/* サムネイル画像 */}
        <div className="relative w-full h-48 bg-pastel-blue-50">
          {thumbnail ? (
            <Image
              src={thumbnail}
              alt={title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              No Image
            </div>
          )}
        </div>

        {/* コンテンツ */}
        <div className="p-6">
          <p className="text-xs text-gray-400 mb-3 uppercase tracking-wide">{date}</p>
          <h3 className="text-lg font-semibold text-gray-900 line-clamp-2 group-hover:text-gray-600 transition-colors">
            {title}
          </h3>
        </div>
      </div>
    </Link>
  );
}
