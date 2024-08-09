// src/layouts/AdminLayout.tsx
import React from 'react';
import { PropChildren } from '~/types/Interface/childrenInterface';
import Sidebar from './Sidebar';
import Header from './Header';

function AdminLayout({ children }: PropChildren) {
    return (
        <div className='flex h-screen overflow-hidden'>
            <Sidebar className='absolute left-0 top-0 h-screen z-[9999] flex flex-col w-[19%] overflow-y-auto bg-[#1c2434] lg:static lg:translate-x-0 -translate-x-full scrollbar scrollbar-none' />
            <div className='relative h-[1000px] w-[81%] overflow-y-auto overflow-x-hidden'>
                <Header />
                <main className='bg-[#f1f5f9] h-screen'>
                    {children}
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;