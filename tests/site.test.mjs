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
  'selection',
  'routes',
  'pipeline',
  'operating-layer',
  'agent-context',
  'governance',
  'production',
  'playbook',
  'sources',
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

test('publishes visible source boundaries without remote media hotlinks', () => {
  const requiredSourceUrls = [
    'https://www.w3.org/TR/owl2-quick-reference/',
    'https://www.palantir.com/docs/foundry/architecture-center/ontology-system',
    'https://cloud.tencent.com/document/product/1831/137039',
    'https://www.flydiy.cn/benchmarks',
  ];

  for (const url of requiredSourceUrls) {
    assert.ok(html.includes(url), `missing visible source: ${url}`);
  }

  assert.equal(existsSync(sourceNotesPath), false, 'distillation notes should be removed');
  assert.doesNotMatch(html, /<(?:img|video|audio|source)[^>]+(?:src|srcset)="https?:\/\//i);
});

test('defines architecture choices and production boundaries', () => {
  const requiredBoundaryTerms = [
    '语义本体',
    '知识图谱',
    '企业操作层',
    '结构化 RAG',
    'GraphRAG',
    'Entity Resolution',
    'Source Precedence',
    'Temporal Semantics',
    'Confidence and Review',
    'Pure Function',
    'Model Function',
    'External Function',
    '决策正确率',
    '证据完整率',
    '人工接管率',
    'FlyOntOS + WorkBuddy',
    'Shadow / ALT',
  ];
  const evidenceLabels = [
    '标准定义',
    '厂商产品语义',
    '工程建议',
    '待现场核验',
  ];

  for (const term of requiredBoundaryTerms) {
    assert.ok(html.includes(term), `missing production boundary: ${term}`);
  }

  for (const label of evidenceLabels) {
    assert.ok(html.includes(label), `missing evidence label: ${label}`);
  }
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

test('desktop layout uses the available reading width', () => {
  assert.match(html, /--content:\s*960px;/);
  assert.match(
    html,
    /\.page-shell\s*\{[^}]*gap:\s*clamp\(24px,\s*3vw,\s*48px\);[^}]*width:\s*min\(1480px,\s*calc\(100% - 48px\)\);/s,
  );
});

test('covers topics recovered from the full transcript and manuscript frames', () => {
  const recoveredTopics = [
    '人工共创',
    '更新滞后',
    '死模型',
    'NER',
    'AP 聚类',
    'RDF/OWL',
    '数据质量比数据量更重要',
    'Dataset',
    'MediaSet',
    'Snapshot',
    'Append',
    'Pipeline Builder',
    '代码管道',
    'Domain Object Types',
    'Source System Mappings',
    'Customer Extensions',
    '全链路追溯',
    '受控写回',
    '应用直接消费',
    'Update Application Variable',
    'Command Tool',
    'Request Clarification',
    'Vector Embedding',
    '全文模式',
    'Chunk 模式',
    'Prompted Tool Calling',
    'Native Tool Calling',
    '23 个候选订单',
    '5 个高风险',
    '异常 Case',
    'Palantir MCP',
    'Ontology MCP',
  ];

  for (const topic of recoveredTopics) {
    assert.ok(html.includes(topic), `missing recovered topic: ${topic}`);
  }
});

test('includes accessibility and reduced-motion safeguards', () => {
  assert.match(html, /href="#main-content"/i);
  assert.match(html, /<main[^>]+id="main-content"/i);
  assert.match(html, /prefers-reduced-motion:\s*reduce/i);
  assert.match(html, /aria-label="[^"]+"/i);
});

test('keeps the active navigation item visible on compact layouts', () => {
  assert.match(html, /matchMedia\('\(max-width: 1050px\)'\)\.matches/);
  assert.match(
    html,
    /activeLink\.scrollIntoView\(\{\s*block:\s*'nearest',\s*inline:\s*'nearest'\s*\}\)/s,
  );
});
