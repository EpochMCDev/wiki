# Epoch MC Wiki 首页 + 全局主题改版 实现计划

> **面向 AI 代理的工作者：** 必需子技能：使用 superpowers:subagent-driven-development（推荐）或 superpowers:executing-plans 逐任务实现此计划。步骤使用复选框（`- [ ]`）语法来跟踪进度。

**目标：** 将首页改版为「深海蓝 · 节奏分层」设计（深色首屏 + 浅色正文 + 形态交替的区块 + CTA 横幅），并把全局主题切换为浅色默认的蓝色系色板。

**架构：** 纯前端表现层改造。全局主题通过重写 `src/css/custom.css` 的 Infima 变量实现；首页通过重写 `src/pages/index.tsx` + `src/pages/index.module.css` 实现；`docusaurus.config.ts` 只改默认颜色模式；删除不再引用的 `src/components/HomepageFeatures/`。无运行时逻辑、无数据层变更。

**技术栈：** Docusaurus 3.10、React 19、TypeScript、CSS Modules + Infima 变量。

**规格参考：** `specs/2026-08-08-homepage-redesign-design.md`

---
**注意：** 本仓库不是 git 仓库，所有「Commit」步骤改为在步骤完成后运行 `npm run typecheck && npm run build` 验证。TDD 以 `npm run typecheck`（无类型错误）作为自动化校验，视觉正确性通过 `npm run start` 人工核验。

---

### 任务 1：全局主题色板（custom.css）

**文件：**
- 修改：`src/css/custom.css`（整体重写）

- [ ] **步骤 1：重写 custom.css**

用 Write 工具整体覆盖 `src/css/custom.css`：

```css
:root {
  --ifm-color-primary: #2563eb;
  --ifm-color-primary-dark: #1d4ed8;
  --ifm-color-primary-darker: #1e40af;
  --ifm-color-primary-darkest: #1e3a8a;
  --ifm-color-primary-light: #3b82f6;
  --ifm-color-primary-lighter: #60a5fa;
  --ifm-color-primary-lightest: #93c5fd;
  --ifm-code-font-size: 95%;
  --ifm-heading-color: #0f172a;
  --ifm-font-color-base: #1f2937;
  --docusaurus-highlighted-code-line-bg: rgba(0, 0, 0, 0.1);
}

[data-theme='dark'] {
  --ifm-color-primary: #60a5fa;
  --ifm-color-primary-dark: #3b82f6;
  --ifm-color-primary-darker: #2563eb;
  --ifm-color-primary-darkest: #1d4ed8;
  --ifm-color-primary-light: #93c5fd;
  --ifm-color-primary-lighter: #bfdbfe;
  --ifm-color-primary-lightest: #dbeafe;
  --ifm-heading-color: #f1f5f9;
  --docusaurus-highlighted-code-line-bg: rgba(0, 0, 0, 0.3);
}

.footer {
  background-color: #0f1b3d;
}
```

- [ ] **步骤 2：验证构建通过**

运行：`npm run build`
预期：构建成功，无 `Bad color`/CSS 错误。

---

### 任务 2：默认颜色模式改为浅色

**文件：**
- 修改：`docusaurus.config.ts:36-39`

- [ ] **步骤 1：修改 colorMode 配置**

将 `docusaurus.config.ts` 中的：

```ts
    colorMode: {
      defaultMode: 'dark',
      respectPrefersColorScheme: true,
    },
```

改为：

```ts
    colorMode: {
      defaultMode: 'light',
      respectPrefersColorScheme: true,
    },
```

- [ ] **步骤 2：验证类型与构建**

运行：`npm run typecheck`
预期：无类型错误。

---

### 任务 3：重写首页组件（index.tsx）

**文件：**
- 修改：`src/pages/index.tsx`（整体重写）

- [ ] **步骤 1：用 Write 覆盖 index.tsx**

完整代码如下：

