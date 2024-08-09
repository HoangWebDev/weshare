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
    adminUserUpdate: '/admin/user-update'
};

export { routes, adminRoutes }