import { ReactNode } from 'react';

// Định nghĩa một kiểu cho route
export type Route = {
    path: string;
    component: React.ComponentType<any>;
    layout?: React.FC<{ children: ReactNode }> | null;
};
