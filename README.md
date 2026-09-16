# tolv Design System

tolv の共有デザインシステム。現在は**デザイントークン**を提供し、今後**コンポーネント**も追加していきます。バージョンは Git タグ（semver）＋ GitHub Release で管理し、[jsDelivr](https://www.jsdelivr.com/) 経由でCDN配信します。

📚 **Storybook（コンポーネントカタログ）: https://from086.github.io/tolv-design-system/** — `main` への push で自動更新

## 使い方（jsDelivr）

**必ずバージョンを固定**して参照してください（`@latest` やブランチ参照はキャッシュ反映が遅く非推奨）。

```html
<link rel="stylesheet"
      href="https://cdn.jsdelivr.net/gh/from086/tolv-design-system@v0.1.0/tokens/tokens.css">
```

CSS からは Semantic トークンを参照します。

```css
.button {
  background: var(--color-bg-brand-primary);      /* #12002d */
  color:      var(--color-fg-brand-inverse);       /* #f8f7f9 */
  border-radius: var(--radius-control);            /* 12px */
}
.button:hover { background: var(--color-bg-brand-primary-hover); } /* tolv-navy-800 */
```

## コンポーネント

### Button（`components/button.css`）

`tokens.css` を先に読み込んだうえで参照します（ビルド不要・Light/Dark 自動追従）。

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/from086/tolv-design-system@v0.7.0/tokens/tokens.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/from086/tolv-design-system@v0.7.0/components/button.css">

<button class="tolv-btn tolv-btn--primary">
  <span class="tolv-btn__icon" aria-hidden="true"><!-- svg --></span>
  <span class="tolv-btn__label">ラベル</span>
</button>
```

- **Type**: `--primary`（塗り）/ `--secondary`（ブランド枠）/ `--tertiary`（ニュートラル枠）/ `--quaternary`（テキスト・枠なし）/ `--caution`（警告枠）
- **Size**: 既定=Medium、`--sm`=Small
- **State**: Default / `:hover` / 無効（`disabled` 属性 or `aria-disabled="true"`）
- アイコンは前後どちらも任意。`.tolv-btn__label` の前後に `.tolv-btn__icon` を置く
- 全バリアントは Storybook（下記）または `components/button.demo.html` で確認可能

### Form family（`components/form.css`）

フォーム系コンポーネントを1ファイルにまとめています（共通の入力枠・候補行を共有）。

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/from086/tolv-design-system@v0.7.0/tokens/tokens.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/from086/tolv-design-system@v0.7.0/components/form.css">

<input class="tolv-input" placeholder="テキスト">
```

- **`.tolv-input`** … テキスト入力（`::placeholder`／値／`:disabled`／`.is-error`|`[aria-invalid]`）
- **`.tolv-select`** … 選択（`__control` + `__value` + `__icon` + `__menu`。展開は `.is-open`、無効は `.is-disabled`）
- **`.tolv-search`** … インクリメンタルサーチ（入力で下に SuggestionPanel を表示。`data-suggestions` にマスターデータ配列(JSON)を渡す）
- **`.tolv-suggestion-panel`** … 候補パネル（`__items` の一覧 / `__nodata`＝該当なし＋`__add`「マスターに追加」）
- **`.tolv-search--cell`** … セル型（Cell。白地・アイコン20px。テーブルセル向け）
- **`.tolv-list-item`** … 候補行（`__label` + `__check`、`.is-selected`／`.is-active`（hover）／`.is-disabled`）
- **`.tolv-field`** … FormSet（`__label` + `__support` + `__control-set`（コントロール + `__message`／`--error`／`--success`））
- **`.tolv-time`** … 時刻入力（InputTime。`__seg` × 2 + `__sep` + `__icon`）
- **`.tolv-fixed-value`** … 読み取り専用の値表示（FixedValue）
- **`.tolv-divider`** … 区切り線（`--vertical` で縦）
- 共通: 枠=1px `border-basic-primary`／radius medium、テキスト **14px**（size/xsmall）。Light/Dark 自動追従
- 全状態は Storybook 参照

#### 挙動（`components/form.js`）

Select / Search の開閉・選択・絞り込みは依存なしの `form.js` で付与します（読み込むだけで自動初期化）。

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/from086/tolv-design-system@v0.7.0/components/form.css">
<script src="https://cdn.jsdelivr.net/gh/from086/tolv-design-system@v0.7.0/components/form.js" defer></script>
```

- **Select**: `.tolv-select__control` クリックで開閉、候補クリックで確定 → `tolv:change`（`detail.value`）
- **Search (IncrementalSearch)**: `data-suggestions='["A","B"]'` のマスターデータを入力で絞り込み、下に SuggestionPanel を表示。候補選択で `tolv:select`、0件時は「マスターに追加」で候補に追加＋確定し `tolv:additem` を発火（永続化は利用側）
- 外側クリック / Esc で閉じる
- 動的に追加した要素は `TolvForm.init(親要素)` で再初期化

### Calendar family（`components/calendar.css` + `calendar.js`）

日付ピッカー一式。挙動は依存なしの `calendar.js`（読み込むだけで自動初期化）。

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/from086/tolv-design-system@v0.8.0/components/calendar.css">
<script src="https://cdn.jsdelivr.net/gh/from086/tolv-design-system@v0.8.0/components/calendar.js" defer></script>

<!-- インラインのカレンダー -->
<div data-tolv-calendar data-selected="2026-09-10"></div>
```

- **`.tolv-date-cell`** … 日セル（`:hover`／`.is-selected`／`:disabled`（前後月））
- **`.tolv-calendar`** … カレンダー本体（年Select＋月送り`< >`＋日グリッド＋`削除`/`今日`）。`data-tolv-calendar` で自動描画、または `TolvCalendar.mount(el, {selected, onSelect})`
- **`.tolv-date-select`** … 日付入力トリガー（`YYYY / MM / DD` ＋カレンダーアイコン）。クリックでカレンダーをポップオーバー表示、日選択で確定 → `tolv:datechange`（`detail.value` = `'YYYY-MM-DD'|null`）
- 外側クリック / Esc で閉じる。グリッドは日曜始まり・前後月は非活性

### Controls（`components/controls.css`）

ネイティブ input を装飾したフォームコントロール。

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/from086/tolv-design-system@v0.10.0/components/controls.css">

<label class="tolv-checkbox">
  <input type="checkbox" class="tolv-checkbox__input">
  <span class="tolv-checkbox__box"><span class="tolv-checkbox__mark tolv-checkbox__mark--check"><!-- ✓ --></span><span class="tolv-checkbox__mark tolv-checkbox__mark--minus"><!-- − --></span></span>
  <span class="tolv-checkbox__label">ラベル</span>
</label>
```

- **`.tolv-checkbox`** … チェックボックス（`:checked` / `:indeterminate`（or `.is-indeterminate`）/ `:disabled`）
- **`.tolv-radio`** … ラジオボタン（`__box` + `__dot`。`:checked` / `:disabled`）
- **`.tolv-sort-button`** … 並び替えアイコンボタン（`.is-selected` で濃色、hover 地色。アイコンは asc/desc を利用側で指定）

## 開発（Storybook）

コンポーネントの確認・カタログ化に **Storybook（`@storybook/html-vite`）** を使います。配信物（`tokens.css` / `components/*.css`）はビルド不要のままで、Storybook は開発時の devDependency のみ（CDN 配信には影響しません）。

公開版: **https://from086.github.io/tolv-design-system/**（`main` push で GitHub Actions が自動デプロイ）。ローカルは以下:

```bash
npm install          # 初回のみ
npm run storybook    # 開発サーバ (http://localhost:6006)
npm run build-storybook  # 静的ビルド → storybook-static/
```

- ストーリーは各コンポーネント隣の `*.stories.js`（例: `components/button.stories.js`）
- **ストーリー構成の標準は2本**:
  - **Playground** … `args` + Controls で全組合せを操作（触る用）
  - **Overview** … 全バリアントを1画面に並べたマトリクス（俯瞰・レビュー・回帰確認用）
  - 個別の状態ごとのストーリーは原則作らない（Playground で代替でき、Controls の状態は URL 共有も可能）
- 上部ツールバーの **Theme** で Light / Dark / Auto を切替（`:root[data-theme]` を操作）
- **Accessibility** タブ（addon-a11y）でコントラスト等を確認可能
- 新規コンポーネントは `components/<name>.css` ＋ `components/<name>.stories.js`（Playground + Overview）を追加するだけ

## トークン設計（2層）

```
Layer 1 · Primitive
  ├─ Global : Tailwind v4 全トークン  --color-<palette>-<step> / --spacing-* / --radius-* / --font-* ...
  └─ Brand  : ブランド独自パレット      --color-tolv-navy-50 … 950   （Global と並列）
Layer 2 · Semantic
     実際にUIで使うトークン。Global / Brand どちらのプリミティブも参照する
       --color-fg-*  --color-bg-*  --color-border-*  --radius-card  --radius-control  --font-family-base
```

- **プリミティブを増やす**とき → `tokens/tokens.css` の Global / Brand セクションへ
- **実際に使う値を足す**とき → Semantic セクションへ

出典は Figma `tolv-design-tokens`（`⛔️ tailwindcss` コレクション ＋ Brand コレクション）。Figma Variables を正とし、変更時はこの CSS を同期更新します。

## ディレクトリ構成

```
tolv-design-system/
├─ tokens/tokens.css   … デザイントークン（現行）
├─ components/         … 今後：素のCSS / Web Components はそのまま配信可能
├─ dist/              … 今後：ビルドが必要な成果物（例 React/TS）を置く
├─ package.json       … バージョン（semver）。将来の npm 公開にも備える
└─ CHANGELOG.md
```

### コンポーネント追加時の配信方針
- **ビルド不要**（素のCSS / バニラJS / Web Components）→ `/gh/` でそのまま配信
- **ビルドが必要**（React/TS 等）→ `dist/` に成果物を出力して `/gh/` 配信、または npm 公開（jsDelivr が `/npm/` で自動ミラー）

## リリース手順

```bash
# 1. tokens/components を更新し CHANGELOG に追記
# 2. package.json の version を更新（semver）
# 3. コミット
git commit -am "feat: ..."
# 4. タグを打って push
git tag v0.2.0
git push origin main --tags
# 5. GitHub Release を作成（jsDelivr のバージョン固定URLが利用可能に）
gh release create v0.2.0 --title v0.2.0 --notes-from-tag
```

## ライセンス

© tolv. All rights reserved.（ライセンス方針は未定 / TBD）
