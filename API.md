# 深选 (SiftDeep) API 文档

## 📋 目录结构

### 后端模块

```
apps/api/src/features/
├── auth/           # 认证模块（登录/注册/JWT）
├── videos/         # 视频模块（视频索引 CRUD）
├── submissions/    # 投稿模块（用户投稿审核）
├── collections/    # 收藏夹模块（收藏夹 CRUD）
├── topics/         # 专题模块（深度专题管理）
├── feedback/       # 反馈模块（负反馈/举报）
├── bilibili/       # B 站 API 模块（BV 号解析）
└── tasks/          # 定时任务模块（每日推送）
```

---

## 🔌 API 端点

### 认证模块 `/auth`

| 方法   | 端点                     | 描述         | 认证 |
| ------ | ------------------------ | ------------ | ---- |
| POST   | `/auth/sign-up`          | 用户注册     | ❌   |
| POST   | `/auth/sign-in`          | 用户登录     | ❌   |
| POST   | `/auth/sign-out`         | 退出登录     | ✅   |
| PATCH  | `/auth/confirm-email`    | 确认邮箱     | ✅   |
| PATCH  | `/auth/forgot-password`  | 忘记密码     | ❌   |
| PATCH  | `/auth/reset-password`   | 重置密码     | ❌   |
| PATCH  | `/auth/change-password`  | 修改密码     | ✅   |
| PATCH  | `/auth/refresh-token`    | 刷新令牌     | ✅   |
| GET    | `/auth/sessions/:userId` | 获取会话列表 | ✅   |
| GET    | `/auth/session/:id`      | 获取会话详情 | ✅   |
| DELETE | `/auth/delete-account`   | 删除账号     | ✅   |

---

### 视频模块 `/videos`

| 方法   | 端点                     | 描述                     | 认证 |
| ------ | ------------------------ | ------------------------ | ---- |
| GET    | `/videos/bv/:bvId`       | 通过 BV 号获取视频       | ❌   |
| GET    | `/videos/:id`            | 获取视频详情             | ❌   |
| GET    | `/videos`                | 获取视频列表（支持筛选） | ❌   |
| GET    | `/videos/featured/today` | 获取今日推荐             | ❌   |
| GET    | `/videos/featured`       | 获取精选视频             | ❌   |
| POST   | `/videos/sync/:bvId`     | 同步视频信息             | ✅   |
| PATCH  | `/videos/featured`       | 标记为精选               | ✅   |
| PATCH  | `/videos/unfeatured`     | 取消精选                 | ✅   |
| PATCH  | `/videos/rating`         | 更新评分                 | ✅   |
| DELETE | `/videos/:id`            | 删除视频                 | ✅   |

**请求示例 - 获取视频列表：**

```bash
GET /videos?page=1&limit=20&category=科技&sortBy=playCount&sortOrder=DESC
```

---

### 投稿模块 `/submissions`

| 方法   | 端点                       | 描述           | 认证        |
| ------ | -------------------------- | -------------- | ----------- |
| POST   | `/submissions`             | 创建投稿       | ✅          |
| GET    | `/submissions/my`          | 获取我的投稿   | ✅          |
| GET    | `/submissions/:id`         | 获取投稿详情   | ✅          |
| GET    | `/submissions/pending/all` | 获取待审核投稿 | ✅ (管理员) |
| PATCH  | `/submissions/:id/review`  | 审核投稿       | ✅ (管理员) |
| DELETE | `/submissions/:id`         | 删除投稿       | ✅          |

**请求示例 - 创建投稿：**

```json
POST /submissions
{
  "bvId": "BV1XX4y1P71e",
  "reason": "这是一个非常优质的科普视频...",
  "category": "论文级科普"
}
```

---

### 收藏夹模块 `/collections`

| 方法   | 端点                              | 描述             | 认证 |
| ------ | --------------------------------- | ---------------- | ---- |
| POST   | `/collections`                    | 创建收藏夹       | ✅   |
| GET    | `/collections/public`             | 获取公开收藏夹   | ❌   |
| GET    | `/collections/my`                 | 获取我的收藏夹   | ✅   |
| GET    | `/collections/:id`                | 获取收藏夹详情   | ✅   |
| GET    | `/collections/:id/items`          | 获取收藏夹内容   | ✅   |
| PATCH  | `/collections/:id`                | 更新收藏夹       | ✅   |
| DELETE | `/collections/:id`                | 删除收藏夹       | ✅   |
| POST   | `/collections/:id/videos`         | 添加视频到收藏夹 | ✅   |
| DELETE | `/collections/:id/videos/:itemId` | 移除视频         | ✅   |
| PATCH  | `/collections/:id/items/order`    | 更新排序         | ✅   |
| POST   | `/collections/:id/follow`         | 关注收藏夹       | ✅   |

**请求示例 - 创建收藏夹：**

```json
POST /collections
{
  "name": "计算机科学基础",
  "description": "包含数据结构、算法等基础课程",
  "visibility": "public",
  "isCollaborative": true
}
```

---

### 专题模块 `/topics`

