// 簡易パスワード認証
export function verifyPassword(password: string): boolean {
  const correctPassword = process.env.EDIT_PASSWORD;
  if (!correctPassword) {
    console.error('EDIT_PASSWORD is not set');
    return false;
  }
  return password === correctPassword;
}
