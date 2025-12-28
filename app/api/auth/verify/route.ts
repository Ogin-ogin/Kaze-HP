import { NextRequest, NextResponse } from 'next/server';
import { verifyPassword } from '@/lib/auth';

// ログイン状態を確認（セッションチェック用）
export async function GET(request: NextRequest) {
  try {
    // セッションからトークンを取得（簡易実装）
    const authHeader = request.headers.get('authorization');

    // 簡易的にCookieからチェック
    const isAuthenticated = request.cookies.get('auth-token')?.value === 'authenticated';

    return NextResponse.json({ authenticated: isAuthenticated });
  } catch (error) {
    console.error('Auth check error:', error);
    return NextResponse.json({ authenticated: false });
  }
}

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json();

    if (!password) {
      return NextResponse.json(
        { error: 'Password is required' },
        { status: 400 }
      );
    }

    const isValid = verifyPassword(password);

    if (isValid) {
      const response = NextResponse.json({ success: true });
      // Cookieにトークンをセット
      response.cookies.set('auth-token', 'authenticated', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7, // 7日間
      });
      return response;
    } else {
      return NextResponse.json(
        { error: 'Invalid password' },
        { status: 401 }
      );
    }
  } catch (error) {
    console.error('Verification error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
