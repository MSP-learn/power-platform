import fs from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';

const root = process.cwd();
const args = process.argv.slice(2);
const portalArgIndex = args.indexOf('--portal');

if (portalArgIndex !== -1 && !args[portalArgIndex + 1]) {
  console.error('Usage: node scripts/review-content.mjs [--portal <path>]');
  process.exit(2);
}

const explicitPortal = portalArgIndex === -1 ? null : path.resolve(root, args[portalArgIndex + 1]);
const siblingPortal = path.resolve(root, '..', 'msp');
const portalRoot = explicitPortal || (await exists(path.join(siblingPortal, 'src', 'components', 'MarkdownContent.astro')) ? siblingPortal : null);
const failures = [];
const warnings = [];
let portalSupportsMermaid = false;

await inspectPortal();
await inspectMetadata();
await inspectPublicationLayout();

const docsRoot = path.join(root, 'docs');
const markdownFiles = (await walk(docsRoot)).filter((file) => file.toLowerCase().endsWith('.md'));
const svgFiles = (await walk(docsRoot)).filter((file) => file.toLowerCase().endsWith('.svg'));

if (!markdownFiles.length) {
  addFailure('docs', 1, 'No Markdown files found under docs/.');
}

for (const file of markdownFiles) await inspectMarkdown(file);
for (const file of svgFiles) await inspectSvg(file);

for (const warning of warnings) console.warn(`WARNING ${warning}`);
for (const failure of failures) console.error(`ERROR ${failure}`);

if (failures.length) {
  console.error(`Content review failed with ${failures.length} error(s) and ${warnings.length} warning(s).`);
  process.exit(1);
}

const portalLabel = portalRoot ? `; portal contract checked at ${relativeToRoot(portalRoot)}` : '';
console.log(`Content review passed: ${markdownFiles.length} Markdown file(s), ${svgFiles.length} SVG file(s), ${warnings.length} warning(s)${portalLabel}.`);

