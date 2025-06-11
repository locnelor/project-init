import React, { useState } from 'react';
import {
  Card,
  Form,
  Input,
  Button,
  Switch,
  Select,
  Upload,
  message,
  Divider,
  Space,
  Tabs,
  InputNumber,
  Radio,
  Checkbox,
} from 'antd';
import {
  SaveOutlined,
  UploadOutlined,
  ReloadOutlined,
} from '@ant-design/icons';
import type { UploadProps } from 'antd';

const { Option } = Select;
const { TextArea } = Input;
const { TabPane } = Tabs;

// 模拟系统设置数据
const mockSettings = {
  basic: {
    siteName: '管理后台系统',
    siteDescription: '一个现代化的管理后台系统',
    siteLogo: '',
    siteIcon: '',
    adminEmail: 'admin@example.com',
    timezone: 'Asia/Shanghai',
    language: 'zh-CN',
  },
  security: {
    enableTwoFactor: false,
    sessionTimeout: 30,
    maxLoginAttempts: 5,
    passwordMinLength: 8,
    requireSpecialChar: true,
    enableCaptcha: true,
    allowRegistration: false,
  },
  notification: {
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    notificationTypes: ['system', 'security', 'updates'],
    emailTemplate: 'default',
  },
  performance: {
    enableCache: true,
    cacheExpiration: 3600,
    enableCompression: true,
    maxFileSize: 10,
    enableCDN: false,
    cdnUrl: '',
  },
};

