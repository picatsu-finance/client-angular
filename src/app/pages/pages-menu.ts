import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Home',
    icon: 'shopping-cart-outline',
    link: '/pages/home',
    home: true,
  },
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
        title: 'Stepper',
        link: '/pages/stocks/stepper',
      },
      {
        title: 'List',
        link: '/pages/stocks/list',
      },
      {
        title: 'Infinite List',
        link: '/pages/stocks/infinite-list',
      },
      {
        title: 'Accordion',
        link: '/pages/stocks/accordion',
      },
      {
        title: 'Tabs',
        pathMatch: 'prefix',
        link: '/pages/stocks/tabs',
      },
    ],
  },
  {
    title: 'Forex',
    icon: 'edit-2-outline',
    children: [
      {
        title: 'Form Inputs',
        link: '/pages/forex/inputs',
      },
      {
        title: 'Form Layouts',
        link: '/pages/forex/layouts',
      },
      {
        title: 'Buttons',
        link: '/pages/forex/buttons',
      },
      {
        title: 'Datepicker',
        link: '/pages/forex/datepicker',
      },
    ],
  },
  {
    title: 'Crypto',
    icon: 'keypad-outline',
    link: '/pages/ui-features',
    children: [
      {
        title: 'Grid',
        link: '/pages/crypto/grid',
      },
      {
        title: 'Icons',
        link: '/pages/crypto/icons',
      },
      {
        title: 'Typography',
        link: '/pages/crypto/typography',
      },
      {
        title: 'Animated Searches',
        link: '/pages/crypto/search-fields',
      },
    ],
  },
  {
    title: 'Custom Basket',
    icon: 'browser-outline',
    children: [
      {
        title: 'Dialog',
        link: '/pages/custom-basket/dialog',
      },
      {
        title: 'Window',
        link: '/pages/custom-basket/window',
      },
      {
        title: 'Popover',
        link: '/pages/custom-basket/popover',
      },
      {
        title: 'Toastr',
        link: '/pages/custom-basket/toastr',
      },
      {
        title: 'Tooltip',
        link: '/pages/custom-basket/tooltip',
      },
    ],
  },
  {
    title: 'Extra Products',
    icon: 'message-circle-outline',
    children: [
      {
        title: 'Calendar',
        link: '/pages/extra-products/calendar',
      },
      {
        title: 'Progress Bar',
        link: '/pages/extra-products/progress-bar',
      },
      {
        title: 'Spinner',
        link: '/pages/extra-products/spinner',
      },
      {
        title: 'Alert',
        link: '/pages/extra-products/alert',
      },
      {
        title: 'Calendar Kit',
        link: '/pages/extra-products/calendar-kit',
      },
      {
        title: 'Chat',
        link: '/pages/extra-products/chat',
      },
    ],
  },
  {
    title: 'Profil',
    icon: 'map-outline',
    children: [
      {
        title: 'Google Maps',
        link: '/pages/profil/gmaps',
      },
      {
        title: 'Leaflet Maps',
        link: '/pages/profil/leaflet',
      },
      {
        title: 'Bubble Maps',
        link: '/pages/profil/bubble',
      },
      {
        title: 'Search Maps',
        link: '/pages/profil/searchmap',
      },
    ],
  },
  {
    title: 'Charts',
    icon: 'pie-chart-outline',
    children: [
      {
        title: 'Echarts',
        link: '/pages/charts/echarts',
      },
      {
        title: 'Charts.js',
        link: '/pages/charts/chartjs',
      },
      {
        title: 'D3',
        link: '/pages/charts/d3',
      },
    ],
  },

  {
    title: 'Auth',
    icon: 'lock-outline',
    children: [
      {
        title: 'Login',
        link: '/auth/login',
      },
      {
        title: 'Register',
        link: '/auth/register',
      },
      {
        title: 'Request Password',
        link: '/auth/request-password',
      },
      {
        title: 'Reset Password',
        link: '/auth/reset-password',
      },
    ],
  },
];
