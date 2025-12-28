'use client';

import { useState, useEffect } from 'react';

interface EditableImageWithUrlProps {
  page: string;
  section: string;
  field: string;
  defaultImageUrl?: string;
  placeholderText: string;
  className?: string;
  isEditMode: boolean;
}

export default function EditableImageWithUrl({
  page,
  section,
  field,
  defaultImageUrl = '',
  placeholderText,
  className = '',
  isEditMode,
}: EditableImageWithUrlProps) {
  const [imageUrl, setImageUrl] = useState(defaultImageUrl);
  const [isUploading, setIsUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(defaultImageUrl);
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [urlInput, setUrlInput] = useState('');

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
      // 画像をCloudinary/Google Driveにアップロード
      const formData = new FormData();
      formData.append('file', file);

      const uploadResponse = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!uploadResponse.ok) {
        const error = await uploadResponse.json();
        throw new Error(error.error || 'アップロードに失敗しました');
      }

      const { url } = await uploadResponse.json();

      // ページコンテンツを更新
      const updateResponse = await fetch('/api/page-contents/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ page, section, field, value: url }),
      });

      if (updateResponse.ok) {
        setImageUrl(url);
        setPreviewUrl(url); // キャッシュバスティングのため再設定
        alert('画像を更新しました');
        // ページをリロードして確実に最新画像を表示
        window.location.reload();
      } else {
        throw new Error('更新に失敗しました');
      }
    } catch (error: any) {
      alert(`画像のアップロードに失敗しました: ${error.message}\n\n代わりにURLを直接入力してください。`);
      setPreviewUrl(imageUrl);
      setShowUrlInput(true);
      console.error('アップロードエラー:', error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleUrlSubmit = async () => {
    if (!urlInput.trim()) {
      alert('URLを入力してください');
      return;
    }

    setIsUploading(true);
    try {
      const updateResponse = await fetch('/api/page-contents/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ page, section, field, value: urlInput }),
      });

      if (updateResponse.ok) {
        setImageUrl(urlInput);
        setPreviewUrl(urlInput);
        setShowUrlInput(false);
        setUrlInput('');
        alert('画像URLを更新しました');
        // ページをリロードして確実に最新画像を表示
        window.location.reload();
      } else {
        throw new Error('更新に失敗しました');
      }
    } catch (error) {
      alert('画像URLの更新に失敗しました');
      console.error('URL更新エラー:', error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className={`relative group ${className}`}>
      {previewUrl ? (
        <div className="relative w-full h-full overflow-hidden">
          <img
            src={previewUrl}
            alt={placeholderText}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
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
        <div className="absolute top-4 right-4 flex flex-col gap-2">
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
          <button
            onClick={() => setShowUrlInput(!showUrlInput)}
            className="px-4 py-2 bg-white text-pastel-blue-500 text-sm rounded-lg hover:bg-gray-50 shadow-lg"
          >
            URLで指定
          </button>
        </div>
      )}

      {isEditMode && showUrlInput && (
        <div className="absolute bottom-4 left-4 right-4 bg-white p-4 rounded-lg shadow-xl">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            画像URL
          </label>
          <input
            type="url"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            placeholder="https://example.com/image.jpg"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pastel-blue-500 focus:border-transparent mb-2"
          />
          <div className="flex gap-2">
            <button
              onClick={handleUrlSubmit}
              disabled={isUploading}
              className="px-4 py-2 bg-pastel-blue-500 text-white text-sm rounded-lg hover:bg-pastel-blue-600 disabled:opacity-50"
            >
              {isUploading ? '保存中...' : '保存'}
            </button>
            <button
              onClick={() => {
                setShowUrlInput(false);
                setUrlInput('');
              }}
              className="px-4 py-2 bg-gray-200 text-gray-700 text-sm rounded-lg hover:bg-gray-300"
            >
              キャンセル
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
