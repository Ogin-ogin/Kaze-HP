# 女声コーラス 風 - 公式ホームページ

北九州市の女声コーラス団体「風」の公式ホームページです。

## 🎵 特徴

- **Notionライクなデザイン**: シンプルで洗練されたUI
- **モバイル対応**: スマートフォンでも快適に閲覧可能
- **簡単編集**: Google SheetsとGoogle Driveで管理し、ウェブから直接編集可能
- **無料ホスティング**: Vercelで無料公開
- **GitHub連携**: PCが破損しても安心のクラウドバックアップ

## 🛠️ 技術スタック

- **フロントエンド**: Next.js 16 + React
- **スタイリング**: Tailwind CSS
- **データ管理**: Google Sheets API + Google Drive
- **認証**: 環境変数ベースの簡易パスワード認証
- **ホスティング**: Vercel
- **バージョン管理**: GitHub

## 📄 ページ構成

- **メインページ**: ヒーローセクション + ニュースギャラリー
- **団体紹介**: 活動理念、活動内容、レパートリーなど
- **指導者紹介**: 指揮者とピアニストの紹介
- **活動実績**: 1999年からの活動履歴
- **演奏会史**: 過去の演奏会をギャラリー形式で表示
- **スケジュール**: Googleカレンダー埋め込み
- **団員募集**: 募集条件、会費、練習情報
- **お問い合わせ**: Google Formsへのリンク

## 🚀 セットアップ手順

### 1. リポジトリのクローン

```bash
git clone https://github.com/YOUR_USERNAME/kaze-chorus.git
cd kaze-chorus
```

### 2. 依存パッケージのインストール

```bash
npm install
```

### 3. 環境変数の設定

`.env.example` をコピーして `.env.local` を作成：

```bash
cp .env.example .env.local
```

以下の環境変数を設定してください：

#### Google Sheets API
1. [Google Cloud Console](https://console.cloud.google.com/) でプロジェクトを作成
2. Google Sheets APIを有効化
3. サービスアカウントを作成し、JSONキーをダウンロード
4. `.env.local` に認証情報を設定

#### Google Sheets の準備
- **ニュース用シート**: 列は `ID | タイトル | 日付 | サムネイルURL | 内容`
- **演奏会史用シート**: 列は `ID | タイトル | 日付 | 場所 | サムネイルURL | 受賞 | 詳細`
- シートをサービスアカウントのメールアドレスと共有（編集権限）

### 4. 開発サーバーの起動

```bash
npm run dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開く

### 5. ビルド

```bash
npm run build
```

## 📦 Vercelデプロイ手順

### 初回デプロイ

1. [Vercel](https://vercel.com/) にサインアップ（GitHubアカウントで可能）
2. 「New Project」をクリック
3. GitHubリポジトリをインポート
4. 環境変数を設定（`.env.local` の内容をコピー）
5. 「Deploy」をクリック

### 環境変数の設定

Vercelのプロジェクト設定 > Environment Variables で以下を設定：

- `GOOGLE_SERVICE_ACCOUNT_EMAIL`
- `GOOGLE_PRIVATE_KEY`
- `NEWS_SPREADSHEET_ID`
- `CONCERTS_SPREADSHEET_ID`
- `EDIT_PASSWORD`
- `GOOGLE_CALENDAR_EMBED_URL`
- `GOOGLE_FORM_URL`
- `INSTAGRAM_URL`
- `BLOG_URL`

### 自動デプロイ

- GitHubにプッシュすると自動的にVercelにデプロイされます
- `main` ブランチへのマージで本番環境が更新されます

## 📝 コンテンツ編集

### ニュース記事の追加・編集・削除

Google Sheetsで直接編集できます：
1. ニュース用のGoogle Sheetsを開く
2. 行を追加/編集/削除
3. Vercelで再デプロイすると反映されます

### 演奏会情報の追加

1. 演奏会史用のGoogle Sheetsを開く
2. 新しい行を追加
3. パンフレットやポスターの画像をGoogle Driveにアップロード
4. 画像を「リンクを知っている全員」に公開設定
5. 画像URLをサムネイル列に貼り付け

### スケジュールの更新

スマホのGoogleカレンダーアプリで予定を追加・編集・削除すると、サイトに自動反映されます。

## 🔧 カスタマイズ

詳細なカスタマイズ方法は `DEPLOYMENT.md` を参照してください。

## 🔒 セキュリティ

- `.env.local` ファイルは **絶対にGitHubにコミットしない**
- `.gitignore` に `.env.local` が含まれていることを確認
- 編集用パスワードは強固なものを設定
- Google Sheetsのサービスアカウント情報は厳重に管理

## 📜 ライセンス

このプロジェクトは女声コーラス「風」のために作成されました。
