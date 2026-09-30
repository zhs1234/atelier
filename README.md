# XGOUO Atelier

XGOUO 的个人作品集，展示项目、工作方法和联系方式。使用 React、TypeScript、Vite 和 Three.js，包含粒子背景、页面动效和可开关的氛围音场。

[在线演示](https://xgouo.cn/)

## 预览

线上首页，2026-09-30。

![XGOUO Atelier 首页](./docs/images/demo-home.png)

## 本地运行

需要 Node.js 22.12+（或 20.19+）和 npm。在仓库根目录运行：

```bash
npm install
npm run dev
```

```bash
npm run build    # TypeScript 检查与构建，输出到 dist/
npm run lint     # Oxlint 检查
npm run preview  # 预览构建结果
```

## 修改与部署

项目介绍、作品和联系方式在 [`src/data/site.ts`](./src/data/site.ts)，图片在 `public/images/`。

构建后将 `dist/` 部署到静态服务器，并为客户端路由配置回退，避免直接访问子页面时返回 404：

```nginx
location / {
    try_files $uri $uri/ /index.html;
}
```
