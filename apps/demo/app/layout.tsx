import type { Metadata } from "next";
import "@repo/styles"
import Sidebar from "#/components/Sidebar";
import RightSidebar from "#/components/RightSidebar";
import { prisma } from "@repo/database";

export const metadata: Metadata = {
  title: "locnelor的博客",
  description: "一个基于Next.js和TailwindCSS的现代化博客",
};

const RootLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  // 模拟用户数据
  const userData = {
    name: 'locnelor',
    avatar: '/icon.jpeg',
    bio: '全栈开发者，热爱技术分享',
    email: 'locnelor@icloud.com',
    github: 'https://github.com/locnelor',
  };


  const categoriesData = [
    { name: '前端开发', count: 15, color: 'blue' },
    { name: 'CSS', count: 8, color: 'green' },
    { name: '编程语言', count: 12, color: 'purple' },
    { name: '工程化', count: 6, color: 'red' },
    { name: '数据库', count: 4, color: 'yellow' },
  ];
  const tagsData = (await prisma.blog_tag.findMany({
    include: {
      _count: true
    },
    orderBy: {
      articles: {
        _count: 'desc'
      }
    },
    take: 20
  })).map((item) => ({ ...item, count: item._count.articles }))
  return (
    <html lang="zh-CN">
      <body className=" font-sans antialiased">
        <div className="min-h-screen">
          <div>
            <div className="min-h-screen ">
              <div className="fixed left-0 top-0 w-64 z-40">
                <Sidebar user={userData} />
              </div>

              <div className="fixed right-0 top-0 w-96 z-40">
                <RightSidebar
                  categories={categoriesData}
                  tags={tagsData}
                />
              </div>

              {/* 主要内容区域 - 居中布局，最大宽度1200px */}
              <div className="max-w-[1200px] mx-auto">
                <main className="ml-64 mr-80 px-8 py-8 min-h-screen">
                  {children}
                </main>
              </div>
            </div>
          </div>
        </div>
      </body >
    </html>
  );
}

export default RootLayout