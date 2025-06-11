import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Card,
  Descriptions,
  Avatar,
  Tag,
  Button,
  Space,
  Tabs,
  Table,
  Timeline,
  Statistic,
  Row,
  Col,
  message,
} from 'antd';
import {
  UserOutlined,
  EditOutlined,
  ArrowLeftOutlined,
  MailOutlined,
  PhoneOutlined,
  CalendarOutlined,
} from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import type { User } from '../../types';
import { ContentLoading } from '../../components/Loading';

const { TabPane } = Tabs;

// 模拟用户详细信息
const mockUserDetail = {
  id: '1',
  name: '张三',
  email: 'zhangsan@example.com',
  phone: '13800138000',
  avatar: '',
  role: 'admin',
  status: 'active',
  createTime: '2024-01-01 10:00:00',
  lastLoginTime: '2024-01-15 09:30:00',
  loginCount: 156,
  department: '技术部',
  position: '高级开发工程师',
  address: '北京市朝阳区xxx街道xxx号',
  bio: '资深前端开发工程师，专注于React和Vue技术栈，有丰富的项目经验。',
};

// 模拟用户活动记录
const mockActivities = [
  {
    key: '1',
    action: '登录系统',
    time: '2024-01-15 09:30:00',
    ip: '192.168.1.100',
    device: 'Chrome 120.0 / Windows 10',
  },
  {
    key: '2',
    action: '修改个人信息',
    time: '2024-01-14 16:20:00',
    ip: '192.168.1.100',
    device: 'Chrome 120.0 / Windows 10',
  },
  {
    key: '3',
    action: '创建文章',
    time: '2024-01-14 15:10:00',
    ip: '192.168.1.100',
    device: 'Chrome 120.0 / Windows 10',
  },
  {
    key: '4',
    action: '登录系统',
    time: '2024-01-14 09:00:00',
    ip: '192.168.1.100',
    device: 'Chrome 120.0 / Windows 10',
  },
];

// 模拟操作日志
const mockLogs = [
  {
    time: '2024-01-15 09:30:00',
    action: '用户登录',
    detail: '用户通过邮箱登录系统',
    status: 'success',
  },
  {
    time: '2024-01-14 16:20:00',
    action: '修改资料',
    detail: '用户更新了个人头像和简介',
    status: 'info',
  },
  {
    time: '2024-01-14 15:10:00',
    action: '发布内容',
    detail: '用户发布了新文章《React最佳实践》',
    status: 'success',
  },
  {
    time: '2024-01-13 10:30:00',
    action: '权限变更',
    detail: '管理员将用户角色从普通用户提升为管理员',
    status: 'warning',
  },
];

const UserDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [userDetail, setUserDetail] = useState<any>(null);
  const [activities, setActivities] = useState<any[]>([]);
  const [logs, setLogs] = useState<any[]>([]);

  // 加载用户详情
  const loadUserDetail = async () => {
    setLoading(true);
    try {
      // 模拟API调用
      await new Promise(resolve => setTimeout(resolve, 1000));
      setUserDetail(mockUserDetail);
      setActivities(mockActivities);
      setLogs(mockLogs);
    } catch (error) {
      message.error('加载用户详情失败');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      loadUserDetail();
    }
  }, [id]);

  if (loading || !userDetail) {
    return <ContentLoading tip="加载用户详情中..." />;
  }

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

  // 活动记录表格列
  const activityColumns: ColumnsType<any> = [
    {
      title: '操作',
      dataIndex: 'action',
      key: 'action',
    },
    {
      title: '时间',
      dataIndex: 'time',
      key: 'time',
    },
    {
      title: 'IP地址',
      dataIndex: 'ip',
      key: 'ip',
    },
    {
      title: '设备信息',
      dataIndex: 'device',
      key: 'device',
    },
  ];

  return (
    <div className="space-y-6">
      {/* 页面头部 */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button
            icon={<ArrowLeftOutlined />}
            onClick={() => navigate('/users')}
          >
            返回列表
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-gray-800 mb-1">用户详情</h1>
            <p className="text-gray-600">查看和管理用户信息</p>
          </div>
        </div>
        <Button
          type="primary"
          icon={<EditOutlined />}
          onClick={() => message.info('编辑功能开发中...')}
        >
          编辑用户
        </Button>
      </div>

      {/* 用户基本信息 */}
      <Card>
        <div className="flex items-start space-x-6">
          <Avatar
            size={120}
            src={userDetail.avatar}
            icon={<UserOutlined />}
            className="flex-shrink-0"
          />
          <div className="flex-1">
            <div className="flex items-center space-x-4 mb-4">
              <h2 className="text-xl font-semibold">{userDetail.name}</h2>
              {getRoleTag(userDetail.role)}
              {getStatusTag(userDetail.status)}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
              <div className="flex items-center space-x-2">
                <MailOutlined className="text-gray-400" />
                <span>{userDetail.email}</span>
              </div>
              <div className="flex items-center space-x-2">
                <PhoneOutlined className="text-gray-400" />
                <span>{userDetail.phone}</span>
              </div>
              <div className="flex items-center space-x-2">
                <CalendarOutlined className="text-gray-400" />
                <span>注册于 {userDetail.createTime}</span>
              </div>
            </div>
            {userDetail.bio && (
              <div className="mt-4">
                <p className="text-gray-600">{userDetail.bio}</p>
              </div>
            )}
          </div>
        </div>
      </Card>

      {/* 统计信息 */}
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={8}>
          <Card>
            <Statistic
              title="登录次数"
              value={userDetail.loginCount}
              suffix="次"
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card>
            <Statistic
              title="最后登录"
              value={userDetail.lastLoginTime}
              valueStyle={{ color: '#52c41a' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card>
            <Statistic
              title="账户状态"
              value={userDetail.status === 'active' ? '正常' : '异常'}
              valueStyle={{ 
                color: userDetail.status === 'active' ? '#52c41a' : '#f5222d' 
              }}
            />
          </Card>
        </Col>
      </Row>

      {/* 详细信息标签页 */}
      <Card>
        <Tabs defaultActiveKey="info">
          <TabPane tab="详细信息" key="info">
            <Descriptions column={2} bordered>
              <Descriptions.Item label="用户ID">{userDetail.id}</Descriptions.Item>
              <Descriptions.Item label="用户名">{userDetail.name}</Descriptions.Item>
              <Descriptions.Item label="邮箱">{userDetail.email}</Descriptions.Item>
              <Descriptions.Item label="手机号">{userDetail.phone}</Descriptions.Item>
              <Descriptions.Item label="角色">{getRoleTag(userDetail.role)}</Descriptions.Item>
              <Descriptions.Item label="状态">{getStatusTag(userDetail.status)}</Descriptions.Item>
              <Descriptions.Item label="部门">{userDetail.department}</Descriptions.Item>
              <Descriptions.Item label="职位">{userDetail.position}</Descriptions.Item>
              <Descriptions.Item label="地址" span={2}>{userDetail.address}</Descriptions.Item>
              <Descriptions.Item label="注册时间">{userDetail.createTime}</Descriptions.Item>
              <Descriptions.Item label="最后登录">{userDetail.lastLoginTime}</Descriptions.Item>
              <Descriptions.Item label="个人简介" span={2}>{userDetail.bio}</Descriptions.Item>
            </Descriptions>
          </TabPane>
          
          <TabPane tab="活动记录" key="activity">
            <Table
              columns={activityColumns}
              dataSource={activities}
              pagination={{
                pageSize: 10,
                showSizeChanger: true,
                showQuickJumper: true,
              }}
            />
          </TabPane>
          
          <TabPane tab="操作日志" key="logs">
            <Timeline>
              {logs.map((log, index) => (
                <Timeline.Item
                  key={index}
                  color={log.status === 'success' ? 'green' : log.status === 'warning' ? 'orange' : 'blue'}
                >
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{log.action}</span>
                      <span className="text-gray-500 text-sm">{log.time}</span>
                    </div>
                    <p className="text-gray-600 text-sm">{log.detail}</p>
                  </div>
                </Timeline.Item>
              ))}
            </Timeline>
          </TabPane>
        </Tabs>
      </Card>
    </div>
  );
};

export default UserDetail;