| 方法   | 端点                               | 描述             | 认证 |
| ------ | ---------------------------------- | ---------------- | ---- |
| POST   | `/topics`                          | 创建专题         | ✅   |
| GET    | `/topics`                          | 获取专题列表     | ❌   |
| GET    | `/topics/my`                       | 获取我创建的专题 | ✅   |
| GET    | `/topics/:id`                      | 获取专题详情     | ✅   |
| PATCH  | `/topics/:id`                      | 更新专题         | ✅   |
| DELETE | `/topics/:id`                      | 删除专题         | ✅   |
| POST   | `/topics/:id/publish`              | 发布/取消发布    | ✅   |
| POST   | `/topics/:id/videos`               | 添加视频到专题   | ✅   |
| DELETE | `/topics/:id/videos/:topicVideoId` | 移除视频         | ✅   |
| PATCH  | `/topics/:id/videos/order`         | 更新排序         | ✅   |

**请求示例 - 创建专题：**

```json
POST /topics
{
  "title": "人工智能发展史",
  "description": "从图灵测试到 ChatGPT 的完整发展历程",
  "type": "educational",
  "category": "科技"
}
```

---

### 反馈模块 `/feedback`

| 方法   | 端点                          | 描述             | 认证        |
| ------ | ----------------------------- | ---------------- | ----------- |
| POST   | `/feedback`                   | 创建反馈         | ✅          |
| GET    | `/feedback/my`                | 获取我的反馈     | ✅          |
| GET    | `/feedback/pending`           | 获取待处理反馈   | ✅ (管理员) |
| GET    | `/feedback/:id`               | 获取反馈详情     | ✅          |
| GET    | `/feedback/video/:bvId/stats` | 获取视频反馈统计 | ❌          |
| PATCH  | `/feedback/:id`               | 处理反馈         | ✅ (管理员) |
| DELETE | `/feedback/:id`               | 删除反馈         | ✅          |

**请求示例 - 创建反馈：**

```json
POST /feedback
{
  "type": "low_quality",
  "reason": "质量不符",
  "description": "视频内容与标题不符...",
  "bvId": "BV1XX4y1P71e",
  "isAnonymous": false
}
```

---

### 用户模块 `/users`

| 方法 | 端点                 | 描述         | 认证 |
| ---- | -------------------- | ------------ | ---- |
| GET  | `/users`             | 获取所有用户 | ❌   |
| GET  | `/users/:identifier` | 获取用户信息 | ❌   |
| POST | `/users`             | 测试文件上传 | ❌   |

---

## 🗄️ 数据库表结构

### 核心表

- **user** - 用户表
- **profile** - 用户资料
- **session** - 会话表
- **otp** - OTP 验证码表

### 业务表

- **video** - 视频索引表
- **submission** - 投稿表
- **collection** - 收藏夹表
- **collection_item** - 收藏夹内容项表
- **collection_collaborators** - 收藏夹协同编辑者表
- **topic** - 专题表
- **topic_video** - 专题视频关联表
- **feedback** - 反馈表

完整的 SQL 建表脚本请查看：`apps/api/database/init.sql`

---

## 🚀 快速开始

### 1. 数据库初始化

```bash
# 连接到 PostgreSQL
psql -h 192.168.80.128 -U postgres -d siftdeep

# 执行初始化脚本
\i apps/api/database/init.sql
```

### 2. 启动后端

```bash
cd apps/api
pnpm dev
```

### 3. 启动前端

```bash
cd apps/web
pnpm dev
```

---

## 📝 前端 API 调用示例

```typescript
import { videosApi, collectionsApi, submissionsApi } from '@/lib/api';

// 获取视频列表
const { data, error } = await videosApi.getList({
  page: 1,
  limit: 20,
  category: '科技',
  sortBy: 'playCount',
});

// 创建收藏夹
const { data: collection } = await collectionsApi.create({
  name: '我的学习清单',
  visibility: 'private',
});

// 添加视频到收藏夹
await collectionsApi.addVideo(collection.id, 'BV1XX4y1P71e');

// 创建投稿
await submissionsApi.create({
  bvId: 'BV1XX4y1P71e',
  reason: '这是一个非常优质的视频...',
  category: '论文级科普',
});
```

---

## 🔐 认证说明

所有需要认证的端点都需要在请求头中携带 JWT Token：

```
Authorization: Bearer <access_token>
```

Token 获取方式：

1. 用户登录后，后端返回 `access_token`
2. 前端将 token 存储到 localStorage
3. 后续请求自动携带 token

---

## 📊 枚举类型

### SubmissionStatus (投稿状态)

- `pending` - 待审核
- `approved` - 已通过
- `rejected` - 已拒绝
- `under_review` - 复审中

### CollectionVisibility (收藏夹可见性)

- `public` - 公开
- `private` - 私密
- `unlisted` - 不公开

### TopicType (专题类型)

- `educational` - 教育类
- `documentary` - 纪录片
- `tutorial` - 教程类
- `analysis` - 解析类
- `other` - 其他

### FeedbackType (反馈类型)

- `low_quality` - 质量不符
- `copyright` - 版权投诉
- `inappropriate` - 不当内容
- `spam` - 垃圾内容
- `other` - 其他

### FeedbackStatus (反馈状态)

- `pending` - 待处理
- `reviewing` - 审核中
- `resolved` - 已解决
- `rejected` - 已驳回

---

## ⚠️ 注意事项

1. **QPS 限制**：B 站 API 调用限制为每秒 2 次
2. **日志销毁**：系统日志 30 天自动销毁
3. **版权合规**：所有视频外链至 B 站，不存储视频文件
4. **安全要求**：所有敏感操作需要 JWT 认证

---

## 📞 技术支持

如有问题请提交 Issue 或联系开发团队。
