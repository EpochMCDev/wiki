---
title: 城镇系统
sidebar_position: 1
---

# 城镇系统

Towny 是 Minecraft 经典的城镇与国家管理插件，也是 Epoch MC 建国圈地玩法的核心。玩家通过 Towny 建立城镇、组建国家、圈地建城、收取税收，实现真实的领土与国家运作。

> 本页基于 Towny 插件官方源码整理，具体数值（圈地价格、税收、资金）以服务器配置为准。

:::warning 加入限制
注册时间未满 3 小时的玩家**不能加入任何城镇与国家**；满 3 小时后请慎重考虑后再加入。
:::

## 一、基础概念

| 概念 | 说明 |
| --- | --- |
| 居民 Resident | 加入城镇的玩家 |
| 城镇 Town | 由镇长（Mayor）管理，拥有圈地（TownBlock） |
| 国家 Nation | 由国王（King）管理，由多个城镇组成 |
| 领地 TownBlock | 16×16 区块，可被圈占为城镇领土 |

## 二、常用指令

### 基础指令

| 功能 | 指令 |
| --- | --- |
| 帮助菜单 | /towny 或 /towny ? |
| 查看自己信息 | /res 或 /resident |
| 查看领地地图 | /towny map |
| 传送回城镇 | /town spawn |
| 传送回国家 | /nation spawn |

### 城镇指令（别名 /t）

| 功能 | 指令 |
| --- | --- |
| 创建城镇 | /town new \<名称\> |
| 加入城镇 | /town join \<城镇\> |
| 离开城镇 | /town leave |
| 查看城镇信息 | /town 或 /town \<城镇名\> |
| 圈地（脚下区块） | /town claim |
| 连片圈地 | /town select 后输入 /town claim |
| 圈飞地 | /town claim outpost |
| 取消圈地 | /town unclaim |
| 银行存款 | /town deposit \<金额\> |
| 取款 | /town withdraw \<金额\> |
| 城镇设置 | /town set ? |
| 城镇开关 | /town toggle ? |
| 踢出玩家 | /town kick \<玩家\> |
| 晋升 / 降级 | /town promote \<玩家\> / /town demote \<玩家\> |
| 设置盟友 / 敌人 | /town ally \<城镇\> / /town enemy \<城镇\> |

### 领地指令（/plot）

| 功能 | 指令 |
| --- | --- |
| 圈地 | /plot claim |
| 取消圈地 | /plot unclaim |
| 出售领地 | /plot forsale \<价格\> |
| 取消出售 | /plot notforsale |
| 设置领地类型 | /plot set \<类型\> |
| 设置领地权限 | /plot set perm |
| 查看领地信息 | /plot info |

### 国家指令（别名 /n）

| 功能 | 指令 |
| --- | --- |
| 创建国家 | /nation new \<名称\> |
| 加入国家 | /nation join \<国家\> |
| 城镇加入国家 | /nation add \<城镇\> |
| 踢出城镇 | /nation kick \<城镇\> |
| 查看国家 | /nation |
| 任命国王 | /nation king \<玩家\> |
| 结盟 | /nation ally add \<国家\> |
| 敌对 | /nation enemy add \<国家\> |
| 银行存款 | /nation deposit \<金额\> |
| 国家设置 | /nation set ? |

## 三、创建城镇

1. 准备创建城镇所需的启动资金（数额以服务器设定为准）。
2. 站在想建立城镇的位置，输入 `/town new <城镇名>`。
3. 使用 `/town claim` 圈占周边区块，逐步扩展领土。
4. 邀请玩家：`/town add <玩家>`，对方确认后加入城镇。

> 提示：圈地需要消耗金钱；被圈占的区块受保护，外人无法破坏。

## 四、领地类型（Plot Type）

| 类型 | 说明 |
| --- | --- |
| residential | 住宅区，普通居民用地 |
| shop | 商业区，交易、开店 |
| embassy | 使馆区，外国玩家友好用地 |
| arena | 竞技场，PVP 区域 |
| farm | 农田，种植畜牧 |
| wilds | 荒野，无保护区域 |
| jail | 监狱 |

## 五、权限系统

Towny 的权限分为四种操作：**建造 build**、**破坏 destroy**、**开关 switch**、**使用物品 item\_use**，针对五类人群：

- 自己（own town / own plot）
- 本镇居民
- 盟友
- 外国人
- 游客（无城镇）

通过 `/town set perm`（全城镇）或 `/plot set perm`（单块领地）调整。

## 六、经济与税收

- 镇长可设置税收：
  - `/town set taxes <数额>` 居民税
  - `/town set plottax` / `/town set shoptax` / `/town set embassytax` 分类型领地税
  - `/town set plotprice` / `/town set shopprice` / `/town set embassyprice` 购买领地价格
  - `/town set spawncost <数额>` 传送费用
- 城镇有每日维护费（upkeep），资金不足会**破产**；破产后可使用 `/town reclaim` 赎回。

## 七、国家与国战

- 国家由国王（King）统治，一个或多个城镇组成。
- **盟友与敌人**：`/nation ally add <国家>` 结盟；`/nation enemy add <国家>` 设为敌对。敌对国家的玩家之间可以互相攻击（PVP）。
- 国家经济：`/nation set taxes <数额>` 设税、`/nation deposit <金额>` 存入国库。
- 国际组织、战争的具体规则详见服务器国战设定：【待填写】。

## 八、常见问题

- **Q：离开城镇后，之前的圈地还在吗？** A：圈地属于城镇，离开后你将失去该城镇领地的使用权限。
- **Q：怎么快速回城镇？** A：使用 `/town spawn`，传送可能产生费用（由镇长设置）。
- **Q：城镇破产了怎么办？** A：为城镇存入资金（`/town deposit`）即可解除破产；若已消失，可用 `/town reclaim` 尝试赎回。
- **Q：外国人能破坏我的领地吗？** A：默认不能。除非你的城镇与其国家为敌对关系，或你在权限中放开了对外人的破坏权限。
