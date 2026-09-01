import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import test from 'node:test';

const pagePath = new URL('../index.html', import.meta.url);
const pageExists = existsSync(pagePath);
const html = pageExists ? readFileSync(pagePath, 'utf8') : '';

const expectedSectionIds = [
  'problem',
  'definition',
  'routes',
  'pipeline',
  'operating-layer',
  'agent-context',
  'governance',
  'playbook',
  'source',
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

test('attributes the source without hotlinking video media', () => {
  assert.match(
    html,
    /href="https:\/\/www\.xiaohongshu\.com\/explore\/6a95742a000000001e014102[^"]*"/,
  );
  assert.doesNotMatch(html, /<(?:img|video|audio|source)[^>]+(?:src|srcset)="https?:\/\//i);
});

test('has no remote frontend dependencies', () => {
  assert.doesNotMatch(html, /<script[^>]+src=/i);
  assert.doesNotMatch(html, /<link[^>]+href="https?:\/\//i);
  assert.doesNotMatch(html, /@import\s+url/i);
});

test('includes accessibility and reduced-motion safeguards', () => {
  assert.match(html, /href="#main-content"/i);
  assert.match(html, /<main[^>]+id="main-content"/i);
  assert.match(html, /prefers-reduced-motion:\s*reduce/i);
  assert.match(html, /aria-label="[^"]+"/i);
});
