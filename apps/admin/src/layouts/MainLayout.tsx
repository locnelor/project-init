import React, { useEffect } from 'react';
import { Layout } from 'antd';
import { Outlet, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import { useApp } from '../contexts/AppContext';
import { userService } from '../services/user';
import { PageLoading } from '../components/Loading';

const { Content } = Layout;

const MainLayout: React.FC = () => {
  const { state, dispatch } = useApp();
  const { user, collapsed, loading } = state;
  const navigate = useNavigate();

  // 初始化用户信息
  useEffect(() => {
    const initUser = async () => {
      try {
        dispatch({ type: 'SET_LOADING', payload: true });
        const currentUser = await userService.getCurrentUser();
        dispatch({ type: 'SET_USER', payload: currentUser });
      } catch (error) {
        console.error('获取用户信息失败:', error);
        // 如果获取用户信息失败，跳转到登录页
        navigate('/login');
      } finally {
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    };

    initUser();
  }, [dispatch, navigate]);

  // 如果正在加载或用户信息为空，显示加载页面
  if (loading || !user) {
    return <PageLoading tip="系统初始化中..." />;
  }

  return (
    <Layout className="min-h-screen">
      {/* 侧边栏 */}
      <Sidebar />
      
      {/* 主内容区域 */}
      <Layout
        style={{
          marginLeft: collapsed ? 80 : 240,
          transition: 'margin-left 0.2s',
        }}
      >
        {/* 顶部导航 */}
        <Header />
        
        {/* 内容区域 */}
        <Content
          style={{
            margin: '16px',
            padding: '24px',
            background: '#fff',
            borderRadius: '8px',
            minHeight: 'calc(100vh - 112px)',
            overflow: 'auto',
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;