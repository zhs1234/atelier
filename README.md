# XGOUO Atelier — 以光写意

XGOUO 的个人数字工坊与作品集。以「浏览器为纸，光影为墨」为主题，将项目展示、创作能力、工作方法与个人介绍串联成一卷可探索的交互叙事。

## 在线演示

[打开 XGOUO Atelier](https://xgouo.cn/)

浏览首页与「卷轴」作品集，通过菜单探索「三昧」「行笔」「山人」和「投书」。

## 界面预览

线上首页实拍（2026-09-30）：深色背景、粒子光影与「落笔成江海」主题排版。

![XGOUO Atelier 首页：粒子背景、导航与落笔成江海主题标题](./docs/images/demo-home.png)

## 项目特性

- 多路由作品集与项目详情，集中展示 Gouo Canvas、WCNMB 和本站
- Three.js 粒子背景、滚动显现与页面转场
- 中文诗意叙事、深色界面与酸橙色视觉强调
- 全屏菜单、自定义光标与可控制的氛围音场
- 基于 React、TypeScript 与 Vite 构建，可作为静态站点部署

## 本地开发

环境要求：Node.js 22.12+（或 20.19+）与 npm。

```bash
npm install
npm run dev
```

```bash
# TypeScript 检查与生产构建，输出到 dist/
npm run build

# Oxlint 检查
npm run lint

# 本地预览生产构建
npm run preview
```

项目内容与作品链接主要维护在 [`src/data/site.ts`](./src/data/site.ts)，静态图片位于 `public/images/`。部署时需为客户端路由配置回退到 `index.html`。

## 开发配置参考

项目使用 React + TypeScript + Vite 与 Oxlint。以下保留 React Compiler 和类型感知 lint 的可选配置说明。

## React Compiler

The React Compiler is not enabled on this project because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend enabling type-aware lint rules by installing `oxlint-tsgolint` and editing `.oxlintrc.json`:

```json
{
  "$schema": "./node_modules/oxlint/configuration_schema.json",
  "plugins": ["react", "typescript", "oxc"],
  "options": {
    "typeAware": true
  },
  "rules": {
    "react/rules-of-hooks": "error",
    "react/only-export-components": ["warn", { "allowConstantExport": true }]
  }
}
```

See the [Oxlint rules documentation](https://oxc.rs/docs/guide/usage/linter/rules) for the full list of rules and categories.