const SystemSettings: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [basicForm] = Form.useForm();
  const [securityForm] = Form.useForm();
  const [notificationForm] = Form.useForm();
  const [performanceForm] = Form.useForm();

  // 初始化表单数据
  React.useEffect(() => {
    basicForm.setFieldsValue(mockSettings.basic);
    securityForm.setFieldsValue(mockSettings.security);
    notificationForm.setFieldsValue(mockSettings.notification);
    performanceForm.setFieldsValue(mockSettings.performance);
  }, [basicForm, securityForm, notificationForm, performanceForm]);

  // 保存设置
  const handleSave = async (values: any, type: string) => {
    setLoading(true);
    try {
      // 模拟API调用
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log(`保存${type}设置:`, values);
      message.success('设置保存成功');
    } catch (error) {
      message.error('保存失败');
    } finally {
      setLoading(false);
    }
  };

  // 重置设置
  const handleReset = (form: any, type: string) => {
    form.resetFields();
    message.info(`${type}设置已重置`);
  };

  // 文件上传配置
  const uploadProps: UploadProps = {
    name: 'file',
    action: '/api/upload',
    headers: {
      authorization: 'authorization-text',
    },
    onChange(info) {
      if (info.file.status === 'done') {
        message.success(`${info.file.name} 文件上传成功`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} 文件上传失败`);
      }
    },
  };

  return (
    <div className="space-y-6">
      {/* 页面标题 */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800 mb-2">系统设置</h1>
        <p className="text-gray-600">配置系统的各项参数和选项</p>
      </div>

      {/* 设置标签页 */}
      <Card>
        <Tabs defaultActiveKey="basic" type="card">
          {/* 基本设置 */}
          <TabPane tab="基本设置" key="basic">
            <Form
              form={basicForm}
              layout="vertical"
              onFinish={(values) => handleSave(values, '基本')}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Form.Item
                  name="siteName"
                  label="网站名称"
                  rules={[{ required: true, message: '请输入网站名称' }]}
                >
                  <Input placeholder="请输入网站名称" />
                </Form.Item>
                <Form.Item
                  name="adminEmail"
                  label="管理员邮箱"
                  rules={[
                    { required: true, message: '请输入管理员邮箱' },
                    { type: 'email', message: '请输入有效的邮箱地址' },
                  ]}
                >
                  <Input placeholder="请输入管理员邮箱" />
                </Form.Item>
              </div>
              
              <Form.Item
                name="siteDescription"
                label="网站描述"
              >
                <TextArea rows={3} placeholder="请输入网站描述" />
              </Form.Item>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Form.Item
                  name="timezone"
                  label="时区"
                >
                  <Select placeholder="选择时区">
                    <Option value="Asia/Shanghai">Asia/Shanghai</Option>
                    <Option value="America/New_York">America/New_York</Option>
                    <Option value="Europe/London">Europe/London</Option>
                    <Option value="Asia/Tokyo">Asia/Tokyo</Option>
                  </Select>
                </Form.Item>
                <Form.Item
                  name="language"
                  label="默认语言"
                >
                  <Select placeholder="选择语言">
                    <Option value="zh-CN">简体中文</Option>
                    <Option value="en-US">English</Option>
                    <Option value="ja-JP">日本語</Option>
                  </Select>
                </Form.Item>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Form.Item
                  name="siteLogo"
                  label="网站Logo"
                >
                  <Upload {...uploadProps}>
                    <Button icon={<UploadOutlined />}>上传Logo</Button>
                  </Upload>
                </Form.Item>
                <Form.Item
                  name="siteIcon"
                  label="网站图标"
                >
                  <Upload {...uploadProps}>
                    <Button icon={<UploadOutlined />}>上传图标</Button>
                  </Upload>
                </Form.Item>
              </div>
              
              <Form.Item>
                <Space>
                  <Button type="primary" htmlType="submit" loading={loading} icon={<SaveOutlined />}>
                    保存设置
                  </Button>
                  <Button onClick={() => handleReset(basicForm, '基本')} icon={<ReloadOutlined />}>
                    重置
                  </Button>
                </Space>
              </Form.Item>
            </Form>
          </TabPane>

          {/* 安全设置 */}
          <TabPane tab="安全设置" key="security">
            <Form
              form={securityForm}
              layout="vertical"
              onFinish={(values) => handleSave(values, '安全')}
            >
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">登录安全</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Form.Item
                      name="enableTwoFactor"
                      label="启用双因素认证"
                      valuePropName="checked"
                    >
                      <Switch />
                    </Form.Item>
                    <Form.Item
                      name="enableCaptcha"
                      label="启用验证码"
                      valuePropName="checked"
                    >
                      <Switch />
                    </Form.Item>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Form.Item
                      name="sessionTimeout"
                      label="会话超时时间（分钟）"
                    >
                      <InputNumber min={5} max={1440} style={{ width: '100%' }} />
                    </Form.Item>
                    <Form.Item
                      name="maxLoginAttempts"
                      label="最大登录尝试次数"
                    >
                      <InputNumber min={3} max={10} style={{ width: '100%' }} />
                    </Form.Item>
                  </div>
                </div>
                
                <Divider />
                
                <div>
                  <h3 className="text-lg font-medium mb-4">密码策略</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Form.Item
                      name="passwordMinLength"
                      label="密码最小长度"
                    >
                      <InputNumber min={6} max={20} style={{ width: '100%' }} />
                    </Form.Item>
                    <Form.Item
                      name="requireSpecialChar"
                      label="要求特殊字符"
                      valuePropName="checked"
                    >
                      <Switch />
                    </Form.Item>
                  </div>
                </div>
                
                <Divider />
                
                <div>
                  <h3 className="text-lg font-medium mb-4">用户管理</h3>
                  <Form.Item
                    name="allowRegistration"
                    label="允许用户注册"
                    valuePropName="checked"
                  >
                    <Switch />
                  </Form.Item>
                </div>
              </div>
              
              <Form.Item>
                <Space>
                  <Button type="primary" htmlType="submit" loading={loading} icon={<SaveOutlined />}>
                    保存设置
                  </Button>
                  <Button onClick={() => handleReset(securityForm, '安全')} icon={<ReloadOutlined />}>
                    重置
                  </Button>
                </Space>
              </Form.Item>
            </Form>
          </TabPane>

          {/* 通知设置 */}
          <TabPane tab="通知设置" key="notification">
            <Form
              form={notificationForm}
              layout="vertical"
              onFinish={(values) => handleSave(values, '通知')}
            >
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">通知方式</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Form.Item
                      name="emailNotifications"
                      label="邮件通知"
                      valuePropName="checked"
                    >
                      <Switch />
                    </Form.Item>
                    <Form.Item
                      name="smsNotifications"
                      label="短信通知"
                      valuePropName="checked"
                    >
                      <Switch />
                    </Form.Item>
                    <Form.Item
                      name="pushNotifications"
                      label="推送通知"
                      valuePropName="checked"
                    >
                      <Switch />
                    </Form.Item>
                  </div>
                </div>
                
                <Divider />
                
                <div>
                  <h3 className="text-lg font-medium mb-4">通知类型</h3>
                  <Form.Item
                    name="notificationTypes"
                    label="启用的通知类型"
                  >
                    <Checkbox.Group>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Checkbox value="system">系统通知</Checkbox>
                        <Checkbox value="security">安全通知</Checkbox>
                        <Checkbox value="updates">更新通知</Checkbox>
                        <Checkbox value="marketing">营销通知</Checkbox>
                        <Checkbox value="maintenance">维护通知</Checkbox>
                        <Checkbox value="backup">备份通知</Checkbox>
                      </div>
                    </Checkbox.Group>
                  </Form.Item>
                </div>
                
                <Divider />
                
                <div>
                  <h3 className="text-lg font-medium mb-4">邮件模板</h3>
                  <Form.Item
                    name="emailTemplate"
                    label="默认邮件模板"
                  >
                    <Radio.Group>
                      <Radio value="default">默认模板</Radio>
                      <Radio value="modern">现代模板</Radio>
                      <Radio value="minimal">简约模板</Radio>
                    </Radio.Group>
                  </Form.Item>
                </div>
              </div>
              
              <Form.Item>
                <Space>
                  <Button type="primary" htmlType="submit" loading={loading} icon={<SaveOutlined />}>
                    保存设置
                  </Button>
                  <Button onClick={() => handleReset(notificationForm, '通知')} icon={<ReloadOutlined />}>
                    重置
                  </Button>
                </Space>
              </Form.Item>
            </Form>
          </TabPane>

          {/* 性能设置 */}
          <TabPane tab="性能设置" key="performance">
            <Form
              form={performanceForm}
              layout="vertical"
              onFinish={(values) => handleSave(values, '性能')}
            >
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">缓存设置</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Form.Item
                      name="enableCache"
                      label="启用缓存"
                      valuePropName="checked"
                    >
                      <Switch />
                    </Form.Item>
                    <Form.Item
                      name="cacheExpiration"
                      label="缓存过期时间（秒）"
                    >
                      <InputNumber min={60} max={86400} style={{ width: '100%' }} />
                    </Form.Item>
                  </div>
                </div>
                
                <Divider />
                
                <div>
                  <h3 className="text-lg font-medium mb-4">压缩设置</h3>
                  <Form.Item
                    name="enableCompression"
                    label="启用Gzip压缩"
                    valuePropName="checked"
                  >
                    <Switch />
                  </Form.Item>
                </div>
                
                <Divider />
                
                <div>
                  <h3 className="text-lg font-medium mb-4">文件上传</h3>
                  <Form.Item
                    name="maxFileSize"
                    label="最大文件大小（MB）"
                  >
                    <InputNumber min={1} max={100} style={{ width: '100%' }} />
                  </Form.Item>
                </div>
                
                <Divider />
                
                <div>
                  <h3 className="text-lg font-medium mb-4">CDN设置</h3>
                  <Form.Item
                    name="enableCDN"
                    label="启用CDN"
                    valuePropName="checked"
                  >
                    <Switch />
                  </Form.Item>
                  <Form.Item
                    name="cdnUrl"
                    label="CDN地址"
                  >
                    <Input placeholder="请输入CDN地址" />
                  </Form.Item>
                </div>
              </div>
              
              <Form.Item>
                <Space>
                  <Button type="primary" htmlType="submit" loading={loading} icon={<SaveOutlined />}>
                    保存设置
                  </Button>
                  <Button onClick={() => handleReset(performanceForm, '性能')} icon={<ReloadOutlined />}>
                    重置
                  </Button>
                </Space>
              </Form.Item>
            </Form>
          </TabPane>
        </Tabs>
      </Card>
    </div>
  );
};

export default SystemSettings;