
'use strict';

export const appInfo = {
  name: 'ClerkBooks Municipal Accounting',
  version: '0.3.23',
  date: 'Jul 20'
}

//apiUri - Moved to environment file
export const apiUri = [
  {
    env: 'local',
    uri: 'https://localhost:44349/'
  },
  {
    env: 'prod',
    uri: 'https://devapi.clerkbooks.com/'
  }
];

export const invalidRoute = {
  path: '**',
  redirectTo: '',
};

export const icons = {
  home: 'fas fa-home',
  contract: 'fas fa-tags',
  customer: 'fas fa-users',
  invoice: 'fas fa-file-invoice-dollar',
  revenue: 'fas fa-dollar-sign',
  report: 'fas fa-chart-bar',
  log: 'fas fa-book',
  setting: 'fas fa-cog',
  profile: 'fas fa-user-circle',
  company: 'fas fa-building',
  integration: 'fas fa-exchange-alt',
  product: 'fas fa-shopping-cart',
  user: 'fas fa-user',
  users: 'fas fa-users'
};

export const menuItems = [
  {
    id: 1,
    text: 'Home',
    icon: 'fas fa-home',
    routeTo: '/'
  },
  {
    id: 2,
    text: 'Memorized Transactions',
    icon: 'fas fa-stopwatch',
    routeTo: '/memorized_transactions'
  },
  {
    isDivider: true
  },
  {
    id: 3,
    text: 'Contacts',
    icon: 'fas fa-users',
    routeTo: '/contacts'
  },
  {
    id: 4,
    text: 'Properties',
    icon: 'fas fa-city',
    routeTo: '/properties'
  },
  {
    id: 5,
    text: 'Meters',
    icon: 'fas fa-tachometer-alt',
    routeTo: '/meters'
  },
  {
    isDivider: true
  },
  {
    id: 6,
    text: 'Utility Bills',
    icon: 'fas fa-shower',
    routeTo: '/utility_bills'
  },
  {
    id: 7,
    text: 'Sales',
    icon: 'fas fa-fax',
    routeTo: '/sales'
  },
  {
    id: 8,
    text: 'Notices',
    icon: 'fas fa-envelope-open-text',
    routeTo: '/notices'
  },
  {
    id: 9,
    text: 'Credits',
    icon: 'fas fa-coins',
    routeTo: '/credits'
  },
  {
    id: 10,
    text: 'Payments',
    icon: 'fas fa-money-check-alt',
    routeTo: '/notices'
  },
  {
    id: 11,
    text: 'Deposits',
    icon: 'fas fa-piggy-bank',
    routeTo: '/deposits'
  },
  {
    id: 12,
    text: 'Sales Tax',
    icon: 'fas fa-percent',
    routeTo: '/sales_tax'
  },
  {
    isDivider: true
  },
  {
    id: 13,
    text: 'Time',
    icon: 'fas fa-clock',
    routeTo: '/time'
  },
  {
    id: 14,
    text: 'Paychecks',
    icon: 'fas fa-money-check',
    routeTo: '/paychecks'
  },
  {
    id: 15,
    text: 'Liabilities',
    icon: 'fas fa-university',
    routeTo: '/liabilities'
  },
  {
    id: 16,
    text: 'Tax Forms',
    icon: 'fas fa-file-invoice',
    routeTo: '/tax_forms'
  },
  {
    isDivider: true
  },
  {
    id: 17,
    text: 'Bills',
    icon: 'fas fa-file-invoice-dollar',
    routeTo: '/bills'
  },
  {
    id: 18,
    text: 'Pay Bills',
    icon: 'fas fa-envelope',
    routeTo: '/pay_bills'
  },
  {
    id: 19,
    text: 'Register',
    icon: 'fas fa-clipboard-list',
    routeTo: '/register'
  },
  {
    isDivider: true
  },
  {
    id: 20,
    text: 'Reports',
    icon: 'fas fa-chart-bar',
    routeTo: '/reports'
  },
  {
    id: 21,
    text: 'Budgets',
    icon: 'fas fa-bullseye',
    routeTo: '/budgets'
  },
  {
    isDivider: true
  },
  {
    id: 22,
    text: 'COA',
    icon: 'fas fa-list',
    routeTo: '/coa'
  },
  {
    isDivider: true
  },
  {
    id: 24,
    text: 'Backup',
    icon: 'fas fa-hdd',
    routeTo: '/backup'
  },
  {
    id: 25,
    text: 'Settings',
    icon: 'fas fa-cog',
    routeTo: '/settings'
  }
];

export const setupItems = [
  {
    text: 'My Profile',
    icon: icons.profile,
    routeTo: '/setup',
    isComplete: false,
    order: 1
  },
  {
    text: 'Company Info',
    icon: icons.company,
    routeTo: '/setup/company',
    isComplete: false,
    order: 2
  },
  {
    text: 'Integrations',
    icon: icons.integration,
    routeTo: '/setup/integrations',
    isComplete: false,
    order: 3
  },
  {
    text: 'Products',
    icon: icons.product,
    routeTo: '/setup/products',
    isComplete: false,
    order: 4
  },
  {
    text: 'Invoice Settings',
    icon: icons.invoice,
    routeTo: '/setup/invoice_settings',
    isComplete: false,
    order: 5
  },
  {
    text: 'Sales Contracts',
    icon: icons.contract,
    routeTo: '/setup/sales_contracts',
    isComplete: false,
    order: 6
  }

];

export const adminMenuItems = [
  {
    text: 'Home',
    icon: icons.home,
    routeTo: '/admin',
    order: 1
  },
  {
    text: 'Companies',
    icon: icons.users,
    routeTo: '/admin/companies',
    order: 2
  }
];

export const languages = [
  {
    text: 'English (US)',
    code: 'en-us'
  },
  {
    text: 'Spanish (español)',
    code: 'es'
  }
];
