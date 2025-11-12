import { NextRequest, NextResponse } from 'next/server';
import { updateConcertInSheets, deleteConcertFromSheets } from '@/lib/googleSheets';

// PUT - 演奏会更新
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const data = await request.json();
    const { title, date, location, thumbnail, award, detail } = data;
    const { id } = await params;

    if (!title || !date || !location || !thumbnail) {
      return NextResponse.json({ error: '必須項目が不足しています' }, { status: 400 });
    }

    await updateConcertInSheets(id, { title, date, location, thumbnail, award: award || '', detail: detail || '' });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('演奏会更新エラー:', error);
    return NextResponse.json({ error: '演奏会の更新に失敗しました' }, { status: 500 });
  }
}

// DELETE - 演奏会削除
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await deleteConcertFromSheets(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('演奏会削除エラー:', error);
    return NextResponse.json({ error: '演奏会の削除に失敗しました' }, { status: 500 });
  }
}
