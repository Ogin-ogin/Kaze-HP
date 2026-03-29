'use client';

import { useAuth } from '@/contexts/AuthContext';
import Link from 'next/link';
import { Settings } from 'lucide-react';

interface AdminLinkProps {
  href: string;
  label?: string;
}

export default function AdminLink({ href, label = '編集・追加' }: AdminLinkProps) {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) return null;

  return (
    <Link
      href={href}
      className="flex items-center gap-2 px-4 py-2 bg-pastel-blue-500 text-white rounded-lg hover:bg-pastel-blue-600 transition-colors text-sm font-medium"
    >
      <Settings className="w-4 h-4" />
      {label}
    </Link>
  );
}
