import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'Epoch MC Wiki',
  tagline: 'Epoch MC 国战服务器玩家手册',
  favicon: 'img/favicon.png',

  url: 'https://epochearth.cn',
  baseUrl: '/',

  onBrokenLinks: 'throw',

  i18n: {
    defaultLocale: 'zh-CN',
    locales: ['zh-CN'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    colorMode: {
      defaultMode: 'dark',
      respectPrefersColorScheme: true,
    },
    navbar: {
  title: 'Epoch MC Wiki',
      logo: {
        alt: 'Epoch MC',
        src: 'img/logo.png',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'wikiSidebar',
          position: 'left',
          label: '玩家手册',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: '玩家手册',
          items: [
            {label: '欢迎', to: '/docs/intro'},
            {label: '城镇系统', to: '/docs/guide/towny'},
            {label: '酿酒系统', to: '/docs/guide/breweryx'},
            {label: '常见问题', to: '/docs/faq'},
          ],
        },
        {
          title: '社区',
          items: [
            {label: 'QQ 群 1043737743', href: 'https://qm.qq.com/q/M2NJEm15uc'},
            {label: '卫星地图', href: 'http://epochearth.cn:11451/'},
            {label: '国家股市', href: 'http://epochearth.cn:54754/'},
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Epoch MC · 基于 Docusaurus`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
