# デプロイ手順書

このドキュメントでは、女声コーラス「風」のホームページをGitHubとVercelにデプロイする詳細な手順を説明します。

## 📋 事前準備

### 必要なアカウント

1. **GitHubアカウント** - https://github.com/
2. **Vercelアカウント** - https://vercel.com/ (GitHubでサインアップ推奨)
3. **Googleアカウント** - Google Sheets API、Google Drive、Googleカレンダー用

## 🔧 Google Cloud Platform (GCP) の設定

### 1. プロジェクトの作成

1. [Google Cloud Console](https://console.cloud.google.com/) にアクセス
2. 「プロジェクトを作成」をクリック
3. プロジェクト名: `kaze-chorus-website` など
4. 「作成」をクリック

### 2. Google Sheets API の有効化

1. 左側のメニューから「APIとサービス」>「ライブラリ」を選択
2. 「Google Sheets API」を検索
3. 「有効にする」をクリック

### 3. サービスアカウントの作成

1. 左側のメニューから「IAMと管理」>「サービスアカウント」を選択
2. 「サービスアカウントを作成」をクリック
3. サービスアカウント名: `kaze-chorus-sheets`
4. 「作成して続行」をクリック
5. ロールは設定せずに「続行」
6. 「完了」をクリック

### 4. サービスアカウントキーの作成

1. 作成したサービスアカウントをクリック
2. 「キー」タブを選択
3. 「鍵を追加」>「新しい鍵を作成」をクリック
4. JSON形式を選択
5. 「作成」をクリック
6. JSONファイルがダウンロードされます（**厳重に保管してください**）

## 📊 Google Sheets の準備

### ニュース用シートの作成

1. 新しいGoogle Sheetsを作成
2. 名前を「風_ニュース」などに変更
3. 1行目（ヘッダー行）に以下を入力：

| A列 | B列 | C列 | D列 | E列 |
|-----|-----|-----|-----|-----|
| ID | タイトル | 日付 | サムネイルURL | 内容 |

4. サンプルデータを追加（例）：

| ID | タイトル | 日付 | サムネイルURL | 内容 |
|----|---------|------|---------------|------|
| 1 | 全国大会出場決定！ | 2025-06-15 | https://... | 第48回おかあさんコーラス全国大会に出場することが決定しました... |

5. シートIDをコピー（URLの`/d/`と`/edit`の間の文字列）
6. シートを共有：
   - 右上の「共有」をクリック
   - サービスアカウントのメールアドレスを追加
   - 権限を「編集者」に設定

### 演奏会史用シートの作成

1. 新しいGoogle Sheetsを作成
2. 名前を「風_演奏会史」などに変更
3. 1行目（ヘッダー行）に以下を入力：

| A列 | B列 | C列 | D列 | E列 | F列 | G列 |
|-----|-----|-----|-----|-----|-----|-----|
| ID | タイトル | 日付 | 場所 | サムネイルURL | 受賞 | 詳細 |

4. サンプルデータを追加
5. シートIDをコピー
6. シートをサービスアカウントと共有（編集者権限）

## 📅 Googleカレンダーの設定

1. Googleカレンダーで新しいカレンダーを作成
2. 名前: 「女声コーラス風 スケジュール」
3. カレンダーの設定を開く
4. 「カレンダーの統合」セクションで「埋め込みコード」をコピー
5. `src="..."`の部分のURLをコピーして保存

## 📝 Google Forms の準備

1. お問い合わせ用のGoogle Formsを作成済み
2. フォームのURLをコピーして保存

## 🐙 GitHubリポジトリの作成と連携

### 1. GitHubリポジトリの作成

1. GitHubにログイン
2. 右上の「+」>「New repository」をクリック
3. Repository名: `kaze-chorus-website`
4. 「Public」または「Private」を選択（Privateを推奨）
5. 「Create repository」をクリック

### 2. ローカルリポジトリの初期化と連携

プロジェクトディレクトリで以下のコマンドを実行：

```bash
cd kaze-chorus

# Gitリポジトリを初期化（すでに初期化済みの場合はスキップ）
git init

# リモートリポジトリを追加
git remote add origin https://github.com/YOUR_USERNAME/kaze-chorus-website.git

# すべてのファイルをステージング
git add .

# 初回コミット
git commit -m "Initial commit: 女声コーラス風 公式ホームページ"

# GitHubにプッシュ
git push -u origin main
```

**注意**: `YOUR_USERNAME` を自分のGitHubユーザー名に置き換えてください。

## 🚀 Vercelでのデプロイ

### 1. Vercelにサインアップ

1. [Vercel](https://vercel.com/) にアクセス
2. 「Sign Up」をクリック
3. 「Continue with GitHub」を選択
4. GitHubアカウントでログイン

### 2. プロジェクトのインポート

1. Vercelダッシュボードで「Add New...」>「Project」をクリック
2. GitHubリポジトリの一覧から `kaze-chorus-website` を選択
3. 「Import」をクリック

### 3. プロジェクト設定

1. Project Name: そのままでOK
2. Framework Preset: Next.js（自動検出）
3. Root Directory: `./`
4. Build Command: `npm run build`
5. Output Directory: `.next`

### 4. 環境変数の設定

「Environment Variables」セクションで以下を設定：

#### GOOGLE_SERVICE_ACCOUNT_EMAIL
- ダウンロードしたJSONファイルの `client_email` の値

#### GOOGLE_PRIVATE_KEY
- ダウンロードしたJSONファイルの `private_key` の値
- **重要**: 改行を保持したまま貼り付ける（または`\n`に置き換える）
- 例: `"-----BEGIN PRIVATE KEY-----\nMIIE....\n-----END PRIVATE KEY-----\n"`

#### NEWS_SPREADSHEET_ID
- ニュース用Google SheetsのID

#### CONCERTS_SPREADSHEET_ID
- 演奏会史用Google SheetsのID

#### EDIT_PASSWORD
- 編集機能用のパスワード（任意の強固な文字列）

#### NEXT_PUBLIC_GOOGLE_CALENDAR_EMBED_URL
- Googleカレンダーの埋め込みURL
- **注意**: クライアント側で使用するため `NEXT_PUBLIC_` プレフィックスが必要

#### NEXT_PUBLIC_GOOGLE_FORM_URL
- Google FormsのURL
- **注意**: クライアント側で使用するため `NEXT_PUBLIC_` プレフィックスが必要

#### NEXT_PUBLIC_INSTAGRAM_URL
- InstagramのURL（例: `https://instagram.com/your-account`）
- **注意**: クライアント側で使用するため `NEXT_PUBLIC_` プレフィックスが必要

#### NEXT_PUBLIC_BLOG_URL
- ブログのURL
- **注意**: クライアント側で使用するため `NEXT_PUBLIC_` プレフィックスが必要

### 5. デプロイ

1. 「Deploy」をクリック
2. ビルドが完了するまで待つ（2-3分）
3. デプロイが完了すると、URLが表示されます

## 🔄 更新とメンテナンス

### コンテンツの更新

#### ニュース記事の追加
1. Google Sheetsでニュース用シートを開く
2. 新しい行を追加
3. Vercelで自動的に再デプロイされます

#### 演奏会情報の追加
1. Google Sheetsで演奏会史用シートを開く
2. 新しい行を追加
3. 画像はGoogle Driveにアップロードし、公開URLを取得

#### スケジュールの更新
- GoogleカレンダーアプリまたはWebで予定を追加・編集
- 自動的にサイトに反映されます

### コードの更新

1. ローカルで変更を加える
2. 変更をコミット：
   ```bash
   git add .
   git commit -m "Update: ..."
   ```
3. GitHubにプッシュ：
   ```bash
   git push
   ```
4. Vercelが自動的に再デプロイします

## 🔒 セキュリティのベストプラクティス

1. **環境変数の管理**
   - `.env.local` は絶対にGitHubにコミットしない
   - サービスアカウントのJSONファイルも同様

2. **パスワード**
   - 編集用パスワードは強固なものを設定
   - 定期的に変更する

3. **Google Sheets**
   - サービスアカウント以外と共有しない
   - 権限は必要最小限に

4. **GitHub**
   - Private リポジトリを使用することを推奨
   - 2要素認証を有効にする

## 💡 トラブルシューティング

### ビルドエラーが発生する場合

1. `.env.local` の環境変数が正しく設定されているか確認
2. Vercelの環境変数が正しく設定されているか確認
3. Google Sheets APIが有効になっているか確認

### データが表示されない場合

1. Google Sheetsがサービスアカウントと共有されているか確認
2. シートIDが正しいか確認
3. データの列構成が正しいか確認

### デプロイが失敗する場合

1. GitHubリポジトリにプッシュされているか確認
2. Vercelのビルドログを確認
3. 依存パッケージが正しくインストールされているか確認

## 📞 サポート

問題が解決しない場合は、GitHubのIssuesでご報告ください。
