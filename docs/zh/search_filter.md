# 搜索与筛选
本应用提供了相对丰富的搜索与筛选功能。

## 搜索
点击列表页的:mag:按钮，即可打开文本搜索框。

### 自定义搜索范围
若搜索框末尾有设置按钮:gear:。以从者列表页搜索设置为例：
- 基础信息: 从者id、名称、画师、声优等资料
- 保有技能: 保有技能(主动技能)的名称、技能效果
- 被动技能: 被动技能的名称、效果
- 附加技能: 附加技能的名称、效果
- 宝具: 宝具的名称、上标、效果
不包含个人资料等非重要信息。

若没有此设置按钮，只搜索预置的主要关键信息。

### 拼音/首字母/Romaji搜索
- 对于包含多语言版本的字段，各个语言均列入检索项。
- 其中*部分*关键字段（如卡牌名称）支持拼音与拼音首字母（中文）、罗马音（日文）搜索。
- 对于一些技能效果等，请使用全称准确描述，或使用buff筛选

### 多个关键字组合搜索
参考了Mooncell的设计方式，空格分割多个关键词。

- 默认使用 ***或*** 连接多个关键词
  - `A B C` = A或B或C
- `+B`表示必须出现该关键词
  - `A +B` = `+A +B` = A且B
- `-C`表示不允许出现该关键词
  - `A -C` = 必须有A且不存在C
  - `A +B -C` = 必须有A和B且不存在C

## 筛选
点击列表页的筛选按钮弹出筛选对话框。以从者列表页为例：
- List/Grid: 切换列表布局与网格布局（虽然严格来说不算筛选）
- 排序：根据序号、直接、星级等进行升序或降序排列
- 灵衣: 仅显示有灵衣
- 卡牌基础属性筛选: 职阶、星级、宝具颜色和类型、阵营、属性、性别、特性等
- 用户规划属性筛选: 初号机/2号机、规划状态、主动技能当前练度、优先级等
- Buff/技能效果筛选：详见[Buff检索](./buff_filter.md)


### 组合筛选
- 每个筛选分组内部之间为 ***或*** 关系，
  - 部分可通过 **:ballot_box_with_check:全匹配** 按钮设置为 ***且*** 关系
- 全不选=全选
- 不同筛选分组之间为 ***且*** 关系
- **:ballot_box_with_check:反向选择**

筛选设置可在应用设置-显示设置中设置每次进入是否重置