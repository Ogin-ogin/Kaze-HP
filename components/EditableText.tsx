'use client';

import { useState, useEffect } from 'react';

interface EditableTextProps {
  page: string;
  section: string;
  field: string;
  defaultValue: string;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
  isEditMode: boolean;
  multiline?: boolean;
}

export default function EditableText({
  page,
  section,
  field,
  defaultValue,
  className = '',
  as: Component = 'p',
  isEditMode,
  multiline = false,
}: EditableTextProps) {
  // 初期値の改行を処理
  const processedDefaultValue = defaultValue.replace(/\\n/g, '\n');
  const [value, setValue] = useState(processedDefaultValue);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

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
          if (content) {
            setValue(content.value);
          }
        }
      } catch (error) {
        console.error('コンテンツ取得エラー:', error);
      }
    };
    fetchContent();
  }, [page, section, field]);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const response = await fetch('/api/page-contents/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ page, section, field, value }),
      });

      if (response.ok) {
        setIsEditing(false);
        alert('保存しました');
      } else {
        alert('保存に失敗しました');
      }
    } catch (error) {
      alert('保存に失敗しました');
      console.error('保存エラー:', error);
    } finally {
      setIsSaving(false);
    }
  };

  if (!isEditMode) {
    return <Component className={className} dangerouslySetInnerHTML={{ __html: value.replace(/\n/g, '<br />') }} />;
  }

  return (
    <div className="relative group">
      {isEditing ? (
        <div className="space-y-2">
          {multiline ? (
            <textarea
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pastel-blue-500 focus:border-transparent"
              rows={5}
            />
          ) : (
            <input
              type="text"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pastel-blue-500 focus:border-transparent"
            />
          )}
          <div className="flex gap-2">
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="px-4 py-2 bg-pastel-blue-500 text-white rounded-lg hover:bg-pastel-blue-600 disabled:opacity-50"
            >
              {isSaving ? '保存中...' : '保存'}
            </button>
            <button
              onClick={() => {
                setValue(processedDefaultValue);
                setIsEditing(false);
              }}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
            >
              キャンセル
            </button>
          </div>
        </div>
      ) : (
        <>
          <Component className={className} dangerouslySetInnerHTML={{ __html: value.replace(/\n/g, '<br />') }} />
          <button
            onClick={() => setIsEditing(true)}
            className="absolute -right-12 top-0 opacity-0 group-hover:opacity-100 transition-opacity px-3 py-1 bg-pastel-blue-500 text-white text-sm rounded hover:bg-pastel-blue-600"
          >
            編集
          </button>
        </>
      )}
    </div>
  );
}
