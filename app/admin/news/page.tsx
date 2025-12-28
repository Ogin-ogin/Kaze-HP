'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { Plus, Edit, Trash2, X } from 'lucide-react';
import ImageUpload from '@/components/ImageUpload';

interface NewsItem {
  id: string;
  title: string;
  date: string;
  thumbnail: string;
  content: string;
}

export default function AdminNewsPage() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const [news, setNews] = useState<NewsItem[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingNews, setEditingNews] = useState<NewsItem | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // フォーム状態
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    thumbnail: '',
    content: '',
  });

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/');
      return;
    }
    fetchNews();
  }, [isAuthenticated, router]);

  const fetchNews = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/news');
      if (response.ok) {
        const data = await response.json();
        setNews(data);
      }
    } catch (error) {
      console.error('ニュースの取得に失敗しました:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const url = editingNews ? `/api/news/${editingNews.id}` : '/api/news';
      const method = editingNews ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        await fetchNews();
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
      const response = await fetch(`/api/news/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        await fetchNews();
      } else {
        alert('削除に失敗しました');
      }
    } catch (error) {
      console.error('削除エラー:', error);
      alert('削除に失敗しました');
    }
  };

  const handleEdit = (newsItem: NewsItem) => {
    setEditingNews(newsItem);
    setFormData({
      title: newsItem.title,
      date: newsItem.date,
      thumbnail: newsItem.thumbnail,
      content: newsItem.content,
    });
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingNews(null);
    setFormData({ title: '', date: '', thumbnail: '', content: '' });
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900">ニュース管理</h1>
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
      ) : news.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-500">ニュースがありません</p>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  日付
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  タイトル
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  操作
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {news.map((item) => (
                <tr key={item.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.date}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {item.title}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => handleEdit(item)}
                      className="text-pastel-blue-600 hover:text-pastel-blue-900 mr-4"
                    >
                      <Edit className="w-4 h-4 inline" />
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="text-red-600 hover:text-red-900"
                    >
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-8 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                {editingNews ? 'ニュース編集' : '新規ニュース作成'}
              </h2>
              <button
                onClick={handleCloseForm}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  タイトル
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pastel-blue-500 focus:border-pastel-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  日付
                </label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pastel-blue-500 focus:border-pastel-blue-500"
                  required
                />
              </div>

              <div>
                <ImageUpload
                  currentImageUrl={formData.thumbnail}
                  onImageUploaded={(url) => setFormData({ ...formData, thumbnail: url })}
                  label="サムネイル画像"
                />
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    または画像URLを直接入力
                  </label>
                  <input
                    type="url"
                    value={formData.thumbnail}
                    onChange={(e) => setFormData({ ...formData, thumbnail: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pastel-blue-500 focus:border-pastel-blue-500"
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  本文
                </label>
                <textarea
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  rows={10}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pastel-blue-500 focus:border-pastel-blue-500"
                  required
                />
                <p className="text-sm text-gray-500 mt-2">
                  本文中に画像を挿入するには、下のボタンから画像をアップロードしてください
                </p>
                <div className="mt-4">
                  <ImageUpload
                    currentImageUrl=""
                    onImageUploaded={(url) => {
                      // 本文に[IMAGE:URL]形式で挿入
                      const imageTag = `\n[IMAGE:${url}]\n`;
                      setFormData({ ...formData, content: formData.content + imageTag });
                    }}
                    label="本文に画像を挿入"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3">
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
                  {editingNews ? '更新' : '作成'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
