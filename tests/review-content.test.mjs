import test from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { mkdtempSync, mkdirSync, rmSync, writeFileSync } from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const script = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', 'scripts', 'review-content.mjs');

test('accepts portable MSP Markdown and an accessible SVG', () => {
  const fixture = createFixture();
  try {
    const output = runReview(fixture.root, fixture.portal);
    assert.match(output, /Content review passed: 2 Markdown file\(s\), 1 SVG file\(s\), 0 warning\(s\)/);
    assert.match(output, /portal contract checked at/);
  } finally {
    rmSync(fixture.base, { recursive: true, force: true });
  }
});

test('blocks publication when the portal reader styles cannot be verified', () => {
  const fixture = createFixture();
  rmSync(path.join(fixture.portal, 'src', 'styles'), { recursive: true, force: true });
  try {
    assert.throws(
      () => runReview(fixture.root, fixture.portal),
      (error) => {
        const output = `${error.stdout || ''}${error.stderr || ''}`;
        assert.match(output, /MSP prose styles not found/);
        return true;
      },
    );
  } finally {
    rmSync(fixture.base, { recursive: true, force: true });
  }
});

test('blocks nested folders in the MSP publication directory', () => {
  const fixture = createFixture();
  const nested = path.join(fixture.root, 'docs', 'nested');
  mkdirSync(nested, { recursive: true });
  writeFileSync(path.join(nested, 'README.md'), '# Nested publication content\n');
  try {
    assert.throws(
      () => runReview(fixture.root, fixture.portal),
      (error) => {
        const output = `${error.stdout || ''}${error.stderr || ''}`;
        assert.match(output, /MSP publication content must remain flat/);
        return true;
      },
    );
  } finally {
    rmSync(fixture.base, { recursive: true, force: true });
  }
});

test('blocks Markdown that the MSP renderer cannot publish as intended', () => {
  const fixture = createFixture();
  writeFileSync(path.join(fixture.root, 'docs', 'README.md'), [
    '# Invalid page',
    '',
    '![](missing.svg)',
    '',
    '[Missing page](missing.md)',
    '',
    '```mermaid',
    'flowchart LR',
    '  A --> B',
    '```',
    '',
    '<script>alert("unsafe")</script>',
    '',
    '> [!NOTE]',
    '> This marker is not transformed by MSP.',
    '',
    '!> Docsify legacy callout',
    '',
    '[Unsafe action](javascript:void(0))',
    '',
    '<form><button type="button">Do not render product controls</button></form>',
    '',
    '<details style="color: red"><summary>Styled detail</summary></details>',
    '',
  ].join('\n'));

  try {
    assert.throws(
      () => runReview(fixture.root, fixture.portal),
      (error) => {
        const output = `${error.stdout || ''}${error.stderr || ''}`;
        assert.match(output, /Image alt text must describe the image subject/);
        assert.match(output, /Local target does not exist: missing\.md/);
        assert.match(output, /Mermaid is not rendered by the current MSP Portal/);
        assert.match(output, /Raw <script> is not allowed/);
        assert.match(output, /MSP does not transform alert markers/);
        assert.match(output, /Docsify legacy callouts are unsupported/);
        assert.match(output, /javascript: links are not allowed/);
        assert.match(output, /Raw <form> is not allowed/);
        assert.match(output, /Inline presentation styles are not allowed/);
        return true;
      },
    );
  } finally {
    rmSync(fixture.base, { recursive: true, force: true });
  }
});

function createFixture() {
  const base = mkdtempSync(path.join(os.tmpdir(), 'msp-content-review-'));
  const root = path.join(base, 'source');
  const portal = path.join(base, 'portal');
  mkdirSync(path.join(root, 'docs'), { recursive: true });
  mkdirSync(path.join(portal, 'src', 'components'), { recursive: true });
  mkdirSync(path.join(portal, 'src', 'styles'), { recursive: true });

  writeFileSync(path.join(root, '.docs-source.yml'), [
    'id: fixture-docs',
    'name: Fixture Docs',
    'category: Tests',
    'description: Valid content review fixture.',
    'docs_path: docs',
    'navigation: []',
    '',
  ].join('\n'));
  writeFileSync(path.join(root, 'docs', 'README.md'), [
    '# Fixture docs',
    '',
    'Read the [setup guide](setup.md).',
    '',
    '![Request path](request-path.svg)',
    '',
    '> **Note:** The command is safe to repeat.',
    '',
    '<details>',
    '<summary>Show the expected state</summary>',
    '',
    'Press <kbd>Enter</kbd> after the command reports `ready`.',
    '',
    '</details>',
    '',
    '```shell',
    'echo ready',
    '```',
    '',
  ].join('\n'));
  writeFileSync(path.join(root, 'docs', 'setup.md'), '# Set up the fixture\n\n## Verify\n\nThe command prints `ready`.\n');
  writeFileSync(path.join(root, 'docs', 'request-path.svg'), [
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 120">',
    '  <title>Request path</title>',
    '  <desc>A client sends a request to an API.</desc>',
    '  <text x="20" y="60">Client to API</text>',
    '</svg>',
    '',
  ].join('\n'));
  writeFileSync(path.join(portal, 'src', 'components', 'MarkdownContent.astro'), [
    'renderer.heading = () => {};',
    'renderer.link = () => {};',
    'renderer.image = () => {};',
    'renderer.code = () => {};',
    'marked.setOptions({ gfm: true });',
    '',
  ].join('\n'));
  writeFileSync(path.join(portal, 'src', 'styles', 'global.css'), [
    '.prose {}',
    '.prose blockquote {}',
    '.prose details {}',
    '.prose table {}',
    '.code-block {}',
    '@media (max-width: 600px) {}',
    '',
  ].join('\n'));

  return { base, root, portal };
}

function runReview(root, portal) {
  return execFileSync(process.execPath, [script, '--portal', portal], {
    cwd: root,
    encoding: 'utf8',
    stdio: 'pipe',
  });
}
