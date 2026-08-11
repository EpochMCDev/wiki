import {useEffect, useState} from 'react';
import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

import styles from './index.module.css';

const HERO_BACKGROUNDS = [
  'img/hero/bg1.png',
  'img/hero/bg2.png',
  'img/hero/bg3.png',
  'img/hero/bg4.png',
  'img/hero/bg5.png',
];

const QUICK_LINKS = [
  {label: '玩家手册', to: '/docs/intro'},
  {label: '城镇系统', to: '/docs/guide/towny'},
  {label: '常见问题', to: '/docs/faq'},
];

const HERO_META = ['Java 1.20.1', '国战 / 生存', '1:50 真实地球', 'Towny', 'Slimefun'];

type Card = {
  title: string;
  desc: string;
  to: string;
};

const FEATURES: Card[] = [
  {
    title: '玩家手册',
    desc: '从加群拿整合包、进游戏，到规则与玩法，从这份手册开始。',
    to: '/docs/intro',
  },
  {
    title: '城镇系统',
    desc: '基于 Towny 的城镇与国家管理，圈地建城、税收经济，打造属于你的国家。',
    to: '/docs/guide/towny',
  },
  {
    title: '酿酒系统',
    desc: '大锅发酵、酿造台蒸馏、木桶陈酿，调制属于你的佳酿。',
    to: '/docs/guide/breweryx',
  },
  {
    title: '服务器规则',
    desc: '公平友善的国战环境，遵守规则，共建世界。',
    to: '/docs/rules/overview',
  },
  {
    title: '常见问题 FAQ',
    desc: '进不去服务器、整合包、规则问题，先看这里。',
    to: '/docs/faq',
  },
  {
    title: '更新日志',
    desc: '查看服务器版本更新与玩法调整记录。',
    to: '/docs/changelog',
  },
];

type World = {
  tag: string;
  title: string;
  desc: string;
  to: string;
};

const WORLDS: World[] = [
  {
    tag: 'Towny',
    title: '城镇建设',
    desc: '圈地建城、建国管理，打造你的首都与城市群。',
    to: '/docs/guide/towny',
  },
  {
    tag: '实时地图',
    title: '卫星地图',
    desc: '实时查看全球疆域与建设进度，制定战略必备。',
    to: 'http://epochearth.cn:11451/',
  },
  {
    tag: '经济玩法',
    title: '国家股市',
    desc: '参与国家间的股票交易，用经济博弈左右世界格局。',
    to: 'http://epochearth.cn:54754/',
  },
];

const GALLERY = [
  {title: '真实地球', desc: '基于真实地形的 1:50 地球地图。', img: 'img/gallery-world.png'},
  {title: '城镇建设', desc: '玩家城镇、圈地与基础设施。', img: 'img/gallery-town.png'},
  {title: '活动与国战', desc: '服务器活动与国战事件。', img: 'img/gallery-event.png'},
];

const NOTICES: Card[] = [
  {
    title: '服务器规则',
    desc: '公平友善的国战环境，遵守规则，共建世界。',
    to: '/docs/rules/overview',
  },
  {
    title: '更新日志',
    desc: '查看服务器版本更新与玩法调整记录。',
    to: '/docs/changelog',
  },
  {
    title: '玩家手册',
    desc: '从入门到精通的完整玩家手册入口。',
    to: '/docs/intro',
  },
];

function HrefLink({
  to,
  className,
  children,
}: {
  to: string;
  className?: string;
  children: ReactNode;
}) {
  if (to.startsWith('http')) {
    return (
      <a href={to} className={className} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    );
  }
  return (
    <Link to={to} className={className}>
      {children}
    </Link>
  );
}

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  const [heroBg, setHeroBg] = useState<string | null>(null);

  useEffect(() => {
    setHeroBg(HERO_BACKGROUNDS[Math.floor(Math.random() * HERO_BACKGROUNDS.length)]);
  }, []);

  return (
    <header className={styles.hero}>
      <div
        className={styles.heroMedia}
        style={heroBg ? {backgroundImage: `url(${heroBg})`} : undefined}
        aria-hidden="true"
      />
      <div className={styles.heroOverlay} aria-hidden="true" />
      <div className={styles.heroContent}>
        <div className={styles.heroTextCol}>
          <div className={styles.heroCopy}>
            <p className={styles.kicker}>Minecraft Java 1.20.1 · 地球国战</p>
            <Heading as="h1" className={styles.heroTitle}>
              {siteConfig.title}
            </Heading>
            <p className={styles.heroText}>
              以 1:50 真实地球为地图的国战服务器。建国立政、扩张领土、纵横捭阖，从一片疆土开始你的大国崛起。
            </p>
          </div>
          <div className={styles.heroBody}>
            <Heading as="h2" className={styles.heroLead}>
              进服从这份手册开始
            </Heading>
            <p className={styles.heroLeadText}>
              从加群拿整合包、进游戏，到建国圈地、参与国战，一步步了解这个世界。
            </p>
            <div className={styles.heroActions}>
              <Link className={styles.primaryAction} to="/docs/intro">
                开始阅读
              </Link>
              <a
                className={styles.glassAction}
                href="https://qm.qq.com/q/M2NJEm15uc"
                target="_blank"
                rel="noopener noreferrer">
                加入 QQ 群
              </a>
            </div>
            <div className={styles.quickLinks}>
              {QUICK_LINKS.map((link) => (
                <HrefLink key={link.label} to={link.to}>
                  {link.label}
                </HrefLink>
              ))}
            </div>
          </div>
          <div className={styles.heroMeta}>
            {HERO_META.map((meta) => (
              <span key={meta}>{meta}</span>
            ))}
          </div>
        </div>
        <div className={styles.heroLogoCol}>
          <img src="img/logo.png" alt="Epoch MC" className={styles.heroLogo} />
        </div>
      </div>
    </header>
  );
}

