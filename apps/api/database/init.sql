-- =====================================================
-- 深选 (SiftDeep) 数据库初始化脚本
-- PostgreSQL 14+
-- =====================================================

-- =====================================================
-- 1. 扩展
-- =====================================================
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm"; -- 用于全文搜索
ALTER TABLE "user" 
ADD COLUMN "is_email_verified" boolean DEFAULT false;
-- =====================================================
-- 2. 枚举类型
-- =====================================================

-- 投稿状态
DO $$ BEGIN
    CREATE TYPE submission_status AS ENUM ('pending', 'approved', 'rejected', 'under_review');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- 收藏夹可见性
DO $$ BEGIN
    CREATE TYPE collection_visibility AS ENUM ('public', 'private', 'unlisted');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- 专题类型
DO $$ BEGIN
    CREATE TYPE topic_type AS ENUM ('educational', 'documentary', 'tutorial', 'analysis', 'other');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- 反馈类型
DO $$ BEGIN
    CREATE TYPE feedback_type AS ENUM ('low_quality', 'copyright', 'inappropriate', 'spam', 'other');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- 反馈状态
DO $$ BEGIN
    CREATE TYPE feedback_status AS ENUM ('pending', 'reviewing', 'resolved', 'rejected');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- OTP 类型
DO $$ BEGIN
    CREATE TYPE otp_type AS ENUM ('EMAIL_CONFIRMATION', 'PASSWORD_RESET');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- =====================================================
-- 3. 基础表
-- =====================================================

-- 用户表
CREATE TABLE IF NOT EXISTS "user" (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255),
    username VARCHAR(100) UNIQUE NOT NULL,
    is_email_verified BOOLEAN DEFAULT false,
    email_verified_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 用户资料表
