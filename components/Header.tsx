'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import EditButton from './EditButton';
import MobileEditButton from './MobileEditButton';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const instagramUrl = process.env.NEXT_PUBLIC_INSTAGRAM_URL || 'https://instagram.com';
  const blogUrl = process.env.NEXT_PUBLIC_BLOG_URL || 'https://blog.example.com';

  const navigation = [
    { name: 'ホーム', href: '/' },
    { name: '団体紹介', href: '/about' },
    { name: '指導者紹介', href: '/instructors' },
    { name: '活動実績', href: '/history' },
    { name: '演奏会史', href: '/concerts' },
    { name: 'スケジュール', href: '/schedule' },
    { name: '団員募集', href: '/recruitment' },
    { name: 'お問い合わせ', href: '/contact' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-pastel-blue-100 shadow-soft">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* ロゴ */}
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-gray-900">女声コーラス 風</span>
          </Link>

          {/* デスクトップナビゲーション */}
          <div className="hidden lg:flex items-center space-x-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="px-3 py-2 text-sm text-gray-700 hover:bg-pastel-blue-50 hover:text-pastel-blue-700 rounded-md transition-colors"
              >
                {item.name}
              </Link>
            ))}

            {/* 外部リンク */}
            <div className="flex items-center space-x-2 ml-4 pl-4 border-l border-gray-200">
              <a
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-gray-600 hover:text-pink-600 transition-colors"
                aria-label="Instagram"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a
                href={blogUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-2 text-sm text-gray-700 hover:bg-pastel-blue-50 hover:text-pastel-blue-700 rounded-md transition-colors"
              >
                ブログ
              </a>
              <EditButton />
            </div>
          </div>

          {/* モバイルメニューボタン */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-md"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* モバイルナビゲーション */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block px-3 py-2 text-base text-gray-700 hover:bg-gray-100 rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <div className="pt-4 mt-4 border-t border-gray-200 space-y-2">
              <a
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block px-3 py-2 text-base text-gray-700 hover:bg-pastel-blue-50 rounded-md"
              >
                Instagram
              </a>
              <a
                href={blogUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block px-3 py-2 text-base text-gray-700 hover:bg-pastel-blue-50 rounded-md"
              >
                ブログ
              </a>
              <div className="pt-4 mt-4 border-t border-gray-200">
                <MobileEditButton onMenuClose={() => setIsMenuOpen(false)} />
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
