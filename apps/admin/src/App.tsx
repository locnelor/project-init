
import { BrowserRouter } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import { AppProvider } from './contexts/AppContext';
import AppRouter from './router';
import 'dayjs/locale/zh-cn';

function App() {
  return (
    <ConfigProvider locale={zhCN}>
      <AppProvider>
        <BrowserRouter>
          <AppRouter />
        </BrowserRouter>
      </AppProvider>
    </ConfigProvider>
  );
}

export default App;
