'use client';

import Link from 'next/link';
import { useEditMode } from '@/contexts/EditModeContext';
import EditableText from '../EditableText';
import { useState, useEffect } from 'react';

export default function HeroSection() {
  const { isEditMode } = useEditMode();
  const [backgroundImage, setBackgroundImage] = useState<string>('');
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [urlInput, setUrlInput] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    // 背景画像URLを取得
    const fetchBackgroundImage = async () => {
      try {
        const response = await fetch('/api/page-contents?page=home');
        if (response.ok) {
          const contents = await response.json();
          const bgContent = contents.find(
            (c: any) => c.section === 'hero' && c.field === 'background'
          );
          if (bgContent && bgContent.value) {
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
      // 画像をGoogle Driveにアップロード
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
        body: JSON.stringify({ page: 'home', section: 'hero', field: 'background', value: url }),
      });

      if (updateResponse.ok) {
        setBackgroundImage(url);
        alert('背景画像を更新しました');
        // ページをリロードして確実に最新画像を表示
        window.location.reload();
      } else {
        throw new Error('更新に失敗しました');
      }
    } catch (error: any) {
      const errorMessage = error.message || '画像のアップロードに失敗しました';
      alert(`${errorMessage}\n\n「URLで指定」ボタンをクリックして、画像のURLを直接入力してください。\n\n例: https://example.com/image.jpg`);
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
        body: JSON.stringify({ page: 'home', section: 'hero', field: 'background', value: urlInput }),
      });

      if (updateResponse.ok) {
        setBackgroundImage(urlInput);
        setShowUrlInput(false);
        setUrlInput('');
        alert('背景画像を更新しました');
        // ページをリロードして確実に最新画像を表示
        window.location.reload();
      } else {
        throw new Error('更新に失敗しました');
      }
    } catch (error) {
      alert('背景画像の更新に失敗しました');
      console.error('URL更新エラー:', error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <section className="relative h-[700px] overflow-hidden">
      {/* 背景画像レイヤー */}
      <div className="absolute inset-0 bg-gradient-to-br from-pastel-blue-100 via-white to-pastel-blue-50">
        {backgroundImage && (
          <div
            className="absolute inset-0 bg-cover bg-center opacity-30"
            style={{ backgroundImage: `url(${backgroundImage})` }}
          />
        )}
        {/* 編集可能な背景画像（編集モード時のみ表示） */}
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
                      body: JSON.stringify({ page: 'home', section: 'hero', field: 'background', value: '' }),
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
                onClick={() => {
                  setShowUrlInput(false);
                  setUrlInput('');
                }}
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
        <div className="text-center max-w-5xl px-4">
          <EditableText
            page="home"
            section="hero"
            field="title"
            defaultValue="女声コーラス 風"
            className="text-6xl md:text-7xl lg:text-8xl font-semibold text-[#1d1d1f] mb-8 tracking-tight"
            as="h1"
            isEditMode={isEditMode}
          />
          <EditableText
            page="home"
            section="hero"
            field="subtitle"
            defaultValue="心を込めて歌を届ける。\nそれが私たちの願いです。"
            className="text-2xl md:text-3xl text-gray-600 mb-12 leading-relaxed font-light"
            as="p"
            isEditMode={isEditMode}
            multiline
          />
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/recruitment"
              className="btn-apple-primary inline-block"
            >
              団員募集中
            </Link>
            <Link
              href="/about"
              className="btn-apple-secondary inline-block"
            >
              詳しく見る
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
