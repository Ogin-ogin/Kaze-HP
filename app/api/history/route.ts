import { NextRequest, NextResponse } from 'next/server';
import { getHistoryFromSheets, addHistoryToSheets } from '@/lib/googleSheets';

export async function GET() {
  try {
    const history = await getHistoryFromSheets();
    return NextResponse.json(history);
  } catch (error) {
    console.error('活動実績取得エラー:', error);
    return NextResponse.json({ error: '活動実績の取得に失敗しました' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const { date, event } = data;

    if (!date || !event) {
      return NextResponse.json({ error: '必須項目が不足しています' }, { status: 400 });
    }

    await addHistoryToSheets({ date, event });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('活動実績作成エラー:', error);
    return NextResponse.json({ error: '活動実績の作成に失敗しました' }, { status: 500 });
  }
}
