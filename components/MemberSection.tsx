'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useEditMode } from '@/contexts/EditModeContext';
import { useState } from 'react';
import Link from 'next/link';
import LoginModal from './LoginModal';
import { Lock, Edit2 } from 'lucide-react';

export default function MemberSection() {
  const { isAuthenticated, logout } = useAuth();
  const { isEditMode, setIsEditMode } = useEditMode();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  return (
    <>
      <section className="bg-white rounded-3xl p-12 md:p-16">
        <div className="mb-8">
          <h2 className="text-4xl font-semibold text-[#1d1d1f] tracking-tight mb-3">団員の方へ</h2>
          <div className="w-12 h-1 bg-gradient-to-r from-pastel-blue-500 to-pastel-blue-300 rounded-full"></div>
        </div>

        {isAuthenticated ? (
          <div className="space-y-8">
            <p className="text-lg text-gray-600 leading-relaxed">
              ログイン済みです。ページコンテンツを直接編集できます。
            </p>

            {/* 編集モード切り替え */}
            <div className="bg-gray-50 rounded-2xl p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-[#1d1d1f] mb-1">ページ編集モード</h3>
                  <p className="text-sm text-gray-600">すべてのテキストと画像を直接編集できます</p>
                </div>
                <button
                  onClick={() => setIsEditMode(!isEditMode)}
                  className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors ${
                    isEditMode ? 'bg-pastel-blue-500' : 'bg-gray-300'
                  }`}
                >
                  <span
                    className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                      isEditMode ? 'translate-x-7' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Link
                href="/admin/news"
                className="btn-apple-secondary text-center"
              >
                ニュースを編集
              </Link>
              <Link
                href="/admin/concerts"
                className="btn-apple-secondary text-center"
              >
                演奏会史を編集
              </Link>
              <Link
                href="/admin/history"
                className="btn-apple-secondary text-center"
              >
                活動実績を編集
              </Link>
            </div>
            <div className="pt-6 border-t border-gray-100">
              <button
                onClick={logout}
                className="text-sm text-gray-500 hover:text-[#06c] transition-colors"
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
              className="btn-apple-primary"
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
