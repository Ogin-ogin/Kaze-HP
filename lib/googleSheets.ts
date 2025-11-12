import { google } from 'googleapis';

// Google Sheets APIの認証
function getAuthClient() {
  // 環境変数が設定されていない場合はnullを返す
  if (!process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL || !process.env.GOOGLE_PRIVATE_KEY) {
    return null;
  }

  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    },
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  return auth;
}

// ニュースデータを取得
export async function getNewsFromSheets() {
  try {
    const auth = getAuthClient();
    if (!auth || !process.env.NEWS_SPREADSHEET_ID) {
      console.warn('Google Sheets API not configured, returning empty array');
      return [];
    }
    const sheets = google.sheets({ version: 'v4', auth });

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.NEWS_SPREADSHEET_ID,
      range: 'Sheet1!A2:E', // A列: ID, B列: タイトル, C列: 日付, D列: サムネイルURL, E列: 内容
    });

    const rows = response.data.values || [];

    return rows.map((row) => ({
      id: row[0] || '',
      title: row[1] || '',
      date: row[2] || '',
      thumbnail: row[3] || '',
      content: row[4] || '',
    }));
  } catch (error) {
    console.error('Error fetching news from Google Sheets:', error);
    return [];
  }
}

// 演奏会データを取得
export async function getConcertsFromSheets() {
  try {
    const auth = getAuthClient();
    if (!auth || !process.env.CONCERTS_SPREADSHEET_ID) {
      console.warn('Google Sheets API not configured, returning empty array');
      return [];
    }
    const sheets = google.sheets({ version: 'v4', auth });

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.CONCERTS_SPREADSHEET_ID,
      range: 'Sheet1!A2:G', // A列: ID, B列: タイトル, C列: 日付, D列: 場所, E列: サムネイルURL, F列: 受賞, G列: 詳細
    });

    const rows = response.data.values || [];

    return rows.map((row) => ({
      id: row[0] || '',
      title: row[1] || '',
      date: row[2] || '',
      location: row[3] || '',
      thumbnail: row[4] || '',
      award: row[5] || '',
      detail: row[6] || '',
    }));
  } catch (error) {
    console.error('Error fetching concerts from Google Sheets:', error);
    return [];
  }
}

// ニュースデータを追加
export async function addNewsToSheets(news: {
  title: string;
  date: string;
  thumbnail: string;
  content: string;
}) {
  try {
    const auth = getAuthClient();
    if (!auth || !process.env.NEWS_SPREADSHEET_ID) {
      throw new Error('Google Sheets API not configured');
    }
    const sheets = google.sheets({ version: 'v4', auth });

    // 既存のデータ数を取得してIDを自動生成
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.NEWS_SPREADSHEET_ID,
      range: 'Sheet1!A:A',
    });

    const rows = response.data.values || [];
    const newId = String(rows.length); // 既存の行数をIDとして使用

    await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.NEWS_SPREADSHEET_ID,
      range: 'Sheet1!A:E',
      valueInputOption: 'RAW',
      requestBody: {
        values: [[newId, news.title, news.date, news.thumbnail, news.content]],
      },
    });

    return { success: true, id: newId };
  } catch (error) {
    console.error('Error adding news to Google Sheets:', error);
    return { success: false, error };
  }
}

// ニュースデータを更新
export async function updateNewsInSheets(
  id: string,
  news: {
    title: string;
    date: string;
    thumbnail: string;
    content: string;
  }
) {
  try {
    const auth = getAuthClient();
    if (!auth || !process.env.NEWS_SPREADSHEET_ID) {
      throw new Error('Google Sheets API not configured');
    }
    const sheets = google.sheets({ version: 'v4', auth });

    // IDに対応する行を見つける
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.NEWS_SPREADSHEET_ID,
      range: 'Sheet1!A:A',
    });

    const rows = response.data.values || [];
    const rowIndex = rows.findIndex((row) => row[0] === id);

    if (rowIndex === -1) {
      return { success: false, error: 'News not found' };
    }

    // 行番号は1から始まり、ヘッダー行があるため+2
    const rowNumber = rowIndex + 2;

    await sheets.spreadsheets.values.update({
      spreadsheetId: process.env.NEWS_SPREADSHEET_ID,
      range: `Sheet1!B${rowNumber}:E${rowNumber}`,
      valueInputOption: 'RAW',
      requestBody: {
        values: [[news.title, news.date, news.thumbnail, news.content]],
      },
    });

    return { success: true };
  } catch (error) {
    console.error('Error updating news in Google Sheets:', error);
    return { success: false, error };
  }
}

