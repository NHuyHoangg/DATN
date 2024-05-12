import SvgColor from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const navConfig = [
  {
    title: 'Thống kê',
    path: '/',
    icon: icon('ic_analytics'),
  },
  {
    title: 'Người dùng',
    path: '/user',
    icon: icon('ic_user'),
  },
  {
    title: 'Bài đăng',
    path: '/post',
    icon: icon('ic_post'),
  },
  {
    title: 'Đơn hàng',
    path: '/order',
    icon: icon('ic_cart'),
  },
  {
    title: 'Báo cáo',
    path: '/report',
    icon: icon('ic_report'),
  },
  // {
  //   title: 'Đấu giá',
  //   path: '/auction',
  //   icon: icon('ic_auction'),
  // },
  {
    title: 'Gói đẩy tin',
    path: '/ad',
    icon: icon('ic_purchase'),
  },
  {
    title: 'login',
    path: '/login',
    icon: icon('ic_lock'),
  },
  {
    title: 'Not found',
    path: '/404',
    icon: icon('ic_disabled'),
  },
];

export default navConfig;
