---
title: 帮我们扩充 Wiki
sidebar_position: 2
---

# 帮我们扩充 Wiki！

Epoch MC Wiki 由社区共同维护。如果你发现内容有误、有缺失，或者了解某个玩法的最新细节，欢迎帮助我们把 Wiki 补充得更好。

## 准备工作

你需要一个 **GitHub 账号**（[立即注册](https://github.com/join)）。本 Wiki 的源码托管在 [EpochMCDev/wiki](https://github.com/EpochMCDev/wiki) 仓库。

## 步骤 1：复刻（Fork）仓库

打开 [EpochMCDev/wiki](https://github.com/EpochMCDev/wiki) 仓库，点击右上角的 **Fork** 按钮，选择你的账号，点击 `Create fork`。

![点击 Fork 按钮](/img/fork.png)

现在你有了一个属于你自己的仓库副本，接下来所有修改都在这个副本中进行。

> 注意：在你提交更改之前，你的修改**不会**影响正式 Wiki。

## 步骤 2：进行更改

打开你复刻的仓库，进入 `docs` 目录（Wiki 文档都在这里）。

![打开 docs 目录](/img/open_docs.png)

### 创建新页面

1. 点击 `Add file` → `Create new file`。

![创建新文件](/img/new_file.png)

2. 文件名以 `.md` 结尾，**不能包含空格**，用连字符 `-` 代替空格（如 `fishing.md`、`market.md`）。
3. 在文件顶部添加标题信息：

```md
---
title: 页面标题
sidebar_position: 10
---

# 页面标题

正文内容……
```

4. 编辑完成后点击 `Commit new file` 保存。

### 编辑现有页面

打开任意文档文件，点击内容区右上角的编辑按钮，修改后点击 `Commit changes` 保存。

### 上传图片

1. 进入 `static/img` 目录，点击 `Add file` → `Upload files`。
2. 图片命名只使用**小写英文字母、数字和连字符**（如 `barrel-front.png`）。
3. 在文档中引用：`![图片说明](/img/图片文件名.png)`。

## 步骤 3：文档准则

### 你应该

- 在页面开头添加标题。
- 编写详细、有趣、准确的内容，尽量以玩家视角说明"怎么用"。
- 尽量使用游戏截图辅助说明，截取关键部分即可。
- 适当使用小标题、表格、引用块组织内容。
- 保持客观中立，以介绍为主。

### 你不应该

- 使用外部图片链接，应上传到本仓库。
- 在图片中包含服务器水印、IP 等无关信息。
- 上传你没有权利使用的图片。
- 包含 NSFW、色情、歧视、暴力、政治内容。
- 未经讨论直接删除已有页面或图片（如需删除请说明原因）。

## 步骤 4：提交 Pull Request

1. 回到你复刻的仓库，点击 **Pull requests** 标签页。
2. 点击 **New pull request**，确认分支无误后点击 `Create pull request`。
3. 在描述中尽量详细说明你做了哪些修改，然后提交。

提交后，管理组会审核你的修改；如有问题会在 PR 中反馈。

## 步骤 5：根据反馈修改

如果你提交了 PR 后还想继续修改，重复步骤 2 即可，修改会自动同步到你的 PR 中，直到它被合并或关闭。

---

感谢你对 Epoch MC Wiki 的贡献！有任何问题可以加入官方 QQ 群 `1043737743` 交流。
