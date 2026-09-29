// ⚙️ Asset ページ（Asset/Icon/*）の指紋を取る読み取り専用スクリプト。use_figma（fileKey lSQ11zWf0XCWps8J8E8u5G）にそのまま渡す。
// fingerprint.js（Component ページ）とはページが違うので、別の呼び出しで並行して実行する。
// 戻り値は snapshot.json の assets と同じ形：{ "<アイコン名>": "Style=fill:<形のハッシュ>@<幅> Style=outline:…" }
const page = await figma.getNodeByIdAsync('3681:2128'); // ⚙️ Asset
await figma.setCurrentPageAsync(page);
const h = (s) => { let x = 5381; for (let i = 0; i < s.length; i++) x = ((x << 5) + x + s.charCodeAt(i)) >>> 0; return x.toString(36); };
const assets = {};
for (const set of page.findAllWithCriteria({ types: ['COMPONENT_SET', 'COMPONENT'] }).filter((n) => !(n.type === 'COMPONENT' && n.parent && n.parent.type === 'COMPONENT_SET'))) {
  const parts = [];
  for (const v of (set.type === 'COMPONENT_SET' ? set.children : [set])) {
    const geo = v.findAll((n) => n.type === 'VECTOR' || n.type === 'BOOLEAN_OPERATION').map((n) => JSON.stringify(n.vectorPaths || '')).join('');
    parts.push(v.name + ':' + h(geo) + '@' + Math.round(v.width));
  }
  assets[set.name.replace('Asset/Icon/', '')] = parts.join(' ');
}
return JSON.stringify({ assets });
