# Ontology in Practice 生产边界与厂商验证改版设计

## 目标

在不改变现有单页阅读体验和视觉语言的前提下，把当前指南从“Ontology 概念与搭建说明”升级为“可用于企业 AI 选型、生产验收和厂商评估的 FDE 实践指南”。

改版需要解决五个问题：

1. 区分 W3C 语义本体、知识图谱和 Palantir 式企业操作本体。
2. 说明 RAG、结构化 RAG、知识图谱、Ontology 和操作层各自适用的场景。
3. 补齐实体消歧、来源优先级、时间语义、不确定性传播和变更治理。
4. 把 Function、Action、权限和生产验收写成可执行的工程约束。
5. 增加 FlyOntOS 与 WorkBuddy 的验证矩阵，并为关键概念提供可追溯来源。

## 受众与成功标准

主要读者仍是企业 AI 工程师、FDE、Agent 工程师和知识工程人员。

读完后，读者应能回答：

- 当前业务问题是否需要 Ontology，还是 RAG 或知识图谱已经足够。
- 文中的哪些概念属于通用标准，哪些属于 Palantir 产品语义，哪些是工程建议。
- 一条业务事实如何从源数据进入对象、关系、函数和动作，并保留证据与版本。
- 一个 Ontology 项目进入试点或生产前需要通过哪些质量、权限、故障恢复和发布门禁。
- 如何验证 FlyOntOS 与 WorkBuddy 的组合是否具备生产价值，而不是只看演示。

## 改版方式

采用“融入现有主线，再增加两个独立章节”的方式。与现有内容高度相关的边界说明直接写回原章节，避免在文末堆补丁；需要读者单独做决策的内容新增章节。

不拆分 `index.html`，不引入构建系统、远程字体、CDN 脚本或图片热链。继续使用现有 HTML、内联 CSS 和少量原生 JavaScript。

## 信息结构

页面调整为十个主章节，并在文末增加来源说明：

1. `problem`：保留 RAG 答案漂移问题，避免把 RAG 描述成必然失败。
2. `definition`：新增三层定义，区分语义本体、知识图谱和操作层。
3. `selection`：新增方案选型，比较 RAG、结构化 RAG、知识图谱、Ontology 和操作层。
4. `routes`：保留五种构建路线，明确这是实践分类，不是行业唯一标准。
5. `pipeline`：增加实体消歧、来源优先级、时间语义和置信度传播。
6. `operating-layer`：把 Function 分为 Pure、Model 和 External 三类；补充 Action 的幂等、补偿和事实源边界。
7. `agent-context`：保留 Context、Query 和工具暴露方式，修正工具并行能力的绝对表述。
8. `governance`：补充身份透传、字段和动作授权、变更提案、兼容性与弃用策略。
9. `production`：新增生产闭环、评测指标、发布门禁、故障恢复和 FlyOntOS + WorkBuddy 验证矩阵。
10. `playbook`：扩展现有六步清单和 Definition of Done。
11. `sources`：列出标准、厂商文档和工程判断的边界，不将来源隐藏在仓库说明中。

## 核心内容设计

### 三层概念边界

新增一组并列卡片：

- 语义本体：Class、Property、Individual、Axiom，参考 W3C OWL 2。
- 知识图谱：保存具体实体、事实和关系实例，可带来源、时间与置信度。
- 企业操作层：连接对象、逻辑、动作、安全和应用，参考 Palantir Foundry 的产品语义。

正文明确：Function、Action、权限和审计不是 OWL 文件天然具备的能力，而是企业平台在语义层上继续提供的运行能力。

### 方案选型

新增五行决策表：

| 问题类型 | 首选方案 |
| --- | --- |
| 文档搜索、摘要和引用 | RAG |
| 需要元数据过滤与稳定口径 | 结构化 RAG |
| 需要实体关系穿透 | 知识图谱或 GraphRAG |
| 需要跨系统对象统一、约束和可解释推理 | Ontology |
| 需要写操作、权限、审批和审计 | 企业操作层 + Agent |

同时列出不应过早建设 Ontology 的情况：业务口径持续变化、没有业务负责人、数据不可用、问题只需文档检索、没有可复用可能。

### 数据与变更治理

在数据管道中新增四项：

- Entity Resolution：跨系统稳定标识、别名归一与合并规则。
- Source Precedence：主数据、合同、业务单据和人工录入冲突时的优先级。
- Temporal Semantics：业务发生时间、生效时间、入库时间和失效时间。
- Confidence and Review：解析置信度、人工复核阈值和不确定事实的隔离。

变更治理补充 Owner、Proposal、Review、Version、Migration、Deprecation 和 Rollback。任何结构变更都必须能说明影响对象、依赖函数、动作和历史数据。

