// src/features/PrivateRoute/PrivateRoute.tsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
    const { isAuthenticated, userRole } = getAuthDetails();

    // Nếu người dùng không xác thực, chuyển hướng đến trang đăng nhập
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    // Nếu người dùng không phải admin (role !== '1'), cho phép truy cập vào các route user
    if (userRole === '1') {
        return <Navigate to="/admin" replace />;
    }

    // Nếu người dùng không phải admin (role !== '1'), cho phép truy cập vào các route user
    if (userRole === '0') {
        return <Outlet />;
    }

    // Nếu không phải user hoặc admin, chuyển hướng đến trang đăng nhập
    return <Navigate to="/login" replace />;
};

// Hàm kiểm tra chi tiết xác thực và vai trò người dùng
const getAuthDetails = () => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');

    // Kiểm tra nếu token và vai trò tồn tại và hợp lệ
    const isAuthenticated = token && role && role !== 'null' && role !== 'undefined';

    return { isAuthenticated, userRole: role };
};

export default PrivateRoute;
