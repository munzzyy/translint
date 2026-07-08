// Dump the site's ES-module locale catalogs (web/i18n/*.js) to plain JSON so
// translint can lint its own translations. CI runs this and then translint
// over the result on every push - the linter's site has to pass the linter.
//
//   node tools/extract_i18n.mjs <outdir>
import { readdirSync, writeFileSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { pathToFileURL, fileURLToPath } from "node:url";

const out = process.argv[2];
if (!out) {
  console.error("usage: node tools/extract_i18n.mjs <outdir>");
  process.exit(2);
}
mkdirSync(out, { recursive: true });

const i18nDir = join(dirname(fileURLToPath(import.meta.url)), "..", "web", "i18n");
let n = 0;
for (const f of readdirSync(i18nDir)) {
  if (!f.endsWith(".js") || f === "index.js") continue;
  const mod = await import(pathToFileURL(join(i18nDir, f)).href);
  writeFileSync(join(out, f.replace(/\.js$/, ".json")), JSON.stringify(mod.default, null, 2));
  n++;
}
console.log(`extracted ${n} catalogs to ${out}`);
