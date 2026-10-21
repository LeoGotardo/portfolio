import { describe, expect, it } from "vitest";

import { i18nFor, resources } from "@/lib/i18n";

/** Every string in a locale, by path; list items count by position, so a shorter list shows up too. */
function leaves(node: unknown, path = "", out = new Map<string, string>()) {
  if (typeof node === "string") out.set(path, node);
  else if (Array.isArray(node)) node.forEach((item, i) => leaves(item, `${path}[${i}]`, out));
  else if (node && typeof node === "object")
    for (const [key, value] of Object.entries(node))
      leaves(value, path ? `${path}.${key}` : key, out);
  return out;
}

// The {{placeholders}} and the closing </tags> that Trans fills in, which a translation must keep.
// Opening tags alone are not counted: "<project>" in the help is text, translated as "<projeto>".
const slots = (text: string) =>
  [...text.matchAll(/\{\{\s*\w+\s*\}\}|<\/\w+>/g)].map((m) => m[0].replace(/\s/g, "")).sort();

const en = leaves(resources.en);
const pt = leaves(resources.pt);

describe("Locales", () => {
  it("has every English string in Portuguese, and nothing else", () => {
    expect([...pt.keys()].sort()).toEqual([...en.keys()].sort());
  });

  it("keeps the placeholders and tags of each English string", () => {
    const mismatched = [...en].filter(
      ([path, text]) => slots(text).join() !== slots(pt.get(path) ?? "").join(),
    );
    expect(mismatched.map(([path]) => path)).toEqual([]);
  });

  it("has no empty strings", () => {
    const empty = [...en, ...pt].filter(([, text]) => !text.trim());
    expect(empty.map(([path]) => path)).toEqual([]);
  });

  it("fills placeholders without escaping them", () => {
    const t = i18nFor("pt").getFixedT("pt", "terminal");
    expect(t("noSuch", { cmd: "cat", path: "../x" })).toBe(
      "cat: ../x: arquivo ou diretório inexistente",
    );
  });
});
