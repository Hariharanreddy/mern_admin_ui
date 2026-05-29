import React from 'react';
import { ConfigProvider, theme } from 'antd';
import ReactDOM from 'react-dom/client';
import 'antd/dist/reset.css';
import './index.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider } from 'react-router-dom';
import { router } from './router';

import { useThemeStore } from './store';

const queryClient = new QueryClient();

const MainApp = () => {
    const { isDarkMode } = useThemeStore();

    return (
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: '#F65F42',
                    colorLink: '#F65F42',
                },
                algorithm: isDarkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
            }}>
            <RouterProvider router={router} />
        </ConfigProvider>
    );
};

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <MainApp />
        </QueryClientProvider>
    </React.StrictMode>
);
