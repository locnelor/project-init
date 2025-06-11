import React, { useState } from 'react';
import { Form, Input, Button, Card, Checkbox, message, Divider } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../contexts/AppContext';
import { userService } from '../../services/user';

interface LoginForm {
  email: string;
  password: string;
  remember: boolean;
}

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { dispatch } = useApp();
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  // 处理登录
  const handleLogin = async (values: LoginForm) => {
    setLoading(true);
    try {
      const user = await userService.login(values.email, values.password);
      dispatch({ type: 'SET_USER', payload: user });
      message.success('登录成功');
      navigate('/');
    } catch (error) {
      message.error('登录失败，请检查用户名和密码');
    } finally {
      setLoading(false);
    }
  };

  // 快速登录
  const handleQuickLogin = (email: string, password: string) => {
    form.setFieldsValue({ email, password });
    handleLogin({ email, password, remember: false });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo和标题 */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-500 rounded-full mb-4">
            <span className="text-white text-2xl font-bold">A</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">管理后台系统</h1>
          <p className="text-gray-600">欢迎回来，请登录您的账户</p>
        </div>

        {/* 登录表单 */}
        <Card className="shadow-lg border-0">
          <Form
            form={form}
            name="login"
            onFinish={handleLogin}
            layout="vertical"
            size="large"
          >
            <Form.Item
              name="email"
              label="邮箱"
              rules={[
                { required: true, message: '请输入邮箱' },
                { type: 'email', message: '请输入有效的邮箱地址' },
              ]}
            >
              <Input
                prefix={<MailOutlined className="text-gray-400" />}
                placeholder="请输入邮箱"
              />
            </Form.Item>

            <Form.Item
              name="password"
              label="密码"
              rules={[{ required: true, message: '请输入密码' }]}
            >
              <Input.Password
                prefix={<LockOutlined className="text-gray-400" />}
                placeholder="请输入密码"
              />
            </Form.Item>

            <Form.Item>
              <div className="flex items-center justify-between">
                <Form.Item name="remember" valuePropName="checked" noStyle>
                  <Checkbox>记住我</Checkbox>
                </Form.Item>
                <Button type="link" className="p-0">
                  忘记密码？
                </Button>
              </div>
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                className="w-full h-12 text-lg font-medium"
              >
                登录
              </Button>
            </Form.Item>
          </Form>

          <Divider>快速登录</Divider>

          {/* 快速登录按钮 */}
          <div className="space-y-2">
            <Button
              block
              onClick={() => handleQuickLogin('admin@example.com', 'admin123')}
              className="h-10"
            >
              <UserOutlined /> 管理员登录
            </Button>
            <Button
              block
              onClick={() => handleQuickLogin('user@example.com', 'user123')}
              className="h-10"
            >
              <UserOutlined /> 普通用户登录
            </Button>
          </div>

          {/* 注册链接 */}
          <div className="text-center mt-6">
            <span className="text-gray-600">还没有账户？</span>
            <Button type="link" className="p-0 ml-1">
              立即注册
            </Button>
          </div>
        </Card>

        {/* 底部信息 */}
        <div className="text-center mt-8 text-gray-500 text-sm">
          <p>© 2024 管理后台系统. All rights reserved.</p>
          <div className="flex justify-center space-x-4 mt-2">
            <Button type="link" size="small" className="text-gray-500">
              服务条款
            </Button>
            <Button type="link" size="small" className="text-gray-500">
              隐私政策
            </Button>
            <Button type="link" size="small" className="text-gray-500">
              帮助中心
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;