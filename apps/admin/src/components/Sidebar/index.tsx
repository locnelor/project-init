import React, { useEffect, useState } from 'react';
import { Layout, Menu } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  DashboardOutlined,
  UserOutlined,
  FileTextOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import { useApp } from '../../contexts/AppContext';
import { menuService } from '../../services/menu';
import type { MenuItem as AntMenuItem } from 'antd';
import type { MenuItem } from '../../types';

const { Sider } = Layout;

// 图标映射
const iconMap: Record<string, React.ReactNode> = {
  DashboardOutlined: <DashboardOutlined />,
  UserOutlined: <UserOutlined />,
  FileTextOutlined: <FileTextOutlined />,
  SettingOutlined: <SettingOutlined />,
};

interface SidebarProps {
  className?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ className }) => {
  const { state, dispatch } = useApp();
  const { collapsed, menuList } = state;
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  const [openKeys, setOpenKeys] = useState<string[]>([]);

  // 加载菜单数据
  useEffect(() => {
    const loadMenus = async () => {
      try {
        dispatch({ type: 'SET_LOADING', payload: true });
        const menus = await menuService.getMenuList();
        dispatch({ type: 'SET_MENU_LIST', payload: menus });
      } catch (error) {
        console.error('加载菜单失败:', error);
      } finally {
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    };

    loadMenus();
  }, [dispatch]);

  // 根据当前路径设置选中的菜单
  useEffect(() => {
    const currentPath = location.pathname;
    
    // 查找匹配的菜单项
    const findMenuByPath = (menus: MenuItem[], path: string): MenuItem | null => {
      for (const menu of menus) {
        if (menu.path === path) {
          return menu;
        }
        if (menu.children) {
          const found = findMenuByPath(menu.children, path);
          if (found) {
            return found;
          }
        }
      }
      return null;
    };

    const currentMenu = findMenuByPath(menuList, currentPath);
    if (currentMenu) {
      setSelectedKeys([currentMenu.id]);
      
      // 如果是子菜单，展开父菜单
      if (currentMenu.parentId) {
        setOpenKeys(prev => [...new Set([...prev, currentMenu.parentId!])]);
      }
    }
  }, [location.pathname, menuList]);

  // 转换菜单数据格式
  const convertMenuItems = (menus: MenuItem[]): AntMenuItem[] => {
    return menus.map(menu => {
      const item: AntMenuItem = {
        key: menu.id,
        icon: menu.icon ? iconMap[menu.icon] : null,
        label: menu.title,
        onClick: menu.path ? () => navigate(menu.path!) : undefined,
      };

      if (menu.children && menu.children.length > 0) {
        item.children = convertMenuItems(menu.children);
      }

      return item;
    });
  };

  // 处理子菜单展开/收起
  const handleOpenChange = (keys: string[]) => {
    setOpenKeys(keys);
  };

  return (
    <Sider
      className={className}
      trigger={null}
      collapsible
      collapsed={collapsed}
      width={240}
      style={{
        overflow: 'auto',
        height: '100vh',
        position: 'fixed',
        left: 0,
        top: 0,
        bottom: 0,
        zIndex: 100,
      }}
    >
      {/* Logo区域 */}
      <div className="h-16 flex items-center justify-center border-b border-gray-200 bg-white">
        {collapsed ? (
          <div className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center">
            <span className="text-white font-bold text-sm">A</span>
          </div>
        ) : (
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center">
              <span className="text-white font-bold text-sm">A</span>
            </div>
            <span className="text-lg font-semibold text-gray-800">Admin</span>
          </div>
        )}
      </div>

      {/* 菜单 */}
      <Menu
        theme="light"
        mode="inline"
        selectedKeys={selectedKeys}
        openKeys={openKeys}
        onOpenChange={handleOpenChange}
        items={convertMenuItems(menuList)}
        style={{
          borderRight: 0,
          height: 'calc(100vh - 64px)',
          overflowY: 'auto',
        }}
      />
    </Sider>
  );
};

export default Sidebar;