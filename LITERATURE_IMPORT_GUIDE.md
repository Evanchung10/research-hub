# Literature Import Guide

## 使用時機

當使用者說「請啟動研究文獻模式」時，依本流程處理新的研究文獻或研究總站更新。

若使用者沒有說出完整啟動句，但提到以下意圖，也應視為啟動本流程：

- 匯入新的研究文獻。
- 把文獻放進研究資料庫。
- 做成和 C1 / Design Ethics 類似的文獻導讀頁。
- 更新 `research.talentostudio.com` 的文獻索引。
- 依照研究總站格式整理 PDF、翻譯、導讀、錄音或筆記。
- 新增一篇可連回研究總站的單篇文獻網站。

## 啟動確認

偵測到啟動意圖後，必須先詢問使用者是否確認啟動。未取得確認前，不要開始讀取專案文件、分析文獻或修改檔案。

確認句可使用：

```text
是否確認啟動研究文獻模式？
```

使用者明確同意後，再讀取 `PROJECT_CONTEXT.md` 與本檔，並依流程執行。

## 輸入資料

常見輸入可能包含：

- 英文或原文 PDF。
- 翻譯 PDF 或既有翻譯文字。
- 精讀導讀 Markdown。
- 錄音逐字稿、批判分析筆記或課堂報告稿。
- 文獻所屬研究題目。

若資料不足，先完成可確認的部分，並明確列出缺口。

## 單篇文獻頁輸出

單篇文獻頁應優先延續 C1 網站模式：

- 英文原文逐段呈現。
- 段落下方可切換「白話意譯」與「原文譯文」。
- 右側或窄版段落下方顯示旁註。
- 旁註包含重點、批判補充、引用定位、個人筆記、個人標籤、閱讀狀態。
- 標註與筆記保存於 localStorage，並支援匯出／匯入。

## 研究總站資料

新增文獻時，更新 `assets/data.js` 的 `literature` 陣列。每筆資料建議包含：

```js
{
  id: "stable-literature-id",
  topicIds: ["mozi-design-ethics"],
  title: "Original Title",
  translatedTitle: "繁中題名",
  authors: ["Author A", "Author B"],
  year: "2026",
  type: "journal-article",
  status: "reading",
  tags: ["設計倫理", "公共利益"],
  summary: "文獻核心摘要。",
  relevance: "此文獻與研究題目的關係。",
  citation: "完整引用格式。",
  links: [
    { label: "深度導讀頁", url: "https://example.talentostudio.com" }
  ]
}
```

## 閱讀狀態

固定使用以下狀態：

- `unread`：未讀
- `reading`：閱讀中
- `reviewed`：已讀完
- `to-cite`：待引用
- `cited`：已引用

## 標籤規則

- 公開標籤放在研究總站 `assets/data.js`。
- 個人標籤放在單篇文獻頁 localStorage。
- 個人標籤輸入可使用 hashtag，例如 `#兼愛 #節用`。
- 儲存時應正規化為不含 `#` 的乾淨字串陣列。
- 顯示時可補回 `#`。

## 部署邊界

- 研究總站更新：`github_deploy/research-hub`
- C1 單篇文獻更新：`github_deploy/design-ethics-c1`
- 未經使用者確認，不要 push 到 GitHub。
- 若要推送，先說明會更新哪個 repo，以及可能影響哪個正式網址。
