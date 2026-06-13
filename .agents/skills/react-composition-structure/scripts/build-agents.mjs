#!/usr/bin/env node
// Generates AGENTS.md from metadata.json, templates/agents.head.md, and rules/*.md.
// rules/ is the single source of truth; do not edit AGENTS.md by hand.

import { readFileSync, writeFileSync, readdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const rulesDir = join(root, "rules");

function githubSlug(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

function parseRule(file) {
  const raw = readFileSync(join(rulesDir, file), "utf8");
  const match = raw.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!match) throw new Error(`Missing frontmatter in rules/${file}`);

  const meta = {};
  for (const line of match[1].split("\n")) {
    const kv = line.match(/^(\w+):\s*(.*)$/);
    if (!kv) continue;
    let value = kv[2].trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    meta[kv[1]] = value;
  }

  // Drop the standalone title heading; the generator re-emits it with a number.
  let body = match[2].replace(/^\s+/, "");
  body = body.replace(/^#{1,6} .*\n+/, "").trimEnd();

  return { file, meta, body };
}

function buildToc(rules) {
  const lines = [];
  let currentGroup = null;
  for (const { meta } of rules) {
    if (meta.groupNumber !== currentGroup) {
      currentGroup = meta.groupNumber;
      const groupHeading = `${meta.groupNumber}. ${meta.group}`;
      lines.push(
        `${groupHeading} — ${meta.impact}`.replace(
          groupHeading,
          `${meta.groupNumber}. [${meta.group}](#${githubSlug(groupHeading)})`
        )
      );
    }
    const ruleHeading = `${meta.section} ${meta.title}`;
    lines.push(`  - ${meta.section} [${meta.title}](#${githubSlug(ruleHeading)})`);
  }
  return lines.join("\n");
}

function buildBody(rules) {
  const parts = [];
  let currentGroup = null;
  for (const { meta, body } of rules) {
    if (meta.groupNumber !== currentGroup) {
      currentGroup = meta.groupNumber;
      parts.push(`## ${meta.groupNumber}. ${meta.group}`);
      if (meta.groupIntro) parts.push(meta.groupIntro);
    }
    parts.push(`### ${meta.section} ${meta.title}`);
    parts.push(body);
  }
  return parts.join("\n\n");
}

const metadata = JSON.parse(readFileSync(join(root, "metadata.json"), "utf8"));
const head = readFileSync(join(root, "templates", "agents.head.md"), "utf8").trim();

const rules = readdirSync(rulesDir)
  .filter((f) => f.endsWith(".md") && !f.startsWith("_"))
  .map(parseRule)
  .sort((a, b) =>
    a.meta.section.localeCompare(b.meta.section, undefined, { numeric: true })
  );

const out =
  [
    "# React Composition Structure",
    `${metadata.organization}  \n${metadata.date}`,
    head,
    "## Table of Contents",
    buildToc(rules),
    buildBody(rules),
  ].join("\n\n") + "\n";

writeFileSync(join(root, "AGENTS.md"), out);
console.log(`Generated AGENTS.md from ${rules.length} rules.`);
