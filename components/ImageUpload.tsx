'use client';

import { useState } from 'react';
import Image from 'next/image';

interface ImageUploadProps {
  currentImageUrl?: string;
  onImageUploaded: (url: string) => void;
  label?: string;
}

export default function ImageUpload({
  currentImageUrl,
  onImageUploaded,
  label = '画像を選択'
}: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(currentImageUrl || null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // プレビュー表示
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl(reader.result as string);
    };
    reader.readAsDataURL(file);

    // アップロード
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'アップロードに失敗しました');
      }

      const data = await response.json();
      onImageUploaded(data.url);
      alert('画像をアップロードしました');
    } catch (error) {
      console.error('アップロードエラー:', error);
      alert(error instanceof Error ? error.message : 'アップロードに失敗しました');
      setPreviewUrl(currentImageUrl || null);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
        <div className="flex items-center gap-4">
          <label className="cursor-pointer inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              disabled={uploading}
              className="hidden"
            />
            <span className="text-sm text-gray-700">
              {uploading ? 'アップロード中...' : 'ファイルを選択'}
            </span>
          </label>
          {uploading && (
            <div className="text-sm text-gray-500">アップロード中...</div>
          )}
        </div>
      </div>

      {previewUrl && (
        <div className="relative w-full max-w-md h-48 bg-gray-100 rounded-lg overflow-hidden">
          <Image
            src={previewUrl}
            alt="プレビュー"
            fill
            className="object-cover"
          />
        </div>
      )}

      <p className="text-xs text-gray-500">
        JPG, PNG, GIF形式（10MB以下）
      </p>
    </div>
  );
}
