# Epoch MC Wiki

Epoch MC 国战服务器玩家手册。以 1:50 真实地球为地图的 Minecraft 国战服务器（Java 1.20.1），本仓库是该服务器玩家手册 Wiki 的源码。

站点基于 [Docusaurus](https://docusaurus.io/) 构建，文档全部使用 Markdown 编写，欢迎社区共同维护。

## 内容结构

- **玩家手册**（`docs/intro.md`）：服务器简介、快速加入、资源中心
- **新人须知**（`docs/newcomer.md`）：面向新玩家的入门指南
- **服务器指南**（`docs/guide/`）：菜单、城镇系统、酿酒系统、经济系统、港口系统、自定义物品、附魔与强化、钓鱼、烹饪与种植、交易与市场
- **服务器规则**（`docs/rules/`）：官方规则全文
- **常见问题 / 更新日志**（`docs/faq.md`、`docs/changelog.md`）
- **帮我们扩充 Wiki**（`docs/contribute.md`）：社区贡献指南

## 本地开发

环境要求：Node.js >= 20

```bash
# 安装依赖
npm install

# 启动本地开发服务器（默认 http://localhost:3000，热更新）
npm run start

# 构建静态站点（输出到 build/ 目录）
npm run build

# 类型检查
npm run typecheck
```

## 参与贡献

发现内容有误或想补充玩法细节？欢迎 Fork 本仓库并提交 Pull Request，具体流程见[《帮我们扩充 Wiki》](docs/contribute.md)。

## 相关链接

- 官方网站：[epochearth.cn](http://epochearth.cn/)
- 卫星地图：[epochearth.cn:11451](http://epochearth.cn:11451/)
- 官方 QQ 群：1043737743
