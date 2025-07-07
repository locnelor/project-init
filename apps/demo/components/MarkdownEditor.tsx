'use client';

import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Prism from 'prismjs';

// 导入Prism的基础样式和主题
import 'prismjs/themes/prism-tomorrow.css';
// 导入需要高亮的语言
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-tsx';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-java';
import 'prismjs/components/prism-c';
import 'prismjs/components/prism-cpp';
import 'prismjs/components/prism-csharp';
import 'prismjs/components/prism-go';
import 'prismjs/components/prism-rust';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-yaml';
import 'prismjs/components/prism-markdown';
import 'prismjs/components/prism-sql';
import 'prismjs/components/prism-php';

interface MarkdownEditorProps {
  value: string;
  onChange: (value: string) => void;
}

const MarkdownEditor: React.FC<MarkdownEditorProps> = ({ value, onChange }) => {
  const [markdownText, setMarkdownText] = useState<string>(value);

  // 当外部value变化时更新内部状态
  useEffect(() => {
    setMarkdownText(value);
  }, [value]);

  // 当编辑器内容变化时触发onChange回调
  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    setMarkdownText(newValue);
    onChange(newValue);
  };

  // 在渲染后应用Prism高亮
  useEffect(() => {
    Prism.highlightAll();
  }, [markdownText]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full">
      {/* 编辑区域 */}
      <div className="border border-gray-300 dark:border-gray-600 rounded-md overflow-hidden">
        <textarea
          value={markdownText}
          onChange={handleTextChange}
          className="w-full h-full min-h-[400px] p-4 bg-white dark:bg-gray-700 text-gray-900 dark:text-white font-mono resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="在这里使用Markdown编写文章内容..."
        />
      </div>

      {/* 预览区域 */}
      <div className="border border-gray-300 dark:border-gray-600 rounded-md overflow-auto">
        <div className="markdown-preview p-4 min-h-[400px] bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
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
            {markdownText}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
};

export default MarkdownEditor;