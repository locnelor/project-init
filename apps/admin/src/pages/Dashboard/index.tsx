import React from 'react';
import { Row, Col, Card, Statistic, Progress, Table, Tag } from 'antd';
import {
  UserOutlined,
  ShoppingCartOutlined,
  DollarOutlined,
  EyeOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
} from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';

// 统计卡片数据
const statsData = [
  {
    title: '总用户数',
    value: 11280,
    prefix: <UserOutlined />,
    suffix: '人',
    precision: 0,
    valueStyle: { color: '#3f8600' },
    trend: { value: 11.28, isUp: true },
  },
  {
    title: '总订单数',
    value: 8846,
    prefix: <ShoppingCartOutlined />,
    suffix: '单',
    precision: 0,
    valueStyle: { color: '#cf1322' },
    trend: { value: 6.47, isUp: false },
  },
  {
    title: '总收入',
    value: 112893,
    prefix: <DollarOutlined />,
    suffix: '元',
    precision: 2,
    valueStyle: { color: '#1890ff' },
    trend: { value: 15.32, isUp: true },
  },
  {
    title: '页面浏览量',
    value: 98765,
    prefix: <EyeOutlined />,
    suffix: '次',
    precision: 0,
    valueStyle: { color: '#722ed1' },
    trend: { value: 8.91, isUp: true },
  },
];

// 最近订单数据
interface RecentOrder {
  key: string;
  orderNo: string;
  customer: string;
  amount: number;
  status: 'pending' | 'completed' | 'cancelled';
  createTime: string;
}

const recentOrders: RecentOrder[] = [
  {
    key: '1',
    orderNo: 'ORD-2024-001',
    customer: '张三',
    amount: 299.00,
    status: 'completed',
    createTime: '2024-01-15 10:30:00',
  },
  {
    key: '2',
    orderNo: 'ORD-2024-002',
    customer: '李四',
    amount: 599.00,
    status: 'pending',
    createTime: '2024-01-15 11:20:00',
  },
  {
    key: '3',
    orderNo: 'ORD-2024-003',
    customer: '王五',
    amount: 199.00,
    status: 'cancelled',
    createTime: '2024-01-15 12:15:00',
  },
  {
    key: '4',
    orderNo: 'ORD-2024-004',
    customer: '赵六',
    amount: 899.00,
    status: 'completed',
    createTime: '2024-01-15 13:45:00',
  },
  {
    key: '5',
    orderNo: 'ORD-2024-005',
    customer: '钱七',
    amount: 399.00,
    status: 'pending',
    createTime: '2024-01-15 14:20:00',
  },
];

const Dashboard: React.FC = () => {
  // 订单状态标签
  const getStatusTag = (status: RecentOrder['status']) => {
    const statusMap = {
      pending: { color: 'orange', text: '待处理' },
      completed: { color: 'green', text: '已完成' },
      cancelled: { color: 'red', text: '已取消' },
    };
    const { color, text } = statusMap[status];
    return <Tag color={color}>{text}</Tag>;
  };

  // 表格列配置
  const columns: ColumnsType<RecentOrder> = [
    {
      title: '订单号',
      dataIndex: 'orderNo',
      key: 'orderNo',
    },
    {
      title: '客户',
      dataIndex: 'customer',
      key: 'customer',
    },
    {
      title: '金额',
      dataIndex: 'amount',
      key: 'amount',
      render: (amount: number) => `¥${amount.toFixed(2)}`,
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
  ];

  return (
    <div className="space-y-6">
      {/* 页面标题 */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800 mb-2">仪表板</h1>
        <p className="text-gray-600">欢迎回来，这里是您的数据概览</p>
      </div>

      {/* 统计卡片 */}
      <Row gutter={[16, 16]}>
        {statsData.map((stat, index) => (
          <Col xs={24} sm={12} lg={6} key={index}>
            <Card>
              <Statistic
                title={stat.title}
                value={stat.value}
                precision={stat.precision}
                valueStyle={stat.valueStyle}
                prefix={stat.prefix}
                suffix={stat.suffix}
              />
              <div className="mt-2 flex items-center text-sm">
                {stat.trend.isUp ? (
                  <ArrowUpOutlined className="text-green-500 mr-1" />
                ) : (
                  <ArrowDownOutlined className="text-red-500 mr-1" />
                )}
                <span className={stat.trend.isUp ? 'text-green-500' : 'text-red-500'}>
                  {stat.trend.value}%
                </span>
                <span className="text-gray-500 ml-1">较上月</span>
              </div>
            </Card>
          </Col>
        ))}
      </Row>

      {/* 图表和数据 */}
      <Row gutter={[16, 16]}>
        {/* 销售趋势 */}
        <Col xs={24} lg={16}>
          <Card title="最近订单" className="h-full">
            <Table
              columns={columns}
              dataSource={recentOrders}
              pagination={false}
              size="small"
            />
          </Card>
        </Col>

        {/* 进度统计 */}
        <Col xs={24} lg={8}>
          <Card title="完成进度" className="h-full">
            <div className="space-y-6">
              <div>
                <div className="flex justify-between mb-2">
                  <span>月度目标</span>
                  <span>75%</span>
                </div>
                <Progress percent={75} status="active" />
              </div>
              
              <div>
                <div className="flex justify-between mb-2">
                  <span>季度目标</span>
                  <span>60%</span>
                </div>
                <Progress percent={60} status="active" strokeColor="#52c41a" />
              </div>
              
              <div>
                <div className="flex justify-between mb-2">
                  <span>年度目标</span>
                  <span>45%</span>
                </div>
                <Progress percent={45} status="active" strokeColor="#1890ff" />
              </div>
              
              <div>
                <div className="flex justify-between mb-2">
                  <span>客户满意度</span>
                  <span>92%</span>
                </div>
                <Progress percent={92} status="active" strokeColor="#722ed1" />
              </div>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;