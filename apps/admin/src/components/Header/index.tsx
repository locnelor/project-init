import React from 'react';
import { Layout, Button, Dropdown, Avatar, Badge, Space, Switch } from 'antd';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  BellOutlined,
  SettingOutlined,
  UserOutlined,
  LogoutOutlined,
  GlobalOutlined,
} from '@ant-design/icons';
import { useApp } from '../../contexts/AppContext';
import { userService } from '../../services/user';
import type { MenuProps } from 'antd';

const { Header: AntHeader } = Layout;

interface HeaderProps {
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ className }) => {
  const { state, dispatch } = useApp();
  const { user, collapsed, theme, language } = state;

  // 切换侧边栏
  const toggleSidebar = () => {
    dispatch({ type: 'TOGGLE_SIDEBAR' });
  };

  // 切换主题
  const toggleTheme = (checked: boolean) => {
    dispatch({ type: 'SET_THEME', payload: checked ? 'dark' : 'light' });
  };

  // 切换语言
  const toggleLanguage = () => {
    const newLanguage = language === 'zh' ? 'en' : 'zh';
    dispatch({ type: 'SET_LANGUAGE', payload: newLanguage });
  };

  // 用户菜单
  const userMenuItems: MenuProps['items'] = [
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: '个人中心',
    },
    {
      key: 'settings',
      icon: <SettingOutlined />,
      label: '个人设置',
    },
    {
      type: 'divider',
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: '退出登录',
      onClick: async () => {
        try {
          await userService.logout();
          dispatch({ type: 'SET_USER', payload: null });
          window.location.href = '/login';
        } catch (error) {
          console.error('退出登录失败:', error);
        }
      },
    },
  ];

  // 通知菜单
  const notificationItems: MenuProps['items'] = [
    {
      key: '1',
      label: '系统通知',
      children: [
        {
          key: '1-1',
          label: '您有新的消息',
        },
        {
          key: '1-2',
          label: '系统维护通知',
        },
      ],
    },
  ];

  return (
    <AntHeader
      className={`${className} flex items-center justify-between px-4 bg-white border-b border-gray-200 shadow-sm`}
      style={{ padding: '0 16px', height: '64px' }}
    >
      {/* 左侧 */}
      <div className="flex items-center space-x-4">
        <Button
          type="text"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={toggleSidebar}
          className="text-lg"
        />
        <h1 className="text-xl font-semibold text-gray-800 m-0">
          管理后台系统
        </h1>
      </div>

      {/* 右侧 */}
      <div className="flex items-center space-x-4">
        {/* 语言切换 */}
        <Button
          type="text"
          icon={<GlobalOutlined />}
          onClick={toggleLanguage}
          className="text-gray-600 hover:text-blue-500"
        >
          {language === 'zh' ? '中文' : 'EN'}
        </Button>

        {/* 主题切换 */}
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-600">🌞</span>
          <Switch
            checked={theme === 'dark'}
            onChange={toggleTheme}
            size="small"
          />
          <span className="text-sm text-gray-600">🌙</span>
        </div>

        {/* 通知 */}
        <Dropdown
          menu={{ items: notificationItems }}
          placement="bottomRight"
          trigger={['click']}
        >
          <Badge count={2} size="small">
            <Button
              type="text"
              icon={<BellOutlined />}
              className="text-gray-600 hover:text-blue-500"
            />
          </Badge>
        </Dropdown>

        {/* 设置 */}
        <Button
          type="text"
          icon={<SettingOutlined />}
          className="text-gray-600 hover:text-blue-500"
        />

        {/* 用户信息 */}
        <Dropdown
          menu={{ items: userMenuItems }}
          placement="bottomRight"
          trigger={['click']}
        >
          <div className="flex items-center space-x-2 cursor-pointer hover:bg-gray-50 px-2 py-1 rounded">
            <Avatar
              size="small"
              src={user?.avatar}
              icon={<UserOutlined />}
            />
            <span className="text-sm text-gray-700">{user?.name || '用户'}</span>
          </div>
        </Dropdown>
      </div>
    </AntHeader>
  );
};

export default Header;