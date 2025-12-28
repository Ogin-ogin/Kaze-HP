import { NextRequest, NextResponse } from 'next/server';
import { updatePageContentInSheets } from '@/lib/googleSheets';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { page, section, field, value } = body;

    if (!page || !section || !field || value === undefined) {
      return NextResponse.json(
        { error: 'page, section, field, value は必須です' },
        { status: 400 }
      );
    }

    const result = await updatePageContentInSheets(page, section, field, value);

    if (result.success) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json(
        { error: 'ページコンテンツの更新に失敗しました' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('ページコンテンツ更新エラー:', error);
    return NextResponse.json(
      { error: 'ページコンテンツの更新に失敗しました' },
      { status: 500 }
    );
  }
}
