'use client';

import React from 'react';

const ThemeDemo: React.FC = () => {

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">主题样式演示</h2>
        {/* <button
          onClick={toggleTheme}
          className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition-colors"
        >
          切换主题 (当前: {isDark ? '暗色' : '亮色'})
        </button> */}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 背景色演示 */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">背景色</h3>
          <div className="space-y-2">
            <div className="p-4 rounded-md bg-current">
              <p className="text-current font-medium">bg-current / text-current</p>
            </div>
            <div className="p-4 rounded-md bg-background">
              <p className="text-background font-medium">bg-background / text-background</p>
            </div>
            <div className="p-4 rounded-md bg-base-100">
              <p className="text-base-100 font-medium">bg-base-100 / text-base-100</p>
            </div>
            <div className="p-4 rounded-md bg-base-200">
              <p className="text-base-200 font-medium">bg-base-200 / text-base-200</p>
            </div>
            <div className="p-4 rounded-md bg-base-300">
              <p className="text-base-300 font-medium">bg-base-300 / text-base-300</p>
            </div>
            <div className="p-4 rounded-md bg-base-400">
              <p className="text-base-400 font-medium">bg-base-400 / text-base-400</p>
            </div>
            <div className="p-4 rounded-md bg-base-500">
              <p className="text-base-500 font-medium">bg-base-500 / text-base-500</p>
            </div>
            <div className="p-4 rounded-md bg-base-600">
              <p className="text-base-600 font-medium">bg-base-600 / text-base-600</p>
            </div>
            <div className="p-4 rounded-md bg-base-700">
              <p className="text-base-700 font-medium">bg-base-700 / text-base-700</p>
            </div>
            <div className="p-4 rounded-md bg-base-800">
              <p className="text-base-800 font-medium">bg-base-800 / text-base-800</p>
            </div>
            <div className="p-4 rounded-md bg-base-900">
              <p className="text-base-900 font-medium">bg-base-900 / text-base-900</p>
            </div>
          </div>
        </div>

        {/* 文本色演示 */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">文本色</h3>
          <div className="space-y-2">
            <div className="p-4 rounded-md border border-gray-200 dark:border-gray-700">
              <p className="text-current font-medium">text-current</p>
              <p className="text-sm text-current">当前主题的文本颜色</p>
            </div>
            <div className="p-4 rounded-md border border-gray-200 dark:border-gray-700">
              <p className="text-background font-medium">text-background</p>
              <p className="text-sm text-background">与当前主题相反的文本颜色</p>
            </div>
            <div className="p-4 rounded-md border border-gray-200 dark:border-gray-700">
              <p className="text-base-100 font-medium">text-base-100</p>
              <p className="text-sm text-base-100">基础文本颜色 100</p>
            </div>
            <div className="p-4 rounded-md border border-gray-200 dark:border-gray-700">
              <p className="text-base-200 font-medium">text-base-200</p>
              <p className="text-sm text-base-200">基础文本颜色 200</p>
            </div>
            <div className="p-4 rounded-md border border-gray-200 dark:border-gray-700">
              <p className="text-base-300 font-medium">text-base-300</p>
              <p className="text-sm text-base-300">基础文本颜色 300</p>
            </div>
            <div className="p-4 rounded-md border border-gray-200 dark:border-gray-700">
              <p className="text-base-400 font-medium">text-base-400</p>
              <p className="text-sm text-base-400">基础文本颜色 400</p>
            </div>
            <div className="p-4 rounded-md border border-gray-200 dark:border-gray-700">
              <p className="text-base-500 font-medium">text-base-500</p>
              <p className="text-sm text-base-500">基础文本颜色 500</p>
            </div>
            <div className="p-4 rounded-md border border-gray-200 dark:border-gray-700">
              <p className="text-base-600 font-medium">text-base-600</p>
              <p className="text-sm text-base-600">基础文本颜色 600</p>
            </div>
            <div className="p-4 rounded-md border border-gray-200 dark:border-gray-700">
              <p className="text-base-700 font-medium">text-base-700</p>
              <p className="text-sm text-base-700">基础文本颜色 700</p>
            </div>
            <div className="p-4 rounded-md border border-gray-200 dark:border-gray-700">
              <p className="text-base-800 font-medium">text-base-800</p>
              <p className="text-sm text-base-800">基础文本颜色 800</p>
            </div>
            <div className="p-4 rounded-md border border-gray-200 dark:border-gray-700">
              <p className="text-base-900 font-medium">text-base-900</p>
              <p className="text-sm text-base-900">基础文本颜色 900</p>
            </div>
          </div>
        </div>
      </div>

      {/* 组合使用示例 */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold">组合使用示例</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-6 rounded-lg bg-current shadow-md">
            <h4 className="text-background text-lg font-bold mb-2">主题卡片 1</h4>
            <p className="text-base-100">使用当前主题背景色和对比文本色</p>
          </div>
          <div className="p-6 rounded-lg bg-background shadow-md">
            <h4 className="text-current text-lg font-bold mb-2">主题卡片 2</h4>
            <p className="text-base-200">使用相反主题背景色和当前文本色</p>
          </div>
          <div className="p-6 rounded-lg bg-base-100 shadow-md">
            <h4 className="text-current text-lg font-bold mb-2">主题卡片 3</h4>
            <p className="text-base-200">使用基础背景色和当前文本色</p>
          </div>
          <div className="p-6 rounded-lg bg-base-200 shadow-md">
            <h4 className="text-background text-lg font-bold mb-2">主题卡片 4</h4>
            <p className="text-base-100">使用基础背景色和对比文本色</p>
          </div>
          <div className="p-6 rounded-lg bg-base-300 shadow-md">
            <h4 className="text-current text-lg font-bold mb-2">主题卡片 5</h4>
            <p className="text-base-600">使用基础背景色300和当前文本色</p>
          </div>
          <div className="p-6 rounded-lg bg-base-400 shadow-md">
            <h4 className="text-background text-lg font-bold mb-2">主题卡片 6</h4>
            <p className="text-base-700">使用基础背景色400和对比文本色</p>
          </div>
          <div className="p-6 rounded-lg bg-base-500 shadow-md">
            <h4 className="text-current text-lg font-bold mb-2">主题卡片 7</h4>
            <p className="text-base-800">使用基础背景色500和当前文本色</p>
          </div>
          <div className="p-6 rounded-lg bg-base-600 shadow-md">
            <h4 className="text-background text-lg font-bold mb-2">主题卡片 8</h4>
            <p className="text-base-900">使用基础背景色600和对比文本色</p>
          </div>
          <div className="p-6 rounded-lg bg-base-700 shadow-md">
            <h4 className="text-current text-lg font-bold mb-2">主题卡片 9</h4>
            <p className="text-base-300">使用基础背景色700和当前文本色</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThemeDemo;