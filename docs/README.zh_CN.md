# gatsby-github-template

## 快速开始

### Step1：fork 项目

[点击项目](https://github.com/lencx/gatsby-github-template)右上角的 Fork 按钮

### Step2：开启 Discussions

`Repo -> Settings -> General -> Features -> Discussions`

### Step3：创建配置

在 Discussions 中新增一个标题为 `rgd.yml` 的 issues，并在评论框中输入以下代码：

````yml
```yml
### repo
# github 用户名，支持个人或组织
owner: lencx
# github 仓库名称
repo: gatsby-github-template

### website
# 个人域名，如果没有则不需要设置
cname: gg.nofwl.com
# 1. 格式为 png 的 240x240 正方形图片
# 2. 在线图片 URL 地址，不设置则使用默认 logo
logo: https://avatars.githubusercontent.com/u/16164244?v=4
# 网站标题
title: Gatsby GitHub Template
# 网站描述
description: A gatsby website builder based on github discussions

### PWA Manifest
# https://www.gatsbyjs.com/plugins/gatsby-plugin-manifest
manifest:
  name: GG
  short_name: GG
  start_url: /
  background_color: '#fafafa'
  theme_color: '#232629'
  display: standalone
  # 1. 格式为 png 的 240x240 正方形图片
  # 2. 在线图片 URL 地址，不设置则使用默认 logo
  icon: https://avatars.githubusercontent.com/u/16164244?v=4
```
````

### Step4：生成 Token

[生成 Token](https://github.com/settings/tokens)

New personal access token

1. `Note` - 备注随便输入，主要做标识
2. `Expiration：No expiration` - 过期时间看需要，这里选择不过期
3. `Select scopes: workflow` - 只需要勾选 `workflow`
4. 点击 `Generate token` 按钮，然后复制生成好的 `Token`

### Step5：设置 Secrets

`Repo -> Settings -> Secrets -> Actions -> New repository secret`

1. Name: `GH_TOKEN`
2. Value: `Step4 生成好的 token`
