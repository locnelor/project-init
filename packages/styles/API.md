# @repo/styles API文档

## 目录

- [CSS变量](#css变量)
- [背景色类](#背景色类)
- [文本色类](#文本色类)
- [ThemeProvider API](#themeprovider-api)
- [useTheme Hook](#usetheme-hook)
- [主题切换动画](#主题切换动画)
- [与TailwindCSS集成](#与tailwindcss集成)

## CSS变量

`@repo/styles`使用CSS变量来定义主题色系统。这些变量在`:root`选择器中定义，并在`.dark`类中被覆盖以支持暗色主题。

### 默认主题（亮色）

```css
:root {
  /* 主题颜色 */
  --theme-current: 255 255 255;      /* 白色 */
  --theme-background: 23 23 23;       /* 黑色 */
  
  /* 背景色阶 */
  --theme-base-100: 243 244 246;      /* gray-100 */
  --theme-base-200: 229 231 235;      /* gray-200 */
  --theme-base-300: 209 213 219;      /* gray-300 */
  --theme-base-400: 156 163 175;      /* gray-400 */
  --theme-base-500: 107 114 128;      /* gray-500 */
  --theme-base-600: 75 85 99;         /* gray-600 */
  --theme-base-700: 55 65 81;         /* gray-700 */
  --theme-base-800: 31 41 55;         /* gray-800 */
  --theme-base-900: 17 24 39;         /* gray-900 */
  
  /* 文本色阶 */
  --theme-text-current: 23 23 23;      /* 黑色文本 */
  --theme-text-background: 255 255 255; /* 白色文本 */
  --theme-text-base-100: 55 65 81;     /* gray-700 文本 */
  --theme-text-base-200: 31 41 55;     /* gray-800 文本 */
  --theme-text-base-300: 17 24 39;     /* gray-900 文本 */
  --theme-text-base-400: 31 41 55;     /* gray-800 文本 */
  --theme-text-base-500: 55 65 81;     /* gray-700 文本 */
  --theme-text-base-600: 75 85 99;     /* gray-600 文本 */
  --theme-text-base-700: 107 114 128;  /* gray-500 文本 */
  --theme-text-base-800: 156 163 175;  /* gray-400 文本 */
  --theme-text-base-900: 209 213 219;  /* gray-300 文本 */
}
```

### 暗色主题

当添加`.dark`类或使用`ThemeProvider`切换到暗色主题时，这些变量会被覆盖：

```css
.dark {
  /* 主题颜色反转 */
  --theme-current: 23 23 23;          /* 黑色 */
  --theme-background: 255 255 255;     /* 白色 */
  
  /* 背景色阶反转 */
  --theme-base-100: 31 41 55;         /* gray-800 */
  --theme-base-200: 55 65 81;         /* gray-700 */
  /* ... 其他背景色阶 ... */
  
  /* 文本色阶反转 */
  --theme-text-current: 255 255 255;   /* 白色文本 */
  --theme-text-background: 23 23 23;   /* 黑色文本 */
  --theme-text-base-100: 209 213 219;  /* gray-300 文本 */
  --theme-text-base-200: 156 163 175;  /* gray-400 文本 */
  /* ... 其他文本色阶 ... */
}
```

## 背景色类

`@repo/styles`提供了一系列背景色类，可以直接在HTML元素上使用：

| 类名 | 描述 | 亮色主题 | 暗色主题 |
|------|------|---------|----------|
| `bg-current` | 当前主题背景色 | 白色 | 黑色 |
| `bg-background` | 相反主题背景色 | 黑色 | 白色 |
| `bg-base-100` | 基础背景色 100 | gray-100 | gray-800 |
| `bg-base-200` | 基础背景色 200 | gray-200 | gray-700 |
| `bg-base-300` | 基础背景色 300 | gray-300 | gray-600 |
| `bg-base-400` | 基础背景色 400 | gray-400 | gray-500 |
| `bg-base-500` | 基础背景色 500 | gray-500 | gray-400 |
| `bg-base-600` | 基础背景色 600 | gray-600 | gray-300 |
| `bg-base-700` | 基础背景色 700 | gray-700 | gray-200 |
| `bg-base-800` | 基础背景色 800 | gray-800 | gray-100 |
| `bg-base-900` | 基础背景色 900 | gray-900 | gray-50 |

### 用法

```jsx
<div className="bg-current">当前主题背景色</div>
<div className="bg-base-100">基础背景色 100</div>
```

## 文本色类

`@repo/styles`提供了一系列文本色类，可以直接在HTML元素上使用：

| 类名 | 描述 | 亮色主题 | 暗色主题 |
|------|------|---------|----------|
| `text-current` | 当前主题文本色 | 黑色 | 白色 |
| `text-background` | 相反主题文本色 | 白色 | 黑色 |
| `text-base-100` | 基础文本色 100 | gray-700 | gray-300 |
| `text-base-200` | 基础文本色 200 | gray-800 | gray-400 |
| `text-base-300` | 基础文本色 300 | gray-900 | gray-500 |
| `text-base-400` | 基础文本色 400 | gray-800 | gray-400 |
| `text-base-500` | 基础文本色 500 | gray-700 | gray-300 |
| `text-base-600` | 基础文本色 600 | gray-600 | gray-400 |
| `text-base-700` | 基础文本色 700 | gray-500 | gray-500 |
| `text-base-800` | 基础文本色 800 | gray-400 | gray-600 |
| `text-base-900` | 基础文本色 900 | gray-300 | gray-700 |

### 用法

```jsx
<p className="text-current">当前主题文本色</p>
<p className="text-base-100">基础文本色 100</p>
```

## ThemeProvider API

`ThemeProvider`是一个React组件，用于管理主题状态并提供主题切换功能。

### 属性

| 属性 | 类型 | 描述 |
|------|------|------|
| `children` | `React.ReactNode` | 子组件 |

### 用法

```tsx
import { ThemeProvider } from "../components/ThemeProvider";

const RootLayout = ({ children }) => {
  return (
    <html lang="zh-CN">
      <body>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
};
```

## useTheme Hook

`useTheme`是一个React Hook，用于在组件中访问主题状态和切换主题。

### 返回值

| 属性 | 类型 | 描述 |
|------|------|------|
| `isDark` | `boolean` | 当前是否为暗色主题 |
| `toggleTheme` | `(event: React.MouseEvent<HTMLButtonElement>) => void` | 切换主题的函数 |
| `isAnimating` | `boolean` | 主题切换动画是否正在进行 |

### 用法

```tsx
import { useTheme } from "../components/ThemeProvider";

const MyComponent = () => {
  const { isDark, toggleTheme } = useTheme();
  
  return (
    <button onClick={toggleTheme}>
      切换主题 (当前: {isDark ? '暗色' : '亮色'})
    </button>
  );
};
```

## 主题切换动画

`ThemeProvider`内置了一个基于`html2canvas`的圆形扩散动画效果，用于在主题切换时提供视觉反馈。

### 动画流程

1. 当调用`toggleTheme`函数时，会先截取当前页面的快照
2. 然后切换主题状态
3. 创建一个canvas遮罩层，显示截图
4. 根据点击位置创建一个圆形扩散动画
5. 动画完成后移除canvas

### 自定义动画

如果需要自定义动画效果，可以修改`ThemeProvider.tsx`文件中的`toggleTheme`函数。

## 与TailwindCSS集成

`@repo/styles`与TailwindCSS完全兼容，可以与TailwindCSS的其他类一起使用。

### 示例

```jsx
<div className="bg-base-100 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
  <h2 className="text-current text-xl font-bold mb-2">标题</h2>
  <p className="text-base-200">内容</p>
</div>
```

### 扩展TailwindCSS配置

如果需要扩展TailwindCSS配置，可以在`tailwind.config.js`文件中添加自定义主题：

```js
module.exports = {
  theme: {
    extend: {
      colors: {
        // 添加自定义颜色
      }
    }
  }
};
```

## 最佳实践

1. **组合使用**：
   - 将背景色类与文本色类组合使用，确保良好的对比度
   - 例如：`<div className="bg-base-100"><p className="text-base-800">文本</p></div>`

2. **响应式设计**：
   - 结合TailwindCSS的响应式前缀使用主题色类
   - 例如：`<div className="bg-base-100 md:bg-base-200">响应式背景</div>`

3. **主题切换**：
   - 使用`useTheme`钩子管理主题状态
   - 在用户界面中提供明显的主题切换按钮
   - 记住用户的主题偏好（可以使用localStorage）

4. **可访问性**：
   - 确保文本与背景之间有足够的对比度
   - 使用`text-base-800`到`text-base-900`在浅色背景上获得最佳可读性
   - 使用`text-base-100`到`text-base-200`在深色背景上获得最佳可读性