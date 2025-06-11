import { MenuItem } from '../types';
import apiService from './api';

// 模拟菜单数据
const mockMenuData: MenuItem[] = [
  {
    id: '1',
    title: '仪表盘',
    path: '/dashboard',
    icon: 'DashboardOutlined',
  },
  {
    id: '2',
    title: '用户管理',
    icon: 'UserOutlined',
    children: [
      {
        id: '2-1',
        title: '用户列表',
        path: '/users',
        parentId: '2',
      },
      {
        id: '2-2',
        title: '角色管理',
        path: '/roles',
        parentId: '2',
      },
    ],
  },
  {
    id: '3',
    title: '内容管理',
    icon: 'FileTextOutlined',
    children: [
      {
        id: '3-1',
        title: '文章管理',
        path: '/articles',
        parentId: '3',
      },
      {
        id: '3-2',
        title: '分类管理',
        path: '/categories',
        parentId: '3',
      },
    ],
  },
  {
    id: '4',
    title: '系统设置',
    icon: 'SettingOutlined',
    children: [
      {
        id: '4-1',
        title: '基础设置',
        path: '/settings/basic',
        parentId: '4',
      },
      {
        id: '4-2',
        title: '权限设置',
        path: '/settings/permissions',
        parentId: '4',
      },
    ],
  },
];

export const menuService = {
  // 获取菜单列表
  async getMenuList(): Promise<MenuItem[]> {
    try {
      // 实际项目中应该调用后端API
      // const response = await apiService.get<MenuItem[]>('/menus');
      // return response.data;
      
      // 模拟API延迟
      await new Promise(resolve => setTimeout(resolve, 500));
      return mockMenuData;
    } catch (error) {
      console.error('获取菜单失败:', error);
      return [];
    }
  },
};

export default menuService;