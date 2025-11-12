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
      <section className="bg-gradient-to-br from-pastel-blue-50 to-white border border-pastel-blue-200 rounded-lg p-8 md:p-12">
        <div className="flex items-center gap-3 mb-6">
          <Lock className="w-6 h-6 text-pastel-blue-600" />
          <h2 className="text-3xl font-bold text-gray-900">団員の方へ</h2>
        </div>

        {isAuthenticated ? (
          <div className="space-y-6">
            <p className="text-gray-700 leading-relaxed">
              ログイン済みです。ニュースや演奏会情報を編集できます。
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/admin/news"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-pastel-blue-500 text-white rounded-lg hover:bg-pastel-blue-600 transition-colors font-medium shadow-sm"
              >
                <Edit2 className="w-5 h-5" />
                ニュースを編集
              </Link>
              <Link
                href="/admin/concerts"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-pastel-blue-500 text-white rounded-lg hover:bg-pastel-blue-600 transition-colors font-medium shadow-sm"
              >
                <Edit2 className="w-5 h-5" />
                演奏会史を編集
              </Link>
              <button
                onClick={logout}
                className="px-6 py-3 bg-white text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              >
                ログアウト
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <p className="text-gray-700 leading-relaxed">
              団員の方はログインすることで、ニュースや演奏会情報の追加・編集ができます。
            </p>
            <button
              onClick={() => setIsLoginModalOpen(true)}
              className="inline-flex items-center gap-2 px-6 py-3 bg-pastel-blue-500 text-white rounded-lg hover:bg-pastel-blue-600 transition-colors font-medium shadow-sm"
            >
              <Lock className="w-5 h-5" />
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
