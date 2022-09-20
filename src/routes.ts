import Admin from './pages/Admin';
import Basket from './pages/Basket';
import DevicePage from './pages/DevicePage';
import Home from './pages/Home';
import Auth from './pages/Auth';
import Shop from './pages/Shop';
import About from './pages/About';
import {
  ADMIN_ROUTE,
  BASKET_ROUTE,
  DEVICE_ROUTE,
  HOME_ROUTE,
  LOGIN_ROUTE,
  REGISTER_ROUTE,
  SHOP_ROUTE,
  ABOUT_ROUTE,
} from './utils/constant';

export const authRoutes = [
  {
    path: ADMIN_ROUTE,
    element: Admin,
  },
  {
    path: BASKET_ROUTE,
    element: Basket,
  },
];

export const publicRoutes = [
  {
    path: HOME_ROUTE,
    element: Home,
  },
  {
    path: SHOP_ROUTE,
    element: Shop,
  },
  {
    path: LOGIN_ROUTE,
    element: Auth,
  },
  {
    path: REGISTER_ROUTE,
    element: Auth,
  },
  {
    path: ABOUT_ROUTE,
    element: About,
  },
  {
    path: DEVICE_ROUTE + '/:id',
    element: DevicePage,
  },
];