// ニュースデータを削除
export async function deleteNewsFromSheets(id: string) {
  try {
    const auth = getAuthClient();
    if (!auth || !process.env.NEWS_SPREADSHEET_ID) {
      throw new Error('Google Sheets API not configured');
    }
    const sheets = google.sheets({ version: 'v4', auth });

    // IDに対応する行を見つける
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.NEWS_SPREADSHEET_ID,
      range: 'Sheet1!A:A',
    });

    const rows = response.data.values || [];
    const rowIndex = rows.findIndex((row) => row[0] === id);

    if (rowIndex === -1) {
      return { success: false, error: 'News not found' };
    }

    // 行番号は0から始まるため+1
    const rowNumber = rowIndex + 1;

    await sheets.spreadsheets.batchUpdate({
      spreadsheetId: process.env.NEWS_SPREADSHEET_ID,
      requestBody: {
        requests: [
          {
            deleteDimension: {
              range: {
                sheetId: 0, // 最初のシートのID
                dimension: 'ROWS',
                startIndex: rowNumber,
                endIndex: rowNumber + 1,
              },
            },
          },
        ],
      },
    });

    return { success: true };
  } catch (error) {
    console.error('Error deleting news from Google Sheets:', error);
    return { success: false, error };
  }
}

// 演奏会データを追加
export async function addConcertToSheets(concert: {
  title: string;
  date: string;
  location: string;
  thumbnail: string;
  award: string;
  detail: string;
}) {
  try {
    const auth = getAuthClient();
    if (!auth || !process.env.CONCERTS_SPREADSHEET_ID) {
      throw new Error('Google Sheets API not configured');
    }
    const sheets = google.sheets({ version: 'v4', auth });

    // 既存のデータ数を取得してIDを自動生成
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.CONCERTS_SPREADSHEET_ID,
      range: 'Sheet1!A:A',
    });

    const rows = response.data.values || [];
    const newId = String(rows.length);

    await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.CONCERTS_SPREADSHEET_ID,
      range: 'Sheet1!A:G',
      valueInputOption: 'RAW',
      requestBody: {
        values: [[newId, concert.title, concert.date, concert.location, concert.thumbnail, concert.award, concert.detail]],
      },
    });

    return { success: true, id: newId };
  } catch (error) {
    console.error('Error adding concert to Google Sheets:', error);
    return { success: false, error };
  }
}

// 演奏会データを更新
export async function updateConcertInSheets(
  id: string,
  concert: {
    title: string;
    date: string;
    location: string;
    thumbnail: string;
    award: string;
    detail: string;
  }
) {
  try {
    const auth = getAuthClient();
    if (!auth || !process.env.CONCERTS_SPREADSHEET_ID) {
      throw new Error('Google Sheets API not configured');
    }
    const sheets = google.sheets({ version: 'v4', auth });

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.CONCERTS_SPREADSHEET_ID,
      range: 'Sheet1!A:A',
    });

    const rows = response.data.values || [];
    const rowIndex = rows.findIndex((row) => row[0] === id);

    if (rowIndex === -1) {
      return { success: false, error: 'Concert not found' };
    }

    const rowNumber = rowIndex + 2;

    await sheets.spreadsheets.values.update({
      spreadsheetId: process.env.CONCERTS_SPREADSHEET_ID,
      range: `Sheet1!B${rowNumber}:G${rowNumber}`,
      valueInputOption: 'RAW',
      requestBody: {
        values: [[concert.title, concert.date, concert.location, concert.thumbnail, concert.award, concert.detail]],
      },
    });

    return { success: true };
  } catch (error) {
    console.error('Error updating concert in Google Sheets:', error);
    return { success: false, error };
  }
}

// 演奏会データを削除
export async function deleteConcertFromSheets(id: string) {
  try {
    const auth = getAuthClient();
    if (!auth || !process.env.CONCERTS_SPREADSHEET_ID) {
      throw new Error('Google Sheets API not configured');
    }
    const sheets = google.sheets({ version: 'v4', auth });

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.CONCERTS_SPREADSHEET_ID,
      range: 'Sheet1!A:A',
    });

    const rows = response.data.values || [];
    const rowIndex = rows.findIndex((row) => row[0] === id);

    if (rowIndex === -1) {
      return { success: false, error: 'Concert not found' };
    }

    const rowNumber = rowIndex + 1;

    await sheets.spreadsheets.batchUpdate({
      spreadsheetId: process.env.CONCERTS_SPREADSHEET_ID,
      requestBody: {
        requests: [
          {
            deleteDimension: {
              range: {
                sheetId: 0,
                dimension: 'ROWS',
                startIndex: rowNumber,
                endIndex: rowNumber + 1,
              },
            },
          },
        ],
      },
    });

    return { success: true };
  } catch (error) {
    console.error('Error deleting concert from Google Sheets:', error);
    return { success: false, error };
  }
}

