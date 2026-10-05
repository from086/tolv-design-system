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

### サイズの基本ルール（Figma の各コンポーネントの Description「Spec」）

幅は原則 **親要素の幅で決まる**ので、使う側は置き場所（親要素）の幅を決めます。高さはどれも中身に合わせて決まります（TextArea を除く）。

| コンポーネント | 幅 | 高さ | 変更の仕方 |
| --- | --- | --- | --- |
| InputText / Select / IncrementalSearch / Cell | 親の幅いっぱい or px 指定 | 中身に合わせる | 親要素の幅、または `style="width:200px"` |
| TextArea | 親の幅いっぱい or px 指定 | px 指定（既定 120px） | `style="height:…"` |
| Record / TableBar | 親の幅いっぱい | 中身に合わせる | — |
| Container | 親の幅いっぱい | 中身に合わせる | 親要素の幅 |
| SelectPanel / SuggestionPanel | 親（Select・入力欄）の幅（既定）。**最小幅 = 中身の幅** | 中身に合わせる（最大 320px でスクロール） | px 指定、`--tolv-panel-max-height` |

Container の中身（Slot）は「幅いっぱい・高さは中身に合わせる・はみ出しは切る」で、**縦並び・左上寄せ・間隔 0px** が既定です（下記 Container 参照）。各ストーリーの **Docs** ページにも同じ Spec を載せています。

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
- **Size**: 既定=Medium（16/24・アイコン24px）、`--sm`=Small（14/20・アイコン20px）
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

- **`.tolv-input`** … テキスト入力（`::placeholder`／値／`:disabled`／`.is-error`|`[aria-invalid]`）。数値入力は **`--number`**（等幅・右寄せ・桁そろえ。`inputmode="decimal"` 推奨、`type="number"` でも増減ボタンは出ない）
- **`.tolv-textarea`** … 複数行テキスト入力（`<textarea>`。InputText と同じ枠と状態、既定の高さ 120px・縦にリサイズ可）
- **`.tolv-select`** … 選択（`__control` + `__value` + `__icon` + 選択肢パネル。展開は `.is-open`、無効は `.is-disabled`）。開くと **SelectPanel がフィールドの 4px 下に重なって表示**される（枠内には広げない）。パネルの幅は **Select と同じ**で、選択肢がそれより長いときは**省略せずに中身の幅まで広がる**（幅の狭い Select でも選択肢が読める）。画面の右寄りに置く場合は **`.tolv-select--align-end`** を付けると右端そろえで開く
- **`.tolv-select-panel`** … Select の選択肢パネル（`.tolv-list-item` の一覧、選択中はチェック）。Select 内では `class="tolv-select-panel tolv-select__menu"` と併記する。高さは中身に合わせ、**最大 320px** を超えるとパネル内でスクロール（`--tolv-panel-max-height` で変更可）
- **`.tolv-search`** … インクリメンタルサーチ（入力で下に SuggestionPanel を表示。`data-suggestions` にマスターデータ配列(JSON)を渡す）。パネルの幅は入力欄と同じで、候補や「マスターに追加」がそれより長いときは**折り返さずに中身の幅まで広がる**
- **`.tolv-suggestion-panel`** … 候補パネル（`__items` の一覧 / `__nodata`＝該当なし＋`__add`「マスターに追加」）。最大 320px でスクロール（SelectPanel と同じ）
- **`.tolv-search--cell`** … 検索セル（`.tolv-search` の白地バリアント）
- **`.tolv-list-item`** … 候補行（`__label` + `__check`、`.is-selected`／`.is-active`（hover）／`.is-disabled`）
- **`.tolv-field`** … FormSet（`__label` + `__support` + `__control-set`（コントロール + `__message`／`--error`／`--success`））。コントロール直下のメッセージ領域（20px）は**メッセージがなくても確保**される
- **`.tolv-time`** … 時刻入力（InputTime。`__seg` × 2 + `__sep` + `__icon`）
- **`.tolv-fixed-value`** … 読み取り専用の値表示（FixedValue）
- **`.tolv-divider`** … 区切り線（`--vertical` で縦）。線の前後に 8px の余白を持つ
- 共通: 枠=1px `border-basic-primary`／radius medium、テキスト **14px**（size/xsmall）。Light/Dark 自動追従
- 全状態は Storybook 参照

