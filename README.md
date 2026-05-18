# Research Hub

這是 `research.talentostudio.com` 的研究總站靜態網站。

## 網站定位

- 研究總站：整理研究題目、文獻索引、閱讀狀態與標籤。
- 單篇文獻頁：保留原文、翻譯、旁註、個人筆記與標註。

目前第一筆文獻連到：

```text
https://design-ethics.talentostudio.com
```

## 檔案結構

- `index.html`：研究總站首頁。
- `assets/data.js`：研究主題、文獻資料、標籤與閱讀狀態。
- `assets/app.js`：篩選、搜尋與文獻卡片渲染。
- `assets/styles.css`：版面與響應式樣式。
- `netlify.toml`：Netlify 靜態部署設定。

## Netlify 設定

連接 GitHub repo 後，Netlify build settings 使用：

```text
Build command: 留空
Publish directory: .
```

預計正式網域：

```text
https://research.talentostudio.com
```

## 更新流程

本機確認後提交並推送：

```bash
git add .
git commit -m "Update research hub"
git push
```

Netlify 會自動從 GitHub 重新部署。
