import { NextRequest, NextResponse } from 'next/server';
import { getNewsFromSheets, addNewsToSheets } from '@/lib/googleSheets';

// GET - ニュース一覧取得
export async function GET() {
  try {
    const news = await getNewsFromSheets();
    return NextResponse.json(news);
  } catch (error) {
    console.error('ニュース取得エラー:', error);
    return NextResponse.json({ error: 'ニュースの取得に失敗しました' }, { status: 500 });
  }
}

// POST - 新規ニュース作成
export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const { title, date, thumbnail, content } = data;

    if (!title || !date || !thumbnail || !content) {
      return NextResponse.json({ error: '必須項目が不足しています' }, { status: 400 });
    }

    await addNewsToSheets({ title, date, thumbnail, content });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('ニュース作成エラー:', error);
    return NextResponse.json({ error: 'ニュースの作成に失敗しました' }, { status: 500 });
  }
}
