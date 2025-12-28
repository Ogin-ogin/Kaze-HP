'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface EditableImageProps {
  page: string;
  section: string;
  field: string;
  defaultImageUrl?: string;
  placeholderText: string;
  className?: string;
  isEditMode: boolean;
}

export default function EditableImage({
  page,
  section,
  field,
  defaultImageUrl = '',
  placeholderText,
  className = '',
  isEditMode,
}: EditableImageProps) {
  const [imageUrl, setImageUrl] = useState(defaultImageUrl);
  const [isUploading, setIsUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(defaultImageUrl);

  useEffect(() => {
    // ページコンテンツをAPIから取得
    const fetchContent = async () => {
      try {
        const response = await fetch(`/api/page-contents?page=${page}`);
        if (response.ok) {
          const contents = await response.json();
          const content = contents.find(
            (c: any) => c.section === section && c.field === field
          );
          if (content && content.value) {
            setImageUrl(content.value);
            setPreviewUrl(content.value);
          }
        }
      } catch (error) {
        console.error('コンテンツ取得エラー:', error);
      }
    };
    fetchContent();
  }, [page, section, field]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // プレビュー表示
    const reader = new FileReader();
    reader.onloadend = () => setPreviewUrl(reader.result as string);
    reader.readAsDataURL(file);

    setIsUploading(true);
    try {
      // 画像をGoogle Driveにアップロード
      const formData = new FormData();
      formData.append('file', file);

      const uploadResponse = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!uploadResponse.ok) throw new Error('アップロードに失敗しました');

      const { url } = await uploadResponse.json();

      // ページコンテンツを更新
      const updateResponse = await fetch('/api/page-contents/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ page, section, field, value: url }),
      });

      if (updateResponse.ok) {
        setImageUrl(url);
        alert('画像を更新しました');
      } else {
        throw new Error('更新に失敗しました');
      }
    } catch (error) {
      alert('画像のアップロードに失敗しました');
      setPreviewUrl(imageUrl);
      console.error('アップロードエラー:', error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className={`relative group ${className}`}>
      {previewUrl ? (
        <div className="relative w-full h-full">
          <Image
            src={previewUrl}
            alt={placeholderText}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
        </div>
      ) : (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center px-8">
            <p className="text-gray-400 text-base mb-2">{placeholderText}</p>
            {isEditMode && (
              <p className="text-gray-300 text-sm">編集モードで画像をアップロードできます</p>
            )}
          </div>
        </div>
      )}

      {isEditMode && (
        <div className="absolute top-4 right-4">
          <label className="cursor-pointer inline-flex items-center px-4 py-2 bg-pastel-blue-500 text-white text-sm rounded-lg hover:bg-pastel-blue-600 shadow-lg">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              disabled={isUploading}
              className="hidden"
            />
            <span>{isUploading ? 'アップロード中...' : '画像を変更'}</span>
          </label>
        </div>
      )}
    </div>
  );
}
