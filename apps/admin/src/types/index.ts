// 用户信息类型
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: string;
}

// 菜单项类型
export interface MenuItem {
  id: string;
  title: string;
  path?: string;
  icon?: string;
  children?: MenuItem[];
  parentId?: string;
}

// API响应类型
export interface ApiResponse<T = any> {
  code: number;
  message: string;
  data: T;
}

// 分页类型
export interface Pagination {
  current: number;
  pageSize: number;
  total: number;
}

// 表格数据类型
export interface TableData<T = any> {
  list: T[];
  pagination: Pagination;
}