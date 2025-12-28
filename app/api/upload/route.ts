import { NextRequest, NextResponse } from 'next/server';
import { uploadImageToDrive } from '@/lib/googleDrive';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json(
        { error: 'ファイルが選択されていません' },
        { status: 400 }
      );
    }

    // ファイルサイズチェック（10MB以下）
    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json(
        { error: 'ファイルサイズが大きすぎます（10MB以下）' },
        { status: 400 }
      );
    }

    // 画像ファイルかチェック
    if (!file.type.startsWith('image/')) {
      return NextResponse.json(
        { error: '画像ファイルを選択してください' },
        { status: 400 }
      );
    }

    // ファイルをBufferに変換
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Google Driveにアップロード
    const timestamp = Date.now();
    const fileName = `${timestamp}-${file.name}`;
    const imageUrl = await uploadImageToDrive(buffer, fileName, file.type);

    return NextResponse.json({ url: imageUrl });
  } catch (error: any) {
    console.error('画像アップロードエラー:', error);
    return NextResponse.json(
      { error: error.message || '画像のアップロードに失敗しました' },
      { status: 500 }
    );
  }
}
