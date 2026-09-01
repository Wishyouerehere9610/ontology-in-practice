# Ontology in Practice

一份面向企业 AI、Agent 工程与 FDE 交付的 Ontology 实践指南。

项目回答一个具体问题：如何把散落在数据库、表格、PDF 和业务系统里的信息，变成 AI 能理解、查询、计算和受控执行的业务操作层。

[在线阅读](https://wishyouerehere9610.github.io/ontology-in-practice/)

## 内容地图

- 为什么仅有 RAG 仍会得到不稳定的业务答案
- 语义本体、知识图谱与企业操作层的概念边界
- RAG、结构化 RAG、GraphRAG、Ontology 与操作层的选择规则
- LLM 构建 Ontology 的五种路线与选择规则
- 结构化、半结构化和非结构化数据的接入管道
- 实体消歧、来源优先级、时间语义和不确定性复核
- Object、Link、Function 和 Action 的分工
- Retrieval Context、Object Query 与 Document Context 的边界
- 权限、人工确认、审计日志和 MCP 接入
- Pure、Model、External Function 与受控 Action 的运行边界
- 真实样本、Trace、错误分类、回归门禁和发布读回
- FlyOntOS + WorkBuddy 的 FDE 验证矩阵
- 从问题定义到生产验收的八步清单
- 标准、厂商产品语义、公开声明和工程建议的来源边界

## 阅读

直接打开 `index.html`，或在仓库目录启动一个本地服务：

```bash
python3 -m http.server 4177
```

然后访问 `http://127.0.0.1:4177`。

页面是单文件 HTML，没有远程字体、CDN 脚本或第三方前端依赖。

## 证据边界

页面中的标准定义链接到 W3C，企业操作层概念链接到 Palantir 官方文档，WorkBuddy 与 FlyOntOS 能力链接到各自公开页面。厂商公开声明不直接视为生产证明；涉及准确率、权限、运行稳定性和客户效果的结论，需要用真实样本、Trace、正式报告或客户验收结果核验。

## 验证

```bash
npm test
```

测试检查章节与导航映射、必要内容、无媒体热链、无远程前端依赖和基本可访问性约束。
