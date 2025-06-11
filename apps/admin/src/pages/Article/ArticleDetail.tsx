import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Card,
  Button,
  Space,
  Tag,
  Divider,
  Avatar,
  Statistic,
  Row,
  Col,
  message,
  Image,
  Typography,
} from 'antd';
import {
  ArrowLeftOutlined,
  EditOutlined,
  EyeOutlined,
  LikeOutlined,
  ShareAltOutlined,
  CalendarOutlined,
  UserOutlined,
  TagOutlined,
  FolderOutlined,
} from '@ant-design/icons';
import { ContentLoading } from '../../components/Loading';

const { Title, Paragraph, Text } = Typography;

// 模拟文章详细信息
const mockArticleDetail = {
  id: '1',
  title: 'React 18 新特性详解',
  content: `
# React 18 新特性详解

React 18 是 React 的一个重要版本，引入了许多令人兴奋的新特性和改进。本文将详细介绍这些新特性，帮助开发者更好地理解和使用 React 18。

## 并发渲染 (Concurrent Rendering)

并发渲染是 React 18 最重要的新特性之一。它允许 React 在渲染过程中被中断，从而提高应用的响应性。

### 主要优势：
- 提高用户体验
- 更好的性能
- 更流畅的动画

## 自动批处理 (Automatic Batching)

React 18 扩展了批处理的范围，现在在 Promise、setTimeout 和原生事件处理程序中的状态更新也会被自动批处理。

\`\`\`javascript
// React 18 中，这些更新会被批处理
setTimeout(() => {
  setCount(c => c + 1);
  setFlag(f => !f);
  // React 只会重新渲染一次
}, 1000);
\`\`\`

## Suspense 改进

React 18 对 Suspense 进行了重大改进，现在支持服务端渲染，并且行为更加一致。

## 新的 Hooks

### useId
用于生成唯一的 ID，特别适用于服务端渲染。

\`\`\`javascript
function MyComponent() {
  const id = useId();
  return (
    <div>
      <label htmlFor={id}>Name:</label>
      <input id={id} type="text" />
    </div>
  );
}
\`\`\`

### useDeferredValue
用于延迟更新非紧急的状态。

### useTransition
用于标记状态更新为非紧急的。

## 总结

React 18 带来了许多激动人心的新特性，这些特性将帮助开发者构建更好的用户体验。建议开发者逐步迁移到 React 18，并充分利用这些新特性。
  `,
  summary: '本文详细介绍了React 18的新特性，包括并发渲染、自动批处理等。',
  cover: 'https://via.placeholder.com/800x400',
  author: {
    name: '张三',
    avatar: '',
    bio: '资深前端开发工程师，专注于React生态系统',
  },
  category: '前端技术',
  tags: ['React', 'JavaScript', '前端'],
  status: 'published',
  views: 1250,
  likes: 89,
  shares: 23,
  createTime: '2024-01-10 10:00:00',
  updateTime: '2024-01-12 15:30:00',
  publishTime: '2024-01-11 09:00:00',
  readTime: '8 分钟',
};

const ArticleDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [article, setArticle] = useState<any>(null);
  const [liked, setLiked] = useState(false);

  // 加载文章详情
  const loadArticleDetail = async () => {
    setLoading(true);
    try {
      // 模拟API调用
      await new Promise(resolve => setTimeout(resolve, 1000));
      setArticle(mockArticleDetail);
    } catch (error) {
      message.error('加载文章详情失败');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      loadArticleDetail();
    }
  }, [id]);

  if (loading || !article) {
    return <ContentLoading tip="加载文章详情中..." />;
  }

  // 状态标签
  const getStatusTag = (status: string) => {
    const statusMap = {
      draft: { color: 'orange', text: '草稿' },
      published: { color: 'green', text: '已发布' },
      archived: { color: 'red', text: '已归档' },
    };
    const config = statusMap[status as keyof typeof statusMap];
    return <Tag color={config.color}>{config.text}</Tag>;
  };

  // 点赞
  const handleLike = () => {
    setLiked(!liked);
    message.success(liked ? '取消点赞' : '点赞成功');
  };

  // 分享
  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    message.success('链接已复制到剪贴板');
  };

  return (
    <div className="space-y-6">
      {/* 页面头部 */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button
            icon={<ArrowLeftOutlined />}
            onClick={() => navigate('/articles')}
          >
            返回列表
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-gray-800 mb-1">文章详情</h1>
            <p className="text-gray-600">查看文章内容和详细信息</p>
          </div>
        </div>
        <Space>
          <Button
            icon={<EditOutlined />}
            onClick={() => message.info('编辑功能开发中...')}
          >
            编辑文章
          </Button>
          <Button
            icon={<ShareAltOutlined />}
            onClick={handleShare}
          >
            分享
          </Button>
        </Space>
      </div>

      {/* 文章统计 */}
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={6}>
          <Card>
            <Statistic
              title="浏览量"
              value={article.views}
              prefix={<EyeOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={6}>
          <Card>
            <Statistic
              title="点赞数"
              value={article.likes}
              prefix={<LikeOutlined />}
              valueStyle={{ color: '#f5222d' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={6}>
          <Card>
            <Statistic
              title="分享数"
              value={article.shares}
              prefix={<ShareAltOutlined />}
              valueStyle={{ color: '#52c41a' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={6}>
          <Card>
            <Statistic
              title="阅读时长"
              value={article.readTime}
              valueStyle={{ color: '#722ed1' }}
            />
          </Card>
        </Col>
      </Row>

      {/* 文章内容 */}
      <Card>
        {/* 文章头部信息 */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <Title level={1} className="mb-0">{article.title}</Title>
            {getStatusTag(article.status)}
          </div>
          
          <div className="flex items-center space-x-6 text-gray-500 mb-4">
            <div className="flex items-center space-x-2">
              <Avatar
                size={24}
                src={article.author.avatar}
                icon={<UserOutlined />}
              />
              <span>{article.author.name}</span>
            </div>
            <div className="flex items-center space-x-1">
              <CalendarOutlined />
              <span>{article.publishTime || article.createTime}</span>
            </div>
            <div className="flex items-center space-x-1">
              <FolderOutlined />
              <span>{article.category}</span>
            </div>
          </div>

          <div className="flex items-center space-x-2 mb-4">
            <TagOutlined className="text-gray-400" />
            {article.tags.map((tag: string) => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </div>

          <Paragraph className="text-lg text-gray-600">
            {article.summary}
          </Paragraph>
        </div>

        {/* 封面图片 */}
        {article.cover && (
          <div className="mb-6">
            <Image
              src={article.cover}
              alt={article.title}
              className="w-full rounded-lg"
              style={{ maxHeight: '400px', objectFit: 'cover' }}
            />
          </div>
        )}

        <Divider />

        {/* 文章正文 */}
        <div className="prose max-w-none">
          <div 
            className="text-gray-800 leading-relaxed"
            style={{ whiteSpace: 'pre-wrap' }}
          >
            {article.content}
          </div>
        </div>

        <Divider />

        {/* 文章底部操作 */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button
              type={liked ? 'primary' : 'default'}
              icon={<LikeOutlined />}
              onClick={handleLike}
            >
              {liked ? '已点赞' : '点赞'} ({article.likes})
            </Button>
            <Button
              icon={<ShareAltOutlined />}
              onClick={handleShare}
            >
              分享 ({article.shares})
            </Button>
          </div>
          <div className="text-gray-500 text-sm">
            最后更新：{article.updateTime}
          </div>
        </div>
      </Card>

      {/* 作者信息 */}
      <Card title="关于作者">
        <div className="flex items-start space-x-4">
          <Avatar
            size={64}
            src={article.author.avatar}
            icon={<UserOutlined />}
          />
          <div>
            <Title level={4} className="mb-2">{article.author.name}</Title>
            <Paragraph className="text-gray-600 mb-0">
              {article.author.bio}
            </Paragraph>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ArticleDetail;