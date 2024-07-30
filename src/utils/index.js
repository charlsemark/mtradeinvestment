import {
  ActivitySquare,
  BarChartHorizontal,
  CalendarRange,
  CandlestickChart,
  CreditCard,
  GalleryThumbnails,
  TextCursorInput,
  UserCircle,
  UserCircle2,
} from 'lucide-react';


// export const tradersArray = [
//   {
//     img: TradeOne,
//     name: 'Derick Duke',
//     username: '@investmaimi',
//     percentage: '10%',
//   },
//   {
//     img: TradeTwo,
//     name: 'Brandson Clark',
//     username: '@funbuying',
//     percentage: '32%',
//   },
//   {
//     img: TradeThree,
//     name: 'Mirabel McDonald',
//     username: '@bearishgirl',
//     percentage: '40%',
//   },
//   {
//     img: TradeFour,
//     name: 'Mirabel McDonald',
//     username: '@bearishgirl',
//     percentage: '40%',
//   },
// ]

export const navOptions = [
  {
    id: 'home',
    label: 'Home',
    path: '/',
  },
  {
    id: 'investments',
    label: 'Investments',
    path: '/investments',
  },
  {
    id: 'about',
    label: 'About Us',
    path: '/about-us',
  },
  {
    id: 'contact',
    label: 'Contact',
    path: '/contact',
  },
];

export const adminNavOptions = [
  {
    id: 'users',
    label: 'Users',
    path: '/admin/users',
  },
  {
    id: 'plans',
    label: 'Plans',
    path: '/admin/plans',
  },
  {
    id: 'transactions',
    label: 'Transactions',
    path: '/admin/transactions',
  },
  {
    id: 'investments',
    label: 'Investments',
    path: '/admin/investments',
  },
  {
    id: 'invest',
    label: 'Create Investments',
    path: '/admin/create-plans',
  },
  {
    id: 'copies',
    label: 'Copiers',
    path: '/admin/create-copiers',
  },
];

export const registrationFormControls = [
  {
    id: 'name',
    type: 'text',
    placeholder: 'Enter your fullname',
    label: 'Fullname',
    componentType: 'input',
  },
  {
    id: 'username',
    type: 'text',
    placeholder: 'Enter Username',
    label: 'Username',
    componentType: 'input',
  },
  {
    id: 'email',
    type: 'email',
    placeholder: 'Enter your email',
    label: 'Email Address',
    componentType: 'input',
  },
  {
    id: 'address',
    type: 'text',
    placeholder: 'Enter your home address',
    label: 'Home Address',
    componentType: 'input',
  },
  {
    id: 'state',
    type: 'text',
    placeholder: 'Enter your city',
    label: 'City/State',
    componentType: 'input',
  },
  {
    id: 'country',
    type: 'text',
    placeholder: 'Enter your country',
    label: 'Country',
    componentType: 'input',
  },
  {
    id: 'password',
    type: 'password',
    placeholder: 'Enter your password',
    label: 'Password',
    componentType: 'input',
  },
  {
    id: 'phone',
    type: 'number',
    placeholder: 'Phone number',
    label: 'Phone',
    componentType: 'input',
  },
  {
    id: 'role',
    type: '',
    placeholder: '',
    label: 'Role',
    componentType: 'select',
    options: [
      {
        id: 'admin',
        label: 'admin',
      },
      {
        id: 'client',
        label: 'client',
      },
    ],
  },
];

