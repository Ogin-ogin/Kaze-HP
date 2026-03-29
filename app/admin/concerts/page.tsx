'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { Plus, Edit, Trash2, X, PlusCircle, MinusCircle } from 'lucide-react';
import ImageUpload from '@/components/ImageUpload';

interface ProgramStage {
  stage: string;
  songs: string[];
}

interface ConcertDetail {
  conductor: string;
  accompanist: string;
  program: ProgramStage[];
}

interface ConcertItem {
  id: string;
  title: string;
  date: string;
  location: string;
  thumbnail: string;
  award: string;
  detail: string;
}

const emptyDetail = (): ConcertDetail => ({
  conductor: '',
  accompanist: '',
  program: [{ stage: '第1ステージ', songs: [''] }],
});

function parseDetail(raw: string): ConcertDetail {
  if (!raw) return emptyDetail();
  try {
    const parsed = JSON.parse(raw) as Partial<ConcertDetail>;
    return {
      conductor: parsed.conductor ?? '',
      accompanist: parsed.accompanist ?? '',
      program: parsed.program && parsed.program.length > 0
        ? parsed.program
        : [{ stage: '第1ステージ', songs: [''] }],
    };
  } catch {
    return emptyDetail();
  }
}

export default function AdminConcertsPage() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const [concerts, setConcerts] = useState<ConcertItem[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingConcert, setEditingConcert] = useState<ConcertItem | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const [formData, setFormData] = useState({
    title: '',
    date: '',
    location: '',
    thumbnail: '',
    award: '',
  });
  const [detail, setDetail] = useState<ConcertDetail>(emptyDetail());

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/');
      return;
    }
    fetchConcerts();
  }, [isAuthenticated, router]);

  const fetchConcerts = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/concerts');
      if (response.ok) {
        const data = await response.json();
        setConcerts(data);
      }
    } catch (error) {
      console.error('演奏会データの取得に失敗しました:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const url = editingConcert ? `/api/concerts/${editingConcert.id}` : '/api/concerts';
      const method = editingConcert ? 'PUT' : 'POST';

      // プログラムから空の曲名を除去
      const cleanedDetail: ConcertDetail = {
        ...detail,
        program: detail.program.map((s) => ({
          ...s,
          songs: s.songs.filter((sg) => sg.trim() !== ''),
        })).filter((s) => s.stage.trim() !== ''),
      };

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, detail: JSON.stringify(cleanedDetail) }),
      });

      if (response.ok) {
        await fetchConcerts();
        handleCloseForm();
      } else {
        alert('保存に失敗しました');
      }
    } catch (error) {
      console.error('保存エラー:', error);
      alert('保存に失敗しました');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('本当に削除しますか?')) return;
    try {
      const response = await fetch(`/api/concerts/${id}`, { method: 'DELETE' });
      if (response.ok) {
        await fetchConcerts();
      } else {
        alert('削除に失敗しました');
      }
    } catch (error) {
      console.error('削除エラー:', error);
      alert('削除に失敗しました');
    }
  };

  const handleEdit = (concert: ConcertItem) => {
    setEditingConcert(concert);
    setFormData({
      title: concert.title,
      date: concert.date,
      location: concert.location,
      thumbnail: concert.thumbnail,
      award: concert.award || '',
    });
    setDetail(parseDetail(concert.detail));
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingConcert(null);
    setFormData({ title: '', date: '', location: '', thumbnail: '', award: '' });
    setDetail(emptyDetail());
  };

  // ステージ操作
  const addStage = () =>
    setDetail((d) => ({ ...d, program: [...d.program, { stage: '', songs: [''] }] }));

  const removeStage = (si: number) =>
    setDetail((d) => ({ ...d, program: d.program.filter((_, i) => i !== si) }));

  const updateStage = (si: number, value: string) =>
    setDetail((d) => {
      const p = [...d.program];
      p[si] = { ...p[si], stage: value };
      return { ...d, program: p };
    });

  // 曲操作
  const addSong = (si: number) =>
    setDetail((d) => {
      const p = [...d.program];
      p[si] = { ...p[si], songs: [...p[si].songs, ''] };
      return { ...d, program: p };
    });

  const removeSong = (si: number, sj: number) =>
    setDetail((d) => {
      const p = [...d.program];
      p[si] = { ...p[si], songs: p[si].songs.filter((_, j) => j !== sj) };
      return { ...d, program: p };
    });

  const updateSong = (si: number, sj: number, value: string) =>
    setDetail((d) => {
      const p = [...d.program];
      const songs = [...p[si].songs];
      songs[sj] = value;
      p[si] = { ...p[si], songs };
      return { ...d, program: p };
    });

  if (!isAuthenticated) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900">演奏会史管理</h1>
        <button
          onClick={() => setIsFormOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-pastel-blue-500 text-white rounded-lg hover:bg-pastel-blue-600 transition-colors"
        >
          <Plus className="w-5 h-5" />
          新規作成
        </button>
      </div>

      {isLoading ? (
        <div className="text-center py-12">
          <p className="text-gray-500">読み込み中...</p>
        </div>
      ) : concerts.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-500">演奏会情報がありません</p>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">日付</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">タイトル</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">場所</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">受賞</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">操作</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {concerts.map((item) => (
                <tr key={item.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.date}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{item.title}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{item.location}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{item.award || '-'}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button onClick={() => handleEdit(item)} className="text-pastel-blue-600 hover:text-pastel-blue-900 mr-4">
                      <Edit className="w-4 h-4 inline" />
                    </button>
                    <button onClick={() => handleDelete(item.id)} className="text-red-600 hover:text-red-900">
                      <Trash2 className="w-4 h-4 inline" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* フォームモーダル */}
      {isFormOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center bg-black bg-opacity-50 overflow-y-auto py-8">
          <div className="bg-white rounded-lg p-8 max-w-2xl w-full mx-4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                {editingConcert ? '演奏会情報編集' : '新規演奏会情報作成'}
              </h2>
              <button onClick={handleCloseForm} className="text-gray-400 hover:text-gray-600">
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* タイトル */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">タイトル</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pastel-blue-500 focus:border-pastel-blue-500"
                  required
                />
              </div>

              {/* 日付 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">日付（例: 2024/04/20）</label>
                <input
                  type="text"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pastel-blue-500 focus:border-pastel-blue-500"
                  required
                />
              </div>

              {/* 場所 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">場所</label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pastel-blue-500 focus:border-pastel-blue-500"
                  required
                />
              </div>

              {/* サムネイル */}
              <div>
                <ImageUpload
                  currentImageUrl={formData.thumbnail}
                  onImageUploaded={(url) => setFormData({ ...formData, thumbnail: url })}
                  label="ポスター・パンフレット画像"
                />
                <div className="mt-3">
                  <label className="block text-sm font-medium text-gray-700 mb-2">または画像URLを直接入力</label>
                  <input
                    type="url"
                    value={formData.thumbnail}
                    onChange={(e) => setFormData({ ...formData, thumbnail: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pastel-blue-500 focus:border-pastel-blue-500"
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
              </div>

              {/* 受賞 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">受賞（任意）</label>
                <input
                  type="text"
                  value={formData.award}
                  onChange={(e) => setFormData({ ...formData, award: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pastel-blue-500 focus:border-pastel-blue-500"
                  placeholder="例: ひまわり賞受賞"
                />
              </div>

              {/* 指揮者・伴奏者 */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">指揮者（任意）</label>
                  <input
                    type="text"
                    value={detail.conductor}
                    onChange={(e) => setDetail({ ...detail, conductor: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pastel-blue-500 focus:border-pastel-blue-500"
                    placeholder="例: 元吉 淑子"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">伴奏者（任意）</label>
                  <input
                    type="text"
                    value={detail.accompanist}
                    onChange={(e) => setDetail({ ...detail, accompanist: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pastel-blue-500 focus:border-pastel-blue-500"
                    placeholder="例: 益永ひろみ"
                  />
                </div>
              </div>

              {/* プログラム */}
              <div>
                <div className="flex justify-between items-center mb-3">
                  <label className="block text-sm font-medium text-gray-700">プログラム（任意）</label>
                  <button
                    type="button"
                    onClick={addStage}
                    className="flex items-center gap-1 text-sm text-pastel-blue-600 hover:text-pastel-blue-800"
                  >
                    <PlusCircle className="w-4 h-4" />
                    ステージを追加
                  </button>
                </div>
                <div className="space-y-4">
                  {detail.program.map((stage, si) => (
                    <div key={si} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-3">
                        <input
                          type="text"
                          value={stage.stage}
                          onChange={(e) => updateStage(si, e.target.value)}
                          className="flex-1 px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-pastel-blue-500 focus:border-pastel-blue-500"
                          placeholder="ステージ名（例: 第1ステージ）"
                        />
                        {detail.program.length > 1 && (
                          <button type="button" onClick={() => removeStage(si)} className="text-red-400 hover:text-red-600">
                            <MinusCircle className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                      <div className="space-y-2 pl-2">
                        {stage.songs.map((song, sj) => (
                          <div key={sj} className="flex items-center gap-2">
                            <input
                              type="text"
                              value={song}
                              onChange={(e) => updateSong(si, sj, e.target.value)}
                              className="flex-1 px-3 py-1.5 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-pastel-blue-500 focus:border-pastel-blue-500"
                              placeholder="曲名"
                            />
                            {stage.songs.length > 1 && (
                              <button type="button" onClick={() => removeSong(si, sj)} className="text-gray-400 hover:text-red-500">
                                <X className="w-3 h-3" />
                              </button>
                            )}
                          </div>
                        ))}
                        <button
                          type="button"
                          onClick={() => addSong(si)}
                          className="flex items-center gap-1 text-xs text-gray-500 hover:text-pastel-blue-600 mt-1"
                        >
                          <PlusCircle className="w-3 h-3" />
                          曲を追加
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleCloseForm}
                  className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  キャンセル
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-pastel-blue-500 text-white rounded-lg hover:bg-pastel-blue-600 transition-colors"
                >
                  {editingConcert ? '更新' : '作成'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
