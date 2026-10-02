#!/usr/bin/env node
// Katalog dogrulama. Bagimlilik kullanmaz, yalnizca Node'un yerlesik modullerini kullanir.
// Kullanim: node scripts/validate-skills.mjs
import { readdir } from "node:fs/promises";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const SKILLS_DIR = path.join(ROOT, "skills");
const EXCLUDED_DIRS = new Set(["_template"]);
const CATEGORIES = new Set(["coding", "research", "writing", "automation"]);
const STATUSES = new Set(["draft", "published"]);
const ORIGINS = new Set(["ours", "mirrored"]);
const BASIS = new Set(["documentation", "hands-on"]);
const KEYS = new Set([
  "id",
  "title",
  "summary",
  "category",
  "origin",
  "status",
  "license",
  "licenseFile",
  "source",
  "platforms",
  "notes",
]);
const ID_RE = /^[a-z0-9]+(-[a-z0-9]+)*$/;
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

const errors = [];
const warnings = [];

function fail(skillId, message) {
  errors.push(`${skillId}: ${message}`);
}

function warn(skillId, message) {
  warnings.push(`${skillId}: ${message}`);
}

async function readSkillDirs(dir, categoryFromParent) {
  const found = [];
  let entries;
  try {
    entries = await readdir(dir, { withFileTypes: true });
  } catch {
    return found;
  }
  for (const entry of entries) {
    if (!entry.isDirectory()) continue;
    if (EXCLUDED_DIRS.has(entry.name)) continue;
    const child = path.join(dir, entry.name);
    if (existsSync(path.join(child, "metadata.json"))) {
      found.push({ id: entry.name, dir: child, categoryFromParent });
    } else {
      found.push(...(await readSkillDirs(child, entry.name)));
    }
  }
  return found;
}

