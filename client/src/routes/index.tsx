import config from '~/config';
import { Route } from '~/types/Types/routeType';

import Contact from '~/pages/Contact/Contact';
import Feed from '~/pages/Feed/Feed';
import Friend from '~/pages/Friend/Friend';
import Watch from '~/pages/Watch/Watch';
import Login from '~/pages/Login/Login';
import Register from '~/pages/Register/Register';
import Profile from '~/pages/Profile/Profile';
import { HeaderOnly, LoginLayout, MainLayout, AdminLayout } from '~/layouts';
import ForgetPass from '~/pages/ForgetPass';
import Dashboard from '~/pages/Admin/Dashboard';
import UserManagement from '~/pages/Admin/UserManagement';
import FeedManagement from '~/pages/Admin/FeedManagement';
import LoginAdmin from '~/pages/Admin/Login';
import ProfileAdmin from '~/pages/Admin/Profile';
import ManagementFeedAdmin from '~/features/ManagementFeedAdmin';
import ManagementUserAdmin from '~/features/ManagementUserAdmin';

//Các route không cần xác thưc
const publicRoutes: Route[] = [
    { path: config.routes.register, component: Register, layout: LoginLayout },
    { path: config.routes.forgetpass, component: ForgetPass, layout: LoginLayout },
    { path: config.routes.login, component: Login, layout: LoginLayout },
];

//Đường route cần xác thực token
const privateRoutes: Route[] = [
    { path: config.routes.home, component: Feed, layout: MainLayout },
    { path: config.routes.feed, component: Feed, layout: MainLayout },
    { path: config.routes.friend, component: Friend, layout: MainLayout },
    { path: config.routes.watch, component: Watch, layout: MainLayout },
    { path: config.routes.contact, component: Contact, layout: MainLayout },
    { path: config.routes.profile, component: Profile, layout: HeaderOnly },
];

const adminRoutes: Route[] = [
    { path: config.adminRoutes.admin, component: Dashboard, layout: AdminLayout },
    { path: config.adminRoutes.adminDashboard, component: Dashboard, layout: AdminLayout },
    { path: config.adminRoutes.adminUser, component: UserManagement, layout: AdminLayout },
    { path: config.adminRoutes.adminFeed, component: FeedManagement, layout: AdminLayout },
    { path: config.adminRoutes.adminUserInfor, component: ManagementUserAdmin, layout: AdminLayout },
    { path: config.adminRoutes.adminFeedInfor, component: ManagementFeedAdmin, layout: AdminLayout },
    { path: config.adminRoutes.adminLogin, component: LoginAdmin, layout: AdminLayout },
    { path: config.adminRoutes.adminProfile, component: ProfileAdmin, layout: AdminLayout },
]

export { publicRoutes, privateRoutes, adminRoutes };
