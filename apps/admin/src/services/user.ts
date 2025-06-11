import { User } from '../types';
import apiService from './api';

// 模拟用户数据
const mockUserData: User = {
  id: '1',
  name: '管理员',
  email: 'admin@example.com',
  avatar: 'https://avatars.githubusercontent.com/u/1?v=4',
  role: 'admin',
};

export const userService = {
  // 获取当前用户信息
  async getCurrentUser(): Promise<User> {
    try {
      // 实际项目中应该调用后端API
      // const response = await apiService.get<User>('/user/current');
      // return response.data;
      
      // 模拟API延迟
      await new Promise(resolve => setTimeout(resolve, 300));
      return mockUserData;
    } catch (error) {
      console.error('获取用户信息失败:', error);
      throw error;
    }
  },

  // 用户登录
  async login(email: string, password: string): Promise<{ token: string; user: User }> {
    try {
      // 实际项目中应该调用后端API
      // const response = await apiService.post<{ token: string; user: User }>('/auth/login', {
      //   email,
      //   password,
      // });
      // return response.data;
      
      // 模拟登录
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (email === 'admin@example.com' && password === '123456') {
        return {
          token: 'mock-jwt-token',
          user: mockUserData,
        };
      } else {
        throw new Error('用户名或密码错误');
      }
    } catch (error) {
      console.error('登录失败:', error);
      throw error;
    }
  },

  // 用户登出
  async logout(): Promise<void> {
    try {
      // 实际项目中应该调用后端API
      // await apiService.post('/auth/logout');
      
      // 清除本地存储
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    } catch (error) {
      console.error('登出失败:', error);
      throw error;
    }
  },
};

export default userService;