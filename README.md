# Liaobots UI Lab (Static)

Liaobots `redesign/ui-v2` 分支设计语言总览的纯静态版本,部署到 Cloudflare Pages 用于团队 review。

源页面:`chatbot-ui/pages/uilab.tsx`(Next.js 版本,完全等价)。

## 本地开发

```bash
npm install
npm run dev      # http://localhost:5173
```

## 构建

```bash
npm run build    # 输出到 dist/
npm run preview  # 本地预览构建产物
```

## 部署 (Cloudflare Pages)

- Build command: `npm run build`
- Build output directory: `dist`
- Node version: 20 (在 Pages 后台 Variables 里设 `NODE_VERSION=20`)

## 依赖

- React 18 + TypeScript
- Vite 5
- Tailwind CSS 3
- lucide-react (图标)
