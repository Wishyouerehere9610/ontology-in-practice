# Ontology Production Boundaries Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Expand the published Ontology guide with precise concept boundaries, architecture selection, production governance, FlyOntOS + WorkBuddy verification, and visible sources.

**Architecture:** Keep the standalone `index.html` architecture and integrate new material into the existing narrative. Add three navigable sections (`selection`, `production`, `sources`), strengthen four existing sections, and encode every required content boundary in the Node test contract before editing production HTML.

**Tech Stack:** Semantic HTML5, inline CSS, vanilla JavaScript, Node.js built-in test runner, GitHub Pages.

---

### Task 1: Expand the content contract

**Files:**
- Modify: `tests/site.test.mjs`
- Test: `tests/site.test.mjs`

- [ ] **Step 1: Add the new section IDs to `expectedSectionIds`**

Add `selection` after `definition`, `production` after `governance`, and `sources` after `playbook`.

- [ ] **Step 2: Replace the source-removal test with visible-source checks**

Require these exact URL fragments in the HTML:

```js
const requiredSourceUrls = [
  'https://www.w3.org/TR/owl2-quick-reference/',
  'https://www.palantir.com/docs/foundry/architecture-center/ontology-system',
  'https://cloud.tencent.com/document/product/1831/137039',
  'https://www.flydiy.cn/benchmarks',
];
```

Continue rejecting remote `img`, `video`, `audio`, `source`, `script`, stylesheet, font, and `@import` dependencies.

- [ ] **Step 3: Add production-boundary contract tests**

Require the page to contain:

```js
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
```

Also require the source-boundary labels `标准定义`, `厂商产品语义`, `工程建议`, and `待现场核验`.

- [ ] **Step 4: Run the tests and confirm the expected RED state**

Run: `npm test`

Expected: failures for missing `selection`, `production`, `sources`, source URLs, and boundary terms. Existing structural tests should continue to pass.

- [ ] **Step 5: Commit the failing tests**

```bash
git add tests/site.test.mjs
git commit -m "test: define ontology production-boundary contract"
```

### Task 2: Implement the concept boundary and selection guide

**Files:**
- Modify: `index.html`
- Test: `tests/site.test.mjs`

- [ ] **Step 1: Add navigation entries**

Add links for `#selection`, `#production`, and `#sources`, with numbering updated consistently.

- [ ] **Step 2: Rewrite the definition lead and add the three-layer model**

State that this guide uses the broad enterprise operational meaning of Ontology. Add cards for semantic ontology, knowledge graph, and enterprise operational layer. Explicitly state that Function, Action, permissions, and audit are platform capabilities layered on top of semantic models.

- [ ] **Step 3: Add the `selection` section**

Create a responsive decision table for RAG, structured RAG, Knowledge Graph / GraphRAG, Ontology, and operational Ontology + Agent. Add a short list of stop conditions for cases where Ontology would be premature.

- [ ] **Step 4: Clarify the five construction routes**

Label them as practical routes rather than an exclusive industry taxonomy. Preserve the existing five methods and their stage-specific advice.

- [ ] **Step 5: Run targeted tests**

Run: `npm test`

Expected: section and selection assertions pass; production and source assertions still fail.

- [ ] **Step 6: Commit the concept and selection update**

```bash
git add index.html
git commit -m "feat: clarify ontology boundaries and architecture selection"
```

### Task 3: Add data, function, and action production controls

**Files:**
- Modify: `index.html`
- Test: `tests/site.test.mjs`

- [ ] **Step 1: Add data-governance controls to the pipeline**

Add Entity Resolution, Source Precedence, Temporal Semantics, and Confidence and Review. Explain aliases, conflict resolution, four time fields, and review thresholds without inventing numeric thresholds.

- [ ] **Step 2: Split Function into three runtime classes**

Add Pure Function, Model Function, and External Function, with the required versioning and failure controls for each.

- [ ] **Step 3: Strengthen Action semantics**

Add idempotency, partial failure, compensation, source-of-truth writeback, approval, audit, and replay. Present isolation as an architecture pattern rather than an inherent Ontology feature.

