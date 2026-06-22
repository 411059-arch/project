const SPREADSHEET_ID = '1gMxIQBHNXfoF7ZrPL1ir87OK_cFYEJb2Oz3FEk77sRw';
const SHEET_NAME = 'Vocabulary';

function doGet(e) {
  const output = { status: 'ready', message: 'Vocabulary GAS web app is running.' };
  return ContentService.createTextOutput(JSON.stringify(output)).setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  try {
    const payload = e.postData && e.postData.type === 'application/json'
      ? JSON.parse(e.postData.contents)
      : JSON.parse(e.postData.contents || '{}');

    if (!payload.word) {
      throw new Error('缺少 word 欄位');
    }

    const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
    let sheet = spreadsheet.getSheetByName(SHEET_NAME);
    if (!sheet) {
      sheet = spreadsheet.insertSheet(SHEET_NAME);
      sheet.appendRow(['時間', '英文單字', '中文意思', '備註', '來源']);
    }

    const now = new Date();
    sheet.appendRow([
      now,
      payload.word,
      payload.meaning || '',
      payload.note || '',
      payload.source || 'web',
    ]);

    return ContentService.createTextOutput(JSON.stringify({ status: 'success' }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ status: 'error', message: error.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
