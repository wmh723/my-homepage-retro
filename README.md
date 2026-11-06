# Havery Legacy Homepage

一個參考 havery homepage 截圖製作的復古風格個人網站模板。採用靜態 HTML + CSS + ES3 JavaScript，無需 Node.js、框架或建置工具。

## 重要相容性說明

- 以 HTML 4.01 Transitional、傳統 CSS 版面與 ES3 JavaScript 為基礎。
- 避免 Flexbox、Grid、CSS 變數、箭頭函式、`let`/`const`、`fetch`、`Promise`、`querySelector` 等較新的功能。
- 目標是盡量兼容 IE6、Firefox 8、Opera 9；但不保證所有環境完全一致。IE6 對 HTTPS、現代 TLS、字型與部分 CSS 的支援很有限。
- Markdown 解析器支援標題、段落、粗體、斜體、行內程式碼、連結、圖片、清單、引用、水平線及程式碼區塊；不是完整 CommonMark/GFM，不支援表格與複雜擴充語法。
- 網站需透過 HTTP/HTTPS 伺服器開啟。文章由 XMLHttpRequest 讀取 `.md`，不要直接雙擊 `post.html` 使用 `file://`。

## 修改網站

1. 編輯 `assets/config.js`：網站名稱、首頁標題、個人介紹、年份、社交連結。
2. 編輯 `posts/welcome.md` 等檔案：文章內容使用 Markdown。
3. 新增文章時：
   - 在 `posts/` 新增例如 `my-note.md`。
   - 在 `assets/config.js` 的 `POSTS` 陣列新增 `{ id: "my-note", title: "文章標題", date: "2026-11-05", tags: "分類", summary: "摘要" }`。
4. 將整個資料夾上傳至支援靜態檔案的主機即可。

## 部署到 GitHub Pages

將此資料夾內容放入 GitHub Pages 儲存庫根目錄，確認首頁檔名為 `index.html`，再提交並推送。GitHub Pages 可直接託管這些靜態檔案。

## 目錄

- `index.html`：首頁
- `blog.html`：文章列表
- `post.html`：文章閱讀頁
- `about.html`：個人介紹
- `assets/config.js`：網站設定與文章索引（只在新增文章或修改標題、日期等資料時編輯）
- `assets/site.js`：頁面功能（一般寫文章不需要修改）
- `assets/markdown.js`：Markdown 解析器
- `assets/style.css`：復古風格
- `posts/*.md`：Markdown 文章


## Markdown 文章如何載入

文章正文直接由 `post.html` 透過 XMLHttpRequest 讀取 `posts/文章ID.md`。不再使用 `assets/posts.js`，也不需要把 Markdown 正文複製到 JavaScript。

**修改既有文章：** 只編輯 `posts/文章ID.md`。

**新增文章：** 新增 `posts/新文章ID.md`，再於 `assets/config.js` 的 `POSTS` 陣列新增標題、日期、分類及摘要等索引資料。正文仍只寫在 `.md` 檔。

注意：由於瀏覽器安全限制，請透過 GitHub Pages 等 HTTP/HTTPS 網址查看文章；直接雙擊 HTML（`file://`）可能無法載入 Markdown。
