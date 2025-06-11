import React, { useState, useEffect } from 'react';
import {
  Table,
  Card,
  Button,
  Input,
  Select,
  Space,
  Tag,
  Popconfirm,
  message,
  Modal,
  Form,
  DatePicker,
  Image,
} from 'antd';
import {
  PlusOutlined,
  SearchOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
  ReloadOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import type { ColumnsType } from 'antd/es/table';
import { TableLoading } from '../../components/Loading';

const { Search } = Input;
const { Option } = Select;
const { RangePicker } = DatePicker;
const { TextArea } = Input;

// 文章接口
interface Article {
  id: string;
  title: string;
  content: string;
  summary: string;
  cover?: string;
  author: string;
  category: string;
  tags: string[];
  status: 'draft' | 'published' | 'archived';
  views: number;
  likes: number;
  createTime: string;
  updateTime: string;
  publishTime?: string;
}

// 模拟文章数据
const mockArticles: Article[] = [
  {
    id: '1',
    title: 'React 18 新特性详解',
    content: 'React 18 带来了许多令人兴奋的新特性...',
    summary: '本文详细介绍了React 18的新特性，包括并发渲染、自动批处理等。',
    cover: 'https://via.placeholder.com/300x200',
    author: '张三',
    category: '前端技术',
    tags: ['React', 'JavaScript', '前端'],
    status: 'published',
    views: 1250,
    likes: 89,
    createTime: '2024-01-10 10:00:00',
    updateTime: '2024-01-12 15:30:00',
    publishTime: '2024-01-11 09:00:00',
  },
  {
    id: '2',
    title: 'Vue 3 Composition API 最佳实践',
    content: 'Vue 3 的 Composition API 为我们提供了更灵活的组件逻辑复用方式...',
    summary: '深入探讨Vue 3 Composition API的使用技巧和最佳实践。',
    cover: 'https://via.placeholder.com/300x200',
    author: '李四',
    category: '前端技术',
    tags: ['Vue', 'JavaScript', '前端'],
    status: 'published',
    views: 980,
    likes: 67,
    createTime: '2024-01-08 14:20:00',
    updateTime: '2024-01-09 11:15:00',
    publishTime: '2024-01-09 10:00:00',
  },
  {
    id: '3',
    title: 'TypeScript 高级类型系统',
    content: 'TypeScript 的类型系统非常强大...',
    summary: '介绍TypeScript中的高级类型特性，帮助开发者写出更安全的代码。',
    author: '王五',
    category: '编程语言',
    tags: ['TypeScript', 'JavaScript'],
    status: 'draft',
    views: 0,
    likes: 0,
    createTime: '2024-01-15 16:45:00',
    updateTime: '2024-01-15 16:45:00',
  },
  {
    id: '4',
    title: 'Node.js 性能优化指南',
    content: 'Node.js 应用的性能优化是一个重要话题...',
    summary: '全面的Node.js性能优化指南，涵盖内存管理、异步处理等方面。',
    cover: 'https://via.placeholder.com/300x200',
    author: '赵六',
    category: '后端技术',
    tags: ['Node.js', 'JavaScript', '性能优化'],
    status: 'archived',
    views: 2100,
    likes: 156,
    createTime: '2024-01-05 09:30:00',
    updateTime: '2024-01-06 14:20:00',
    publishTime: '2024-01-05 10:00:00',
  },
];

const ArticleList: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [articles, setArticles] = useState<Article[]>([]);
  const [filteredArticles, setFilteredArticles] = useState<Article[]>([]);
  const [searchText, setSearchText] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [categoryFilter, setCategoryFilter] = useState<string>('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);
  const [form] = Form.useForm();

  // 加载文章数据
  const loadArticles = async () => {
    setLoading(true);
    try {
      // 模拟API调用
      await new Promise(resolve => setTimeout(resolve, 1000));
      setArticles(mockArticles);
      setFilteredArticles(mockArticles);
    } catch (error) {
      message.error('加载文章数据失败');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadArticles();
  }, []);

  // 过滤文章数据
  useEffect(() => {
    let filtered = articles;

    if (searchText) {
      filtered = filtered.filter(
        article =>
          article.title.toLowerCase().includes(searchText.toLowerCase()) ||
          article.author.toLowerCase().includes(searchText.toLowerCase()) ||
          article.summary.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    if (statusFilter) {
      filtered = filtered.filter(article => article.status === statusFilter);
    }

    if (categoryFilter) {
      filtered = filtered.filter(article => article.category === categoryFilter);
    }

    setFilteredArticles(filtered);
  }, [articles, searchText, statusFilter, categoryFilter]);

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

  // 删除文章
  const handleDelete = async (id: string) => {
    try {
      setLoading(true);
      // 模拟API调用
      await new Promise(resolve => setTimeout(resolve, 500));
      setArticles(prev => prev.filter(article => article.id !== id));
      message.success('删除成功');
    } catch (error) {
      message.error('删除失败');
    } finally {
      setLoading(false);
    }
  };

  // 编辑文章
  const handleEdit = (article: Article) => {
    setEditingArticle(article);
    form.setFieldsValue({
      ...article,
      tags: article.tags.join(', '),
    });
    setIsModalVisible(true);
  };

  // 保存文章
  const handleSave = async (values: any) => {
    try {
      setLoading(true);
      // 模拟API调用
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const articleData = {
        ...values,
        tags: values.tags ? values.tags.split(',').map((tag: string) => tag.trim()) : [],
        updateTime: new Date().toLocaleString(),
      };
      
      if (editingArticle) {
        // 更新文章
        setArticles(prev =>
          prev.map(article =>
            article.id === editingArticle.id ? { ...article, ...articleData } : article
          )
        );
        message.success('更新成功');
      } else {
        // 新增文章
        const newArticle: Article = {
          ...articleData,
          id: Date.now().toString(),
          views: 0,
          likes: 0,
          createTime: new Date().toLocaleString(),
        };
        setArticles(prev => [newArticle, ...prev]);
        message.success('添加成功');
      }
      
      setIsModalVisible(false);
      setEditingArticle(null);
      form.resetFields();
    } catch (error) {
      message.error('保存失败');
    } finally {
      setLoading(false);
    }
  };

  // 表格列配置
  const columns: ColumnsType<Article> = [
    {
      title: '文章',
      key: 'article',
      render: (_, record) => (
        <div className="flex items-start space-x-3">
          {record.cover && (
            <Image
              width={60}
              height={40}
              src={record.cover}
              className="rounded object-cover"
              preview={false}
            />
          )}
          <div className="flex-1">
            <div className="font-medium text-gray-900 mb-1">{record.title}</div>
            <div className="text-gray-500 text-sm line-clamp-2">{record.summary}</div>
            <div className="flex flex-wrap gap-1 mt-2">
              {record.tags.map(tag => (
                <Tag key={tag} size="small">{tag}</Tag>
              ))}
            </div>
          </div>
        </div>
      ),
      width: 400,
    },
    {
      title: '作者',
      dataIndex: 'author',
      key: 'author',
      width: 100,
    },
    {
      title: '分类',
      dataIndex: 'category',
      key: 'category',
      width: 120,
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: getStatusTag,
      width: 100,
    },
    {
      title: '浏览/点赞',
      key: 'stats',
      render: (_, record) => (
        <div className="text-sm">
          <div>{record.views} 浏览</div>
          <div>{record.likes} 点赞</div>
        </div>
      ),
      width: 100,
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
      width: 150,
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="link"
            icon={<EyeOutlined />}
            onClick={() => navigate(`/articles/${record.id}`)}
          >
            查看
          </Button>
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          >
            编辑
          </Button>
          <Popconfirm
            title="确定要删除这篇文章吗？"
            onConfirm={() => handleDelete(record.id)}
            okText="确定"
            cancelText="取消"
          >
            <Button
              type="link"
              danger
              icon={<DeleteOutlined />}
            >
              删除
            </Button>
          </Popconfirm>
        </Space>
      ),
      width: 180,
    },
  ];

  return (
    <div className="space-y-6">
      {/* 页面标题 */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">文章管理</h1>
          <p className="text-gray-600">管理系统文章内容</p>
        </div>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => {
            setEditingArticle(null);
            form.resetFields();
            setIsModalVisible(true);
          }}
        >
          新增文章
        </Button>
      </div>

      {/* 搜索和过滤 */}
      <Card>
        <div className="flex flex-wrap gap-4 items-center">
          <Search
            placeholder="搜索标题、作者或摘要"
            allowClear
            style={{ width: 300 }}
            onSearch={setSearchText}
            onChange={e => setSearchText(e.target.value)}
          />
          <Select
            placeholder="选择状态"
            allowClear
            style={{ width: 120 }}
            onChange={setStatusFilter}
          >
            <Option value="draft">草稿</Option>
            <Option value="published">已发布</Option>
            <Option value="archived">已归档</Option>
          </Select>
          <Select
            placeholder="选择分类"
            allowClear
            style={{ width: 120 }}
            onChange={setCategoryFilter}
          >
            <Option value="前端技术">前端技术</Option>
            <Option value="后端技术">后端技术</Option>
            <Option value="编程语言">编程语言</Option>
            <Option value="数据库">数据库</Option>
          </Select>
          <Button
            icon={<ReloadOutlined />}
            onClick={loadArticles}
            loading={loading}
          >
            刷新
          </Button>
        </div>
      </Card>

      {/* 文章表格 */}
      <Card>
        <Table
          columns={columns}
          dataSource={filteredArticles}
          rowKey="id"
          loading={loading}
          pagination={{
            total: filteredArticles.length,
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) =>
              `第 ${range[0]}-${range[1]} 条/共 ${total} 条`,
          }}
        />
      </Card>

      {/* 文章编辑模态框 */}
      <Modal
        title={editingArticle ? '编辑文章' : '新增文章'}
        open={isModalVisible}
        onCancel={() => {
          setIsModalVisible(false);
          setEditingArticle(null);
          form.resetFields();
        }}
        footer={null}
        width={800}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSave}
        >
          <Form.Item
            name="title"
            label="标题"
            rules={[{ required: true, message: '请输入文章标题' }]}
          >
            <Input placeholder="请输入文章标题" />
          </Form.Item>
          <Form.Item
            name="summary"
            label="摘要"
            rules={[{ required: true, message: '请输入文章摘要' }]}
          >
            <TextArea rows={3} placeholder="请输入文章摘要" />
          </Form.Item>
          <Form.Item
            name="content"
            label="内容"
            rules={[{ required: true, message: '请输入文章内容' }]}
          >
            <TextArea rows={8} placeholder="请输入文章内容" />
          </Form.Item>
          <div className="grid grid-cols-2 gap-4">
            <Form.Item
              name="author"
              label="作者"
              rules={[{ required: true, message: '请输入作者' }]}
            >
              <Input placeholder="请输入作者" />
            </Form.Item>
            <Form.Item
              name="category"
              label="分类"
              rules={[{ required: true, message: '请选择分类' }]}
            >
              <Select placeholder="请选择分类">
                <Option value="前端技术">前端技术</Option>
                <Option value="后端技术">后端技术</Option>
                <Option value="编程语言">编程语言</Option>
                <Option value="数据库">数据库</Option>
              </Select>
            </Form.Item>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Form.Item
              name="tags"
              label="标签"
              help="多个标签用逗号分隔"
            >
              <Input placeholder="请输入标签，用逗号分隔" />
            </Form.Item>
            <Form.Item
              name="status"
              label="状态"
              rules={[{ required: true, message: '请选择状态' }]}
            >
              <Select placeholder="请选择状态">
                <Option value="draft">草稿</Option>
                <Option value="published">已发布</Option>
                <Option value="archived">已归档</Option>
              </Select>
            </Form.Item>
          </div>
          <Form.Item
            name="cover"
            label="封面图片"
          >
            <Input placeholder="请输入封面图片URL" />
          </Form.Item>
          <Form.Item className="mb-0 text-right">
            <Space>
              <Button
                onClick={() => {
                  setIsModalVisible(false);
                  setEditingArticle(null);
                  form.resetFields();
                }}
              >
                取消
              </Button>
              <Button type="primary" htmlType="submit" loading={loading}>
                {editingArticle ? '更新' : '创建'}
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ArticleList;