- [ ] **Step 4: Correct tool-calling wording**

State that native schemas generally improve structured invocation, while multiple or parallel calls depend on the model and runtime.

- [ ] **Step 5: Expand governance**

Add identity propagation, object / field / function / action authorization, change proposals, owner review, compatibility, migration, deprecation, and rollback.

- [ ] **Step 6: Run tests**

Run: `npm test`

Expected: boundary and governance assertions pass; production and source assertions still fail.

- [ ] **Step 7: Commit production-control content**

```bash
git add index.html
git commit -m "feat: add ontology data and action production controls"
```

### Task 4: Add production evaluation and vendor validation

**Files:**
- Modify: `index.html`
- Test: `tests/site.test.mjs`

- [ ] **Step 1: Add the `production` section**

Show the release loop:

```text
baseline -> representative samples -> trace -> error taxonomy -> candidate version -> regression gate -> controlled rollout -> readback
```

- [ ] **Step 2: Define metrics with denominators**

Add decision accuracy, evidence completeness, and human takeover rate with explicit numerators and denominators. Add latency, cost, freshness, tool failures, rollback, baseline, exclusions, window, and owner as required measurement context.

- [ ] **Step 3: Add the FlyOntOS + WorkBuddy matrix**

Map objects, rules, MCP integration, permissions, production runtime, and reuse to vendor verification questions and Tencent FDE deliverables. Mark all vendor implementation claims as `待现场核验` unless linked public evidence proves them.

- [ ] **Step 4: Extend the delivery playbook and Definition of Done**

Add synchronization freshness, timeout / retry / idempotency, version rollback, regression gates, latency / cost observability, controlled adoption, and reusable-asset boundaries.

- [ ] **Step 5: Run tests**

Run: `npm test`

Expected: all content assertions except sources pass.

- [ ] **Step 6: Commit the evaluation content**

```bash
git add index.html
git commit -m "feat: add production evaluation and vendor validation"
```

### Task 5: Publish sources and update project documentation

**Files:**
- Modify: `index.html`
- Modify: `README.md`
- Test: `tests/site.test.mjs`

- [ ] **Step 1: Add the `sources` section**

Add visible links to W3C OWL 2, Palantir's Ontology System, WorkBuddy Enterprise MCP documentation, FlyOntOS, its ontology library, case gallery, and OntoBench. Explain `标准定义`, `厂商产品语义`, `厂商公开信息`, `工程建议`, and `待现场核验`.

- [ ] **Step 2: Update README content map and source policy**

Document the new selection, lifecycle, vendor-validation, and source sections. State that vendor capabilities are not treated as production proof without runtime evidence.

- [ ] **Step 3: Run the full test suite**

Run: `npm test`

Expected: all tests pass.

- [ ] **Step 4: Run formatting verification**

Run: `git diff --check`

Expected: no output.

- [ ] **Step 5: Commit documentation and sources**

```bash
git add index.html README.md
git commit -m "docs: publish ontology sources and evidence boundaries"
```

### Task 6: Render, review, and publish

**Files:**
- Verify: `index.html`
- Verify: `README.md`

- [ ] **Step 1: Start the local server**

Run: `python3 -m http.server 4177`

- [ ] **Step 2: Verify desktop rendering at 1440×1000**

Check navigation, selection table, production lifecycle, vendor matrix, source links, console, and horizontal overflow.

- [ ] **Step 3: Verify mobile rendering at 390×844**

Check horizontal navigation, table containment, card stacking, source links, font sizes, and page-level overflow.

- [ ] **Step 4: Run the final verification commands**

```bash
npm test
git diff --check
git status --short --branch
```

Expected: tests pass, no whitespace errors, and the branch is clean.

- [ ] **Step 5: Integrate and push**

Fast-forward `main` to the verified implementation branch and push `origin/main`.

- [ ] **Step 6: Verify GitHub Pages readback**

Read the published page and confirm the new section headings, source URLs, and FlyOntOS + WorkBuddy matrix are present.