#### 挙動（`components/form.js`）

Select / Search の開閉・選択・絞り込みは依存なしの `form.js` で付与します（読み込むだけで自動初期化）。

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/from086/tolv-design-system@v0.7.0/components/form.css">
<script src="https://cdn.jsdelivr.net/gh/from086/tolv-design-system@v0.7.0/components/form.js" defer></script>
```

- **Select**: `.tolv-select__control` クリックで SelectPanel を開閉、候補クリックで確定して閉じる → `tolv:change`（`detail.value`）
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
- **`.tolv-trailing-icon-button`** … 末尾アイコンボタン（20px アイコン＋hover 地色。arrow-down/up・Info・Help 等を利用側で指定）。**Help は `--secondary`（グレー）** を付ける

### Text（`components/text.css`）

見出し／本文。`h1/h2/h3` には末尾に `.tolv-trailing-icon-button` を置ける。

```html
<span class="tolv-text tolv-text--h2">
  <span class="tolv-text__label">見出し</span>
  <button class="tolv-trailing-icon-button tolv-trailing-icon-button--secondary" aria-label="ヘルプ"><!-- ? svg --></button>
</span>
```

- **`.tolv-text--h1|h2|h3`**（Bold、30/44・20/32・16/24）/ **`--body|caption`**（Medium）
- 文字色 **`--primary|secondary|brand|caution|success`**（未指定なら Type の既定色）
- 任意で先頭アイコン `.tolv-text__leading-icon`（h1 は 32px・gap 8、他は 20px・gap 4）、末尾 `.tolv-trailing-icon-button`（`controls.css`）

### Table（`components/table.css`）

テーブルのセルと行。

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/from086/tolv-design-system@v0.11.0/components/table.css">
```

- **`.tolv-cell`** … テーブルセル。`--head`（太字＋並び替え）/ 既定（値）/ `--editable`（hover・フォーカスで編集ボタン）/ `.is-edit`（下記）
  - **`--editable`** は値の直後に CellActionButton（Edit）を置く。hover / フォーカス時だけ表示
  - **`.is-edit`** は入れ物（InputSlot）。先頭に Form 系コンポーネント（`.tolv-input` / `.tolv-select` / `.tolv-date-select` / `.tolv-time`）、続けて CellActionButton の Undo・Submit を置く（入力とボタン群の間 4px、ボタン同士は 0）。エラーは中の入力側で表す（`.tolv-input.is-error` など）
- **`.tolv-cell-action-button`** … Cell 用アイコンボタン（32×32）。`--edit`（鉛筆・グレー）/ `--undo` / `--submit`（確定・緑。白地＋緑枠）。hover で地色、`disabled` でアイコンが Disabled 色

```html
<!-- Hover（編集可） -->
<div class="tolv-cell tolv-cell--editable">
  <span class="tolv-cell__value">テキスト</span>
  <button type="button" class="tolv-cell-action-button tolv-cell-action-button--edit" aria-label="編集"><!-- stylus svg --></button>
</div>

<!-- Edit -->
<div class="tolv-cell is-edit">
  <input class="tolv-input" value="テキスト">
  <button type="button" class="tolv-cell-action-button tolv-cell-action-button--undo" aria-label="元に戻す"><!-- undo svg --></button>
  <button type="button" class="tolv-cell-action-button tolv-cell-action-button--submit" aria-label="確定" disabled><!-- check svg --></button>
</div>
```
- **`.tolv-record`** … テーブル行。`--header`（見出し・濃ボーダー）/ 既定（CheckBox＋内容＋`詳細`ボタン）/ `.is-selected`（選択地色＋チェック）
  - `詳細` ボタン（`.tolv-record__action` > `.tolv-record__action-inner`）は **sticky で右端に固定**（Record 群を `overflow-x:auto` のコンテナで囲むと、横スクロール中も常に右端に表示され Slot に重なる）
