export const paths = {
  home: {
    path: '/',
    getHref: () => '/',
  },
  auth: {
    login: {
      path: '/auth/login',
      getHref: (redirectTo?: string) =>
        `/auth/login${redirectTo ? `?redirect=${encodeURIComponent(redirectTo)}` : ''}`,
    },
    changePassword: {
      path: '/auth/change-password',
      getHref: (redirectTo?: string) =>
        `/auth/change-password${redirectTo ? `?redirect=${encodeURIComponent(redirectTo)}` : ''}`,
    },
  },

  admin: {
    root: {
      path: '/admin',
      getHref: () => '/admin',
    },
    accounts: {
      details: {
        path: '/accounts/',
        getHref: (id: string | number) => `/admin/accounts/${id}`,
      },
    },
    staffs: {
      paths: '/admin/staffs',
      getHref: () => '/admin/staffs',
    },
    students: {
      paths: '/admin/students',
      getHref: () => '/admin/students',
    },
    register: {
      paths: '/admin/register',
      getHref: () => '/admin/register',
    },
    shortcuts: {
      path: '/admin/shortcuts',
      getHref: () => '/admin/shortcuts',
    },
  },
} as const
