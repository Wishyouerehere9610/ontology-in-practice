# 蒸馏记录

## 来源

- 视频：《FDE 必看 Ontology 落地技术细节》
- 平台：小红书
- 时长：约 48 分钟
- 笔记 ID：`6a95742a000000001e014102`
- 素材：中文 SRT 字幕、视频页面元数据、网页录屏关键帧

## 蒸馏决策

1. 没有复制完整字幕，按问题、构建、数据、操作、Agent、治理和交付重新组织。
2. 视频反复讲解 Query Layer 的部分合并为一次完整说明。
3. 将口语中的“知识地图”收敛为“业务操作层”，因为后半段的 Function、Action 和 Governance 才是与普通知识图谱的主要差别。
4. 将“集群法”按上下文改写为“数据聚类”，将“两步法”改写为“人机协同两步法”，便于读者理解。
5. 对 Palantir 产品细节保留学习边界，不将视频口述当成官方产品承诺。

## 关键识别修正

| 字幕识别 | 按语义修正 |
| --- | --- |
| palenteer / penalty / penta tell | Palantir |
| red 指数库 | RAG 检索库 |
| PTF / PDPDF | PDF |
| circle | SQL |
| contacts layer | Context Layer |
| queruler / quarrel | Query Layer |
| object x query | Object Query |
| action tour | Action Tool |

## 内容主线

`raw evidence → clean data → object/link → function → governed action → audit`

这条主线用于判断每段内容是否应该留在最终 HTML 中。无法帮助读者理解这条链路的口语重复、比喻和产品细枝末节已删除。
