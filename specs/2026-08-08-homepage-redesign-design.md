# Epoch MC Wiki 首页 + 全局主题改版设计

日期：2026-08-08
状态：已获用户批准（方案 A · 节奏分层型；配色 2 · 深海蓝）

## 1. 背景与目标

当前首页是标准 Docusaurus 模板观感：简单渐变 hero + 四个均匀方卡片区块，版式单调、缺乏视觉层级，整体偏"模板感"。用户希望参考 CEMC Wiki（wiki.new1.world）的首页设计气质（非内容），做一次整体改版。

已与用户确认的设计决策：

| 维度 | 决定 |
|------|------|
| 整体方向 | 清爽中性风（类似 CEMC 观感） |
| 改动范围 | 首页 + 全局主题（影响所有文档页） |
| 版式方案 | A · 节奏分层型：深色首屏 + 浅色正文，区块形态交替 |
| 配色 | 2 · 深海蓝：深蓝首屏 + 天蓝强调色 |
| 首屏默认 | 浅色（light）为默认，同时保留可用的深色模式 |

## 2. 配色令牌（全局主题，custom.css）

主题切换为**浅色默认**（`defaultMode: 'light'`），`respectPrefersColorScheme: true` 保留。深色模式提供调校过的对应色板，不强制移除。

### 浅色主题 `:root`

- 强调色主色：`#2563eb`（blue-600）
  - `--ifm-color-primary: #2563eb`
  - `--ifm-color-primary-dark: #1d4ed8`
  - `--ifm-color-primary-darker: #1e40af`
  - `--ifm-color-primary-darkest: #1e3a8a`
  - `--ifm-color-primary-light: #3b82f6`
  - `--ifm-color-primary-lighter: #60a5fa`
  - `--ifm-color-primary-lightest: #93c5fd`
- 正文墨色：`#0f172a`（slate-900）
- 背景基调：`#ffffff`；交替区块底：`#f8fafc`（slate-50）
- 边框：`#e8edf4` / `#eef2f7`
- 次级文字：`#64748b`（slate-500）
- 链接 hover：主色加深

### 深色主题 `[data-theme='dark']`

- 强调色：`#60a5fa`（blue-400）为主色，hover `#93c5fd`
- 背景：`#0f172a` 系列，卡片 `#1e293b`，边框 `#334155`
- 代码/高亮等沿用现有规则并适配

### 排版

- 沿用系统字体栈（中文 PingFang SC / Microsoft YaHei / Noto Sans SC），不引入网络字体
- 标题权重 `800`，正文 `font-size` 保持 Docusaurus 默认（1rem）
- 全局圆角：卡片统一 `12px`；按钮胶囊半径 `999px` 仅用于 hero/banner 内徽章，常规按钮保持 Infima 默认

## 3. 首页结构（src/pages/index.tsx + index.module.css）

重写后的区块顺序（内容本体基本沿用，去掉原「常用资源」区块，由底部 CTA 横幅替代）：

### 3.1 导航栏（navbar，config 微调）
- 保留现有 `Epoch MC` 标题 + `logo.png` + 「玩家手册」docSidebar 项
- 加底部细边框分隔；活跃项主色下划线高亮沿用 Infima 默认行为，无需自定义

### 3.2 Hero 首屏（深色）
- 背景：`linear-gradient(160deg, #0f1b3d 0%, #1e3a8a 55%, #2563eb 120%)`
- 叠加径向光晕：`radial-gradient(600px 220px at 50% -40px, rgba(96,165,250,.25), transparent 70%)`
- 内容居中：`logo.png`（宽约 180–220px，实际按图片宽高比）+ 标题 `Epoch MC`（40px/800）+ 副标题（tagline）+ 一句话简介
- CTA 按钮：主按钮白底深蓝字（"开始阅读" → /docs/intro）；次按钮白色描边透明底（"加入 QQ 群"）
- 徽章行：Java 1.20.1 / 国战 / 生存 / 1:50 真实地球 / Towny，半透明白胶囊
- 移动端：内边距与字号缩小

### 3.3 区块一「怎么玩」（浅色，6 图标卡片）
- 白底 + 居中区块标题与描述
- 6 张入口卡片（新手快速入门 / 国战玩法 / 城镇与国家 / 酿酒系统 / 经济和股市 / 常见问题 FAQ）
- 卡片：白底、`1px #e8edf4` 边框、圆角 `12px`、icon（emoji 22px）+ 标题 + 描述
- 整卡可点击（Link），hover：`translateY(-2px)` + 主色边框 + 轻阴影
- 网格：`repeat(auto-fit, minmax(260px, 1fr))`

### 3.4 区块二「去哪里玩」（交替底 `#f8fafc`，大小卡混合）
- 布局 `grid-template-columns: 3fr 2fr`
- 左侧主卡：深海蓝渐变（`#1e3a8a → #3b82f6`）「地球世界」，白字 + 链接"前往 →"（→ /docs/plugins/towny）
- 右侧两卡上下堆叠：白卡「卫星地图」（外链）、「国家股市」（外链）
- 移动端：单列堆叠

### 3.5 区块三「服务器一览」（浅色，图文画廊）
- 3 张画廊卡：图片（现有 `img/gallery-*.png`，`height 160px`，`object-fit: cover`）+ 编号（01/02/03，主色、`letter-spacing`）+ 标题 + 描述
- 卡片圆角 `12px`、溢出隐藏

### 3.6 CTA 横幅（深色，替代原「常用资源」区块）
- 背景同 hero 渐变
- 居中：标题「现在就去看看这个世界」+ 一句副文案
- 两个按钮：主色实心「打开卫星地图」（外链）、白色描边「加入 QQ 群」
- 语义：聚合外链入口，收尾整页

### 3.7 页脚（footer，config 微调）
- 保留现有暗色页脚与链接分组；页脚背景色统一为 `#0f1b3d`，与 hero/CTA 深蓝一致

## 4. 文档页全局样式

仅通过 custom.css 生效，影响所有文档页：
- 主题色、标题/正文配色按第 2 节
- 链接颜色、表格边框、代码块、blockquote 等沿用 Infima，仅随色板自适应
- 不做破坏性的文档结构改动

## 5. 涉及文件

| 文件 | 改动 |
|------|------|
| `src/css/custom.css` | 重写浅/深主题色板与排版变量 |
| `docusaurus.config.ts` | `defaultMode: 'light'`；页脚背景色微调 |
| `src/pages/index.tsx` | 按第 3 节重写首页组件与数据 |
| `src/pages/index.module.css` | 重写首页全部样式 |
| `src/components/HomepageFeatures/*` | 当前未被首页引用，直接删除以免冗余 |
| `static/img/*` | 复用现有 logo 与 gallery 图片，不新增素材 |

## 6. 验证

- `npm run build` 通过（`onBrokenLinks: throw` 要求所有链接有效）
- `npm run start` 目测：浅色默认、深色可切换、各区块 hover 态、移动端（<996px）堆叠布局
- 确认 docs 文档页主题色与正文可读性（尤其深色模式）

## 7. 范围外

- 不改动文档正文内容（docs/*.md）
- 不新增图片素材、不引入字体库
- 不重做导航栏/页脚的链接结构（仅样式）
