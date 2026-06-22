# 背單字網頁專案

這是一個可以查詢英文單字中文意思並儲存到 Google Sheet 的簡易網頁專案。

## 內容說明

- `index.html`：前端單字查詢頁面
  - 輸入英文單字
  - 呼叫翻譯 API 自動取得中文意思
  - 顯示查詢結果與本地記錄
  - 可將資料 POST 到 Apps Script Web App

- `gas/Code.js`：Google Apps Script 程式
  - `doGet`：測試 Web App 是否正常
  - `doPost`：接收前端 JSON 資料，寫入指定 Google 試算表

- `gas/appsscript.json`：Apps Script 部署設定

## 使用說明

1. 開啟 `index.html`
2. 在「英文單字」欄位輸入單字，例如 `practice`
3. 按「取得中文意思」
4. 如果要保存到 Google Sheet，請輸入 GAS Web App URL
5. 按「儲存到 Google Sheet」

## Google Apps Script 部署步驟

1. 開啟 Google Drive，建立新的 Google 試算表
2. 記下試算表 ID，格式為 `https://docs.google.com/spreadsheets/d/1gMxIQBHNXfoF7ZrPL1ir87OK_cFYEJb2Oz3FEk77sRw/edit`
3. 開啟 Apps Script 編輯器，建立新專案
4. 將 `gas/Code.js` 內容貼入主程式
5. 將 `YOUR_SPREADSHEET_ID` 換成步驟 2 的試算表 ID
6. 在 Apps Script 中部署為 Web App
   - 版本：建立新版本
   - 執行身份：我自己
   - 存取權限：任何人，包括匿名者（Anyone, even anonymous）
7. 取得部署後的 Web App URL，貼到 `index.html` 的 GAS URL 欄位

## 程式說明

### 前端 `index.html`

- 使用 `fetch` 呼叫 MyMemory 翻譯 API：
  `https://api.mymemory.translated.net/get?q=...&langpair=en|zh-TW`
- 解析回傳內容，擷取中文翻譯並顯示在頁面上
- 儲存按鈕會把資料以 JSON POST 到 GAS Web App

### GAS `gas/Code.js`

- `SPREADSHEET_ID`：請改成你的試算表 ID
- `SHEET_NAME`：預設工作表名稱為 `Vocabulary`
- 如果表單不存在，程式會自動建立並加上標題行
- 儲存欄位：時間、英文單字、中文意思、備註、來源

## 注意事項

- 若 `index.html` 在本機端直接開啟，翻譯與儲存功能仍可正常運作
- 若要跨網域呼叫 GAS，Google Web App 部署權限需開啟給匿名使用
- 若翻譯結果不準，可自行修改輸入單字或使用其他 API
