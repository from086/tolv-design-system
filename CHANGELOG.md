# Changelog

このプロジェクトは [セマンティックバージョニング](https://semver.org/lang/ja/) に従います。

## [0.11.1] - 2026-09-16
### Fixed
- **アイコンを Figma の実アセット（Asset/Icon/*）に統一**。手描きの線ベースから塗りベース（viewBox 20/14）へ差し替え
  - 配信物: `calendar.js`（月送り arrow-left/right、date_edit）/ `calendar.css`（年Select の chevron）/ `form.js`（add）
  - Storybook 共通アイコン `_icons.js`: search / chevron(arrow-down/left/right) / close / check / add / pencil(stylus) / clock(time) / sort(asc/desc) / calendar / information / error に統一
  - FormSet のメッセージアイコンを修正（ヒント=information / エラー=error / Applied=check）

## [0.11.0] - 2026-09-16
### Added
- **Table**（新規 `components/table.css`）出典: Figma 🛠️ Component ページ
  - `.tolv-cell`（テーブルセル: Head/Default/Hover(編集可)/Edit/Error）
  - `.tolv-record`（テーブル行: Header/Default/Selected。CheckBox＋内容＋詳細ボタン＋右端フェード）
- Storybook: Cell（テーブル版に刷新）/ Record を追加

### Notes
- 旧 Cell（`.tolv-search--cell`、検索セル）は `form.css` に温存。テーブルセルは新しい `.tolv-cell`
- これで Figma Component ページの新規・更新は一通り反映済み（Text h3 / icon Large 等の純タイポ・アイコンプリミティブは各利用箇所で対応）

## [0.10.0] - 2026-09-16
### Added
- **Button `--quaternary`**（テキストボタン・枠なし。透明地 / hover=basic-primary-hover）
- **Controls**（新規 `components/controls.css`）出典: Figma 🛠️ Component ページ
  - `.tolv-checkbox`（False/True/Indeterminate × Default/Hover/Disabled、ネイティブ input）
  - `.tolv-radio`（False/True × Default/Hover/Disabled）
  - `.tolv-sort-button`（並び替えアイコンボタン、`.is-selected` / hover）
- Storybook: CheckBox / RadioButton / SortButton、Button に Quaternary

### Changed
- **トークン `--color-bg-basic-primary-hover` を neutral-50→neutral-100(#f5f5f5)**（Figma 準拠・Light のみ。ListItem hover / Button Tertiary・Quaternary hover / CheckBox・Radio hover が対象）

### Notes
- 残りの新規（Record / Cell テーブル版）は次バッチで対応予定

## [0.9.0] - 2026-09-16
### Added
- **SuggestionPanel**（`.tolv-suggestion-panel`、`components/form.css`）出典: Figma 🛠️ Component ページ
  - `__items`（マスターデータ一覧）/ `__nodata`（該当なし＋`__add`「マスターに追加」）

### Changed
- **IncrementalSearch の挙動を刷新**：インラインメニューを廃止し、入力でフローティングの SuggestionPanel を表示
  - `data-suggestions`（JSON配列）のマスターデータを入力文字列で絞り込み表示
  - 候補選択で入力欄へ確定し `tolv:select` を発火
  - 一致0件で「該当する項目がありません」＋「マスターに追加」を表示。追加で候補に加えて確定し `tolv:additem` を発火（永続化は利用側）
  - 末尾アイコンは値の有無で虫めがね⇄×（`.is-filled`）
- `.tolv-search` を `position: relative` 化（ポップオーバー配置）。Cell の旧インラインメニューは `.tolv-search--cell` で温存

### Notes
- 今回のスコープは IncrementalSearch 一式のみ。Figma の他の新規（Button Quaternary / CheckBox / RadioButton / SortButton / Record / Cell 更新 等）は次回

## [0.8.1] - 2026-09-15
### Changed
- **CalendarPanel**: CalendarSet の幅・余白を Figma に合わせて調整（ヘッダーを space-between、年Select=100px 固定、月ラベル=44px、Actions ボタン=48px 固定、Set の gap を 8px に）
- **DateSelect=150px / InputTime=100px** に幅を固定

### Fixed
- **DateSelect**: カレンダーの月・年を変更してもポップオーバーが閉じないように（パネル内クリックの伝播を停止）
- **InputTime**: 入力を数字のみ・時=0〜23／分=0〜59 に制限（`data-max` で上書き可、blur で 2 桁補完）

## [0.8.0] - 2026-09-15
### Added
- **Calendar family**（`components/calendar.css` + `calendar.js`、依存なし）出典: Figma 🛠️ Component ページ
  - `.tolv-date-cell`（DateCell: Default/hover/Selected/Disabled）
  - `.tolv-calendar`（CalendarPanel: 年Select＋月送り＋日グリッド＋削除/今日。`data-tolv-calendar` 自動描画 / `TolvCalendar.mount`）
  - `.tolv-date-select`（DateSelect: `YYYY/MM/DD`＋カレンダーをポップオーバー。日選択で `tolv:datechange`）
  - グリッドは日曜始まり・前後月は非活性、外側クリック/Escで閉じる
- Storybook: DateCell / CalendarPanel / DateSelect のストーリー

### Changed
- **トークン `--color-fg-basic-primary-disabled` を neutral-300(#d4d4d4)→neutral-400(#a1a1a1)**（Figma 準拠。DateCell/ListItem の Disabled が対象）。※Light のみ変更、Dark は据え置き

## [0.7.0] - 2026-09-15
### Added
- **トークン**: `--font-size-xsmall`(14px) / `--line-height-xsmall`(20px)、`--color-fg-success-primary`（Light=green-600 / Dark=green-400）
- **Button**: `--tertiary`（ニュートラル枠。白地 + basic-primary 枠 + brand-primary 文字）
- **Form family 新規**（`components/form.css`）
  - `.tolv-search--cell`（Cell。白地・アイコン20px）
  - `.tolv-time`（InputTime。HH:MM セグメント + 時計アイコン）
  - `.tolv-fixed-value`（FixedValue。読み取り専用の値表示）
  - `.tolv-divider`（Divider。横 / `--vertical` 縦）
  - `.tolv-field__message--success`（FormValidation の Applied。緑）
- Storybook: Cell / InputTime / FixedValue / Divider のストーリー、Button に Tertiary、FormSet に Applied を追加

### Changed
- **フォームのテキストを 12px→14px に変更**（Figma で InputText/Regular が size/min→size/xsmall に更新）。InputText/Select/Search/ListItem/FormSet ラベル等に波及
- Select/Input のプレースホルダー色を `fg-basic-primary-disabled`(#d4d4d4)→`fg-basic-secondary`(#737373) に（Figma の Unset 準拠）

## [0.6.0] - 2026-09-08
### Added
- **Form behavior**（素のJS `components/form.js`、依存なし）
  - `.tolv-select`: クリックで開閉 / 候補クリックで選択・確定（`tolv:change`）/ 外側クリック・Escで閉じる
  - `.tolv-search`: フォーカス/入力で候補表示・インクリメンタル絞り込み / 選択で確定（`tolv:select`）/ ×でクリア
  - プログレッシブエンハンス（読み込むだけで自動初期化、動的追加は `TolvForm.init(root)`）
- `.tolv-search__input`（入力可能な検索フィールド用スタイル）

### Fixed
- `.tolv-list-item[hidden]` を追加し、`display:flex` が `[hidden]` を上書きして絞り込み非表示が効かない問題を解消

## [0.5.0] - 2026-09-08
### Added
- **Form family**（素のCSS `components/form.css`）出典: Figma 🛠️ Component ページ
  - `.tolv-input`（InputText: Default/Inputed/Disabled/Error、`::placeholder`）
  - `.tolv-select`（Select: 閉/開`.is-open`/無効`.is-disabled`、候補メニュー）
  - `.tolv-search`（IncrementalSearch: 虫めがね⇄×、候補リスト）
  - `.tolv-list-item`（ListItem: Default/Hover`.is-active`/Selected/Disabled）
  - `.tolv-field`（FormSet: ラベル + 補足 + コントロール + バリデーション、`--error`）
  - 共通枠 = 1px border-basic-primary / radius medium、テキスト 12px Medium、Light/Dark 自動追従
- Storybook に各コンポーネントの Playground + Overview ストーリーを追加（`components/*.stories.js`）

### Notes
- Select/Search の開閉トグルは CSS の状態クラス（`.is-open`）で表現。実際の開閉ワイヤリングは利用側の軽量JSに委ねる
- バリデーションメッセージは通常=グレー（`fg-basic-secondary`）/ エラー=赤（`fg-caution-primary`）の2種（Figma準拠）

## [0.4.0] - 2026-08-05
### Added
- **Button コンポーネント**（素のCSS `components/button.css`）出典: Figma Component ページ Button (3616:1721)
  - Size: Medium(既定)/Small、Type: Primary/Secondary/Caution、State: Default/Hover/Disabled、前後アイコン任意
  - セマンティックトークンのみ参照し Light/Dark 自動追従。`components/button.demo.html` に全バリアントのデモ
- **Semantic 背景 Tertiary**（出典: Figma ⛔️ Token）
  - `--color-bg-brand-tertiary`（Default=white / Hover=tolv-navy-50 / Disabled=transparent）
  - `--color-bg-caution-tertiary`（Default=white / Hover=red-50 / Disabled=transparent）
  - Secondary/Caution ボタンの地色として使用

### Changed
- **Light**: `--color-bg-brand-secondary` を tolv-navy-200→**100**、`-hover` を 300→**200**（1段明るく／Figma追従）
- **Light**: `--color-bg-caution-secondary-hover` を red-50→**red-200**（Hover を暗く／Default との整合）
- **Dark**: Figma Dark フレーム（`3623:5015`）を正として secondary のプレースホルダー値を修正
  - `bg-brand-secondary` navy-800→**900**、`-hover` navy-300→**800**
  - `bg-caution-secondary-hover` red-950→**red-800**

### Notes
- 新規 Tertiary の Dark 値は Figma Dark フレーム（`3623:5015`）で確定：brand/caution とも Default=black / Hover=tint-950。ダーク全項目が Figma と一致することを確認済み

## [0.3.0] - 2026-08-05
### Added
- **Semantic タイポグラフィ**（出典: Figma Font セクション `3624:5754`）
  - `--font-sans`（Noto Sans JP）/ `--font-mono`（Noto Sans Mono）※Semantic Sans は Global の Inter とは別
  - `--font-size-min|small|medium|large|xlarge`（12/16/18/20/30px）
  - `--line-height-min|small|medium|large|xlarge`（18/24/28/32/44px）
  - `--font-family-base` を Semantic Sans（Noto Sans JP）参照に変更
- **Opacity 中間値** `--opacity-medium: 50%` を追加（#3）

### Fixed
- **Border/Caution/Primary の Dark モード値**を追加（Default=red-400 / Hover=red-500 / Disabled=transparent）。Light 継承を解消（#1）

### Closed issues
- #1 Border/Caution Dark 未定義 / #2 Font Semantic 未取り込み / #3 Opacity 中間値未取得

## [0.2.0] - 2026-07-29
### Added
- **Semantic カラー層を大幅拡充**（出典: Figma ⛔️ Token ページ `3619:3009`）
  - Foreground / Background / Border × Basic / Brand / Caution × Primary / Secondary / Inverse × Default / Hover / Disabled
- **ダークモード対応**：`:root`=Light、`@media (prefers-color-scheme: dark)` で自動追従、`:root[data-theme="dark"|"light"]` で明示切替
- **Semantic スカラートークン**：spacing（`--space-min|small|medium|large`）、radius（`--radius-min|small|medium|large`、None/Full は Global を使用）、border-width（`--border-regular|bold`）、opacity（`--opacity-weaker|weak|strong|stronger|max`）、breakpoint（`--breakpoint-small|medium|large`）

### Notes
- Border/Caution/Primary はFigmaのDarkモード値が未定義のため、ダーク時はLight値を継承（Figma側で定義され次第反映）
- Font の Semantic セクションはFigma上でWIP（breakpoint値の仮置き）のため未取り込み
- Opacity は行内に6スウォッチあるが名称衝突で中間値1つが未取得（要確認）

## [0.1.0] - 2026-07-29
### Added
- 初版デザイントークン `tokens/tokens.css`（2層構成）
  - Global（Tailwind v4 全トークン）／ Brand（`--color-tolv-navy-*`）／ Semantic（`--color-fg|bg|border-*`, `--radius-card|control`, `--font-family-base`）
- 出典: Figma `tolv-design-tokens`（"⛔️ tailwindcss" コレクション + Brand コレクション）