```tsx
import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

import styles from './index.module.css';

type EntryCard = {
  title: string;
  desc: string;
  icon: string;
  to: string;
};

const ENTRY_CARDS: EntryCard[] = [
  {
    title: '新手快速入门',
    desc: '第一次进服就看这里：怎么加群、拿整合包、进游戏。',
    icon: '🚀',
    to: '/docs/guide/join',
  },
  {
    title: '国战玩法',
    desc: '建国圈地、宣战结盟、领土争夺，了解国战的核心机制。',
    icon: '⚔️',
    to: '/docs/gameplay/war',
  },
  {
    title: '城镇与国家',
    desc: '想加入城镇、圈地或建立国家，从这里开始。',
    icon: '🏰',
    to: '/docs/plugins/towny',
  },
  {
    title: '酿酒系统',
    desc: '大锅发酵、酿造台蒸馏、木桶陈酿，调制属于你的佳酿。',
    icon: '🍺',
    to: '/docs/plugins/breweryx',
  },
  {
    title: '经济和股市',
    desc: '国家股市、玩家交易，用经济博弈左右世界格局。',
    icon: '📈',
    to: '/docs/gameplay/economy',
  },
  {
    title: '常见问题 FAQ',
    desc: '进不去服务器、整合包、规则问题，先看这里。',
    icon: '❓',
    to: '/docs/faq',
  },
];

type Place = {
  title: string;
  desc: string;
  icon: string;
  to: string;
  feature?: boolean;
};

const PLACES: Place[] = [
  {
    title: '地球世界',
    desc: '1:50 真实地球地图，国战与建国的核心舞台。',
    icon: '🌍',
    to: '/docs/plugins/towny',
    feature: true,
  },
  {
    title: '卫星地图',
    desc: '实时查看全球疆域与建设进度，制定战略必备。',
    icon: '🛰️',
    to: 'http://epochearth.cn:11451/',
  },
  {
    title: '国家股市',
    desc: 'AuthMe 账号登录，参与国家间的股票交易。',
    icon: '📈',
    to: 'http://epochearth.cn:54754/',
  },
];

const GALLERY = [
  {title: '真实地球', desc: '基于真实地形的 1:50 地球地图。', img: 'img/gallery-world.png'},
  {title: '城镇建设', desc: '玩家城镇、圈地与基础设施。', img: 'img/gallery-town.png'},
  {title: '活动与国战', desc: '服务器活动与国战事件。', img: 'img/gallery-event.png'},
];

const BADGES = ['Java 1.20.1', '国战 / 生存', '1:50 真实地球', 'Towny', 'Slimefun'];

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={styles.hero}>
      <div className={styles.heroInner}>
        <img src="img/logo.png" alt="Epoch MC" className={styles.heroLogo} />
        <Heading as="h1" className={styles.heroTitle}>
          {siteConfig.title}
        </Heading>
        <p className={styles.heroSubtitle}>
          以 1:50 真实地球为地图的国战服务器。建国立政、扩张领土、纵横捭阖，从一片疆土开始你的大国崛起。
        </p>
        <div className={styles.heroButtons}>
          <Link className="button button--primary button--lg" to="/docs/intro">
            开始阅读
          </Link>
          <Link
            className="button button--secondary button--lg"
            to="https://qm.qq.com/q/M2NJEm15uc">
            加入 QQ 群
          </Link>
        </div>
        <div className={styles.heroBadges}>
          {BADGES.map((badge) => (
            <span key={badge}>{badge}</span>
          ))}
        </div>
      </div>
    </header>
  );
}

function SectionTitle({title, desc}: {title: string; desc: string}) {
  return (
    <div className={styles.sectionHeader}>
      <Heading as="h2" className={styles.sectionTitle}>
        {title}
      </Heading>
      <p className={styles.sectionDesc}>{desc}</p>
    </div>
  );
}

function HomepageBody() {
  return (
    <main>
      {/* 怎么玩 */}
      <section className={styles.section}>
        <div className="container">
          <SectionTitle
            title="怎么玩"
            desc="第一次进服、了解国战、研究插件玩法，都可以直接点下面的入口。"
          />
          <div className={styles.cardGrid}>
            {ENTRY_CARDS.map((card) => (
              <Link key={card.title} to={card.to} className={styles.entryCard}>
                <div className={styles.cardIcon}>{card.icon}</div>
                <Heading as="h3">{card.title}</Heading>
                <p>{card.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 去哪里玩 */}
      <section className={`${styles.section} ${styles.sectionAlt}`}>
        <div className="container">
          <SectionTitle
            title="去哪里玩"
            desc="每个板块都有自己的用途，进服前先了解会更省时间。"
          />
          <div className={styles.placeGrid}>
            {PLACES.map((place) =>
              place.feature ? (
                <Link key={place.title} to={place.to} className={styles.placeFeature}>
                  <div className={styles.placeFeatureIcon}>{place.icon}</div>
                  <Heading as="h3">{place.title}</Heading>
                  <p>{place.desc}</p>
                  <span className={styles.placeLink}>前往 →</span>
                </Link>
              ) : (
                <Link key={place.title} to={place.to} className={styles.placeCard}>
                  <div className={styles.placeIcon}>{place.icon}</div>
                  <div>
                    <Heading as="h3">{place.title}</Heading>
                    <p>{place.desc}</p>
                  </div>
                </Link>
              ),
            )}
          </div>
        </div>
      </section>

      {/* 服务器一览 */}
      <section className={styles.section}>
        <div className="container">
          <SectionTitle title="服务器一览" desc="先看看这里会发生什么。" />
          <div className={styles.galleryGrid}>
            {GALLERY.map((item, idx) => (
              <figure key={item.title} className={styles.galleryItem}>
                <img src={item.img} alt={item.title} loading="lazy" />
                <figcaption>
                  <span className={styles.galleryNum}>
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  <strong>{item.title}</strong>
                  <p>{item.desc}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* CTA 横幅 */}
      <section className={styles.ctaBanner}>
        <div className="container">
          <div className={styles.ctaInner}>
            <Heading as="h2" className={styles.ctaTitle}>
              现在就去看看这个世界
            </Heading>
            <p className={styles.ctaDesc}>
              打开卫星地图看实时疆域，或直接进群加入一场大国博弈。
            </p>
            <div className={styles.ctaButtons}>
              <Link className={styles.ctaPrimary} to="http://epochearth.cn:11451/">
                打开卫星地图
              </Link>
              <Link className={styles.ctaOutline} to="https://qm.qq.com/q/M2NJEm15uc">
                加入 QQ 群
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`Welcome to ${siteConfig.title}`}
      description="Epoch MC 国战服务器玩家手册">
      <HomepageHeader />
      <HomepageBody />
    </Layout>
  );
}
```

