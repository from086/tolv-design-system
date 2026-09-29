# Figma 同期用スナップショット

`snapshot.json` は、最後にコードへ反映した時点の Figma（fileKey `lSQ11zWf0XCWps8J8E8u5G`）の指紋です。
「更新したので反映して」と言われたら、同じ方法で指紋を取り直してこのファイルと比べ、
変わったコンポーネント・バリアント・変数だけを詳しく読みに行きます。反映・リリースしたら取り直して上書きします。

- `components.<セット名>.variants.<バリアント名>`: そのバリアントの構造（サイズ・Auto Layout・塗り/線の変数・線の破線・テキスト設定・中のインスタンス）のハッシュ
- `components.<セット名>.props`: プロパティ定義（バリアントの選択肢・真偽/テキスト/スロット）のハッシュ
- `variables`: DS 独自の変数（Tailwind の Global 変数は除く）ごとの、モード別の値（エイリアス先）のハッシュ
- `assets`: ⚙️ Asset ページのアイコンごとの、スタイル（fill / outline）別の形のハッシュ

指紋を取るスクリプト（どちらも `use_figma` にそのまま渡す。読み取りのみ。ページが違うので2つを並行して呼ぶ）:
- `fingerprint.js` … 🛠️ Component ページ＋変数（`components` / `variables`）
- `fingerprint-assets.js` … ⚙️ Asset ページ（`assets`）

アイコンが増えたら `components/_icons.js` に追加し、Storybook の Foundations/Icons で表示を確認する。
