# Ontology in Practice

一份面向企业 AI、Agent 工程与 FDE 交付的 Ontology 实践指南。

项目回答一个具体问题：如何把散落在数据库、表格、PDF 和业务系统里的信息，变成 AI 能理解、查询、计算和受控执行的业务操作层。

## 内容地图

- 为什么仅有 RAG 仍会得到不稳定的业务答案
- LLM 构建 Ontology 的五种路线与选择规则
- 结构化、半结构化和非结构化数据的接入管道
- Object、Link、Function 和 Action 的分工
- Retrieval Context、Object Query 与 Document Context 的边界
- 权限、人工确认、审计日志和 MCP 接入
- 从问题定义到生产验收的六步清单

## 阅读

直接打开 `index.html`，或在仓库目录启动一个本地服务：

```bash
python3 -m http.server 4177
```

然后访问 `http://127.0.0.1:4177`。

页面是单文件 HTML，没有远程字体、CDN 脚本或第三方前端依赖。

## 验证

```bash
npm test
```

测试检查章节与导航映射、必要内容、来源标注、无媒体热链、无远程前端依赖和基本可访问性约束。

## 来源与声明

主要素材来自小红书视频 [《FDE 必看 Ontology 落地技术细节》](https://www.xiaohongshu.com/explore/6a95742a000000001e014102)。

本项目是学习型蒸馏与工程化重写，没有收录完整字幕，也没有复制视频原页。项目不是 Palantir 官方文档。与具体 API、产品能力和授权模型有关的实施，需要再查官方文档。

`source/distillation-notes.md` 记录了内容取舍和字幕识别修正。
