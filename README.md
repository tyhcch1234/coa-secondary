# 香港中學資助則例 · 導讀

《中學資助則例》（Code of Aid for Secondary Schools，1994 年 9 月）的中文整理網站。
把教育局只有英文版本的 126 頁 PDF，重編成 10 個章節、可搜尋的中文導讀，並補上與中學相關的指引與表格清單。

## 內容

| 頁面 | 主題 |
|---|---|
| `index.html` | 總覽、全書結構、關鍵數字、章節導覽 |
| `intro.html` | Part I（S.1–6）法律地位、授權鏈、增設校董、審計與廉署查閱權 |
| `grants.html` | Part II（S.7–18、S.19–42）津貼種類、減扣機制、學費堂費、五類經常性津貼、保險 |
| `staffing.html` | 附錄二及三：師班比、95 行編制對照表（可查詢）、薪級表、署任津貼 |
| `personnel.html` | S.48–65：聘任批准權、體檢、合約十項條款、終止聘用、退休、晉升、公積金 |
| `leave.html` | S.25–33 及附錄十一至十三 D：病假、產假、侍產假、年假、代課與替假 |
| `accounts.html` | S.66–75 及附錄十四至十九：OEBG、CFEG、採購門檻、帳簿、審計 |
| `schooladmin.html` | S.43–47 及附錄一：收生、停學與開除、假期 90 天、颱風暴雨 |
| `appendices.html` | 二十個附錄逐項詳解 |
| `resources.html` | 相關指引與表格清單、採購程序指引要點 |
| `reference.html` | 95 項條文索引（S.1–75、A.1–20），可即時搜尋 |

## 技術

純靜態網站，無建置步驟、無外部依賴（除 Google Fonts）。
字體載入失敗時自動退回系統中文字體。

```
site/
├── index.html
├── intro.html … reference.html
└── assets/
    ├── style.css
    └── app.js      # 側欄導覽、編制查詢、索引搜尋、目錄 scrollspy
```

## 本機預覽

```bash
cd site
python3 -m http.server 8000
# 瀏覽 http://localhost:8000
```

## 部署到 GitHub Pages

```bash
# 1. 在 GitHub 建立 repo（例如 coa-secondary），不要初始化 README
# 2. 把 site/ 的內容推到 repo 根目錄
cd site
git init
git add .
git commit -m "香港中學資助則例導讀"
git branch -M main
git remote add origin https://github.com/<你的帳號>/<repo>.git
git push -u origin main
```

然後在 repo 的 **Settings → Pages**：
- Source 選 `Deploy from a branch`
- Branch 選 `main`、資料夾選 `/ (root)`
- 儲存後約 1 分鐘，網址為 `https://<你的帳號>.github.io/<repo>/`

### 用子路徑部署的注意事項

所有連結都是**相對路徑**（`assets/style.css`、`intro.html`），因此放在
`username.github.io/repo/` 這種子路徑下可直接運作，無需修改。

## 資料來源

| 文件 | 連結 |
|---|---|
| 中學資助則例（1994 年 9 月，英文，126 頁） | [coa_sec_e.pdf](https://www.edb.gov.hk/attachment/en/sch-admin/regulations/codes-of-aid/coa_sec_e.pdf) |
| 相關指引和表格（英文，149 頁） | [coa_ag_e.pdf](https://www.edb.gov.hk/attachment/en/sch-admin/regulations/codes-of-aid/coa_ag_e.pdf) |
| 教育局「資助則例」專頁 | [edb.gov.hk](https://www.edb.gov.hk/tc/sch-admin/regulations/codes-of-aid/index.html) |

## 免責

本網站為**非官方**整理，內容經翻譯與濃縮，可能與原文有出入，不具法律效力。
一切以教育局英文原文及現行通函為準。金額、費率、表格版本每年更新，
執行前請查閱教育局最新通函。

## 授權

內容整理可自由轉載作教育用途，請保留出處連結。
原文版權屬香港特別行政區政府教育局所有。
