import { NextRequest, NextResponse } from 'next/server';
import { getPageContentsFromSheets, getPageContentByPage } from '@/lib/googleSheets';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = searchParams.get('page');

    if (page) {
      const contents = await getPageContentByPage(page);
      return NextResponse.json(contents);
    } else {
      const contents = await getPageContentsFromSheets();
      return NextResponse.json(contents);
    }
  } catch (error) {
    console.error('ページコンテンツ取得エラー:', error);
    return NextResponse.json(
      { error: 'ページコンテンツの取得に失敗しました' },
      { status: 500 }
    );
  }
}
