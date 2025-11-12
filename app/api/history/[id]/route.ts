import { NextRequest, NextResponse } from 'next/server';
import { updateHistoryInSheets, deleteHistoryFromSheets } from '@/lib/googleSheets';

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const data = await request.json();
    const { date, event } = data;
    const { id } = await params;

    if (!date || !event) {
      return NextResponse.json({ error: '必須項目が不足しています' }, { status: 400 });
    }

    await updateHistoryInSheets(id, { date, event });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('活動実績更新エラー:', error);
    return NextResponse.json({ error: '活動実績の更新に失敗しました' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await deleteHistoryFromSheets(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('活動実績削除エラー:', error);
    return NextResponse.json({ error: '活動実績の削除に失敗しました' }, { status: 500 });
  }
}
