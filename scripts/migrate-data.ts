/**
 * Notion → Google Sheets データ移行スクリプト
 *
 * 使い方:
 *   cd kaze-chorus
 *   npx tsx scripts/migrate-data.ts
 *
 * 実行前に .env.local が正しく設定されていること確認。
 * Cloudinary に画像をアップロードする場合は scripts/images/ に画像ファイルを置く。
 * ファイル名は concerts-data.json の各エントリの localImage フィールドと対応させる。
 */

import { google } from 'googleapis';
import * as fs from 'fs';
import * as path from 'path';
import * as dotenv from 'dotenv';

// .env.local を読み込む
dotenv.config({ path: path.join(__dirname, '../.env.local') });

// ──────────────────────────────────────────────────────────
// 型定義
// ──────────────────────────────────────────────────────────

interface ProgramStage {
  stage: string;
  songs: string[];
}

interface ConcertDetail {
  conductor?: string;
  accompanist?: string;
  program?: ProgramStage[];
}

interface ConcertEntry {
  title: string;
  date: string;
  location: string;
  thumbnail: string;
  award: string;
  detail: ConcertDetail;
  localImage?: string; // scripts/images/ 内のファイル名（オプション）
}

// ──────────────────────────────────────────────────────────
// Google Sheets 認証
// ──────────────────────────────────────────────────────────

function getAuthClient() {
  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const key = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n');
  if (!email || !key) {
    throw new Error('GOOGLE_SERVICE_ACCOUNT_EMAIL または GOOGLE_PRIVATE_KEY が設定されていません');
  }
  return new google.auth.GoogleAuth({
    credentials: { client_email: email, private_key: key },
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });
}

// ──────────────────────────────────────────────────────────
// Cloudinary アップロード（オプション）
// ──────────────────────────────────────────────────────────

async function uploadToCloudinary(filePath: string): Promise<string> {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;

  if (!cloudName || !apiKey || !apiSecret) {
    console.warn('  Cloudinary の設定がないため画像アップロードをスキップします');
    return '';
  }

  // cloudinary SDK を動的インポート
  const cloudinary = await import('cloudinary').then(m => m.v2);
  cloudinary.config({ cloud_name: cloudName, api_key: apiKey, api_secret: apiSecret });

  const result = await cloudinary.uploader.upload(filePath, {
    folder: 'kaze-chorus/concerts',
  });
  return result.secure_url;
}

// ──────────────────────────────────────────────────────────
// 活動実績データ（Notionより取得済み）
// ──────────────────────────────────────────────────────────

const HISTORY_DATA = [
  { date: '1999-09', event: '女声コーラス 風 結成 飯倉貞子氏に指揮を依頼' },
  { date: '2000-06', event: '第23回 全日本おかあさんコーラス九州大会' },
  { date: '2001-04', event: '第１回演奏会（北九州・響ホール）' },
  { date: '2001-10', event: '韓国釜山にて「木蓮合唱団」とジョイントコンサート' },
  { date: '2002-06', event: '第56回 北九州合唱祭' },
  { date: '2002-08', event: '第25回 全日本おかあさんコーラス全国大会（ひまわり賞受賞）' },
  { date: '2002-12', event: '第2回演奏会（北九州・響ホール）' },
  { date: '2003-03', event: '「3月のコンサート」合同ステージ（大分・グランシアタ）' },
  { date: '2003-10', event: 'エリカフラウエンコール演奏会合同ステージ（大分・グランシアタ）' },
  { date: '2004-10', event: '第3回演奏会（北九州芸術劇場 大ホール）' },
  { date: '2005-03', event: '第28回 全日本おかあさんコーラス全国大会（ひまわり賞受賞）' },
  { date: '2005-12', event: '北九州メモリアル女声合唱団とのジョイントコンサート' },
  { date: '2006-04', event: '第4回演奏会（北九州・響ホール）' },
  { date: '2006-12', event: '九州厚生年金病院にてクリスマスコンサート' },
  { date: '2007-06', event: '韓国ソウルにて「議政府女性合唱団」とジョイントコンサート' },
  { date: '2007-12', event: '第5回演奏会（北九州・響ホール）' },
  { date: '2008-04', event: '響ホールにて「議政府女性合唱団」とジョイントコンサート' },
  { date: '2008-08', event: '第31回 全日本おかあさんコーラス全国大会（ひまわり賞受賞）' },
  { date: '2008-11', event: 'こころ、ふるさと、まつり音楽祭参加（八幡西生涯学習センター）' },
  { date: '2009-06', event: '第32回 全日本おかあさんコーラス 九州大会' },
  { date: '2009-12', event: '第6回演奏会（北九州・響ホール）10周年記念コンサート' },
  { date: '2010-03', event: '飯倉貞子 喜寿記念ステージ合同演奏出演' },
  { date: '2010-06', event: '第33回 全日本おかあさんコーラス 九州支部大会' },
  { date: '2011-04', event: '第7回演奏会（北九州・響ホール）' },
  { date: '2012-12', event: '第8回演奏会（北九州・ソレイユホール）' },
  { date: '2013-05', event: '黒崎コムシティにて「春の宿場祭り」に出演' },
  { date: '2013-08', event: 'ヤフオクドームにて国歌斉唱' },
  { date: '2014-08', event: '第37回 全日本おかあさんコーラス全国大会' },
  { date: '2014-10', event: '第9回演奏会（八幡市民会館）' },
  { date: '2015',    event: '指揮を元吉淑子氏が引き継ぐ' },
  { date: '2016-05', event: '合唱祭合同練習（5日、22日）' },
  { date: '2016-06', event: '合唱祭' },
  { date: '2017-01', event: '合唱講習会' },
  { date: '2017-03', event: '第10回演奏会（響ホール）／レディスコーラスフェスティバル（響ホール）' },
  { date: '2017-04', event: '合同合唱曲練習（ひびしんホール）' },
  { date: '2017-06', event: '合唱祭（響ホール）／おかあさんコーラス九州大会（イイヅカコスモスコモン）' },
  { date: '2017-08', event: 'おかあさんコーラス全国大会（岡山シンフォニーホール）' },
  { date: '2017-11', event: 'ひとみらいコンサート（コムシティこどもの館ホール）' },
  { date: '2018-01', event: '合唱講習会（新実徳英先生）「白いうた青いうた」' },
  { date: '2018-03', event: 'レディースコーラスフェスティバル（響ホール）' },
  { date: '2018-06', event: '合唱祭／おかあさんコーラス九州大会（長崎ブリックホール）あじさい賞受賞' },
  { date: '2019-01', event: '合唱講習会（雨森文也氏）' },
  { date: '2019-03', event: 'レディースコーラスフェスティバル（響ホール）' },
  { date: '2019-06', event: '合唱祭／おかあさんコーラス九州大会（大分いいちこグランシアタ）湯けむり賞受賞' },
  { date: '2019-11', event: 'ひとみらいフェスティバル（コムシティ文化祭）' },
  { date: '2020-01', event: '合唱講習会（青山恵子氏）' },
  { date: '2020-02', event: '活動休止（新型コロナ感染拡大により）' },
  { date: '2020-07', event: '状況をみながら少人数で活動再開' },
  { date: '2022-04', event: '活動再開と休止を繰り返しながら、黒崎ひびしんホール練習室にて再び活動開始' },
  { date: '2022-06', event: '合唱祭／おかあさんコーラス九州大会（熊本県立劇場）おてもやん賞受賞' },
  { date: '2023-02', event: '合唱講習会（池辺晋一郎氏）' },
  { date: '2023-03', event: 'レディースコーラスフェスティバル（響ホール）' },
  { date: '2023-06', event: '合唱祭／おかあさんコーラス九州大会（佐賀市文化会館）バルーン賞受賞' },
  { date: '2024-01', event: '合唱講習会（なかにしあかね氏）（黒崎ひびしんホール 中ホール）' },
  { date: '2024-03', event: 'レディースコーラスフェスティバル（戸畑市民会館）' },
  { date: '2024-06', event: '合唱祭（響ホール）／おかあさんコーラス九州大会（沖縄コンベンションセンター）選考委員奨励賞受賞' },
  { date: '2024-07', event: '益永ひろみ氏が指揮を引き継ぐ' },
  { date: '2025-03', event: 'レディースコーラスフェスティバル（響ホール）' },
  { date: '2025-06', event: '第1回福岡市・北九州市合同合唱祭 / おかあさんコーラス九州大会（鹿児島県民ホール）篤姫賞受賞' },
  { date: '2025-08', event: '第48回おかあさんコーラス全国大会出場（山形県民やまぎんホール）ひまわり賞受賞' },
];