CREATE TABLE IF NOT EXISTS "profile" (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID UNIQUE NOT NULL REFERENCES "user"(id) ON DELETE CASCADE,
    name VARCHAR(100),
    gender VARCHAR(20) DEFAULT 'UNKNOWN',
    phone_number VARCHAR(20),
    profile_picture VARCHAR(500),
    date_of_birth DATE,
    address TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 会话表
CREATE TABLE IF NOT EXISTS "session" (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES "user"(id) ON DELETE CASCADE,
    refresh_token TEXT NOT NULL,
    ip VARCHAR(45),
    device_name VARCHAR(100),
    device_os VARCHAR(50),
    browser VARCHAR(50),
    location VARCHAR(255),
    user_agent TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- OTP 表
CREATE TABLE IF NOT EXISTS "otp" (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    otp VARCHAR(6) NOT NULL,
    type otp_type NOT NULL,
    expires TIMESTAMP WITH TIME ZONE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- =====================================================
-- 4. 核心业务表
-- =====================================================

-- 视频表
CREATE TABLE IF NOT EXISTS "video" (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    bv_id VARCHAR(20) UNIQUE NOT NULL,
    title VARCHAR(500) NOT NULL,
    description TEXT,
    cover_url VARCHAR(500) NOT NULL,
    duration INTEGER, -- 秒
    author_id UUID REFERENCES "user"(id),
    author_name VARCHAR(100) NOT NULL,
    play_count INTEGER DEFAULT 0,
    like_count INTEGER DEFAULT 0,
    coin_count INTEGER DEFAULT 0,
    favorite_count INTEGER DEFAULT 0,
    category VARCHAR(50),
    tags TEXT[], -- 数组类型
    rating DECIMAL(2,1) DEFAULT 0, -- 0-10
    is_featured BOOLEAN DEFAULT false,
    featured_at TIMESTAMP WITH TIME ZONE,
    bilibili_url VARCHAR(500) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 投稿表
CREATE TABLE IF NOT EXISTS "submission" (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    bv_id VARCHAR(20) NOT NULL,
    reason TEXT NOT NULL,
    category VARCHAR(50) NOT NULL,
    status submission_status DEFAULT 'pending',
    review_note TEXT,
    reviewer_id UUID REFERENCES "user"(id),
    submitter_id UUID NOT NULL REFERENCES "user"(id),
    video_id UUID REFERENCES "video"(id),
    reviewed_at TIMESTAMP WITH TIME ZONE,
    is_negative_feedback BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 收藏夹表
CREATE TABLE IF NOT EXISTS "collection" (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL,
    description TEXT,
    cover_url VARCHAR(500),
    visibility collection_visibility DEFAULT 'public',
    is_collaborative BOOLEAN DEFAULT false,
    item_count INTEGER DEFAULT 0,
    follower_count INTEGER DEFAULT 0,
    owner_id UUID NOT NULL REFERENCES "user"(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 收藏夹协同编辑者表
CREATE TABLE IF NOT EXISTS "collection_collaborators" (
    collection_id UUID NOT NULL REFERENCES "collection"(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES "user"(id) ON DELETE CASCADE,
    PRIMARY KEY (collection_id, user_id)
);

-- 收藏夹内容项表
CREATE TABLE IF NOT EXISTS "collection_item" (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    collection_id UUID NOT NULL REFERENCES "collection"(id) ON DELETE CASCADE,
    video_id UUID NOT NULL REFERENCES "video"(id),
    added_by UUID NOT NULL REFERENCES "user"(id),
    "order" INTEGER DEFAULT 0,
    note TEXT,
    is_pinned BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 专题表
CREATE TABLE IF NOT EXISTS "topic" (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(500) NOT NULL,
    description TEXT NOT NULL,
    cover_url VARCHAR(500),
    type topic_type DEFAULT 'other',
    category VARCHAR(50),
    estimated_read_time INTEGER DEFAULT 0, -- 分钟
    video_count INTEGER DEFAULT 0,
    article_count INTEGER DEFAULT 0,
    resources TEXT[], -- 资料链接数组
    is_published BOOLEAN DEFAULT false,
    published_at TIMESTAMP WITH TIME ZONE,
    creator_id UUID NOT NULL REFERENCES "user"(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 专题视频关联表
CREATE TABLE IF NOT EXISTS "topic_video" (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    topic_id UUID NOT NULL REFERENCES "topic"(id) ON DELETE CASCADE,
    video_id UUID NOT NULL REFERENCES "video"(id),
    "order" INTEGER DEFAULT 0,
    introduction TEXT,
    is_required BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 反馈表
CREATE TABLE IF NOT EXISTS "feedback" (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    type feedback_type DEFAULT 'low_quality',
    reason VARCHAR(255) NOT NULL,
    description TEXT,
    status feedback_status DEFAULT 'pending',
    handler_note TEXT,
    handler_id UUID REFERENCES "user"(id),
    reporter_id UUID NOT NULL REFERENCES "user"(id),
    video_id UUID NOT NULL REFERENCES "video"(id),
    handled_at TIMESTAMP WITH TIME ZONE,
    is_anonymous BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- =====================================================
-- 5. 索引
-- =====================================================

-- 用户表索引
CREATE INDEX IF NOT EXISTS idx_user_email ON "user"(email);
CREATE INDEX IF NOT EXISTS idx_user_username ON "user"(username);

-- 会话表索引
CREATE INDEX IF NOT EXISTS idx_session_user_id ON "session"(user_id);
CREATE INDEX IF NOT EXISTS idx_session_token ON "session"(refresh_token);

-- 视频表索引
CREATE INDEX IF NOT EXISTS idx_video_bv_id ON "video"(bv_id);
CREATE INDEX IF NOT EXISTS idx_video_category ON "video"(category);
CREATE INDEX IF NOT EXISTS idx_video_is_featured ON "video"(is_featured);
CREATE INDEX IF NOT EXISTS idx_video_featured_at ON "video"(featured_at DESC);
CREATE INDEX IF NOT EXISTS idx_video_created_at ON "video"(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_video_play_count ON "video"(play_count DESC);
CREATE INDEX IF NOT EXISTS idx_video_rating ON "video"(rating DESC);
CREATE INDEX IF NOT EXISTS idx_video_tags ON "video" USING GIN(tags);
CREATE INDEX IF NOT EXISTS idx_video_title_trgm ON "video" USING GIN(title gin_trgm_ops);

-- 投稿表索引
CREATE INDEX IF NOT EXISTS idx_submission_bv_id ON "submission"(bv_id);
CREATE INDEX IF NOT EXISTS idx_submission_status ON "submission"(status);
CREATE INDEX IF NOT EXISTS idx_submission_submitter_id ON "submission"(submitter_id);
CREATE INDEX IF NOT EXISTS idx_submission_created_at ON "submission"(created_at DESC);

-- 收藏夹表索引
CREATE INDEX IF NOT EXISTS idx_collection_owner_id ON "collection"(owner_id);
CREATE INDEX IF NOT EXISTS idx_collection_visibility ON "collection"(visibility);

-- 收藏夹内容项表索引
CREATE INDEX IF NOT EXISTS idx_collection_item_collection_id ON "collection_item"(collection_id);
CREATE INDEX IF NOT EXISTS idx_collection_item_video_id ON "collection_item"(video_id);
CREATE INDEX IF NOT EXISTS idx_collection_item_order ON "collection_item"(collection_id, "order");

-- 专题表索引
CREATE INDEX IF NOT EXISTS idx_topic_creator_id ON "topic"(creator_id);
CREATE INDEX IF NOT EXISTS idx_topic_is_published ON "topic"(is_published);
CREATE INDEX IF NOT EXISTS idx_topic_published_at ON "topic"(published_at DESC);

-- 专题视频表索引
CREATE INDEX IF NOT EXISTS idx_topic_video_topic_id ON "topic_video"(topic_id);
CREATE INDEX IF NOT EXISTS idx_topic_video_video_id ON "topic_video"(video_id);
CREATE INDEX IF NOT EXISTS idx_topic_video_order ON "topic_video"(topic_id, "order");

-- 反馈表索引
CREATE INDEX IF NOT EXISTS idx_feedback_video_id ON "feedback"(video_id);
CREATE INDEX IF NOT EXISTS idx_feedback_reporter_id ON "feedback"(reporter_id);
CREATE INDEX IF NOT EXISTS idx_feedback_status ON "feedback"(status);
CREATE INDEX IF NOT EXISTS idx_feedback_type ON "feedback"(type);

-- =====================================================
-- 6. 触发器函数（自动更新 updated_at）
-- =====================================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 为所有需要自动更新 updated_at 的表创建触发器
CREATE TRIGGER update_user_updated_at BEFORE UPDATE ON "user"
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_profile_updated_at BEFORE UPDATE ON "profile"
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_session_updated_at BEFORE UPDATE ON "session"
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_video_updated_at BEFORE UPDATE ON "video"
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_submission_updated_at BEFORE UPDATE ON "submission"
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_collection_updated_at BEFORE UPDATE ON "collection"
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_collection_item_updated_at BEFORE UPDATE ON "collection_item"
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_topic_updated_at BEFORE UPDATE ON "topic"
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_topic_video_updated_at BEFORE UPDATE ON "topic_video"
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_feedback_updated_at BEFORE UPDATE ON "feedback"
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- 7. 初始数据
-- =====================================================

-- 插入测试用户（密码：Test1234!）
INSERT INTO "user" (email, password, username, is_email_verified, email_verified_at) VALUES
    ('admin@siftdeep.com', '$2b$10$KIXvY9qJQZ8xJZ5xJZ5xJZ5xJZ5xJZ5xJZ5xJZ5xJZ5xJZ5xJZ5xJ', 'admin', true, CURRENT_TIMESTAMP)
ON CONFLICT (email) DO NOTHING;

-- 插入测试用户资料
INSERT INTO "profile" (user_id, name)
SELECT id, '管理员' FROM "user" WHERE username = 'admin'
ON CONFLICT (user_id) DO NOTHING;

-- =====================================================
-- 8. 视图和统计查询
-- =====================================================

-- 热门视频视图（按播放量和评分排序）
CREATE OR REPLACE VIEW popular_videos AS
SELECT 
    v.*,
    u.username as uploader_username,
    u.email as uploader_email
FROM "video" v
LEFT JOIN "user" u ON v.author_id = u.id
WHERE v.is_featured = true
ORDER BY v.play_count DESC, v.rating DESC;

-- 待审核投稿视图
CREATE OR REPLACE VIEW pending_submissions AS
SELECT 
    s.*,
    sub.username as submitter_username,
    sub.email as submitter_email,
    v.title as video_title
FROM "submission" s
LEFT JOIN "user" sub ON s.submitter_id = sub.id
LEFT JOIN "video" v ON s.video_id = v.id
WHERE s.status = 'pending'
ORDER BY s.created_at ASC;

-- =====================================================
-- 9. 权限设置（可选）
-- =====================================================

-- 如果需要使用特定用户访问数据库，取消以下注释
-- CREATE ROLE siftdeep_user WITH LOGIN PASSWORD 'your_password';
-- GRANT CONNECT ON DATABASE siftdeep TO siftdeep_user;
-- GRANT USAGE ON SCHEMA public TO siftdeep_user;
-- GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO siftdeep_user;
-- GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO siftdeep_user;

-- =====================================================
-- 完成提示
-- =====================================================
SELECT '数据库初始化完成！' AS status;
