# Ontology in Practice Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 生成一份可离线阅读、响应式、内容可追溯的 Ontology 实践 HTML，并推送到私有 GitHub 仓库。

**Architecture:** 仓库以单文件 `index.html` 作为交付面，CSS 和 JavaScript 全部内联，便于离线阅读和后续托管。Node 内置测试校验结构、内容契约和外部依赖边界，浏览器验证桌面与移动端渲染。

**Tech Stack:** Semantic HTML5, CSS, vanilla JavaScript, Node.js built-in test runner, Git, GitHub CLI.

---

### Task 1: 建立内容契约

**Files:**
- Create: `tests/site.test.mjs`
- Create: `package.json`

- [ ] **Step 1:** 为章节数量、导航映射、必要术语、无 CDN 和可访问性写测试。
- [ ] **Step 2:** 运行 `npm test`，验证因 `index.html` 缺失而失败。

### Task 2: 构建单页长文

**Files:**
- Create: `index.html`

- [ ] **Step 1:** 依设计文档编写完整原创正文与语义化章节。
- [ ] **Step 2:** 实现内联响应式 CSS、粘性导航和 CSS 原生图解。
- [ ] **Step 3:** 实现阅读进度与当前章节高亮，并尊重 `prefers-reduced-motion`。
- [ ] **Step 4:** 运行 `npm test`，修复到全部通过。

### Task 3: 补齐项目说明

**Files:**
- Create: `README.md`
- Create: `.gitignore`

- [ ] **Step 1:** 写清项目目标、内容地图和本地打开方式。
- [ ] **Step 2:** 将可视化头脑风暴临时目录 `.superpowers/` 加入忽略规则。

### Task 4: 渲染与可用性验证

**Files:**
- Verify: `index.html`

- [ ] **Step 1:** 用本地 HTTP 服务打开页面，在 1440×1000 视口检查导航、正文、图解和控制台。
- [ ] **Step 2:** 在 390×844 视口检查排版、水平溢出、导航和小字号。
- [ ] **Step 3:** 运行 `npm test` 和 `git diff --check`。

### Task 5: 创建并验证私有 GitHub 仓库

**Files:**
- Commit: all project files

- [ ] **Step 1:** 提交项目文件。
- [ ] **Step 2:** 运行 `gh repo create ontology-in-practice --private --source=. --remote=origin --push`。
- [ ] **Step 3:** 用 `gh repo view --json nameWithOwner,visibility,url,defaultBranchRef` 回读仓库可见性和默认分支。
- [ ] **Step 4:** 用 `git status --short --branch` 和远端文件列表验证本地/远端一致。

### Task 6: 启用 GitHub Pages

**Files:**
- Create: `.nojekyll`

- [ ] **Step 1:** 从 `main` 分支根目录启用 GitHub Pages。
- [ ] **Step 2:** 回读 Pages 配置与部署状态。
- [ ] **Step 3:** 访问线上 URL，验证标题、8 个章节和无水平溢出。
