'use client';

import Link from 'next/link';
import { useEditMode } from '@/contexts/EditModeContext';
import EditableText from '../EditableText';
import EditableImageWithUrl from '../EditableImageWithUrl';

export default function AboutSection() {
  const { isEditMode } = useEditMode();

  return (
    <>
      {/* 団体紹介セクション（写真付き） */}
      <section className="bg-white py-24">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* 写真 */}
            <div className="relative h-[500px] bg-gradient-to-br from-pastel-blue-100 to-pastel-blue-50 rounded-3xl overflow-hidden group">
              <EditableImageWithUrl
                page="home"
                section="about"
                field="image1"
                placeholderText="合唱の様子の写真"
                className="w-full h-full"
                isEditMode={isEditMode}
              />
            </div>

            {/* テキスト */}
            <div>
              <EditableText
                page="home"
                section="about"
                field="title"
                defaultValue="私たちについて"
                className="text-4xl md:text-5xl font-semibold text-[#1d1d1f] mb-8 tracking-tight"
                as="h2"
                isEditMode={isEditMode}
              />
              <EditableText
                page="home"
                section="about"
                field="poem"
                defaultValue="やさしいうた声は 大きな思いやりに\n楽しいうた声は おおきな喜びに\nそして ちいさなうた声は 大きなハーモニーに"
                className="text-2xl text-[#1d1d1f] leading-relaxed font-light mb-6"
                as="p"
                isEditMode={isEditMode}
                multiline
              />
              <EditableText
                page="home"
                section="about"
                field="description"
                defaultValue="私たちはたくさんの仲間を待っています"
                className="text-xl text-gray-600 mb-10 leading-relaxed"
                as="p"
                isEditMode={isEditMode}
              />
              <Link
                href="/about"
                className="btn-apple-primary inline-block"
              >
                詳しく見る
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 練習風景セクション */}
      <section className="bg-gray-50 py-24">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* テキスト（左側） */}
            <div className="order-2 lg:order-1">
              <EditableText
                page="home"
                section="practice"
                field="title"
                defaultValue="心を込めた練習"
                className="text-4xl md:text-5xl font-semibold text-[#1d1d1f] mb-8 tracking-tight"
                as="h2"
                isEditMode={isEditMode}
              />
              <EditableText
                page="home"
                section="practice"
                field="description1"
                defaultValue="毎週木曜日、北九州市のコムシティで練習を重ねています。"
                className="text-xl text-gray-600 mb-6 leading-relaxed"
                as="p"
                isEditMode={isEditMode}
              />
              <EditableText
                page="home"
                section="practice"
                field="description2"
                defaultValue="初心者の方も大歓迎。丁寧な指導で、楽しく歌の技術を磨くことができます。"
                className="text-xl text-gray-600 mb-10 leading-relaxed"
                as="p"
                isEditMode={isEditMode}
              />
              <Link
                href="/schedule"
                className="btn-apple-secondary inline-block"
              >
                練習スケジュールを見る
              </Link>
            </div>

            {/* 写真（右側） */}
            <div className="relative h-[500px] bg-gradient-to-br from-pastel-blue-50 to-pastel-blue-100 rounded-3xl overflow-hidden order-1 lg:order-2">
              <EditableImageWithUrl
                page="home"
                section="practice"
                field="image1"
                placeholderText="練習風景の写真"
                className="w-full h-full"
                isEditMode={isEditMode}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
