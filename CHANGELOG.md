# Changelog

このプロジェクトは [セマンティックバージョニング](https://semver.org/lang/ja/) に従います。

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
