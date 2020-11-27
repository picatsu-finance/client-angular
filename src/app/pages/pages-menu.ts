import { NbMenuItem } from '@nebular/theme';


export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Dashboard',
    icon: 'home-outline',
    link: '/pages/dashboard',
  },
  {
    title: 'FEATURES',
    group: true,
  },
  {
    title: 'Stocks',
    icon: 'layout-outline',
    children: [
      {
        title: 'stocks-menu',
        link: '/pages/stocks/stocks-menu',
      },
    ],
  },
  {
    title: 'Forex',
    icon: 'edit-2-outline',
    children: [
      {
        title: 'forex-menu',
        link: '/pages/forex/forex-menu',
      },
    ],
  },
  {
    title: 'Crypto',
    icon: 'keypad-outline',
    children: [
      {
        title: 'crypto menu',
        link: '/pages/crypto/crypto-menu',
      },
    ],
  },
  {
    title: 'Custom Basket',
    icon: 'browser-outline',
    children: [
      {
        title: 'custom-menu',
        link: '/pages/custom-basket/custom-menu',
      },
    ],
  },
  {
    title: 'Extra Products',
    icon: 'message-circle-outline',
    children: [
      {
        title: 'extra-product',
        link: '/pages/extra-products/extra-product',
      },
    ],
  },
  {
    title: 'Auth',
    icon: 'lock-outline',
    children: [
      {
        title: 'Login',
        link: '/pages/auth/login',
      },
      {
        title: 'Profil',
        link: '/pages/auth/profile',
      },
      {
        title: 'Register',
        link: '/pages/auth/register',
      },
      {
        title: 'Request Password',
        link: '/pages/auth/request-password',
      },
      {
        title: 'Reset Password',
        link: '/pages/auth/reset-password',
      },
    ],
  },
];