// ──────────────────────────────────────────────────────────
// メイン処理
// ──────────────────────────────────────────────────────────

async function main() {
  const spreadsheetId = process.env.SPREADSHEET_ID;
  if (!spreadsheetId) throw new Error('SPREADSHEET_ID が設定されていません');

  const auth = getAuthClient();
  const sheets = google.sheets({ version: 'v4', auth });

  // ── 1. 活動実績（History）を書き込む ──────────────────────
  console.log('\n=== 活動実績データの書き込み ===');
  const historyRows = HISTORY_DATA.map((h, i) => [String(i + 1), h.date, h.event]);

  await sheets.spreadsheets.values.update({
    spreadsheetId,
    range: 'History!A2:C',
    valueInputOption: 'RAW',
    requestBody: { values: historyRows },
  });
  console.log(`✓ ${historyRows.length} 件の活動実績を書き込みました`);

  // ── 2. 演奏会（Concerts）を書き込む ──────────────────────
  console.log('\n=== 演奏会データの書き込み ===');
  const concertsJsonPath = path.join(__dirname, 'concerts-data.json');
  const concerts: ConcertEntry[] = JSON.parse(fs.readFileSync(concertsJsonPath, 'utf-8'));

  const imagesDir = path.join(__dirname, 'images');
  const concertRows: string[][] = [];

  for (let i = 0; i < concerts.length; i++) {
    const c = concerts[i];
    console.log(`  [${i + 1}/${concerts.length}] ${c.title}`);

    let thumbnailUrl = c.thumbnail;

    // ローカル画像があればCloudinaryにアップロード
    if (c.localImage) {
      const imgPath = path.join(imagesDir, c.localImage);
      if (fs.existsSync(imgPath)) {
        console.log(`    → 画像アップロード中: ${c.localImage}`);
        try {
          thumbnailUrl = await uploadToCloudinary(imgPath);
          console.log(`    ✓ アップロード完了: ${thumbnailUrl}`);
        } catch (err) {
          console.error(`    ✗ アップロード失敗:`, err);
        }
      } else {
        console.warn(`    ⚠ 画像ファイルが見つかりません: ${imgPath}`);
      }
    }

    concertRows.push([
      String(i + 1),
      c.title,
      c.date,
      c.location,
      thumbnailUrl,
      c.award,
      JSON.stringify(c.detail),
    ]);
  }

  await sheets.spreadsheets.values.update({
    spreadsheetId,
    range: 'Concerts!A2:G',
    valueInputOption: 'RAW',
    requestBody: { values: concertRows },
  });
  console.log(`\n✓ ${concertRows.length} 件の演奏会データを書き込みました`);
  console.log('\n✅ 移行完了！');
}

main().catch((err) => {
  console.error('エラー:', err);
  process.exit(1);
});
