# Changelog

このプロジェクトは [セマンティックバージョニング](https://semver.org/lang/ja/) に従います。

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
