import React from 'react';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

interface LoadingProps {
  size?: 'small' | 'default' | 'large';
  tip?: string;
  spinning?: boolean;
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

const Loading: React.FC<LoadingProps> = ({
  size = 'default',
  tip = '加载中...',
  spinning = true,
  children,
  className,
  style,
}) => {
  const antIcon = <LoadingOutlined style={{ fontSize: size === 'large' ? 24 : size === 'small' ? 14 : 18 }} spin />;

  if (children) {
    return (
      <Spin
        indicator={antIcon}
        spinning={spinning}
        tip={tip}
        className={className}
        style={style}
      >
        {children}
      </Spin>
    );
  }

  return (
    <div
      className={`flex items-center justify-center ${className || ''}`}
      style={{
        minHeight: '200px',
        ...style,
      }}
    >
      <Spin
        indicator={antIcon}
        spinning={spinning}
        tip={tip}
        size={size}
      />
    </div>
  );
};

// 页面级加载组件
export const PageLoading: React.FC<{ tip?: string }> = ({ tip = '页面加载中...' }) => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <Spin
        indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}
        tip={tip}
        size="large"
      />
    </div>
  );
};

// 内容加载组件
export const ContentLoading: React.FC<{ tip?: string; height?: string | number }> = ({ 
  tip = '内容加载中...', 
  height = '400px' 
}) => {
  return (
    <div 
      className="flex items-center justify-center bg-white rounded-lg border"
      style={{ height }}
    >
      <Spin
        indicator={<LoadingOutlined style={{ fontSize: 20 }} spin />}
        tip={tip}
      />
    </div>
  );
};

// 表格加载组件
export const TableLoading: React.FC<{ tip?: string }> = ({ tip = '数据加载中...' }) => {
  return (
    <div className="flex items-center justify-center py-16">
      <Spin
        indicator={<LoadingOutlined style={{ fontSize: 18 }} spin />}
        tip={tip}
      />
    </div>
  );
};

export default Loading;