async function inspectPortal() {
  if (!portalRoot) {
    warnings.push('MSP Portal checkout was not found; rerun with --portal <path> before publication.');
    return;
  }

  const rendererPath = path.join(portalRoot, 'src', 'components', 'MarkdownContent.astro');
  if (!(await exists(rendererPath))) {
    addFailure(relativeToRoot(rendererPath), 1, 'MSP renderer not found. Pass the portal repository root to --portal.');
    return;
  }

  const renderer = await fs.readFile(rendererPath, 'utf8');
  const requiredSignals = [
    ['marked.setOptions', 'marked renderer configuration'],
    ['gfm: true', 'GitHub-flavored Markdown mode'],
    ['renderer.heading', 'heading renderer'],
    ['renderer.link', 'link renderer'],
    ['renderer.image', 'image renderer'],
    ['renderer.code', 'code renderer'],
  ];

  for (const [signal, label] of requiredSignals) {
    if (!renderer.includes(signal)) addFailure(relativeToRoot(rendererPath), 1, `Expected ${label} was not found; review the content contract against the current portal.`);
  }

  const stylesPath = path.join(portalRoot, 'src', 'styles', 'global.css');
  if (!(await exists(stylesPath))) {
    addFailure(relativeToRoot(stylesPath), 1, 'MSP prose styles not found. Pass the portal repository root to --portal.');
  } else {
    const styles = await fs.readFile(stylesPath, 'utf8');
    const requiredStyles = [
      ['.prose', 'prose layout'],
      ['.prose blockquote', 'blockquote callouts'],
      ['.prose details', 'collapsible details'],
      ['.prose table', 'documentation tables'],
      ['.code-block', 'code blocks'],
      ['@media (max-width:', 'responsive layout rules'],
    ];
    for (const [signal, label] of requiredStyles) {
      if (!styles.includes(signal)) addFailure(relativeToRoot(stylesPath), 1, `Expected ${label} styles were not found; review reader-UX guidance against the current portal.`);
    }
  }

  portalSupportsMermaid = /(?:language|lang)\s*={2,3}\s*['"]mermaid['"]|mermaid\.initialize|renderMermaid/i.test(renderer);
}

async function inspectMetadata() {
  const metadataPath = path.join(root, '.docs-source.yml');
  if (!(await exists(metadataPath))) {
    addFailure('.docs-source.yml', 1, 'Missing MSP source metadata.');
    return;
  }

  const raw = await fs.readFile(metadataPath, 'utf8');
  const required = ['id', 'name', 'category', 'description', 'docs_path', 'navigation'];
  for (const key of required) {
    if (!new RegExp(`^${key}:`, 'm').test(raw)) addFailure('.docs-source.yml', 1, `Missing required field: ${key}.`);
  }

  const id = raw.match(/^id:\s*([^#\r\n]+)/m)?.[1].trim();
  if (id && !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(id)) {
    addFailure('.docs-source.yml', lineOf(raw, 'id:'), 'id must be a lowercase kebab-case slug.');
  }

  const docsPath = raw.match(/^docs_path:\s*([^#\r\n]+)/m)?.[1].trim();
  if (docsPath && !(await isDirectory(path.resolve(root, docsPath)))) {
    addFailure('.docs-source.yml', lineOf(raw, 'docs_path:'), `docs_path does not resolve to a directory: ${docsPath}.`);
  }

  const navigation = readYamlList(raw, 'navigation');
  if (navigation.length) {
    addFailure('.docs-source.yml', navigation[0].line, 'navigation must remain empty while the docs publication directory is flat.');
  }
  for (const item of navigation) {
    if (docsPath && !(await isDirectory(path.resolve(root, docsPath, item.value)))) {
      addFailure('.docs-source.yml', item.line, `Navigation section does not exist under ${docsPath}: ${item.value}.`);
    }
  }
}

async function inspectPublicationLayout() {
  const docsRoot = path.join(root, 'docs');
  const entries = await fs.readdir(docsRoot, { withFileTypes: true }).catch(() => []);
  for (const entry of entries) {
    if (entry.isDirectory()) addFailure(`docs/${entry.name}`, 1, 'MSP publication content must remain flat; move contributor guidance to guides/ and keep rendered assets beside their page.');
  }
}

async function inspectMarkdown(file) {
  const raw = await fs.readFile(file, 'utf8');
  const lines = raw.split(/\r?\n/);
  const relativeFile = relativeToRoot(file);
  const headings = [];
  const slugs = new Map();
  let fence = null;
  let firstContent = null;

  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index];
    const lineNumber = index + 1;
    const fenceMatch = line.match(/^\s*(`{3,}|~{3,})(.*)$/);

    if (fenceMatch) {
      const marker = fenceMatch[1];
      if (!fence) {
        const info = fenceMatch[2].trim();
        fence = { char: marker[0], length: marker.length, line: lineNumber, info };
        if (!info) addFailure(relativeFile, lineNumber, 'Fenced code block needs a language. Use text for plain output.');
        const language = info.split(/\s+/)[0].toLowerCase();
        if (language === 'mermaid' && !portalSupportsMermaid) {
          addFailure(relativeFile, lineNumber, 'Mermaid is not rendered by the current MSP Portal; publish an accessible local SVG instead.');
        }
        if (language.startsWith('embed:')) {
          warnings.push(`${relativeFile}:${lineNumber} embed paths resolve from the portal root; verify the integration and GitHub fallback.`);
        }
      } else if (marker[0] === fence.char && marker.length >= fence.length && !fenceMatch[2].trim()) {
        fence = null;
      }
      continue;
    }

    if (fence) continue;
    if (!firstContent && line.trim() && !/^\s*<!--/.test(line)) firstContent = { line: lineNumber, value: line.trim() };

    const heading = line.match(/^(#{1,6})\s+(.+?)\s*#*\s*$/);
    if (heading) {
      const depth = heading[1].length;
      const text = stripInlineMarkdown(heading[2]);
      const slug = slugify(text);
      headings.push({ depth, text, slug, line: lineNumber });
      if (!slug) addFailure(relativeFile, lineNumber, 'Heading does not produce a usable MSP anchor.');
      if (slugs.has(slug)) addFailure(relativeFile, lineNumber, `Heading anchor duplicates line ${slugs.get(slug)}: ${slug}.`);
      else slugs.set(slug, lineNumber);
    }

    if (/[A-Za-z]:[\\/](?:Users|Documents|Projects)[\\/]/i.test(line) || /file:\/\//i.test(line)) {
      addFailure(relativeFile, lineNumber, 'Absolute local filesystem paths do not work after MSP sync.');
    }

    const semanticLine = line.replace(/`[^`]*`/g, '');
    const unsafeTag = semanticLine.match(/<\/?(script|iframe|object|embed|form|input|button|select|textarea)(?:\s|>)/i);
    if (unsafeTag) addFailure(relativeFile, lineNumber, `Raw <${unsafeTag[1].toLowerCase()}> is not allowed in source documentation.`);
    if (/\son[a-z]+\s*=/i.test(semanticLine)) addFailure(relativeFile, lineNumber, 'Inline HTML event handlers are not allowed in source documentation.');
    if (/\sstyle\s*=/i.test(semanticLine)) addFailure(relativeFile, lineNumber, 'Inline presentation styles are not allowed; use semantic Markdown and MSP styling.');
    if (/\b(?:href|src)\s*=\s*['"]\s*javascript:/i.test(semanticLine)) addFailure(relativeFile, lineNumber, 'javascript: URLs are not allowed in source documentation.');
    if (/^\s*[!?]>\s/.test(semanticLine)) addFailure(relativeFile, lineNumber, 'Docsify legacy callouts are unsupported; use a blockquote with a bold Note or Warning label.');
    if (/^\s*>\s*\[!(?:NOTE|TIP|IMPORTANT|WARNING|CAUTION)\]\s*$/i.test(semanticLine)) addFailure(relativeFile, lineNumber, 'MSP does not transform alert markers; use a blockquote with a bold label.');
    if (/\{docsify-ignore(?:-all)?\}/i.test(semanticLine) || /:include\b/i.test(semanticLine)) {
      addFailure(relativeFile, lineNumber, 'Docsify directives are unsupported by MSP Portal.');
    }

    await inspectLinks(line, file, lineNumber);
  }

  if (fence) addFailure(relativeFile, fence.line, `Unclosed ${fence.char.repeat(fence.length)} code fence.`);
  if (!firstContent || !/^#\s+/.test(firstContent.value)) {
    addFailure(relativeFile, firstContent?.line || 1, 'Page must begin with one level-one heading and no YAML frontmatter.');
  }

  const h1s = headings.filter((heading) => heading.depth === 1);
  if (h1s.length !== 1) addFailure(relativeFile, 1, `Expected exactly one level-one heading; found ${h1s.length}.`);

  for (let index = 1; index < headings.length; index += 1) {
    const previous = headings[index - 1];
    const current = headings[index];
    if (current.depth > previous.depth + 1) {
      addFailure(relativeFile, current.line, `Heading level jumps from h${previous.depth} to h${current.depth}.`);
    }
  }
}

async function inspectLinks(line, file, lineNumber) {
  const links = line.matchAll(/(!?)\[([^\]]*)\]\(([^)]+)\)/g);
  for (const match of links) {
    const isImage = match[1] === '!';
    const label = match[2].trim();
    const destination = markdownDestination(match[3]);
    if (!destination) continue;

    if (isImage && !label) addFailure(relativeToRoot(file), lineNumber, 'Image alt text must describe the image subject.');
    if (/^(?:[a-z][a-z0-9+.-]*:|\/\/|#|\?)/i.test(destination)) {
      if (/^file:/i.test(destination)) addFailure(relativeToRoot(file), lineNumber, 'file:// links do not work after MSP sync.');
      if (/^javascript:/i.test(destination)) addFailure(relativeToRoot(file), lineNumber, 'javascript: links are not allowed in source documentation.');
      continue;
    }
    if (/^[A-Za-z]:[\\/]/.test(destination)) {
      addFailure(relativeToRoot(file), lineNumber, 'Absolute Windows paths do not work after MSP sync.');
      continue;
    }
    if (destination.startsWith('/')) {
      addFailure(relativeToRoot(file), lineNumber, 'Use a relative source link instead of a deployment-root path.');
      continue;
    }

    const targetText = destination.split(/[?#]/)[0];
    if (!targetText) continue;
    let decoded;
    try {
      decoded = decodeURIComponent(targetText);
    } catch {
      addFailure(relativeToRoot(file), lineNumber, `Link has invalid percent encoding: ${destination}.`);
      continue;
    }

    const target = path.resolve(path.dirname(file), decoded);
    if (!isInside(root, target)) {
      addFailure(relativeToRoot(file), lineNumber, `Relative link escapes the source repository: ${destination}.`);
      continue;
    }
    if (!(await exists(target))) addFailure(relativeToRoot(file), lineNumber, `Local target does not exist: ${destination}.`);
  }
}

async function inspectSvg(file) {
  const raw = await fs.readFile(file, 'utf8');
  const relativeFile = relativeToRoot(file);
  if (!/<title(?:\s[^>]*)?>[\s\S]*?<\/title>/i.test(raw)) addFailure(relativeFile, 1, 'SVG needs a descriptive <title>.');
  if (!/<desc(?:\s[^>]*)?>[\s\S]*?<\/desc>/i.test(raw)) addFailure(relativeFile, 1, 'SVG needs a descriptive <desc>.');
  if (!/<svg\b[^>]*\bviewBox\s*=/i.test(raw)) addFailure(relativeFile, 1, 'SVG needs a viewBox for responsive scaling.');
  if (/<script(?:\s|>)/i.test(raw) || /\son[a-z]+\s*=/i.test(raw)) addFailure(relativeFile, 1, 'SVG must not contain scripts or inline event handlers.');
}

async function walk(directory) {
  const entries = await fs.readdir(directory, { withFileTypes: true }).catch(() => []);
  const files = [];
  for (const entry of entries) {
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await walk(fullPath));
    else files.push(fullPath);
  }
  return files;
}

function readYamlList(raw, key) {
  const lines = raw.split(/\r?\n/);
  const start = lines.findIndex((line) => new RegExp(`^${key}:\s*(?:#.*)?$`).test(line));
  if (start === -1) return [];
  const values = [];
  for (let index = start + 1; index < lines.length; index += 1) {
    const line = lines[index];
    if (/^[A-Za-z_][\w-]*:/.test(line)) break;
    const item = line.match(/^\s+-\s+([^#]+?)(?:\s+#.*)?$/);
    if (item) values.push({ value: item[1].trim(), line: index + 1 });
  }
  return values;
}

function markdownDestination(value) {
  const trimmed = value.trim();
  if (trimmed.startsWith('<')) return trimmed.match(/^<([^>]+)>/)?.[1] || '';
  return trimmed.match(/^(\S+)/)?.[1] || '';
}

function stripInlineMarkdown(value) {
  return value.replace(/`([^`]+)`/g, '$1').replace(/!\[([^\]]*)\]\([^)]+\)/g, '$1').replace(/\[([^\]]+)\]\([^)]+\)/g, '$1').replace(/[*_~]/g, '').trim();
}

function slugify(value) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

function lineOf(raw, value) {
  return raw.slice(0, raw.indexOf(value)).split(/\r?\n/).length;
}

function addFailure(file, line, message) {
  failures.push(`${file}:${line} ${message}`);
}

function relativeToRoot(value) {
  const relative = path.relative(root, value).replace(/\\/g, '/');
  return relative || '.';
}

function isInside(parent, child) {
  const relative = path.relative(parent, child);
  return relative === '' || (!relative.startsWith('..') && !path.isAbsolute(relative));
}

async function exists(value) {
  return fs.access(value).then(() => true, () => false);
}

async function isDirectory(value) {
  return fs.stat(value).then((stat) => stat.isDirectory(), () => false);
}
