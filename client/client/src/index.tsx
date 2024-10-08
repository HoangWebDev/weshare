import React from 'react';
import ReactDOM from 'react-dom/client';
import '~/styles/index.css';
import App from '~/App';
import reportWebVitals from '~/reportWebVitals';
import ResponsiveProvider from '~/features/Provider/ResponsiveProvider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <ResponsiveProvider>
        <QueryClientProvider client={queryClient}>
            <App />
        </QueryClientProvider>
    </ResponsiveProvider>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
