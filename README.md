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
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/from086/tolv-design-system@v0.4.0/tokens/tokens.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/from086/tolv-design-system@v0.4.0/components/button.css">

<button class="tolv-btn tolv-btn--primary">
  <span class="tolv-btn__icon" aria-hidden="true"><!-- svg --></span>
  <span class="tolv-btn__label">ラベル</span>
</button>
```

- **Type**: `--primary`（塗り）/ `--secondary`（ブランド枠）/ `--caution`（警告枠）
- **Size**: 既定=Medium、`--sm`=Small
- **State**: Default / `:hover` / 無効（`disabled` 属性 or `aria-disabled="true"`）
- アイコンは前後どちらも任意。`.tolv-btn__label` の前後に `.tolv-btn__icon` を置く
- 全バリアントは Storybook（下記）または `components/button.demo.html` で確認可能

## 開発（Storybook）

コンポーネントの確認・カタログ化に **Storybook（`@storybook/html-vite`）** を使います。配信物（`tokens.css` / `components/*.css`）はビルド不要のままで、Storybook は開発時の devDependency のみ（CDN 配信には影響しません）。

公開版: **https://from086.github.io/tolv-design-system/**（`main` push で GitHub Actions が自動デプロイ）。ローカルは以下:

```bash
npm install          # 初回のみ
npm run storybook    # 開発サーバ (http://localhost:6006)
npm run build-storybook  # 静的ビルド → storybook-static/
```

- ストーリーは各コンポーネント隣の `*.stories.js`（例: `components/button.stories.js`）
- 上部ツールバーの **Theme** で Light / Dark / Auto を切替（`:root[data-theme]` を操作）
- **Accessibility** タブ（addon-a11y）でコントラスト等を確認可能
- 新規コンポーネントは `components/<name>.css` ＋ `components/<name>.stories.js` を追加するだけ

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
