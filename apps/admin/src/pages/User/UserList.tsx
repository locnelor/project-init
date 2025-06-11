import React, { useState, useEffect } from 'react';
import {
  Table,
  Card,
  Button,
  Input,
  Select,
  Space,
  Tag,
  Avatar,
  Popconfirm,
  message,
  Modal,
  Form,
  DatePicker,
} from 'antd';
import {
  PlusOutlined,
  SearchOutlined,
  EditOutlined,
  DeleteOutlined,
  UserOutlined,
  ReloadOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import type { ColumnsType } from 'antd/es/table';
import type { User } from '../../types';
import { TableLoading } from '../../components/Loading';

const { Search } = Input;
const { Option } = Select;
const { RangePicker } = DatePicker;

// 模拟用户数据
const mockUsers: User[] = [
  {
    id: '1',
    name: '张三',
    email: 'zhangsan@example.com',
    avatar: '',
    role: 'admin',
    status: 'active',
    createTime: '2024-01-01 10:00:00',
    lastLoginTime: '2024-01-15 09:30:00',
  },
  {
    id: '2',
    name: '李四',
    email: 'lisi@example.com',
    avatar: '',
    role: 'user',
    status: 'active',
    createTime: '2024-01-02 11:00:00',
    lastLoginTime: '2024-01-14 16:20:00',
  },
  {
    id: '3',
    name: '王五',
    email: 'wangwu@example.com',
    avatar: '',
    role: 'user',
    status: 'inactive',
    createTime: '2024-01-03 12:00:00',
    lastLoginTime: '2024-01-10 14:15:00',
  },
  {
    id: '4',
    name: '赵六',
    email: 'zhaoliu@example.com',
    avatar: '',
    role: 'editor',
    status: 'active',
    createTime: '2024-01-04 13:00:00',
    lastLoginTime: '2024-01-15 11:45:00',
  },
  {
    id: '5',
    name: '钱七',
    email: 'qianqi@example.com',
    avatar: '',
    role: 'user',
    status: 'banned',
    createTime: '2024-01-05 14:00:00',
    lastLoginTime: '2024-01-08 10:30:00',
  },
];

const UserList: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [searchText, setSearchText] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [roleFilter, setRoleFilter] = useState<string>('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [form] = Form.useForm();

  // 加载用户数据
  const loadUsers = async () => {
    setLoading(true);
    try {
      // 模拟API调用
      await new Promise(resolve => setTimeout(resolve, 1000));
      setUsers(mockUsers);
      setFilteredUsers(mockUsers);
    } catch (error) {
      message.error('加载用户数据失败');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  // 过滤用户数据
  useEffect(() => {
    let filtered = users;

    if (searchText) {
      filtered = filtered.filter(
        user =>
          user.name.toLowerCase().includes(searchText.toLowerCase()) ||
          user.email.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    if (statusFilter) {
      filtered = filtered.filter(user => user.status === statusFilter);
    }

    if (roleFilter) {
      filtered = filtered.filter(user => user.role === roleFilter);
    }

    setFilteredUsers(filtered);
  }, [users, searchText, statusFilter, roleFilter]);

  // 状态标签
  const getStatusTag = (status: string) => {
    const statusMap = {
      active: { color: 'green', text: '正常' },
      inactive: { color: 'orange', text: '未激活' },
      banned: { color: 'red', text: '已禁用' },
    };
    const config = statusMap[status as keyof typeof statusMap];
    return <Tag color={config.color}>{config.text}</Tag>;
  };

  // 角色标签
  const getRoleTag = (role: string) => {
    const roleMap = {
      admin: { color: 'purple', text: '管理员' },
      editor: { color: 'blue', text: '编辑' },
      user: { color: 'default', text: '用户' },
    };
    const config = roleMap[role as keyof typeof roleMap];
    return <Tag color={config.color}>{config.text}</Tag>;
  };

  // 删除用户
  const handleDelete = async (id: string) => {
    try {
      setLoading(true);
      // 模拟API调用
      await new Promise(resolve => setTimeout(resolve, 500));
      setUsers(prev => prev.filter(user => user.id !== id));
      message.success('删除成功');
    } catch (error) {
      message.error('删除失败');
    } finally {
      setLoading(false);
    }
  };

  // 编辑用户
  const handleEdit = (user: User) => {
    setEditingUser(user);
    form.setFieldsValue(user);
    setIsModalVisible(true);
  };

  // 保存用户
  const handleSave = async (values: any) => {
    try {
      setLoading(true);
      // 模拟API调用
      await new Promise(resolve => setTimeout(resolve, 500));
      
      if (editingUser) {
        // 更新用户
        setUsers(prev =>
          prev.map(user =>
            user.id === editingUser.id ? { ...user, ...values } : user
          )
        );
        message.success('更新成功');
      } else {
        // 新增用户
        const newUser: User = {
          ...values,
          id: Date.now().toString(),
          createTime: new Date().toLocaleString(),
          lastLoginTime: '-',
        };
        setUsers(prev => [newUser, ...prev]);
        message.success('添加成功');
      }
      
      setIsModalVisible(false);
      setEditingUser(null);
      form.resetFields();
    } catch (error) {
      message.error('保存失败');
    } finally {
      setLoading(false);
    }
  };

  // 表格列配置
  const columns: ColumnsType<User> = [
    {
      title: '用户',
      key: 'user',
      render: (_, record) => (
        <div className="flex items-center space-x-3">
          <Avatar
            size={40}
            src={record.avatar}
            icon={<UserOutlined />}
          />
          <div>
            <div className="font-medium">{record.name}</div>
            <div className="text-gray-500 text-sm">{record.email}</div>
          </div>
        </div>
      ),
    },
    {
      title: '角色',
      dataIndex: 'role',
      key: 'role',
      render: getRoleTag,
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: getStatusTag,
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
    },
    {
      title: '最后登录',
      dataIndex: 'lastLoginTime',
      key: 'lastLoginTime',
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          >
            编辑
          </Button>
          <Button
            type="link"
            onClick={() => navigate(`/users/${record.id}`)}
          >
            详情
          </Button>
          <Popconfirm
            title="确定要删除这个用户吗？"
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
    },
  ];

  return (
    <div className="space-y-6">
      {/* 页面标题 */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">用户管理</h1>
          <p className="text-gray-600">管理系统用户信息</p>
        </div>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => {
            setEditingUser(null);
            form.resetFields();
            setIsModalVisible(true);
          }}
        >
          新增用户
        </Button>
      </div>

      {/* 搜索和过滤 */}
      <Card>
        <div className="flex flex-wrap gap-4 items-center">
          <Search
            placeholder="搜索用户名或邮箱"
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
            <Option value="active">正常</Option>
            <Option value="inactive">未激活</Option>
            <Option value="banned">已禁用</Option>
          </Select>
          <Select
            placeholder="选择角色"
            allowClear
            style={{ width: 120 }}
            onChange={setRoleFilter}
          >
            <Option value="admin">管理员</Option>
            <Option value="editor">编辑</Option>
            <Option value="user">用户</Option>
          </Select>
          <Button
            icon={<ReloadOutlined />}
            onClick={loadUsers}
            loading={loading}
          >
            刷新
          </Button>
        </div>
      </Card>

      {/* 用户表格 */}
      <Card>
        <Table
          columns={columns}
          dataSource={filteredUsers}
          rowKey="id"
          loading={loading}
          pagination={{
            total: filteredUsers.length,
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) =>
              `第 ${range[0]}-${range[1]} 条/共 ${total} 条`,
          }}
        />
      </Card>

      {/* 用户编辑模态框 */}
      <Modal
        title={editingUser ? '编辑用户' : '新增用户'}
        open={isModalVisible}
        onCancel={() => {
          setIsModalVisible(false);
          setEditingUser(null);
          form.resetFields();
        }}
        footer={null}
        width={600}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSave}
        >
          <Form.Item
            name="name"
            label="用户名"
            rules={[{ required: true, message: '请输入用户名' }]}
          >
            <Input placeholder="请输入用户名" />
          </Form.Item>
          <Form.Item
            name="email"
            label="邮箱"
            rules={[
              { required: true, message: '请输入邮箱' },
              { type: 'email', message: '请输入有效的邮箱地址' },
            ]}
          >
            <Input placeholder="请输入邮箱" />
          </Form.Item>
          <Form.Item
            name="role"
            label="角色"
            rules={[{ required: true, message: '请选择角色' }]}
          >
            <Select placeholder="请选择角色">
              <Option value="admin">管理员</Option>
              <Option value="editor">编辑</Option>
              <Option value="user">用户</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="status"
            label="状态"
            rules={[{ required: true, message: '请选择状态' }]}
          >
            <Select placeholder="请选择状态">
              <Option value="active">正常</Option>
              <Option value="inactive">未激活</Option>
              <Option value="banned">已禁用</Option>
            </Select>
          </Form.Item>
          <Form.Item className="mb-0 text-right">
            <Space>
              <Button
                onClick={() => {
                  setIsModalVisible(false);
                  setEditingUser(null);
                  form.resetFields();
                }}
              >
                取消
              </Button>
              <Button type="primary" htmlType="submit" loading={loading}>
                {editingUser ? '更新' : '创建'}
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default UserList;