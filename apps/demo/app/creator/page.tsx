


'use client';

import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Prism from 'prismjs';
import MarkdownEditor from '../../components/MarkdownEditor';
import '../../styles/markdown.css';
import 'prismjs/themes/prism-tomorrow.css';

// 导入需要高亮的语言
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-tsx';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-java';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-yaml';
import 'prismjs/components/prism-markdown';

const CreatorPage = () => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    excerpt: '',
    category: '',
    tags: '',
    image: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);

  // 模拟分类数据
  const categories = [
    { id: '1', name: '前端开发' },
    { id: '2', name: 'CSS' },
    { id: '3', name: '编程语言' },
    { id: '4', name: '工程化' },
    { id: '5', name: '数据库' },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // 这里添加提交逻辑
      console.log('提交的数据:', {
        ...formData,
        tags: formData.tags.split(',').map(tag => tag.trim()),
        publishedAt: new Date().toISOString(),
        readTime: Math.ceil(formData.content.length / 1000) // 简单估算阅读时间
      });
      
      // 模拟API请求延迟
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // 成功后重置表单
      setFormData({
        title: '',
        content: '',
        excerpt: '',
        category: '',
        tags: '',
        image: ''
      });
      
      alert('文章创建成功！');
    } catch (error) {
      console.error('提交失败:', error);
      alert('提交失败，请重试');
    } finally {
      setIsSubmitting(false);
    }
  };

  const togglePreview = () => {
    setPreviewMode(!previewMode);
    // 在切换到预览模式后，应用代码高亮
    if (!previewMode) {
      setTimeout(() => {
        if (typeof Prism !== 'undefined') {
          Prism.highlightAll();
        }
      }, 0);
    }
  };

  // 计算预估阅读时间
  const estimatedReadTime = Math.max(1, Math.ceil(formData.content.length / 1000));
  
  // 在预览模式下应用代码高亮
  useEffect(() => {
    if (previewMode) {
      setTimeout(() => {
        Prism.highlightAll();
      }, 0);
    }
  }, [previewMode, formData.content]);

  return (
    <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden border border-gray-100 dark:border-gray-700">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">创建新文章</h1>
          <button
            type="button"
            onClick={togglePreview}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            {previewMode ? '返回编辑' : '预览文章'}
          </button>
        </div>

        {previewMode ? (
          <div className="preview-container">
            {/* 文章预览 */}
            <div className="space-y-6">
              {formData.image && (
                <div className="aspect-video w-full overflow-hidden rounded-lg">
                  <img
                    src={formData.image}
                    alt={formData.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              
              <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                <span className="bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 px-3 py-1 rounded-full text-xs font-medium">
                  {formData.category || '未分类'}
                </span>
                <span className="flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                  </svg>
                  {new Date().toLocaleDateString('zh-CN', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </span>
                <span className="flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  {estimatedReadTime} 分钟阅读
                </span>
              </div>
              
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                {formData.title || '文章标题'}
              </h2>
              
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                {formData.excerpt || '文章摘要...'}
              </p>
              
              <div className="markdown-preview max-w-none">
                <ReactMarkdown 
                  remarkPlugins={[remarkGfm]}
                  components={{
                    code({node, inline, className, children, ...props}: any) {
                      const match = /language-(\w+)/.exec(className || '');
                      return !inline && match ? (
                        <pre className={`language-${match[1]} rounded-md`}>
                          <code className={`language-${match[1]}`} {...props}>
                            {String(children).replace(/\n$/, '')}
                          </code>
                        </pre>
                      ) : (
                        <code className={className} {...props}>
                          {children}
                        </code>
                      );
                    }
                  }}
                >
                  {formData.content}
                </ReactMarkdown>
              </div>
              
              <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-100 dark:border-gray-700">
                {formData.tags ? formData.tags.split(',').map((tag, index) => (
                  <span
                    key={index}
                    className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 px-2 py-1 rounded text-xs transition-colors cursor-pointer"
                  >
                    #{tag.trim()}
                  </span>
                )) : <span className="text-gray-400 dark:text-gray-500 text-sm">无标签</span>}
              </div>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* 标题 */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                文章标题 <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="输入文章标题"
              />
            </div>
            
            {/* 摘要 */}
            <div>
              <label htmlFor="excerpt" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                文章摘要 <span className="text-red-500">*</span>
              </label>
              <textarea
                id="excerpt"
                name="excerpt"
                value={formData.excerpt}
                onChange={handleChange}
                required
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="简短描述文章内容，会显示在文章列表中"
              />
            </div>
            
            {/* 内容 */}
            <div>
              <label htmlFor="content" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                文章内容 <span className="text-red-500">*</span>
              </label>
              <MarkdownEditor
                value={formData.content}
                onChange={(value) => {
                  setFormData(prev => ({
                    ...prev,
                    content: value
                  }));
                }}
              />
            </div>
            
            {/* 分类和标签 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* 分类 */}
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  文章分类 <span className="text-red-500">*</span>
                </label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value="">选择分类</option>
                  {categories.map(category => (
                    <option key={category.id} value={category.name}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
              
              {/* 标签 */}
              <div>
                <label htmlFor="tags" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  文章标签
                </label>
                <input
                  type="text"
                  id="tags"
                  name="tags"
                  value={formData.tags}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="标签之间用逗号分隔，如：Next.js,React,JavaScript"
                />
              </div>
            </div>
            
            {/* 封面图片 */}
            <div>
              <label htmlFor="image" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                封面图片URL
              </label>
              <input
                type="url"
                id="image"
                name="image"
                value={formData.image}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="输入图片URL地址"
              />
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                推荐尺寸: 1200 x 600 像素
              </p>
            </div>
            
            {/* 提交按钮 */}
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                className="px-6 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                onClick={() => {
                  if (confirm('确定要清空表单吗？所有内容将被删除。')) {
                    setFormData({
                      title: '',
                      content: '',
                      excerpt: '',
                      category: '',
                      tags: '',
                      image: ''
                    });
                  }
                }}
              >
                清空
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {isSubmitting ? '提交中...' : '发布文章'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default CreatorPage;