### Function 与 Action

Function 分为：

- Pure Function：固定输入和版本下结果稳定，可直接做回归测试。
- Model Function：调用模型，需要记录模型、Prompt、上下文和评测版本。
- External Function：调用外部服务，需要超时、重试、降级和返回值校验。

Action 增加风险等级、前置条件、审批、幂等键、部分失败、补偿操作、事实源写回和审计回放。Ontology 不能默认成为业务事实源，必须明确源系统与操作层的同步关系。

### 生产验收

新增从真实样本到上线的闭环：

`baseline -> representative samples -> trace -> error taxonomy -> candidate version -> regression gate -> controlled rollout -> readback`

指标不写无来源百分比，统一给出定义方法：

- 决策正确率 = 正确最终结论数 / 符合口径的样本总数。
- 证据完整率 = 正确引用证据的结论数 / 应提供证据的结论总数。
- 人工接管率 = 需要人工完成的任务数 / 进入试点的任务总数。
- 另记录端到端延迟、单次成本、同步新鲜度、工具失败和回滚结果。

每个指标说明需要同时记录基线、排除项、时间窗口和数据负责人。

### FlyOntOS + WorkBuddy 验证矩阵

矩阵只描述待验证能力，不替厂商背书：

| 能力 | FlyOntOS 待验证点 | 腾讯 FDE 交付物 |
| --- | --- | --- |
| 对象与关系 | 资产来源、版本、复用与实体映射 | 最小场景对象模型 |
| 规则与推理 | SHACL、SWRL 或函数的真实命中效果 | 代表性样本与错误分类 |
| Agent 接入 | `onto_*` MCP 工具契约、超时和副作用 | WorkBuddy Connector |
| 权限 | 身份、对象、字段、函数和动作授权 | 权限透传与审批方案 |
| 生产运行 | 同步、Trace、重试、回滚和告警 | Shadow/ALT 发布门禁 |
| 复用 | 多客户采用和交付周期证据 | 行业模板与客户扩展点 |

页面明确区分：厂商公开声明、现场待核验事实和 FDE 工程建议。

## 来源设计

新增可见来源章节，并保持短而够用：

- W3C OWL 2 Quick Reference：标准语义本体边界。
- Palantir The Ontology System：数据、逻辑、动作和安全的操作本体定义。
- Palantir 相关产品文档：Object、Link、Function、Action、Proposal 和 Application Restrictions。
- 腾讯 WorkBuddy Enterprise MCP 文档：外部系统与工具接入能力。
- FlyOntOS 官网、本体库、案例馆和 OntoBench：厂商公开声明与待验证项。

链接只使用普通 `<a>` 标签，不加载远程前端资源。每段关键厂商事实旁使用“厂商公开信息”或“待现场核验”标识。

## 文风

延续当前直白、面向交付的写法。避免宣传语、虚构案例、没有口径的数字和绝对化表达。

需要修正的句式包括：

- “知识图谱主要回答世界里有什么”改成三层边界说明。
- “Prompted Tool Calling 通常一次只能选择一个工具”改成由模型与 Runtime 决定。
- “Function 是确定性的”改成只有 Pure Function 在输入与版本固定时具备该性质。
- “隔离写回是 Ontology 固有能力”改成推荐的生产架构模式。

## 测试与验收

先修改 `tests/site.test.mjs`，使新增要求在页面修改前失败，再实现正文。

自动化测试至少覆盖：

- 新增 `selection`、`production` 和 `sources` 章节及导航映射。
- 页面包含三层概念边界、五种方案选型、三类 Function 和数据治理关键词。
- 页面包含评测指标定义和 FlyOntOS + WorkBuddy 验证矩阵。
- 页面包含 W3C、Palantir、腾讯 WorkBuddy 和 FlyOntOS 的可见来源链接。
- 删除“禁止来源说明”的旧测试，继续禁止远程脚本、字体和媒体热链。
- 继续检查主导航、响应式布局、无障碍和 `prefers-reduced-motion`。

人工验收包括：

- `npm test` 全部通过。
- `git diff --check` 无格式问题。
- 1440×1000 和 390×844 两个视口无页面级水平溢出。
- 新增表格和来源列表在移动端可读。
- 页面控制台无错误，导航高亮与阅读进度正常。
- GitHub Pages 发布后，线上页面包含新章节和关键来源。

## 非目标

- 不把项目改造成 FlyOntOS 产品宣传页。
- 不声称厂商能力已经经过生产验证。
- 不增加登录、搜索、数据库或后端服务。
- 不引入 React、Vue、构建工具或第三方可视化库。
- 不扩展更多 Ontology 构建算法，优先完善边界和生产闭环。