function parseFrontmatter(text) {
  if (!text.startsWith("---")) return null;
  const end = text.indexOf("\n---", 3);
  if (end === -1) return null;
  const block = text.slice(3, end);
  const data = {};
  for (const line of block.split(/\r?\n/)) {
    const match = /^\s*([A-Za-z0-9_-]+)\s*:\s*([\s\S]*?)\s*$/.exec(line);
    if (match) data[match[1]] = match[2].trim().replace(/^["']|["']$/g, "");
  }
  return data;
}

function isEmptyValue(value) {
  return value === null || value === undefined || value === "";
}

function checkSkill({ id: dirName, dir, categoryFromParent }) {
  const rel = path.relative(ROOT, dir);
  let meta;
  try {
    const raw = readFileSync(path.join(dir, "metadata.json"), "utf8").replace(/^\uFEFF/, "");
    meta = JSON.parse(raw);
  } catch (error) {
    fail(dirName, `metadata.json okunamadi veya gecersiz JSON: ${error.message}`);
    return;
  }

  for (const key of Object.keys(meta)) {
    if (key.startsWith("$")) continue;
    if (!KEYS.has(key)) fail(dirName, `bilinmeyen alan "${key}" (sema ile uyusmuyor)`);
  }

  if (meta.id !== dirName) fail(dirName, `id "${meta.id}" klasor adiyla ayni degil`);
  if (!ID_RE.test(String(meta.id ?? ""))) fail(dirName, `id kebab-case olmali`);
  if (isEmptyValue(meta.title)) fail(dirName, "title zorunlu");
  if (isEmptyValue(meta.summary)) fail(dirName, "summary zorunlu");
  else if (String(meta.summary).length > 240) fail(dirName, "summary 240 karakteri asmamali");

  if (!CATEGORIES.has(meta.category)) {
    fail(dirName, `category gecersiz: "${meta.category}"`);
  } else if (CATEGORIES.has(categoryFromParent) && categoryFromParent !== meta.category) {
    fail(dirName, `ust klasor "${categoryFromParent}" ile category "${meta.category}" uyusmuyor`);
  }

  if (!ORIGINS.has(meta.origin)) fail(dirName, `origin gecersiz: "${meta.origin}"`);
  if (!STATUSES.has(meta.status)) fail(dirName, `status gecersiz: "${meta.status}"`);

  checkSource(dirName, dir, meta);
  checkLicense(dirName, dir, meta, meta.status);
  const platformCount = checkPlatforms(dirName, meta);
  checkSkillMd(dirName, dir, meta);

  if (meta.status === "published") {
    if (isEmptyValue(meta.license)) fail(dirName, "published icin license zorunlu");
    if (platformCount === 0) fail(dirName, "published icin en az bir kanitli platform gerekli");
  }
}



function checkSource(dirName, dir, meta) {
  if (meta.origin === "mirrored") {
    const source = meta.source;
    if (!source || typeof source !== "object") {
      fail(dirName, "origin mirrored icin source zorunlu");
      return;
    }
    for (const key of ["repo", "path", "version", "retrievedAt"]) {
      if (isEmptyValue(source[key])) fail(dirName, `source.${key} zorunlu`);
    }
    if (!isEmptyValue(source.repo) && !/^https:\/\//.test(String(source.repo))) {
      fail(dirName, "source.repo HTTPS olmali");
    }
    if (!isEmptyValue(source.retrievedAt) && !DATE_RE.test(String(source.retrievedAt))) {
      fail(dirName, "source.retrievedAt YYYY-MM-DD olmali");
    }
    if ("license" in source || "licenseFile" in source) {
      fail(dirName, "source blogu lisans tasimaz; ust duzey license/licenseFile kullanilir");
    }
  } else if (meta.source && typeof meta.source === "object") {
    if ("license" in meta.source || "licenseFile" in meta.source) {
      fail(dirName, "source blogu lisans tasimaz; ust duzey license/licenseFile kullanilir");
    }
  }
}

function checkLicense(dirName, dir, meta, status) {
  if (!isEmptyValue(meta.licenseFile)) {
    if (!existsSync(path.join(dir, meta.licenseFile))) {
      fail(dirName, `licenseFile bulunamadi: ${meta.licenseFile}`);
    }
  } else if (!isEmptyValue(meta.license)) {
    warn(dirName, "license var ama licenseFile yok; lisans metni klasore kopyalanmamis olabilir");
  }
  if (isEmptyValue(meta.license) && status === "published") {
    fail(dirName, "published icin license zorunlu");
  }
}

function checkPlatforms(dirName, meta) {
  const platforms = meta.platforms;
  if (platforms === undefined) return 0;
  if (!platforms || typeof platforms !== "object" || Array.isArray(platforms)) {
    fail(dirName, "platforms nesne olmali");
    return 0;
  }
  let valid = 0;
  for (const [name, entry] of Object.entries(platforms)) {
    if (!entry || typeof entry !== "object") {
      fail(dirName, `platforms.${name} nesne olmali`);
      continue;
    }
    const evidence = entry.evidence;
    if (!evidence || typeof evidence !== "object") {
      fail(dirName, `platforms.${name}.evidence zorunlu`);
      continue;
    }
    if (!BASIS.has(evidence.basis)) {
      fail(dirName, `platforms.${name}.evidence.basis gecersiz: "${evidence.basis}"`);
      continue;
    }
    if (!/^https:\/\//.test(String(evidence.reference ?? ""))) {
      fail(dirName, `platforms.${name}.evidence.reference HTTPS olmali`);
      continue;
    }
    if (!DATE_RE.test(String(evidence.verifiedAt ?? ""))) {
      fail(dirName, `platforms.${name}.evidence.verifiedAt YYYY-MM-DD olmali`);
      continue;
    }
    if (isEmptyValue(entry.usage)) {
      warn(dirName, `platforms.${name}.usage bos`);
    }
    valid += 1;
  }
  return valid;
}

function checkSkillMd(dirName, dir, meta) {
  const file = path.join(dir, "SKILL.md");
  if (!existsSync(file)) {
    fail(dirName, "SKILL.md eksik");
    return;
  }
  const text = readFileSync(file, "utf8").replace(/^\uFEFF/, "");
  const frontmatter = parseFrontmatter(text);
  if (!frontmatter) {
    fail(dirName, "SKILL.md frontmatter bulunamadi");
    return;
  }
  if (frontmatter.name !== meta.title) {
    fail(dirName, `SKILL.md name "${frontmatter.name}" ile title "${meta.title}" uyusmuyor`);
  }
  if (isEmptyValue(frontmatter.description)) {
    fail(dirName, "SKILL.md frontmatter description zorunlu");
  }
  const end = text.indexOf("\n---", 3);
  if (end !== -1 && text.slice(end + 4).trim().length === 0) {
    fail(dirName, "SKILL.md govdesi bos");
  }
}

const skills = await readSkillDirs(SKILLS_DIR, null);
for (const skill of skills) checkSkill(skill);

const checked = skills.length;
for (const message of warnings) console.warn(`UYARI  ${message}`);
for (const message of errors) console.error(`HATA   ${message}`);

console.log(`Denetlenen skill: ${checked}`);
if (!existsSync(SKILLS_DIR)) console.log("skills/ dizini yok; katalog bos.");

if (errors.length > 0) {
  console.error(`Katalog dogrulamasi basarisiz: ${errors.length} hata, ${warnings.length} uyari.`);
  process.exit(1);
}
console.log(`Katalog dogrulamasi basarili (${warnings.length} uyari).`);