function SectionHeader({kicker, title, desc}: {kicker: string; title: string; desc: string}) {
  return (
    <div className={styles.sectionHeader}>
      <p className={styles.sectionKicker}>{kicker}</p>
      <Heading as="h2" className={styles.sectionTitle}>
        {title}
      </Heading>
      <span className={styles.sectionDesc}>{desc}</span>
    </div>
  );
}

function HomepageBody() {
  return (
    <main>
      {/* 怎么玩 */}
      <section className={styles.section}>
        <SectionHeader
          kicker="怎么玩"
          title="常用内容已经帮你整理好"
          desc="第一次进服、了解国战、研究插件玩法，都可以直接点下面的入口。"
        />
        <div className={styles.featureGrid}>
          {FEATURES.map((feature) => (
            <HrefLink key={feature.title} to={feature.to} className={styles.featureCard}>
              <Heading as="h3">{feature.title}</Heading>
              <p>{feature.desc}</p>
            </HrefLink>
          ))}
        </div>
      </section>

      {/* 去哪里玩 */}
      <section className={styles.section}>
        <SectionHeader
          kicker="去哪里玩"
          title="每个板块都有自己的用途"
          desc="长期建家、资源采集和功能入口分开放置，进服前先了解会更省时间。"
        />
        <div className={styles.worldGrid}>
          {WORLDS.map((world) => (
            <HrefLink key={world.title} to={world.to} className={styles.worldCard}>
              <span className={styles.worldTag}>{world.tag}</span>
              <Heading as="h3">{world.title}</Heading>
              <p>{world.desc}</p>
            </HrefLink>
          ))}
        </div>
        <Link className={styles.inlineLink} to="/docs/rules/overview">
          查看服务器规则 →
        </Link>
      </section>

      {/* 服务器一览 */}
      <section className={styles.section}>
        <SectionHeader
          kicker="服务器一览"
          title="先看看这里会发生什么"
          desc="主城、城镇建设和活动内容会逐步补充截图，帮助新玩家快速了解服务器氛围。"
        />
        <div className={styles.galleryGrid}>
          {GALLERY.map((item, idx) => (
            <article key={item.title} className={styles.gallerySlot}>
              <img src={item.img} alt={item.title} loading="lazy" />
              <div className={styles.galleryBody}>
                <span className={styles.galleryNum}>
                  {String(idx + 1).padStart(2, '0')}
                </span>
                <strong>{item.title}</strong>
                <p>{item.desc}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 规则与手册 */}
      <section className={styles.section}>
        <SectionHeader
          kicker="规则与手册"
          title="进服前先看一眼这里"
          desc="规则、更新与完整手册都整理好了，遇到问题先来这里找答案。"
        />
        <div className={styles.noticeGrid}>
          {NOTICES.map((notice) => (
            <HrefLink key={notice.title} to={notice.to} className={styles.noticeCard}>
              <Heading as="h3">{notice.title}</Heading>
              <p>{notice.desc}</p>
            </HrefLink>
          ))}
        </div>
        <Link className={styles.inlineLink} to="/docs/intro">
          开始阅读玩家手册 →
        </Link>
      </section>

      {/* 网页地图横幅 */}
      <div className={styles.mapBand}>
        <div>
          <Heading as="h2">网页地图</Heading>
          <p>
            想找城镇、看地形或确认在线情况，可以打开网页地图。地图地址如果调整，会同步到 QQ
            群和公告。
          </p>
        </div>
        <div className={styles.mapActions}>
          <a
            className={styles.actionButton}
            href="http://epochearth.cn:11451/"
            target="_blank"
            rel="noopener noreferrer">
            打开网页地图
          </a>
          <a
            className={styles.actionButton}
            href="https://qm.qq.com/q/M2NJEm15uc"
            target="_blank"
            rel="noopener noreferrer">
            加入 QQ 群
          </a>
        </div>
      </div>
    </main>
  );
}

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`欢迎来到 ${siteConfig.title}`}
      description="Epoch MC 国战服务器玩家手册">
      <HomepageHeader />
      <HomepageBody />
    </Layout>
  );
}
