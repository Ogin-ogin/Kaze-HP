'use client';

export default function Footer() {
  const instagramUrl = process.env.NEXT_PUBLIC_INSTAGRAM_URL || 'https://instagram.com';
  const blogUrl = process.env.NEXT_PUBLIC_BLOG_URL || 'https://blog.example.com';

  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* 団体情報 */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">女声コーラス 風</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              心を込めて歌を届ける。<br />
              それが私たちの願いです。
            </p>
          </div>

          {/* 練習情報 */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">練習日時</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              毎週木曜日 10:00-13:00<br />
              北九州市八幡西区黒崎「コムシティ」ほか
            </p>
          </div>

          {/* リンク */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">リンク</h3>
            <div className="space-y-2">
              <a
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-sm text-gray-600 hover:text-pastel-blue-600 transition-colors"
              >
                Instagram
              </a>
              <a
                href={blogUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-sm text-gray-600 hover:text-pastel-blue-600 transition-colors"
              >
                ブログ
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-500 text-center">
            &copy; {new Date().getFullYear()} 女声コーラス 風. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
