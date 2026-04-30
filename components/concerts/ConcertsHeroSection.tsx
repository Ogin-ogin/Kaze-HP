'use client';

import { useEditMode } from '@/contexts/EditModeContext';
import { useState, useEffect } from 'react';

export default function ConcertsHeroSection() {
  const { isEditMode } = useEditMode();
  const [backgroundImage, setBackgroundImage] = useState<string>('');
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [urlInput, setUrlInput] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    const fetchBackgroundImage = async () => {
      try {
        const response = await fetch('/api/page-contents?page=concerts');
        if (response.ok) {
          const contents = await response.json();
          const bgContent = contents.find(
            (c: { section: string; field: string; value: string }) =>
              c.section === 'hero' && c.field === 'background'
          );
          if (bgContent?.value) {
            setBackgroundImage(bgContent.value);
          }
        }
      } catch (error) {
        console.error('背景画像取得エラー:', error);
      }
    };
    fetchBackgroundImage();
  }, []);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
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

      const updateResponse = await fetch('/api/page-contents/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ page: 'concerts', section: 'hero', field: 'background', value: url }),
      });

      if (updateResponse.ok) {
        setBackgroundImage(url);
        alert('背景画像を更新しました');
        window.location.reload();
      } else {
        throw new Error('更新に失敗しました');
      }
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : '画像のアップロードに失敗しました';
      alert(`${message}\n\n「URLで指定」ボタンをクリックして、画像のURLを直接入力してください。`);
      setShowUrlInput(true);
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
        body: JSON.stringify({ page: 'concerts', section: 'hero', field: 'background', value: urlInput }),
      });

      if (updateResponse.ok) {
        setBackgroundImage(urlInput);
        setShowUrlInput(false);
        setUrlInput('');
        alert('背景画像を更新しました');
        window.location.reload();
      } else {
        throw new Error('更新に失敗しました');
      }
    } catch {
      alert('背景画像の更新に失敗しました');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <section className="relative h-[500px] overflow-hidden">
      {/* 背景画像レイヤー */}
      <div className="absolute inset-0 bg-gradient-to-br from-pastel-blue-100 to-white">
        {backgroundImage && (
          <div
            className="absolute inset-0 bg-cover bg-center opacity-30"
            style={{ backgroundImage: `url(${backgroundImage})` }}
          />
        )}

        {/* 編集モード時の背景画像コントロール */}
        {isEditMode && (
          <div className="absolute top-4 right-4 z-30 flex flex-col gap-2">
            <label className="cursor-pointer inline-flex items-center px-4 py-2 bg-white text-pastel-blue-500 text-sm font-medium rounded-lg hover:bg-gray-50 shadow-lg transition-all">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                disabled={isUploading}
                className="hidden"
              />
              <span>{isUploading ? 'アップロード中...' : '背景画像を変更'}</span>
            </label>
            <button
              onClick={() => setShowUrlInput(!showUrlInput)}
              className="px-4 py-2 bg-white text-pastel-blue-500 text-sm font-medium rounded-lg hover:bg-gray-50 shadow-lg transition-all"
            >
              URLで指定
            </button>
            {backgroundImage && (
              <button
                onClick={async () => {
                  if (confirm('背景画像を削除しますか？')) {
                    await fetch('/api/page-contents/update', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({ page: 'concerts', section: 'hero', field: 'background', value: '' }),
                    });
                    setBackgroundImage('');
                    alert('背景画像を削除しました');
                  }
                }}
                className="px-4 py-2 bg-red-500 text-white text-sm font-medium rounded-lg hover:bg-red-600 shadow-lg transition-all"
              >
                背景画像を削除
              </button>
            )}
          </div>
        )}

        {/* URL入力パネル */}
        {isEditMode && showUrlInput && (
          <div className="absolute top-4 left-4 right-4 max-w-md z-40 bg-white p-4 rounded-lg shadow-xl">
            <h3 className="text-sm font-semibold text-gray-700 mb-3">背景画像のURLを入力</h3>
            <input
              type="url"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              placeholder="https://example.com/image.jpg"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pastel-blue-500 focus:border-transparent mb-3"
            />
            <div className="flex gap-2">
              <button
                onClick={handleUrlSubmit}
                disabled={isUploading}
                className="px-4 py-2 bg-pastel-blue-500 text-white text-sm font-medium rounded-lg hover:bg-pastel-blue-600 disabled:opacity-50 transition-all"
              >
                {isUploading ? '保存中...' : '保存'}
              </button>
              <button
                onClick={() => { setShowUrlInput(false); setUrlInput(''); }}
                className="px-4 py-2 bg-gray-200 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-300 transition-all"
              >
                キャンセル
              </button>
            </div>
          </div>
        )}
      </div>

      {/* コンテンツレイヤー */}
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <div className="text-center max-w-3xl px-4">
          <h1 className="text-5xl md:text-6xl font-semibold text-[#1d1d1f] mb-6 tracking-tight">
            風の演奏会史
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 font-light">
            これまでの演奏会やコンサートの記録
          </p>
        </div>
      </div>
    </section>
  );
}