- [ ] **步骤 2：验证类型与构建**

运行：`npm run typecheck && npm run build`
预期：无类型错误；构建成功（`onBrokenLinks: throw` 下所有链接有效）。

---

### 任务 4：重写首页样式（index.module.css）

**文件：**
- 修改：`src/pages/index.module.css`（整体重写）

- [ ] **步骤 1：用 Write 覆盖 index.module.css**

完整代码如下：

```css
.hero {
  padding: 5rem 0 4rem;
  text-align: center;
  background: linear-gradient(160deg, #0f1b3d 0%, #1e3a8a 55%, #2563eb 120%);
  position: relative;
  color: #fff;
  overflow: hidden;
}

.hero::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(600px 220px at 50% -40px, rgba(96, 165, 250, 0.25), transparent 70%);
  pointer-events: none;
}

.heroInner {
  position: relative;
  max-width: 800px;
  margin: 0 auto;
  padding: 0 1rem;
}

.heroLogo {
  width: 220px;
  max-width: 80%;
  height: auto;
  margin-bottom: 1.25rem;
}

.heroTitle {
  font-size: 2.5rem;
  font-weight: 800;
  letter-spacing: -0.5px;
  margin-bottom: 0.5rem;
  color: #fff;
}

.heroSubtitle {
  font-size: 1.1rem;
  opacity: 0.85;
  max-width: 640px;
  margin: 0 auto 2rem;
  line-height: 1.8;
}

.heroButtons {
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
  margin-bottom: 1.5rem;
}

.heroButtons :global(.button--primary) {
  background: #fff;
  color: #1e3a8a;
  border: none;
}

.heroButtons :global(.button--primary:hover) {
  background: rgba(255, 255, 255, 0.92);
  color: #1e3a8a;
}

.heroButtons :global(.button--secondary) {
  background: transparent;
  color: #fff;
  border: 1px solid rgba(255, 255, 255, 0.5);
}

.heroButtons :global(.button--secondary:hover) {
  background: rgba(255, 255, 255, 0.15);
}

.heroBadges {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.heroBadges span {
  background: rgba(255, 255, 255, 0.12);
  border: 1px solid rgba(255, 255, 255, 0.25);
  border-radius: 999px;
  padding: 0.25rem 0.9rem;
  font-size: 0.8rem;
}

.section {
  padding: 3rem 0;
}

.sectionAlt {
  background: #f8fafc;
}

.sectionHeader {
  text-align: center;
  margin-bottom: 2rem;
}

.sectionTitle {
  font-size: 1.8rem;
  font-weight: 800;
  margin-bottom: 0.5rem;
}

.sectionDesc {
  color: #64748b;
  max-width: 560px;
  margin: 0 auto;
  font-size: 0.95rem;
}

/* 怎么玩 */
.cardGrid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 1rem;
}

.entryCard {
  display: block;
  padding: 1.5rem 1.5rem 1.75rem;
  border: 1px solid #e8edf4;
  border-radius: 12px;
  background: #fff;
  transition: all 0.2s ease;
}

.entryCard:hover {
  border-color: var(--ifm-color-primary);
  transform: translateY(-2px);
  text-decoration: none;
  box-shadow: 0 6px 20px rgba(15, 27, 61, 0.08);
}

.cardIcon {
  font-size: 1.6rem;
  margin-bottom: 0.75rem;
}

.entryCard h3 {
  font-size: 1.05rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.entryCard p {
  margin: 0;
  color: #64748b;
  font-size: 0.9rem;
  line-height: 1.7;
}

/* 去哪里玩 */
.placeGrid {
  display: grid;
  grid-template-columns: 3fr 2fr;
  gap: 1rem;
  align-items: stretch;
}

.placeFeature {
  grid-row: 1 / span 2;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 2rem;
  border-radius: 12px;
  background: linear-gradient(160deg, #1e3a8a, #3b82f6);
  color: #fff;
  min-height: 240px;
  transition: all 0.2s ease;
}

.placeFeature:hover {
  text-decoration: none;
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(30, 58, 138, 0.3);
}

.placeFeatureIcon {
  font-size: 2rem;
  margin-bottom: 0.75rem;
}

.placeFeature h3 {
  font-size: 1.5rem;
  font-weight: 800;
  margin-bottom: 0.4rem;
  color: #fff;
}

.placeFeature p {
  margin: 0;
  font-size: 0.95rem;
  opacity: 0.85;
  line-height: 1.6;
}

.placeLink {
  display: inline-block;
  margin-top: 1rem;
  font-size: 0.95rem;
  font-weight: 600;
}

.placeCard {
  display: flex;
  gap: 1rem;
  align-items: flex-start;
  padding: 1.25rem 1.5rem;
  border: 1px solid #e8edf4;
  border-radius: 12px;
  background: #fff;
  transition: all 0.2s ease;
}

.placeCard:hover {
  border-color: var(--ifm-color-primary);
  text-decoration: none;
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(15, 27, 61, 0.08);
}

.placeIcon {
  font-size: 1.4rem;
  line-height: 1.2;
}

.placeCard h3 {
  font-size: 1.05rem;
  font-weight: 700;
  margin: 0 0 0.25rem;
}

.placeCard p {
  margin: 0;
  color: #64748b;
  font-size: 0.85rem;
  line-height: 1.6;
}

/* 服务器一览 */
.galleryGrid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 1rem;
}

.galleryItem {
  margin: 0;
  border: 1px solid #e8edf4;
  border-radius: 12px;
  overflow: hidden;
  background: #fff;
}

.galleryItem img {
  width: 100%;
  height: 160px;
  object-fit: cover;
  display: block;
}

.galleryItem figcaption {
  padding: 1rem 1.25rem 1.25rem;
}

.galleryNum {
  display: block;
  font-size: 0.75rem;
  color: var(--ifm-color-primary);
  margin-bottom: 0.25rem;
  font-weight: 700;
  letter-spacing: 0.5px;
}

.galleryItem strong {
  display: block;
  font-size: 1.05rem;
  margin-bottom: 0.25rem;
}

.galleryItem p {
  margin: 0;
  color: #64748b;
  font-size: 0.85rem;
}

/* CTA 横幅 */
.ctaBanner {
  padding: 4rem 0;
  background: linear-gradient(160deg, #0f1b3d 0%, #1e3a8a 55%, #2563eb 120%);
  color: #fff;
  text-align: center;
}

.ctaTitle {
  font-size: 1.9rem;
  font-weight: 800;
  color: #fff;
  margin-bottom: 0.5rem;
}

.ctaDesc {
  opacity: 0.75;
  max-width: 480px;
  margin: 0 auto 1.5rem;
}

.ctaButtons {
  display: flex;
  justify-content: center;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.ctaPrimary,
.ctaOutline {
  display: inline-block;
  padding: 0.6rem 1.5rem;
  border-radius: 10px;
  font-weight: 700;
  font-size: 0.95rem;
}

.ctaPrimary {
  background: #3b82f6;
  color: #fff;
}

.ctaPrimary:hover {
  background: #2563eb;
  color: #fff;
  text-decoration: none;
}

.ctaOutline {
  border: 1px solid rgba(255, 255, 255, 0.5);
  color: #fff;
}

.ctaOutline:hover {
  background: rgba(255, 255, 255, 0.12);
  color: #fff;
  text-decoration: none;
}

@media screen and (max-width: 996px) {
  .hero {
    padding: 3rem 0 2.5rem;
  }
  .heroTitle {
    font-size: 2rem;
  }
  .placeGrid {
    grid-template-columns: 1fr;
  }
  .placeFeature {
    grid-row: auto;
    min-height: 180px;
  }
}
```

