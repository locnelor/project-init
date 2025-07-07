# @repo/styles 使用示例

本文档提供了一系列使用`@repo/styles`库的实际示例，帮助你快速上手并在项目中应用主题样式系统。

## 目录

- [基础用法](#基础用法)
- [卡片组件](#卡片组件)
- [按钮组件](#按钮组件)
- [表单组件](#表单组件)
- [导航组件](#导航组件)
- [主题切换](#主题切换)
- [响应式设计](#响应式设计)
- [完整页面示例](#完整页面示例)

## 基础用法

### 背景色和文本色

```jsx
// 基础背景色和文本色组合
<div className="bg-current p-4 rounded-lg">
  <p className="text-current">当前主题背景色和文本色</p>
</div>

<div className="bg-background p-4 rounded-lg mt-4">
  <p className="text-background">相反主题背景色和文本色</p>
</div>

// 使用不同色阶
<div className="space-y-2 mt-4">
  <div className="bg-base-100 p-2 rounded">
    <p className="text-base-800">浅色背景，深色文本</p>
  </div>
  <div className="bg-base-200 p-2 rounded">
    <p className="text-base-700">浅色背景，深色文本</p>
  </div>
  <div className="bg-base-800 p-2 rounded">
    <p className="text-base-100">深色背景，浅色文本</p>
  </div>
  <div className="bg-base-900 p-2 rounded">
    <p className="text-base-200">深色背景，浅色文本</p>
  </div>
</div>
```

## 卡片组件

### 基础卡片

```jsx
<div className="bg-base-100 rounded-lg shadow-md p-6 max-w-md">
  <h2 className="text-current text-xl font-bold mb-4">卡片标题</h2>
  <p className="text-base-300 mb-4">这是一个使用主题样式系统的基础卡片组件。它使用了bg-base-100作为背景色，text-current作为标题文本色，text-base-300作为内容文本色。</p>
  <button className="bg-base-700 text-base-100 px-4 py-2 rounded hover:bg-base-800 transition-colors">
    了解更多
  </button>
</div>
```

### 渐变卡片

```jsx
<div className="bg-gradient-to-br from-base-100 to-base-300 rounded-lg shadow-md p-6 max-w-md">
  <h2 className="text-current text-xl font-bold mb-4">渐变卡片</h2>
  <p className="text-base-500 mb-4">这是一个使用渐变背景的卡片组件，结合了主题色系统和TailwindCSS的渐变功能。</p>
  <div className="flex justify-end">
    <button className="bg-current text-background px-4 py-2 rounded-full hover:shadow-md transition-shadow">
      查看详情
    </button>
  </div>
</div>
```

### 特色卡片

```jsx
<div className="bg-base-100 rounded-xl shadow-lg overflow-hidden max-w-md">
  <div className="h-48 bg-base-700 flex items-center justify-center">
    <span className="text-base-100 text-2xl font-bold">特色图片</span>
  </div>
  <div className="p-6">
    <h2 className="text-current text-xl font-bold mb-2">特色卡片</h2>
    <p className="text-base-400 mb-4">这是一个带有特色图片区域的卡片组件，适合用于博客文章或产品展示。</p>
    <div className="flex items-center justify-between">
      <span className="text-base-500 text-sm">2024年5月1日</span>
      <button className="text-base-700 hover:text-base-900 transition-colors">
        分享
      </button>
    </div>
  </div>
</div>
```

## 按钮组件

### 基础按钮

```jsx
// 主要按钮
<button className="bg-base-700 text-base-100 px-4 py-2 rounded hover:bg-base-800 transition-colors">
  主要按钮
</button>

// 次要按钮
<button className="bg-base-200 text-base-700 px-4 py-2 rounded hover:bg-base-300 transition-colors ml-4">
  次要按钮
</button>

// 轮廓按钮
<button className="border border-base-700 text-base-700 px-4 py-2 rounded hover:bg-base-700 hover:text-base-100 transition-colors ml-4">
  轮廓按钮
</button>

// 文本按钮
<button className="text-base-700 hover:text-base-900 transition-colors ml-4">
  文本按钮
</button>
```

### 按钮尺寸

```jsx
// 小型按钮
<button className="bg-base-700 text-base-100 px-3 py-1 text-sm rounded hover:bg-base-800 transition-colors">
  小型按钮
</button>

// 中型按钮（默认）
<button className="bg-base-700 text-base-100 px-4 py-2 rounded hover:bg-base-800 transition-colors ml-4">
  中型按钮
</button>

// 大型按钮
<button className="bg-base-700 text-base-100 px-6 py-3 text-lg rounded hover:bg-base-800 transition-colors ml-4">
  大型按钮
</button>
```

### 图标按钮

```jsx
// 带图标的按钮
<button className="bg-base-700 text-base-100 px-4 py-2 rounded hover:bg-base-800 transition-colors flex items-center">
  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
  </svg>
  添加项目
</button>

// 纯图标按钮
<button className="bg-base-700 text-base-100 p-2 rounded-full hover:bg-base-800 transition-colors ml-4">
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8h16M4 16h16"></path>
  </svg>
</button>
```

## 表单组件

### 输入框

```jsx
<div className="mb-4">
  <label htmlFor="username" className="block text-base-700 mb-2">用户名</label>
  <input
    type="text"
    id="username"
    className="w-full px-4 py-2 border border-base-300 rounded focus:ring-2 focus:ring-base-500 focus:border-base-500 bg-current text-current"
    placeholder="请输入用户名"
  />
</div>
```

### 文本域

```jsx
<div className="mb-4">
  <label htmlFor="message" className="block text-base-700 mb-2">留言</label>
  <textarea
    id="message"
    rows={4}
    className="w-full px-4 py-2 border border-base-300 rounded focus:ring-2 focus:ring-base-500 focus:border-base-500 bg-current text-current"
    placeholder="请输入留言内容"
  ></textarea>
</div>
```

### 选择框

```jsx
<div className="mb-4">
  <label htmlFor="category" className="block text-base-700 mb-2">分类</label>
  <select
    id="category"
    className="w-full px-4 py-2 border border-base-300 rounded focus:ring-2 focus:ring-base-500 focus:border-base-500 bg-current text-current"
  >
    <option value="">请选择分类</option>
    <option value="technology">技术</option>
    <option value="design">设计</option>
    <option value="business">商业</option>
  </select>
</div>
```

### 复选框

```jsx
<div className="mb-4">
  <label className="flex items-center">
    <input
      type="checkbox"
      className="h-5 w-5 text-base-700 border-base-300 rounded focus:ring-base-500"
    />
    <span className="ml-2 text-base-700">接收通知</span>
  </label>
</div>
```

## 导航组件

### 顶部导航栏

```jsx
<nav className="bg-base-100 shadow-md">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="flex justify-between h-16">
      <div className="flex items-center">
        <span className="text-current text-xl font-bold">Logo</span>
        <div className="ml-10 flex items-center space-x-4">
          <a href="#" className="text-base-700 hover:text-base-900 px-3 py-2 rounded-md font-medium">
            首页
          </a>
          <a href="#" className="text-base-700 hover:text-base-900 px-3 py-2 rounded-md font-medium">
            产品
          </a>
          <a href="#" className="text-base-700 hover:text-base-900 px-3 py-2 rounded-md font-medium">
            服务
          </a>
          <a href="#" className="text-base-700 hover:text-base-900 px-3 py-2 rounded-md font-medium">
            关于
          </a>
        </div>
      </div>
      <div className="flex items-center">
        <button className="bg-base-700 text-base-100 px-4 py-2 rounded hover:bg-base-800 transition-colors">
          登录
        </button>
      </div>
    </div>
  </div>
</nav>
```

### 侧边导航栏

```jsx
<div className="h-screen flex">
  <div className="w-64 bg-base-100 shadow-md">
    <div className="p-6">
      <h2 className="text-current text-xl font-bold mb-6">应用名称</h2>
      <nav className="space-y-1">
        <a href="#" className="block px-4 py-2 rounded-md bg-base-200 text-base-700 font-medium">
          仪表盘
        </a>
        <a href="#" className="block px-4 py-2 rounded-md text-base-600 hover:bg-base-200 hover:text-base-700 transition-colors">
          用户管理
        </a>
        <a href="#" className="block px-4 py-2 rounded-md text-base-600 hover:bg-base-200 hover:text-base-700 transition-colors">
          内容管理
        </a>
        <a href="#" className="block px-4 py-2 rounded-md text-base-600 hover:bg-base-200 hover:text-base-700 transition-colors">
          设置
        </a>
      </nav>
    </div>
  </div>
  <div className="flex-1 p-6 bg-current">
    <h1 className="text-current text-2xl font-bold mb-6">仪表盘</h1>
    <p className="text-base-500">这里是主要内容区域</p>
  </div>
</div>
```

## 主题切换

### 主题切换按钮

```jsx
import { useTheme } from "../components/ThemeProvider";

const ThemeSwitcher = () => {
  const { isDark, toggleTheme } = useTheme();
  
  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full bg-base-200 hover:bg-base-300 transition-colors"
      aria-label="切换主题"
    >
      {isDark ? (
        // 太阳图标（亮色模式）
        <svg className="w-5 h-5 text-base-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path>
        </svg>
      ) : (
        // 月亮图标（暗色模式）
        <svg className="w-5 h-5 text-base-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>
        </svg>
      )}
    </button>
  );
};
```

## 响应式设计

### 响应式卡片网格

```jsx
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
  {/* 卡片1 */}
  <div className="bg-base-100 rounded-lg shadow-md p-6">
    <h2 className="text-current text-xl font-bold mb-4">卡片1</h2>
    <p className="text-base-500 mb-4">这是一个响应式卡片网格中的第一个卡片。</p>
    <button className="bg-base-700 text-base-100 px-4 py-2 rounded hover:bg-base-800 transition-colors">
      查看详情
    </button>
  </div>
  
  {/* 卡片2 */}
  <div className="bg-base-100 rounded-lg shadow-md p-6">
    <h2 className="text-current text-xl font-bold mb-4">卡片2</h2>
    <p className="text-base-500 mb-4">这是一个响应式卡片网格中的第二个卡片。</p>
    <button className="bg-base-700 text-base-100 px-4 py-2 rounded hover:bg-base-800 transition-colors">
      查看详情
    </button>
  </div>
  
  {/* 卡片3 */}
  <div className="bg-base-100 rounded-lg shadow-md p-6">
    <h2 className="text-current text-xl font-bold mb-4">卡片3</h2>
    <p className="text-base-500 mb-4">这是一个响应式卡片网格中的第三个卡片。</p>
    <button className="bg-base-700 text-base-100 px-4 py-2 rounded hover:bg-base-800 transition-colors">
      查看详情
    </button>
  </div>
</div>
```

### 响应式导航

```jsx
import { useState } from 'react';
import { useTheme } from "../components/ThemeProvider";

const ResponsiveNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isDark, toggleTheme } = useTheme();
  
  return (
    <nav className="bg-base-100 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <span className="text-current text-xl font-bold">Logo</span>
            <div className="hidden md:flex ml-10 items-center space-x-4">
              <a href="#" className="text-base-700 hover:text-base-900 px-3 py-2 rounded-md font-medium">
                首页
              </a>
              <a href="#" className="text-base-700 hover:text-base-900 px-3 py-2 rounded-md font-medium">
                产品
              </a>
              <a href="#" className="text-base-700 hover:text-base-900 px-3 py-2 rounded-md font-medium">
                服务
              </a>
              <a href="#" className="text-base-700 hover:text-base-900 px-3 py-2 rounded-md font-medium">
                关于
              </a>
            </div>
          </div>
          <div className="flex items-center">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full bg-base-200 hover:bg-base-300 transition-colors mr-4"
              aria-label="切换主题"
            >
              {isDark ? (
                <svg className="w-5 h-5 text-base-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path>
                </svg>
              ) : (
                <svg className="w-5 h-5 text-base-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>
                </svg>
              )}
            </button>
            <div className="hidden md:block">
              <button className="bg-base-700 text-base-100 px-4 py-2 rounded hover:bg-base-800 transition-colors">
                登录
              </button>
            </div>
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-md text-base-700 hover:text-base-900 hover:bg-base-200 focus:outline-none"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {isMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* 移动端菜单 */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-base-700 hover:text-base-900 hover:bg-base-200">
              首页
            </a>
            <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-base-700 hover:text-base-900 hover:bg-base-200">
              产品
            </a>
            <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-base-700 hover:text-base-900 hover:bg-base-200">
              服务
            </a>
            <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-base-700 hover:text-base-900 hover:bg-base-200">
              关于
            </a>
            <div className="pt-4">
              <button className="w-full bg-base-700 text-base-100 px-4 py-2 rounded hover:bg-base-800 transition-colors">
                登录
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};
```

## 完整页面示例

### 博客文章页面

```jsx
import { useTheme } from "../components/ThemeProvider";

const BlogPost = () => {
  const { isDark, toggleTheme } = useTheme();
  
  return (
    <div className="min-h-screen bg-current">
      {/* 导航栏 */}
      <nav className="bg-base-100 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <span className="text-current text-xl font-bold">博客名称</span>
              <div className="ml-10 hidden md:flex items-center space-x-4">
                <a href="#" className="text-base-700 hover:text-base-900 px-3 py-2 rounded-md font-medium">
                  首页
                </a>
                <a href="#" className="text-base-700 hover:text-base-900 px-3 py-2 rounded-md font-medium">
                  分类
                </a>
                <a href="#" className="text-base-700 hover:text-base-900 px-3 py-2 rounded-md font-medium">
                  标签
                </a>
                <a href="#" className="text-base-700 hover:text-base-900 px-3 py-2 rounded-md font-medium">
                  关于
                </a>
              </div>
            </div>
            <div className="flex items-center">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full bg-base-200 hover:bg-base-300 transition-colors"
                aria-label="切换主题"
              >
                {isDark ? (
                  <svg className="w-5 h-5 text-base-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path>
                  </svg>
                ) : (
                  <svg className="w-5 h-5 text-base-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>
      
      {/* 主要内容 */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        <article className="bg-base-100 rounded-xl shadow-md overflow-hidden">
          {/* 文章头图 */}
          <div className="aspect-video w-full overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&h=600&fit=crop"
              alt="文章头图"
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="p-6 md:p-8">
            {/* 文章元信息 */}
            <div className="flex flex-wrap items-center text-sm text-base-500 mb-4">
              <span className="bg-base-200 text-base-700 px-3 py-1 rounded-full text-xs font-medium">
                技术
              </span>
              <span className="mx-2">•</span>
              <span className="flex items-center">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                </svg>
                2024年5月1日
              </span>
              <span className="mx-2">•</span>
              <span className="flex items-center">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                10 分钟阅读
              </span>
            </div>
            
            {/* 文章标题 */}
            <h1 className="text-current text-3xl md:text-4xl font-bold mb-6">
              使用@repo/styles构建现代化主题系统
            </h1>
            
            {/* 文章摘要 */}
            <p className="text-base-400 text-lg mb-8 border-l-4 border-base-300 pl-4 italic">
              本文将介绍如何使用@repo/styles库构建一个现代化的主题系统，支持亮色/暗色模式切换，并提供一套完整的主题色方案。
            </p>
            
            {/* 文章内容 */}
            <div className="prose dark:prose-invert max-w-none">
              <h2>什么是@repo/styles？</h2>
              <p>@repo/styles是一个基于TailwindCSS的主题样式系统，提供了一套完整的主题色方案和响应式设计工具。它使用CSS变量来定义主题色，支持亮色/暗色主题切换，并提供了一系列背景色和文本色类。</p>
              
              <h2>主要特性</h2>
              <ul>
                <li>完整的主题色系统，支持从100到900的色阶</li>
                <li>内置亮色/暗色主题切换</li>
                <li>完全响应式设计</li>
                <li>组件化设计，易于扩展</li>
                <li>CSS变量驱动，便于定制</li>
              </ul>
              
              <h2>如何使用</h2>
              <p>使用@repo/styles非常简单，只需要在你的应用入口文件中引入样式，然后使用提供的背景色和文本色类即可。</p>
              
              <pre><code>import "@repo/styles";</code></pre>
              
              <p>然后，你可以使用提供的背景色和文本色类来构建你的UI：</p>
              
              <pre><code>&lt;div className="bg-base-100 p-4 rounded-lg"&gt;
  &lt;h2 className="text-current text-xl font-bold mb-2"&gt;标题&lt;/h2&gt;
  &lt;p className="text-base-500"&gt;内容&lt;/p&gt;
&lt;/div&gt;</code></pre>
              
              <h2>主题切换</h2>
              <p>@repo/styles提供了一个ThemeProvider组件和useTheme钩子来实现主题切换：</p>
              
              <pre><code>import { useTheme } from "../components/ThemeProvider";

const MyComponent = () => {
  const { isDark, toggleTheme } = useTheme();
  
  return (
    &lt;button onClick={toggleTheme}&gt;
      切换主题 (当前: {isDark ? '暗色' : '亮色'})
    &lt;/button&gt;
  );
};</code></pre>
            </div>
            
            {/* 文章标签 */}
            <div className="flex flex-wrap gap-2 mt-8 pt-6 border-t border-base-200">
              <span className="text-base-600 hover:text-base-800 px-2 py-1 rounded text-xs transition-colors cursor-pointer">
                #TailwindCSS
              </span>
              <span className="text-base-600 hover:text-base-800 px-2 py-1 rounded text-xs transition-colors cursor-pointer">
                #主题系统
              </span>
              <span className="text-base-600 hover:text-base-800 px-2 py-1 rounded text-xs transition-colors cursor-pointer">
                #CSS变量
              </span>
              <span className="text-base-600 hover:text-base-800 px-2 py-1 rounded text-xs transition-colors cursor-pointer">
                #响应式设计
              </span>
            </div>
            
            {/* 作者信息 */}
            <div className="flex items-center mt-8 pt-6 border-t border-base-200">
              <img
                src="https://randomuser.me/api/portraits/men/32.jpg"
                alt="作者头像"
                className="w-12 h-12 rounded-full mr-4"
              />
              <div>
                <h3 className="text-current font-bold">张三</h3>
                <p className="text-base-500 text-sm">前端开发工程师，热爱分享技术知识</p>
              </div>
            </div>
          </div>
        </article>
        
        {/* 评论区 */}
        <div className="mt-8">
          <h2 className="text-current text-2xl font-bold mb-6">评论 (3)</h2>
          
          {/* 评论表单 */}
          <div className="bg-base-100 rounded-xl shadow-md p-6 mb-6">
            <h3 className="text-current text-lg font-bold mb-4">发表评论</h3>
            <textarea
              className="w-full px-4 py-2 border border-base-300 rounded focus:ring-2 focus:ring-base-500 focus:border-base-500 bg-current text-current mb-4"
              rows={4}
              placeholder="写下你的评论..."
            ></textarea>
            <button className="bg-base-700 text-base-100 px-4 py-2 rounded hover:bg-base-800 transition-colors">
              提交评论
            </button>
          </div>
          
          {/* 评论列表 */}
          <div className="space-y-6">
            {/* 评论1 */}
            <div className="bg-base-100 rounded-xl shadow-md p-6">
              <div className="flex items-center mb-4">
                <img
                  src="https://randomuser.me/api/portraits/women/44.jpg"
                  alt="评论者头像"
                  className="w-10 h-10 rounded-full mr-3"
                />
                <div>
                  <h4 className="text-current font-bold">李四</h4>
                  <p className="text-base-500 text-xs">2024年5月2日</p>
                </div>
              </div>
              <p className="text-base-600 mb-4">这篇文章非常有用，我已经在我的项目中使用了@repo/styles，效果很好！</p>
              <button className="text-base-500 hover:text-base-700 text-sm flex items-center">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
                </svg>
                回复
              </button>
            </div>
            
            {/* 评论2 */}
            <div className="bg-base-100 rounded-xl shadow-md p-6">
              <div className="flex items-center mb-4">
                <img
                  src="https://randomuser.me/api/portraits/men/22.jpg"
                  alt="评论者头像"
                  className="w-10 h-10 rounded-full mr-3"
                />
                <div>
                  <h4 className="text-current font-bold">王五</h4>
                  <p className="text-base-500 text-xs">2024年5月3日</p>
                </div>
              </div>
              <p className="text-base-600 mb-4">请问如何自定义主题色？我想使用自己的品牌色。</p>
              <button className="text-base-500 hover:text-base-700 text-sm flex items-center">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
                </svg>
                回复
              </button>
            </div>
            
            {/* 评论3 */}
            <div className="bg-base-100 rounded-xl shadow-md p-6">
              <div className="flex items-center mb-4">
                <img
                  src="https://randomuser.me/api/portraits/women/28.jpg"
                  alt="评论者头像"
                  className="w-10 h-10 rounded-full mr-3"
                />
                <div>
                  <h4 className="text-current font-bold">赵六</h4>
                  <p className="text-base-500 text-xs">2024年5月4日</p>
                </div>
              </div>
              <p className="text-base-600 mb-4">主题切换动画效果很赞，用户体验非常好！</p>
              <button className="text-base-500 hover:text-base-700 text-sm flex items-center">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
                </svg>
                回复
              </button>
            </div>
          </div>
        </div>
      </main>
      
      {/* 页脚 */}
      <footer className="bg-base-200 py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <span className="text-current text-xl font-bold">博客名称</span>
              <p className="text-base-500 mt-2">© 2024 版权所有</p>
            </div>
            <div className="flex space-x-6">
              <a href="#" className="text-base-600 hover:text-base-800">
                <span className="sr-only">Facebook</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="text-base-600 hover:text-base-800">
                <span className="sr-only">Twitter</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a href="#" className="text-base-600 hover:text-base-800">
                <span className="sr-only">GitHub</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
```

这些示例展示了如何在实际项目中使用`@repo/styles`库构建各种UI组件和页面。你可以根据自己的需求进行修改和扩展，创建出更加丰富多样的UI界面。