- CheckBox は `controls.css`、詳細ボタンは自前スタイル。編集の開始/確定などの挙動は利用側で実装
- **`.tolv-pager`** … ページ送り（前へ / 件数 / 次へ、間隔 16px）。ボタンは Button Small Tertiary のアイコンのみ、数字は Number body、「-」「/」は Text body（`button.css` / `number.css` / `text.css` も読み込む）。端のページではボタンを `disabled` に。ページ移動の挙動は利用側で実装
- **`.tolv-table-bar`** … テーブル上部のバー。`__leading`（残り幅いっぱい）/ `__trailing`（内容幅・右寄せ）/ Pager を 16px 間隔で並べる（スロット内は 8px 間隔）

```html
<div class="tolv-table-bar">
  <div class="tolv-table-bar__leading">
    <span class="tolv-text tolv-text--body tolv-text--secondary">未選択</span>
  </div>
  <div class="tolv-table-bar__trailing">
    <div class="tolv-select tolv-select--align-end" style="width:120px"><!-- 表示件数の Select（右寄りなので右端そろえで開く） --></div>
  </div>
  <nav class="tolv-pager" aria-label="ページ送り">
    <button type="button" class="tolv-btn tolv-btn--sm tolv-btn--tertiary" aria-label="前へ" disabled><span class="tolv-btn__icon"><!-- arrow-left svg --></span></button>
    <span class="tolv-pager__counter">
      <span class="tolv-number tolv-number--body">1</span><span class="tolv-text tolv-text--body">-</span>
      <span class="tolv-number tolv-number--body">100</span><span class="tolv-text tolv-text--body">/</span>
      <span class="tolv-number tolv-number--body">2,000</span>
    </span>
    <button type="button" class="tolv-btn tolv-btn--sm tolv-btn--tertiary" aria-label="次へ"><span class="tolv-btn__icon"><!-- arrow-right svg --></span></button>
  </nav>
</div>
```

### Number（`components/number.css`）

等幅（Noto Sans Mono）の数値表示。

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/from086/tolv-design-system@v0.13.0/components/number.css">
```

```html
<span class="tolv-number tolv-number--h1 tolv-number--plus">1,234</span>
<span class="tolv-number tolv-number--body tolv-number--minus">-567</span>
```

- サイズ **`--h1`**(30/44) / **`--h2`**(20/32) / **`--body`**(16/24) / **`--caption`**(14/20)
- 符号色 **`--plus`**（基本色）/ **`--minus`**（Caution 赤）。`tabular-nums` で桁揃え

### Container / DropArea（`components/container.css`）

要素を包む枠と、ドラッグ&ドロップ領域。

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/from086/tolv-design-system@v0.13.0/components/container.css">
```

- **`.tolv-container`** … `base`（枠なし）/ **`--primary`**（白地＋基本境界）/ **`--secondary`**（強調境界）。角丸 large 既定、**`--square`** で角丸なし
  - 幅は親の幅いっぱい（置き場所の幅で決める）。高さは中身に合わせる
  - 中身は **縦並び・左上寄せ・間隔 0px**（既定）。横並びは **`--row`**、中央寄せは **`--center`**、間隔は `--tolv-container-gap` で変更

```html
<div class="tolv-container tolv-container--primary" style="--tolv-container-gap: 8px">
  <span class="tolv-text tolv-text--h3"><span class="tolv-text__label">見出し</span></span>
  <span class="tolv-text tolv-text--body"><span class="tolv-text__label">本文</span></span>
</div>
```
- **`.tolv-drop-area`** … ドロップ領域（地色 bg-basic-secondary＋強調色の 1px 破線枠、radius large・余白なし）。**幅・高さは利用側で指定**（Figma は Fixed）。中身は全面に広がり縦並び・中央寄せ。**`--square`** で角丸なし

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
