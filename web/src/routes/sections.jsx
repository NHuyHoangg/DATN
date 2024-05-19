/* eslint-disable */
import { lazy, Suspense } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';

import DashboardLayout from 'src/layouts/dashboard';
import DetailOrder from 'src/sections/order/detail-order';

export const AdPage = lazy(() => import('src/pages/ad'))
export const IndexPage = lazy(() => import('src/pages/app'));
export const BlogPage = lazy(() => import('src/pages/blog'));
export const UserPage = lazy(() => import('src/pages/user'));
export const LoginPage = lazy(() => import('src/pages/login'));
export const ProductsPage = lazy(() => import('src/pages/products'));
export const Page404 = lazy(() => import('src/pages/page-not-found'));
export const PostPage = lazy(() => import('src/pages/post'));
export const DetailPost = lazy(() => import('src/sections/post/detail-post'));
export const ReportPage = lazy(() => import('src/pages/report'));
export const DetailReport = lazy(() => import('src/sections/report/detail-report'));
export const OrderPage = lazy(() => import('src/pages/order'));
export const OrderDetail = lazy(() => import('src/sections/order/detail-order'));
export const OrderShipping = lazy(() => import('src/sections/order/order-shipping'));

// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      path: '/',
      element: <LoginPage />
    },
    {
      element: (
        <DashboardLayout>
          <Suspense>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      ),
      children: [
        { path: 'dashboard', element: <IndexPage />, index: true },
        { path: 'user', element: <UserPage /> },
        { path: 'post', 
          children: [
            { path: '', element: <PostPage /> },
            { path: 'detail/:post_id', element: <DetailPost /> },
          ]
        },
        { path: 'order', 
          children: [
            { path: '', element: <OrderPage /> },
            { path: 'detail/:post_id', element: <DetailOrder /> },
            { path: 'shipping/:post_id', element: <OrderShipping /> },
          ]
        },
        { path: 'report', 
          children: [
            { path: '', element: <ReportPage /> },
            { path: 'detail/:post_id', element: <DetailReport /> },
          ]
        },
        { path: 'auction', element: <BlogPage /> },
        { path: 'purchase', element: <ProductsPage /> },
        { path: 'ad', element: <AdPage />},
      ],
    },
    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      path: '404',
      element: <Page404 />,
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
