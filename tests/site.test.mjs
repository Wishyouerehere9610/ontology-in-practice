import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import test from 'node:test';

const pagePath = new URL('../index.html', import.meta.url);
const readmePath = new URL('../README.md', import.meta.url);
const sourceNotesPath = new URL('../source/distillation-notes.md', import.meta.url);
const pageExists = existsSync(pagePath);
const html = pageExists ? readFileSync(pagePath, 'utf8') : '';
const readme = existsSync(readmePath) ? readFileSync(readmePath, 'utf8') : '';

const expectedSectionIds = [
  'problem',
  'definition',
  'routes',
  'pipeline',
  'operating-layer',
  'agent-context',
  'governance',
  'playbook',
];

test('ships a standalone index page', () => {
  assert.equal(pageExists, true, 'index.html must exist');
  assert.match(html, /<!doctype html>/i);
  assert.match(html, /<html[^>]+lang="zh-CN"/i);
  assert.match(html, /<meta[^>]+name="viewport"/i);
});

test('maps every primary section to the reading navigation', () => {
  for (const id of expectedSectionIds) {
    assert.match(html, new RegExp(`<section[^>]+id="${id}"`, 'i'), `missing section #${id}`);
    assert.match(html, new RegExp(`href="#${id}"`, 'i'), `missing navigation link to #${id}`);
  }
});

test('covers the construction, operation, context, and governance contracts', () => {
  const requiredTerms = [
    '拆解流水线',
    '数据聚类',
    '行业框架',
    '人机协同',
    '端到端原型',
    'Object',
    'Link',
    'Function',
    'Action',
    'Retrieval Context',
    'Object Query',
    'Document Context',
    '最小权限',
    '审计日志',
    'MCP',
  ];

  for (const term of requiredTerms) {
    assert.ok(html.includes(term), `missing required term: ${term}`);
  }
});

test('omits source statements and distillation notes from the project', () => {
  const publicCopy = `${html}\n${readme}`;
  const removedPhrases = [
    '来源与声明',
    '来源和蒸馏方法',
    '主要素材来自小红书视频',
    '本项目是学习型蒸馏与工程化重写',
    'source/distillation-notes.md',
    'xiaohongshu.com',
  ];

  for (const phrase of removedPhrases) {
    assert.equal(publicCopy.includes(phrase), false, `must remove: ${phrase}`);
  }

  assert.equal(existsSync(sourceNotesPath), false, 'distillation notes should be removed');
  assert.doesNotMatch(html, /<(?:img|video|audio|source)[^>]+(?:src|srcset)="https?:\/\//i);
});

test('has no remote frontend dependencies', () => {
  assert.doesNotMatch(html, /<script[^>]+src=/i);
  assert.doesNotMatch(html, /<link[^>]+href="https?:\/\//i);
  assert.doesNotMatch(html, /@import\s+url/i);
});

test('README links to the public display page', () => {
  assert.match(
    readme,
    /https:\/\/wishyouerehere9610\.github\.io\/ontology-in-practice\//,
  );
  assert.doesNotMatch(readme, /ontology-in-practice-pages/);
});

test('desktop sidebar navigation uses readable typography', () => {
  assert.match(
    html,
    /\.side-nav a\s*\{[^}]*font-size:\s*15px;[^}]*\}/s,
    'sidebar labels should use 15px desktop text',
  );
  assert.match(
    html,
    /\.side-nav a::before\s*\{[^}]*font-size:\s*11px;[^}]*\}/s,
    'sidebar indices should remain legible',
  );
  assert.match(
    html,
    /\.side-nav a\[aria-current="true"\]\s*\{[^}]*font-weight:\s*650;[^}]*\}/s,
    'the current section should have stronger emphasis',
  );
});

test('includes accessibility and reduced-motion safeguards', () => {
  assert.match(html, /href="#main-content"/i);
  assert.match(html, /<main[^>]+id="main-content"/i);
  assert.match(html, /prefers-reduced-motion:\s*reduce/i);
  assert.match(html, /aria-label="[^"]+"/i);
});
