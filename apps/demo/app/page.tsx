'use client';

import React, { useState } from 'react';
import ArticleList from '../components/ArticleList';
import Pagination from '../components/Pagination';

const Home = () => {
  const [currentPage, setCurrentPage] = useState(1);

  // 模拟文章数据
  const articlesData = [
    {
      id: '1',
      title: 'Next.js 15 新特性详解',
      content: '详细介绍Next.js 15版本的新功能和改进...',
      excerpt: 'Next.js 15带来了许多令人兴奋的新特性，包括改进的性能、新的API设计以及更好的开发体验。本文将深入探讨这些新功能如何提升我们的开发效率。',
      publishedAt: '2024-01-15',
      category: '前端开发',
      tags: ['Next.js', 'React', 'JavaScript'],
      image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=400&fit=crop',
      readTime: 8,
    },
    {
      id: '2',
      title: 'TailwindCSS 最佳实践指南',
      content: '分享TailwindCSS在实际项目中的应用经验...',
      excerpt: '通过实际项目经验，总结了TailwindCSS的最佳实践方法，包括组件设计、响应式布局、性能优化等方面的技巧和建议。',
      publishedAt: '2024-01-12',
      category: 'CSS',
      tags: ['TailwindCSS', 'CSS', '前端'],
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=400&fit=crop',
      readTime: 6,
    },
    {
      id: '3',
      title: 'TypeScript 高级类型系统深入解析',
      content: 'TypeScript高级类型的使用技巧和实践...',
      excerpt: '深入探讨TypeScript的高级类型系统，包括条件类型、映射类型、模板字面量类型等，帮助开发者更好地利用TypeScript的强大功能。',
      publishedAt: '2024-01-10',
      category: '编程语言',
      tags: ['TypeScript', 'JavaScript', '类型系统'],
      readTime: 12,
    },
    {
      id: '4',
      title: 'React Server Components 实战应用',
      content: 'React Server Components的实际应用场景...',
      excerpt: 'React Server Components为我们带来了新的开发模式，本文通过实际案例展示如何在项目中有效使用这一新特性。',
      publishedAt: '2024-01-08',
      category: '前端开发',
      tags: ['React', 'Server Components', 'SSR'],
      image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=400&fit=crop',
      readTime: 10,
    },
    {
      id: '5',
      title: '现代化前端工程化实践',
      content: '前端工程化的最新实践和工具链...',
      excerpt: '探讨现代前端开发中的工程化实践，包括构建工具、代码规范、自动化测试、CI/CD等方面的最佳实践。',
      publishedAt: '2024-01-05',
      category: '工程化',
      tags: ['工程化', 'Webpack', 'Vite', 'CI/CD'],
      readTime: 15,
    },
  ];

  const totalPages = 5;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="max-w-full">
      <ArticleList articles={articlesData} />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default Home;