# 深选 (SiftDeep) 项目上下文文档

## 项目概述

**深选** 是一个 B 站内容精选引擎，核心理念是"让好内容被看见"。项目采用人工策展 + 外链直达模式，不存储视频文件，仅索引和推荐优质内容。

### 核心特点

- **人工策展**：编辑精选 + UP 主共建，拒绝标题党与低质内容
- **零版权风险**：所有内容外链至 B 站原页，不存储任何视频文件
- **数据透明**：仅调用官方 API，日志 30 天自动销毁，不追踪用户
- **用户参与**：支持用户投稿、协同收藏夹、负反馈下架机制

### 技术架构

```
┌─────────────────────────────────────────────────────────────┐
│                        Turborepo Monorepo                    │
├─────────────────────────────────────────────────────────────┤
│  apps/                    │  packages/                       │
│  ├── api (Nest.js)        │  ├── constants (共享常量)        │
│  └── web (Next.js)        │  ├── eslint-config (ESLint 配置) │
│                           │  ├── shadcn (UI 组件库)           │
│                           │  ├── ts-config (TS 配置)          │
│                           │  └── utils (工具函数)            │
└─────────────────────────────────────────────────────────────┘
```

### 技术栈

| 领域       | 技术                                                     |
| ---------- | -------------------------------------------------------- |
| **前端**   | Next.js 15 (SSR/ISR), React 19, Tailwind CSS, TypeScript |
| **后端**   | Nest.js 11, Fastify, TypeORM, PostgreSQL                 |
| **认证**   | NextAuth.js (Auth.js v5), JWT                            |
| **部署**   | Vercel (前端), 自建服务器 (后端)                         |
| **包管理** | pnpm + Turborepo                                         |

---

## 目录结构

```
F:\SiftDeep\
├── apps/
│   ├── api/              # Nest.js 后端应用
│   │   ├── src/
│   │   │   ├── common/   # 通用模块 (守卫、过滤器、管道等)
│   │   │   ├── database/ # 数据库模块
│   │   │   ├── features/ # 业务功能模块
│   │   │   ├── app.module.ts
│   │   │   ├── main.ts
│   │   │   └── bootstrap.ts
│   │   ├── test/         # E2E 测试
│   │   └── storage/      # 文件存储
│   │
│   └── web/              # Next.js 前端应用
│       ├── app/          # App Router 路由
│       │   ├── (home)/   # 首页
│       │   ├── [username]/ # 用户主页
│       │   ├── api/      # API Routes
│       │   ├── auth/     # 认证相关
│       │   └── og/       # OpenGraph 图片生成
│       ├── components/   # React 组件
│       ├── lib/          # 工具库
│       ├── server/       # 服务端逻辑
│       └── types/        # TypeScript 类型定义
│
├── packages/
│   ├── constants/        # 共享常量
│   ├── eslint-config/    # ESLint 配置 (base, nest, next, react-internal)
│   ├── shadcn/           # shadcn/ui 组件库
│   ├── ts-config/        # TypeScript 配置 (base, nestjs, nextjs, react-library)
│   └── utils/            # 共享工具函数
│
├── .commitlintrc.ts      # Commitlint 配置
├── .prettierrc           # Prettier 配置
├── .lintstagedrc         # Lint-staged 配置
├── turbo.json            # Turborepo 配置
├── pnpm-workspace.yaml   # pnpm 工作区配置
└── package.json          # 根 package.json
```

---

## 构建与运行

### 环境要求

- Node.js >= 20
- pnpm >= 10.11.0
- PostgreSQL (后端)

### 安装依赖

```bash
pnpm install
```

### 开发模式

```bash
# 启动所有应用 (前端 + 后端)
pnpm dev

# 仅启动前端
pnpm dev:web

# 仅启动后端
pnpm dev:api
```

### 构建

```bash
# 构建所有应用
pnpm build

# 仅构建前端
pnpm build:web

# 仅构建后端
pnpm build:api
```

### 运行生产版本

```bash
pnpm start
```

### 代码检查

```bash
# 格式化代码
pnpm format

# 检查格式化
pnpm format:check

# 运行 ESLint
pnpm lint

# 仅检查前端
pnpm lint:web

# 仅检查后端
pnpm lint:api
```

### 测试

