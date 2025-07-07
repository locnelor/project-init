"use client"
import { blog_tag } from '@repo/database';
import React, { useState } from 'react';

interface Category {
  name: string;
  count: number;
  color?: string;
}


interface RightSidebarProps {
  categories: Category[];
  tags: (blog_tag & { count: number })[];
}

const RightSidebar: React.FC<RightSidebarProps> = ({
  categories,
  tags,
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const getCategoryColor = (color?: string) => {
    const colors = {
      blue: 'bg-blue-100 text-blue-600 border-blue-200',
      green: 'bg-green-100 text-green-600 border-green-200',
      purple: 'bg-purple-100 text-purple-600 border-purple-200',
      red: 'bg-red-100 text-red-600 border-red-200',
      yellow: 'bg-yellow-100 text-yellow-600 border-yellow-200',
      default: 'bg-gray-100 text-gray-600 border-gray-200',
    };
    return colors[color as keyof typeof colors] || colors.default;
  };

  return (
    <div className="h-screen w-full overflow-y-auto   border-l ">
      <div className="p-6 space-y-8">
        <div className=" rounded-lg p-4">
          <h3 className="text-lg font-semibold  mb-4">搜索</h3>
          <form onSubmit={handleSearchSubmit}>
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="搜索文章..."
                className="w-full px-4 py-2 pr-10 border  rounded-lg   focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-blue-500 transition-colors"
              >
                🔍
              </button>
            </div>
          </form>
        </div>
        <div className=" rounded-lg p-4">
          <h3 className="text-lg font-semibold  mb-4">分类</h3>
          <div className="space-y-2">
            {categories.map((category) => (
              <div
                key={category.name}
                className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer hover:shadow-sm transition-all ${getCategoryColor(category.color)
                  }`}
              >
                <span className="font-medium">{category.name}</span>
                <span className="text-xs bg-white bg-opacity-70 px-2 py-1 rounded-full">
                  {category.count}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className=" rounded-lg p-4">
          <h3 className="text-lg font-semibold  mb-4">标签</h3>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag.name}
                className={`inline-flex items-center  border  rounded-full cursor-pointer hover:bg-blue-50 hover:border-blue-300 hover:text-blue-600 transition-all
                  }`}
              >
                #{tag.name}
                <span className="ml-1 text-xs ">({tag.count})</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RightSidebar;