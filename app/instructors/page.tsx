export default function InstructorsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">指導者紹介</h1>

      <div className="space-y-12">
        {/* 合唱指導・指揮者 */}
        <section className="bg-white border border-gray-200 rounded-lg p-8">
          <div className="flex items-start mb-4">
            <span className="text-4xl mr-4">🎵</span>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                合唱指導・指揮者：益永ひろみ
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                丁寧な発声指導から演技指導？まで、楽しく、真剣に団をリードしていく美しき指揮者！頼もしい❗️
              </p>
            </div>
          </div>

          <div className="mt-6 bg-pastel-blue-50 p-6 rounded-lg border-l-4 border-pastel-blue-500">
            <p className="text-gray-700 font-medium">「合唱の楽しさを満喫しましょう！」</p>
            <p className="text-sm text-gray-600 mt-2">益永先生より</p>
          </div>
        </section>

        {/* ピアニスト */}
        <section className="bg-white border border-gray-200 rounded-lg p-8">
          <div className="flex items-start">
            <span className="text-4xl mr-4">🎹</span>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                ピアニスト：榎元　圭
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                プロの演奏家として活躍中。自在な演奏テクニックと表現力豊かなピアノで合唱を支える！
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
