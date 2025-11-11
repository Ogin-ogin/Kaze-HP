import { NextRequest, NextResponse } from 'next/server';
import { updateNewsInSheets, deleteNewsFromSheets } from '@/lib/googleSheets';

// PUT - ニュース更新
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const data = await request.json();
    const { title, date, thumbnail, content } = data;
    const { id } = await params;

    if (!title || !date || !thumbnail || !content) {
      return NextResponse.json({ error: '必須項目が不足しています' }, { status: 400 });
    }

    await updateNewsInSheets(id, { title, date, thumbnail, content });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('ニュース更新エラー:', error);
    return NextResponse.json({ error: 'ニュースの更新に失敗しました' }, { status: 500 });
  }
}

// DELETE - ニュース削除
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await deleteNewsFromSheets(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('ニュース削除エラー:', error);
    return NextResponse.json({ error: 'ニュースの削除に失敗しました' }, { status: 500 });
  }
}