// 活動実績データを取得
export async function getHistoryFromSheets() {
  try {
    const auth = getAuthClient();
    if (!auth || !process.env.HISTORY_SPREADSHEET_ID) {
      console.warn('Google Sheets API not configured, returning empty array');
      return [];
    }
    const sheets = google.sheets({ version: 'v4', auth });

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.HISTORY_SPREADSHEET_ID,
      range: 'Sheet1!A2:C', // A列: ID, B列: 日付, C列: イベント
    });

    const rows = response.data.values || [];

    return rows.map((row) => ({
      id: row[0] || '',
      date: row[1] || '',
      event: row[2] || '',
    }));
  } catch (error) {
    console.error('Error fetching history from Google Sheets:', error);
    return [];
  }
}

// 活動実績データを追加
export async function addHistoryToSheets(history: {
  date: string;
  event: string;
}) {
  try {
    const auth = getAuthClient();
    if (!auth || !process.env.HISTORY_SPREADSHEET_ID) {
      throw new Error('Google Sheets API not configured');
    }
    const sheets = google.sheets({ version: 'v4', auth });

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.HISTORY_SPREADSHEET_ID,
      range: 'Sheet1!A:A',
    });

    const rows = response.data.values || [];
    const newId = String(rows.length);

    await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.HISTORY_SPREADSHEET_ID,
      range: 'Sheet1!A:C',
      valueInputOption: 'RAW',
      requestBody: {
        values: [[newId, history.date, history.event]],
      },
    });

    return { success: true, id: newId };
  } catch (error) {
    console.error('Error adding history to Google Sheets:', error);
    return { success: false, error };
  }
}

// 活動実績データを更新
export async function updateHistoryInSheets(
  id: string,
  history: {
    date: string;
    event: string;
  }
) {
  try {
    const auth = getAuthClient();
    if (!auth || !process.env.HISTORY_SPREADSHEET_ID) {
      throw new Error('Google Sheets API not configured');
    }
    const sheets = google.sheets({ version: 'v4', auth });

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.HISTORY_SPREADSHEET_ID,
      range: 'Sheet1!A:A',
    });

    const rows = response.data.values || [];
    const rowIndex = rows.findIndex((row) => row[0] === id);

    if (rowIndex === -1) {
      return { success: false, error: 'History not found' };
    }

    const rowNumber = rowIndex + 2;

    await sheets.spreadsheets.values.update({
      spreadsheetId: process.env.HISTORY_SPREADSHEET_ID,
      range: `Sheet1!B${rowNumber}:C${rowNumber}`,
      valueInputOption: 'RAW',
      requestBody: {
        values: [[history.date, history.event]],
      },
    });

    return { success: true };
  } catch (error) {
    console.error('Error updating history in Google Sheets:', error);
    return { success: false, error };
  }
}

// 活動実績データを削除
export async function deleteHistoryFromSheets(id: string) {
  try {
    const auth = getAuthClient();
    if (!auth || !process.env.HISTORY_SPREADSHEET_ID) {
      throw new Error('Google Sheets API not configured');
    }
    const sheets = google.sheets({ version: 'v4', auth });

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.HISTORY_SPREADSHEET_ID,
      range: 'Sheet1!A:A',
    });

    const rows = response.data.values || [];
    const rowIndex = rows.findIndex((row) => row[0] === id);

    if (rowIndex === -1) {
      return { success: false, error: 'History not found' };
    }

    const rowNumber = rowIndex + 1;

    await sheets.spreadsheets.batchUpdate({
      spreadsheetId: process.env.HISTORY_SPREADSHEET_ID,
      requestBody: {
        requests: [
          {
            deleteDimension: {
              range: {
                sheetId: 0,
                dimension: 'ROWS',
                startIndex: rowNumber,
                endIndex: rowNumber + 1,
              },
            },
          },
        ],
      },
    });

    return { success: true };
  } catch (error) {
    console.error('Error deleting history from Google Sheets:', error);
    return { success: false, error };
  }
}
