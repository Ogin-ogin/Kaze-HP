import { NextRequest, NextResponse } from 'next/server';
import { getConcertsFromSheets, addConcertToSheets } from '@/lib/googleSheets';

// GET - 演奏会一覧取得
export async function GET() {
  try {
    const concerts = await getConcertsFromSheets();
    return NextResponse.json(concerts);
  } catch (error) {
    console.error('演奏会データ取得エラー:', error);
    return NextResponse.json({ error: '演奏会データの取得に失敗しました' }, { status: 500 });
  }
}

// POST - 新規演奏会作成
export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const { title, date, location, thumbnail, award, detail } = data;

    if (!title || !date || !location || !thumbnail) {
      return NextResponse.json({ error: '必須項目が不足しています' }, { status: 400 });
    }

    await addConcertToSheets({ title, date, location, thumbnail, award: award || '', detail: detail || '' });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('演奏会作成エラー:', error);
    return NextResponse.json({ error: '演奏会の作成に失敗しました' }, { status: 500 });
  }
}
