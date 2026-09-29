// Figma の指紋を取る読み取り専用スクリプト。use_figma（fileKey lSQ11zWf0XCWps8J8E8u5G）にそのまま渡す。
// 戻り値は snapshot.json と同じ形（components / variables）。
const page = await figma.getNodeByIdAsync('3610:1540'); // 🛠️ Component
await figma.setCurrentPageAsync(page);
const h = (s) => { let x = 5381; for (let i = 0; i < s.length; i++) x = ((x << 5) + x + s.charCodeAt(i)) >>> 0; return x.toString(36); };
const names = {};
async function vn(id) { if (!id) return ''; if (names[id] !== undefined) return names[id]; const v = await figma.variables.getVariableByIdAsync(id); names[id] = v ? v.name : '?'; return names[id]; }
async function paints(a) { if (!a || a === figma.mixed) return 'mixed'; const o = []; for (const p of a) { if (p.visible === false) continue; const id = p.boundVariables && p.boundVariables.color && p.boundVariables.color.id; o.push(p.type + ':' + (id ? await vn(id) : JSON.stringify(p.color || '')) + ':' + (p.opacity ?? 1)); } return o.join(','); }
async function bvs(n) { if (!n.boundVariables) return ''; const o = []; for (const [k, v] of Object.entries(n.boundVariables)) { if (k === 'fills' || k === 'strokes') continue; const id = Array.isArray(v) ? (v[0] && v[0].id) : v && v.id; if (id) o.push(k + '=' + await vn(id)); } return o.sort().join(','); }
async function sig(n, d) {
  let s = [n.type, n.name, Math.round(n.width), Math.round(n.height), n.visible === false ? 'H' : ''].join('|');
  if ('layoutMode' in n) s += '|' + [n.layoutMode, n.paddingTop, n.paddingRight, n.paddingBottom, n.paddingLeft, n.itemSpacing, n.primaryAxisAlignItems, n.counterAxisAlignItems, n.layoutPositioning, n.minHeight, n.layoutSizingHorizontal, n.layoutSizingVertical].join(',');
  if ('cornerRadius' in n) s += '|r' + String(n.cornerRadius);
  if ('fills' in n) s += '|f' + await paints(n.fills);
  if ('strokes' in n) s += '|s' + await paints(n.strokes) + String(n.strokeWeight) + n.strokeAlign + JSON.stringify(n.dashPattern || []);
  if ('effects' in n && n.effects && n.effects.length) s += '|e' + JSON.stringify(n.effects.map((e) => [e.type, e.radius, e.offset, e.visible]));
  s += '|b' + await bvs(n);
  if (n.type === 'TEXT') s += '|t' + JSON.stringify([n.fontName, n.fontSize, n.lineHeight, n.textStyleId]);
  if (n.type === 'INSTANCE') {
    const m = await n.getMainComponentAsync();
    s += '|i' + (m ? (m.parent && m.parent.type === 'COMPONENT_SET' ? m.parent.name + '{' + m.name + '}' : m.name) : '?');
    if (n.componentProperties) s += JSON.stringify(Object.entries(n.componentProperties).filter(([, v]) => v.type !== 'TEXT').map(([k, v]) => [k.split('#')[0], v.value]));
  }
  if (d < 10 && 'children' in n) for (const c of n.children) s += '\n' + await sig(c, d + 1);
  return s;
}
const components = {};
for (const set of page.findAllWithCriteria({ types: ['COMPONENT_SET', 'COMPONENT'] }).filter((n) => !(n.type === 'COMPONENT' && n.parent && n.parent.type === 'COMPONENT_SET'))) {
  const entry = { id: set.id, props: '' };
  try { entry.props = h(JSON.stringify(Object.entries(set.componentPropertyDefinitions).map(([k, v]) => [k.split('#')[0], v.type, v.variantOptions || null]))); } catch (e) {}
  entry.variants = {};
  for (const v of (set.type === 'COMPONENT_SET' ? set.children : [set])) entry.variants[v.name] = h(await sig(v, 0));
  components[set.name] = entry;
}
const variables = {};
for (const c of await figma.variables.getLocalVariableCollectionsAsync()) {
  if (c.name.includes('TailwindCSS')) continue;
  const key = c.name.replace(/[^A-Za-z]/g, '');
  for (const vid of c.variableIds) {
    const v = await figma.variables.getVariableByIdAsync(vid);
    const vals = [];
    for (const m of c.modes) { const val = v.valuesByMode[m.modeId]; vals.push(val && val.type === 'VARIABLE_ALIAS' ? '@' + await vn(val.id) : JSON.stringify(val)); }
    variables[key + ':' + v.name] = h(vals.join('|'));
  }
}
return JSON.stringify({ components, variables });
