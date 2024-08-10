const routes = {
    home: '/',
    login: '/login',
    register: '/register',
    feed: '/feed',
    friend: '/friend',
    watch: '/watch',
    contact: '/contact',
    search: '/search',
    profile: '/:nickname/:id',
    forgetpass: '/forgetpass',
}

const adminRoutes = {
    admin: '/admin',
    adminDashboard: '/admin/dashboard',
    adminUser: '/admin/user-management',
    adminFeed: '/admin/feed-management',
    adminUserInfor: '/admin/user-infor/:id_user',
    adminFeedInfor: '/admin/feed-infor/:id_posts',
    adminLogin: '/admin/login',
    adminProfile: '/admin/profile'
};

export { routes, adminRoutes }