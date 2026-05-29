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
                    colorPrimary: '#7C3AED',
                    colorLink: '#7C3AED',
                    colorSuccess: '#10B981',
                    borderRadius: 8,
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
