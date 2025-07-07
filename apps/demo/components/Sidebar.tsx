"use client"
import React from 'react';

interface SidebarProps {
  user: {
    name: string;
    avatar: string;
    bio: string;
    email: string;
    github?: string;
    twitter?: string;
  };
}

const Sidebar: React.FC<SidebarProps> = ({ user }) => {

  const navItems = [
    { name: '首页', href: '/', icon: '🏠' },
    { name: '关于', href: '/about', icon: '👤' },
    { name: '类别', href: '/categories', icon: '📂' },
    { name: '归档', href: '/archive', icon: '📚' },
    { name: '留言', href: '/messages', icon: '💬' },
  ];

  return (
    <div className="h-screen w-64 overflow-y-auto flex flex-col   border-r ">
      <div className="p-6 flex-1">
        {/* 用户信息 */}
        <div className="text-center mb-8">
          <img
            src={user.avatar}
            alt={user.name}
            className="w-20 h-20 rounded-full mx-auto mb-4 border-4 border-blue-100"
          />
          <h2 className="text-xl font-bold  mb-2">{user.name}</h2>
          <p className=" text-sm mb-4">{user.bio}</p>

          {/* 联系方式 */}
          <div className="flex justify-center space-x-3">
            <a
              href={`mailto:${user.email}`}
              className="text-gray-500 hover:text-blue-500 transition-colors"
              title="邮箱"
            >
              📧
            </a>
            {user.github && (
              <a
                href={user.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-blue-500 transition-colors"
                title="GitHub"
              >
                🐙
              </a>
            )}
            {user.twitter && (
              <a
                href={user.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-blue-500 transition-colors"
                title="Twitter"
              >
                🐦
              </a>
            )}
          </div>
        </div>

        {/* 导航菜单 */}
        <nav>
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.name}>
                <a
                  href={item.href}
                  className="flex items-center space-x-3 px-4 py-3 rounded-lg  hover:bg-theme-hover hover:text-blue-600 transition-colors"
                >
                  <span className="text-lg">{item.icon}</span>
                  <span className="font-medium">{item.name}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;