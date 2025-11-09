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
    <Link href={`/news/${id}`} className="group">
      <div className="bg-white rounded-lg overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow">
        {/* サムネイル画像 */}
        <div className="relative w-full h-48 bg-gray-100">
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
        <div className="p-4">
          <p className="text-xs text-gray-500 mb-2">{date}</p>
          <h3 className="text-base font-medium text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors">
            {title}
          </h3>
        </div>
      </div>
    </Link>
  );
}
