'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';

interface ThemeContextType {
  isDark: boolean;
  toggleTheme: (event: React.MouseEvent<HTMLButtonElement>) => void;
  isAnimating: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [isDark, setIsDark] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    // 应用主题到document
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const captureScreenshot = async (): Promise<string> => {
    try {
      // 使用html2canvas库截图（需要安装）
      const html2canvas = (await import('html2canvas')).default;
      const canvas = await html2canvas(document.body, {
        useCORS: true,
        allowTaint: true,
        scale: 0.5, // 降低分辨率以提高性能
        width: window.innerWidth,
        height: window.innerHeight
      });
      return canvas.toDataURL('image/png');
    } catch (error) {
      console.warn('截图失败，使用默认动画:', error);
      return '';
    }
  };

  const toggleTheme = async (event: React.MouseEvent<HTMLButtonElement>) => {
    if (isAnimating) return;

    setIsAnimating(true);
    const button = event.currentTarget;
    const rect = button.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;

    // 截取当前页面
    const screenshot = await captureScreenshot();

    // 创建圆形扩散动画
    const maxRadius = Math.sqrt(window.innerWidth ** 2 + window.innerHeight ** 2);

    // 先切换主题状态
    const newIsDark = !isDark;

    // 创建canvas遮罩层显示截图
    const canvasOverlay = document.createElement('canvas');
    const ctx = canvasOverlay.getContext('2d');
    canvasOverlay.width = window.innerWidth;
    canvasOverlay.height = window.innerHeight;
    canvasOverlay.style.position = 'fixed';
    canvasOverlay.style.top = '0';
    canvasOverlay.style.left = '0';
    canvasOverlay.style.width = '100vw';
    canvasOverlay.style.height = '100vh';
    canvasOverlay.style.pointerEvents = 'none';
    canvasOverlay.style.zIndex = '9999';

    setIsDark(newIsDark);
    if (screenshot && ctx) {
      const img = new Image();
      img.onload = () => {
        // 绘制截图作为背景
        ctx.drawImage(img, 0, 0, canvasOverlay.width, canvasOverlay.height);

        // 开始动画
        startCircleAnimation();
      };
      img.src = screenshot;
    } else {
      // 如果截图失败，直接开始动画
      startCircleAnimation();
    }


    function startCircleAnimation() {
      document.body.appendChild(canvasOverlay);

      setIsAnimating(false);
      const startTime = Date.now();
      const duration = 800; // 动画持续时间

      function animate() {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);

        if (ctx && screenshot) {
          // 清除canvas
          ctx.clearRect(0, 0, canvasOverlay.width, canvasOverlay.height);

          // 重新绘制截图
          const img = new Image();
          img.onload = () => {
            ctx.drawImage(img, 0, 0, canvasOverlay.width, canvasOverlay.height);

            // 创建透明圆形
            let radius;
            if (isDark) {
              // 从暗切换到白：圆形缩小（从最大到0）
              radius = maxRadius * (1 - progress);
            } else {
              // 从白切换到暗：圆形扩大（从0到最大）
              radius = maxRadius * progress;
            }

            // 设置合成模式为destination-out来创建透明圆形
            ctx.globalCompositeOperation = 'destination-out';
            ctx.beginPath();
            ctx.arc(x, y, radius, 0, 2 * Math.PI);
            ctx.fill();

            // 恢复合成模式
            ctx.globalCompositeOperation = 'source-over';
          };
          img.src = screenshot;
        }

        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          // 动画完成，移除canvas
          if (document.body.contains(canvasOverlay)) {
            document.body.removeChild(canvasOverlay);
          }
          setIsAnimating(false);
        }
      }

      animate();
    }
  };

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme, isAnimating }}>
      <NextThemesProvider attribute="class" defaultTheme="system" enableSystem>
        {children}
      </NextThemesProvider>
    </ThemeContext.Provider>
  );
};