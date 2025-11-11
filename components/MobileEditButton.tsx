'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import LoginModal from './LoginModal';
import Link from 'next/link';

interface MobileEditButtonProps {
  onMenuClose: () => void;
}

export default function MobileEditButton({ onMenuClose }: MobileEditButtonProps) {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const { isAuthenticated, logout } = useAuth();

  if (isAuthenticated) {
    return (
      <>
        <Link
          href="/admin/news"
          className="block px-3 py-2 text-base text-pastel-blue-700 hover:bg-pastel-blue-50 rounded-md font-medium"
          onClick={onMenuClose}
        >
          編集画面
        </Link>
        <button
          onClick={() => {
            logout();
            onMenuClose();
          }}
          className="block w-full text-left px-3 py-2 text-base text-gray-700 hover:bg-gray-50 rounded-md"
        >
          ログアウト
        </button>
      </>
    );
  }

  return (
    <>
      <button
        onClick={() => setIsLoginModalOpen(true)}
        className="block w-full text-left px-3 py-2 text-base text-pastel-blue-700 hover:bg-pastel-blue-50 rounded-md font-medium"
      >
        編集者ログイン
      </button>
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => {
          setIsLoginModalOpen(false);
          onMenuClose();
        }}
      />
    </>
  );
}