- [ ] **步骤 2：验证类型与构建**

运行：`npm run typecheck && npm run build`
预期：无类型错误；构建成功。

---

### 任务 5：删除未使用的 HomepageFeatures 组件

**文件：**
- 删除：`src/components/HomepageFeatures/index.tsx`
- 删除：`src/components/HomepageFeatures/styles.module.css`

- [ ] **步骤 1：删除组件目录**

运行：`rm -rf /home/xiaobai/wiki/epochearth-wiki/src/components/HomepageFeatures`

- [ ] **步骤 2：验证构建**

运行：`npm run build`
预期：构建成功，无关于该组件的引用错误。

---

### 任务 6：最终视觉与交互核验

**文件：**
- 无代码改动，仅人工核验

- [ ] **步骤 1：启动本地预览**

运行：`npm run start`
预期：本地站点在 http://localhost:3000 打开。

- [ ] **步骤 2：逐项核对规格（spec 第 3 节）**

在浏览器中核验：
- 首屏为深蓝渐变 + 顶部光晕；`logo.png` 居中约 220px；标题「Epoch MC」40px/800；白底主按钮「开始阅读」与描边次按钮「加入 QQ 群」；徽章行 5 个半透明胶囊。
- 「怎么玩」6 张白卡片带图标，hover 上浮 + 主色边框 + 轻阴影。
- 「去哪里玩」浅灰底（#f8fafc），左侧深蓝渐变大卡「地球世界」（占两行高）右侧上下两张白卡「卫星地图」「国家股市」。
- 「服务器一览」3 张画廊卡：图片 160px 高 + 01/02/03 编号 + 标题 + 描述。
- 底部 CTA 横幅深蓝渐变，「打开卫星地图」实心主蓝按钮、「加入 QQ 群」描边按钮。
- 页脚背景为 `#0f1b3d`。
- 切换深色模式（navbar 右上角），确认文档页文字/链接可读。
- 窗口缩至 <996px：hero 字号缩小，「去哪里玩」变单列堆叠。
- 点击「怎么玩」各卡片与 CTA 按钮，确认跳转目标正确（链接与 index.tsx 中 to 一致）。

预期：以上全部通过。如有偏差，回到对应任务的样式/组件文件修正后重新执行本任务。
