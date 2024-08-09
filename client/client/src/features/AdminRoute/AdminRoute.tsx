// src/features/AdminRoute/AdminRoute.tsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const AdminRoute = () => {
    const { isAuthenticated, userRole } = getAuthDetails();

    // Nếu người dùng không xác thực hoặc không phải admin, chuyển hướng đến trang đăng nhập
    if (!isAuthenticated || userRole !== '1') {
        return <Navigate to="/login" replace />;
    }

    // Nếu người dùng là admin, cho phép truy cập vào các route admin
    return <Outlet />;
};

// Hàm kiểm tra chi tiết xác thực và vai trò người dùng
const getAuthDetails = () => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');

    // Kiểm tra nếu token và vai trò tồn tại và hợp lệ
    const isAuthenticated = token && role && role !== 'null' && role !== 'undefined';

    return { isAuthenticated, userRole: role };
};

export default AdminRoute;