export const adminCreateInvestmentControls = [
  {
    id: 'planName',
    type: 'text',
    placeholder: 'Enter Investment Name',
    label: 'Name',
    componentType: 'input',
  },
  {
    id: 'minPrice',
    type: 'number',
    placeholder: 'Minimum price',
    label: 'Min. Price',
    componentType: 'input',
  },
  {
    id: 'maxPrice',
    type: 'number',
    placeholder: 'Maximum price',
    label: 'Max. Price',
    componentType: 'input',
  },
  {
    id: 'roiPeriod',
    type: '',
    placeholder: 'Monthly, Weekly, Daily...',
    label: 'Profit Period',
    componentType: 'select',
    options: [
      {
        id: 'Montly',
        label: 'Monthly',
      },
      {
        id: 'Weekly',
        label: 'Weekly',
      },
      {
        id: 'Daily',
        label: 'Daily',
      },
    ],
  },
  {
    id: 'roi',
    type: 'number',
    placeholder: 'Percentage(%) increase',
    label: 'Investment rate',
    componentType: 'input',
  },
  {
    id: 'period',
    type: '',
    placeholder: '',
    label: 'Period',
    componentType: 'select',
    options: [
      {
        id: '31',
        label: '1 Month',
      },
      {
        id: '93',
        label: '3 Months',
      },
      {
        id: '186',
        label: '6 Months',
      },
      {
        id: '372',
        label: '1 year',
      },
    ],
  },
];

export const createWalletAddressControls = [
  {
    id: 'walletName',
    type: '',
    placeholder: '',
    label: 'Wallet Name',
    componentType: 'select',
    options: [
      {
        id: 'Select',
        label: 'Select an option',
      },
      {
        id: 'bitcoin',
        label: 'Bitcoin',
      },
      {
        id: 'litecoin',
        label: 'Litecoin',
      },
      {
        id: 'conflux',
        label: 'Conflux',
      },
      {
        id: 'usdt',
        label: 'USDT',
      },
    ],
  },
  {
    id: 'walletAddress',
    type: 'text',
    placeholder: 'Wallet Address',
    label: 'Wallet Address',
    componentType: 'input',
  },
]

export const loginFormControls = [
  {
    id: 'email',
    type: 'email',
    placeholder: 'Enter your email',
    label: 'Email Address',
    componentType: 'input',
  },
  {
    id: 'password',
    type: 'password',
    placeholder: 'Enter your password',
    label: 'Password',
    componentType: 'input',
  },
];

export const dashboardNavLinks = [
  {
    id: 'account',
    label: 'Home',
    path: '/dashboard/',
    icon: <UserCircle2 />,
  },
  {
    id: 'investments',
    label: 'Investments',
    path: '/dashboard/investments',
    icon: <BarChartHorizontal />,
  },
  {
    id: 'transactions',
    label: 'Transactions',
    path: '/dashboard/transactions',
    icon: <CalendarRange />,
  },
  {
    id: 'invest',
    label: 'Plans',
    path: '/dashboard/plans',
    icon: <ActivitySquare />,
  },
  {
    id: 'fund',
    label: 'Deposit',
    path: '/dashboard/deposit',
    icon: <CreditCard />,
  },
  {
    id: 'witdraw',
    label: 'Withdraw',
    path: '/dashboard/withdraw',
    icon: <GalleryThumbnails />,
  },
  {
    id: 'profile',
    label: 'Profile',
    path: '/dashboard/profile',
    icon: <UserCircle />,
  },
  // {
  //   id: 'logout',
  //   label: 'Logout',
  //   icon: <TextCursorInput />,
  // },
];

export const recentWithdraws = [
  {
    id: 1,
    user: 'Scoot',
    amount: 300,
  },
  {
    id: 2,
    user: 'Tabitha',
    amount: 600,
  },
  {
    id: 3,
    user: 'Charlse',
    amount: 3500,
  },
  {
    id: 4,
    user: 'Smith',
    amount: 1400,
  },
];

export const firebaseConfig = {
  apiKey: "AIzaSyDkIxD29L9ANNijQcUY19VRCWqIlk0Qouw",
  authDomain: "nextjs-indexcopier.firebaseapp.com",
  projectId: "nextjs-indexcopier",
  storageBucket: "nextjs-indexcopier.appspot.com",
  messagingSenderId: "1096908732110",
  appId: "1:1096908732110:web:3a91f7f1b71623d243c29f"
};


export const firebaseStorageURL = 'gs://nextjs-indexcopier.appspot.com';