```bash
# 运行所有测试
pnpm test

# 前端测试
pnpm test:web

# 后端测试
pnpm test:api

# 后端覆盖率
pnpm test:cov  # 在 apps/api 目录下

# E2E 测试
pnpm test:e2e  # 在 apps/api 目录下
```

---

## 开发规范

### Git 提交规范

项目使用 Commitizen + Commitlint 规范提交信息：

```bash
pnpm commit
```

**允许的提交类型：**

| 类型       | 描述                      |
| ---------- | ------------------------- |
| `feat`     | 新功能                    |
| `fix`      | 修复 bug                  |
| `docs`     | 文档更新                  |
| `chore`    | 构建/工具配置             |
| `style`    | 代码格式 (不影响代码逻辑) |
| `refactor` | 重构                      |
| `ci`       | CI 配置                   |
| `test`     | 测试相关                  |
| `revert`   | 回滚                      |
| `perf`     | 性能优化                  |
| `vercel`   | Vercel 部署相关           |

### 代码风格

- **单引号**：`'single'`
- **尾随逗号**：`all`
- **格式化插件**：
  - `@prettier/plugin-oxc` - 快速格式化
  - `prettier-plugin-tailwindcss` - Tailwind 类排序
  - `prettier-plugin-css-order` - CSS 属性排序
  - `prettier-plugin-organize-imports` - 导入排序
  - `prettier-plugin-packagejson` - package.json 排序

### Lint-staged

提交时自动格式化匹配的文件：

```json
{
  "*.{js,jsx,ts,tsx,md,mdx}": ["prettier . --write"]
}
```

---

## 环境变量配置

### 后端环境变量 (`apps/api/.env`)

参考 `apps/api/.env-example`：

```bash
# 服务器配置
HOST=localhost
PORT=8000
ALLOW_CORS_URL=http://localhost:3000

# JWT 安全
ACCESS_TOKEN_SECRET=your_secret
ACCESS_TOKEN_EXPIRATION=3d
REFRESH_TOKEN_SECRET=your_secret
REFRESH_TOKEN_EXPIRATION=30d

# 数据库配置
DB_HOST=192.168.80.128
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=your_password
DB_NAME=turborepo
DB_SSL=true

# 邮件配置
MAIL_HOST=smtp.163.com
MAIL_USERNAME=your_email
MAIL_PASSWORD=your_password

# 文件系统配置
# type file_system = "s3" | "public"
FILE_SYSTEM=s3
FILE_MAX_SIZE=20971520  # 20MB
```

---

## 包依赖管理

### 添加依赖

```bash
# 添加到根工作区
pnpm add:main <package>

# 添加到 API 应用
pnpm add:api <package>

# 添加到 Web 应用
pnpm add:web <package>

# 添加到 shadcn 包
pnpm add:shadcn <package>

# 添加到 utils 包
pnpm add:utils <package>
```

---

## 版本管理

### Changesets

项目使用 Changesets 管理版本：

```bash
# 创建 changeset
pnpm changeset

# 发布版本
pnpm changeset version
pnpm changeset publish
```

### Renovate

项目配置了 Renovate 自动更新依赖（见 `renovate.json`）。

---

## 特殊工具

### 清理 node_modules

```bash
pnpm clear:modules  # 使用 npkill 交互式清理
```

---

## 关键文件说明

| 文件                      | 描述                                                                           |
| ------------------------- | ------------------------------------------------------------------------------ |
| `turbo.json`              | Turborepo 任务配置，定义 build、lint、dev 等任务的依赖和缓存策略               |
| `pnpm-workspace.yaml`     | pnpm 工作区配置，定义包的位置和构建依赖                                        |
| `packages/ts-config/`     | 共享 TypeScript 配置 (base.json, nestjs.json, nextjs.json, react-library.json) |
| `packages/eslint-config/` | 共享 ESLint 配置 (base.js, nest.js, next.js, react-internal.js)                |
| `apps/web/auth.ts`        | NextAuth.js 认证配置                                                           |
| `apps/web/middleware.ts`  | Next.js 中间件                                                                 |

---

## 注意事项

1. **首次运行前**：复制 `apps/api/.env-example` 到 `apps/api/.env` 并配置实际值
2. **数据库**：后端需要 PostgreSQL 数据库，确保数据库服务已启动
3. **端口占用**：前端默认 3000，后端默认 8000，确保端口未被占用
4. **Node 版本**：确保 Node.js >= 20，否则可能出现兼容性问题
