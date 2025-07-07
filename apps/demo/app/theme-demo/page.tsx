"use client"
import React from 'react';
import ThemeDemo from '../../components/ThemeDemo';


const ThemeDemoPage = () => {
  return (
    <div className="max-w-full">
      <div className="mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">主题样式系统</h1>
        <div className="h-1 w-20 bg-blue-600 dark:bg-blue-500 rounded-full mb-6"></div>
        <p className="text-gray-600 dark:text-gray-300 max-w-2xl">
          这个页面展示了使用TailwindCSS和CSS变量实现的主题样式系统，包括背景色和文本色的设置，以及默认主题和暗色主题的切换。
        </p>
      </div>
      
      <ThemeDemo />
    </div>
  );
};

export default ThemeDemoPage;