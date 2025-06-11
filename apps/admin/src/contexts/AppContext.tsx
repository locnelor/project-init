import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { User, MenuItem } from '../types';

// 应用状态类型
interface AppState {
  user: User | null;
  menuList: MenuItem[];
  loading: boolean;
  collapsed: boolean;
  theme: 'light' | 'dark';
  language: 'zh' | 'en';
}

// 动作类型
type AppAction =
  | { type: 'SET_USER'; payload: User | null }
  | { type: 'SET_MENU_LIST'; payload: MenuItem[] }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'TOGGLE_SIDEBAR' }
  | { type: 'SET_THEME'; payload: 'light' | 'dark' }
  | { type: 'SET_LANGUAGE'; payload: 'zh' | 'en' };

// 初始状态
const initialState: AppState = {
  user: null,
  menuList: [],
  loading: false,
  collapsed: false,
  theme: 'light',
  language: 'zh',
};

// Reducer
function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload };
    case 'SET_MENU_LIST':
      return { ...state, menuList: action.payload };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'TOGGLE_SIDEBAR':
      return { ...state, collapsed: !state.collapsed };
    case 'SET_THEME':
      return { ...state, theme: action.payload };
    case 'SET_LANGUAGE':
      return { ...state, language: action.payload };
    default:
      return state;
  }
}

// Context类型
interface AppContextType {
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
}

// 创建Context
const AppContext = createContext<AppContextType | undefined>(undefined);

// Provider组件
interface AppProviderProps {
  children: ReactNode;
}

export function AppProvider({ children }: AppProviderProps) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

// Hook
export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}

export default AppContext;