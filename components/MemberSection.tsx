'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useState } from 'react';
import Link from 'next/link';
import LoginModal from './LoginModal';
import { Lock, Edit2 } from 'lucide-react';

export default function MemberSection() {
  const { isAuthenticated, logout } = useAuth();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  return (
    <>
      <section className="bg-white rounded-3xl p-12 md:p-16 shadow-apple">
        <div className="mb-8">
          <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 tracking-tight mb-3">団員の方へ</h2>
          <div className="w-12 h-1 bg-gradient-to-r from-pastel-blue-500 to-pastel-blue-300 rounded-full"></div>
        </div>

        {isAuthenticated ? (
          <div className="space-y-8">
            <p className="text-lg text-gray-600 leading-relaxed">
              ログイン済みです。ニュースや演奏会情報を編集できます。
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <Link
                href="/admin/news"
                className="px-6 py-4 bg-gray-900 text-white text-center rounded-full hover:bg-gray-800 transition-all duration-200 font-medium"
              >
                ニュースを編集
              </Link>
              <Link
                href="/admin/concerts"
                className="px-6 py-4 bg-gray-900 text-white text-center rounded-full hover:bg-gray-800 transition-all duration-200 font-medium"
              >
                演奏会史を編集
              </Link>
              <Link
                href="/admin/history"
                className="px-6 py-4 bg-gray-900 text-white text-center rounded-full hover:bg-gray-800 transition-all duration-200 font-medium"
              >
                活動実績を編集
              </Link>
            </div>
            <div className="pt-6 border-t border-gray-100">
              <button
                onClick={logout}
                className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
              >
                ログアウト
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            <p className="text-lg text-gray-600 leading-relaxed">
              団員の方はログインすることで、ニュースや演奏会情報の追加・編集ができます。
            </p>
            <button
              onClick={() => setIsLoginModalOpen(true)}
              className="px-8 py-4 bg-gray-900 text-white rounded-full hover:bg-gray-800 transition-all duration-200 font-medium"
            >
              団員ログイン
            </button>
          </div>
        )}
      </section>

      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />
    </>
  );
}
