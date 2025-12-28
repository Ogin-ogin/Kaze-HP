'use client';

import Link from 'next/link';
import { useEditMode } from '@/contexts/EditModeContext';
import EditableText from '../EditableText';
import EditableImageWithUrl from '../EditableImageWithUrl';
import { useState, useEffect } from 'react';

export default function HeroSection() {
  const { isEditMode } = useEditMode();
  const [backgroundImage, setBackgroundImage] = useState<string>('');

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
          <div className="absolute top-4 left-4 z-10 bg-white p-2 rounded-lg shadow-lg">
            <p className="text-xs text-gray-600 mb-2">背景画像を設定</p>
            <EditableImageWithUrl
              page="home"
              section="hero"
              field="background"
              placeholderText="背景画像"
              className="w-32 h-20 bg-gray-100 rounded"
              isEditMode={isEditMode}
            />
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
