'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);

  const instagramUrl = process.env.NEXT_PUBLIC_INSTAGRAM_URL || 'https://instagram.com';
  const blogUrl = process.env.NEXT_PUBLIC_BLOG_URL || 'https://blog.example.com';

  const mainNavigation = [
    { name: 'ホーム', href: '/' },
    { name: '団員募集', href: '/recruitment' },
    { name: 'お問い合わせ', href: '/contact' },
  ];

  const aboutDropdown = [
    { name: '団体紹介', href: '/about' },
    { name: '指導者紹介', href: '/instructors' },
    { name: '活動実績', href: '/history' },
    { name: '演奏会史', href: '/concerts' },
    { name: 'スケジュール', href: '/schedule' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/98 backdrop-blur-md border-b border-gray-200">
      <nav className="max-w-[980px] mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center h-11">
          {/* ロゴ */}
          <Link href="/" className="flex items-center">
            <span className="text-xl font-medium text-[#1d1d1f]">女声コーラス 風</span>
          </Link>

          {/* デスクトップナビゲーション */}
          <div className="hidden lg:flex items-center space-x-8">
            {mainNavigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-normal text-[#1d1d1f] hover:text-[#06c] transition-colors"
              >
                {item.name}
              </Link>
            ))}

            {/* 「私たちについて」ドロップダウン */}
            <div
              className="relative group"
              onMouseEnter={() => setIsAboutOpen(true)}
              onMouseLeave={() => setIsAboutOpen(false)}
            >
              <button className="text-sm font-normal text-[#1d1d1f] hover:text-[#06c] transition-colors flex items-center py-2">
                私たちについて
                <ChevronDown className="w-3.5 h-3.5 ml-1" />
              </button>

              {isAboutOpen && (
                <div className="absolute top-full left-0 pt-2">
                  <div className="w-48 bg-white rounded-lg shadow-lg border border-gray-100 py-2">
                    {aboutDropdown.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="block px-4 py-2 text-sm text-[#1d1d1f] hover:bg-gray-50 transition-colors"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* 外部リンク */}
            <a
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-[#06c] hover:underline"
            >
              Instagram
            </a>
            <a
              href={blogUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-[#06c] hover:underline"
            >
              ブログ
            </a>
          </div>

          {/* モバイルメニューボタン */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 text-[#1d1d1f]"
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* モバイルナビゲーション */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 space-y-1 border-t border-gray-100 mt-2">
            {mainNavigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block px-3 py-2 text-sm text-[#1d1d1f]"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <div className="pt-2 mt-2 border-t border-gray-100">
              <p className="px-3 py-1 text-xs font-medium text-gray-500">私たちについて</p>
              {aboutDropdown.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block px-3 py-2 text-sm text-[#1d1d1f] pl-6"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
            <div className="pt-2 mt-2 border-t border-gray-100 space-y-1">
              <a
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block px-3 py-2 text-sm text-[#06c]"
              >
                Instagram
              </a>
              <a
                href={blogUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block px-3 py-2 text-sm text-[#06c]"
              >
                ブログ
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
