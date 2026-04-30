import MemberSection from '@/components/MemberSection';
import EditableHeroSection from '@/components/EditableHeroSection';
import EditableSectionImage from '@/components/EditableSectionImage';

export default function InstructorsPage() {
  return (
    <div className="bg-white">
      {/* ヒーローセクション */}
      <EditableHeroSection
        page="instructors"
        title="指導者紹介"
        subtitle="経験豊かな指導者が、あなたの音楽の旅をサポートします。"
      />

      {/* 指揮者セクション */}
      <section className="max-w-[980px] mx-auto px-4 sm:px-6 py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <EditableSectionImage
            page="instructors"
            section="conductor"
            field="image"
            placeholder="指導者の写真"
            className="relative h-[400px] bg-pastel-blue-50 rounded-2xl overflow-hidden"
          />

          <div>
            <p className="text-sm font-medium text-pastel-blue-600 mb-3 tracking-wide uppercase">
              Conductor & Vocal Coach
            </p>
            <h2 className="text-4xl font-semibold text-[#1d1d1f] mb-6 tracking-tight">
              益永ひろみ
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed mb-8">
              丁寧な発声指導から演技指導まで、楽しく、真剣に団をリードしていく美しき指揮者。
            </p>

            <div className="bg-pastel-blue-50 p-6 rounded-xl">
              <p className="text-base text-[#1d1d1f] italic mb-2">
                「合唱の楽しさを満喫しましょう」
              </p>
              <p className="text-sm text-gray-500">益永先生より</p>
            </div>
          </div>
        </div>
      </section>

      {/* ピアニストセクション */}
      <section className="bg-gray-50">
        <div className="max-w-[980px] mx-auto px-4 sm:px-6 py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="order-2 md:order-1">
              <p className="text-sm font-medium text-pastel-blue-600 mb-3 tracking-wide uppercase">
                Pianist
              </p>
              <h2 className="text-4xl font-semibold text-[#1d1d1f] mb-6 tracking-tight">
                榎元　圭
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                プロの演奏家として活躍中。自在な演奏テクニックと表現力豊かなピアノで合唱を支えます。
              </p>
            </div>

            <EditableSectionImage
              page="instructors"
              section="pianist"
              field="image"
              placeholder="ピアニストの写真"
              className="relative h-[400px] bg-pastel-blue-50 rounded-2xl overflow-hidden order-1 md:order-2"
            />
          </div>
        </div>
      </section>

      {/* 団員向けセクション */}
      <div className="bg-gray-50 py-24">
        <div className="max-w-[980px] mx-auto px-4 sm:px-6">
          <MemberSection />
        </div>
      </div>
    </div>
  );
}
