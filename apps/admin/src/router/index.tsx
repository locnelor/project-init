import { Suspense, lazy } from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import Layout from '../layouts/MainLayout';
import { PageLoading } from '../components/Loading';

// 懒加载页面组件
const Dashboard = lazy(() => import('../pages/Dashboard'));
const UserList = lazy(() => import('../pages/User/UserList'));
const UserDetail = lazy(() => import('../pages/User/UserDetail'));
const ArticleList = lazy(() => import('../pages/Article/ArticleList'));
const ArticleDetail = lazy(() => import('../pages/Article/ArticleDetail'));
const SystemSettings = lazy(() => import('../pages/System/Settings'));
const Login = lazy(() => import('../pages/Login'));
const NotFound = lazy(() => import('../pages/NotFound'));

// 路由配置
const router = createBrowserRouter([
  {
    path: '/login',
    element: (
      <Suspense fallback={<PageLoading tip="登录页面加载中..." />}>
        <Login />
      </Suspense>
    ),
  },
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Navigate to="/dashboard" replace />,
      },
      {
        path: 'dashboard',
        element: (
          <Suspense fallback={<PageLoading tip="仪表板加载中..." />}>
            <Dashboard />
          </Suspense>
        ),
      },
      {
        path: 'users',
        children: [
          {
            index: true,
            element: (
              <Suspense fallback={<PageLoading tip="用户列表加载中..." />}>
                <UserList />
              </Suspense>
            ),
          },
          {
            path: ':id',
            element: (
              <Suspense fallback={<PageLoading tip="用户详情加载中..." />}>
                <UserDetail />
              </Suspense>
            ),
          },
        ],
      },
      {
        path: 'articles',
        children: [
          {
            index: true,
            element: (
              <Suspense fallback={<PageLoading tip="文章列表加载中..." />}>
                <ArticleList />
              </Suspense>
            ),
          },
          {
            path: ':id',
            element: (
              <Suspense fallback={<PageLoading tip="文章详情加载中..." />}>
                <ArticleDetail />
              </Suspense>
            ),
          },
        ],
      },
      {
        path: 'system',
        children: [
          {
            path: 'settings',
            element: (
              <Suspense fallback={<PageLoading tip="系统设置加载中..." />}>
                <SystemSettings />
              </Suspense>
            ),
          },
        ],
      },
    ],
  },
  {
    path: '*',
    element: (
      <Suspense fallback={<PageLoading />}>
        <NotFound />
      </Suspense>
    ),
  },
]);

export default router;