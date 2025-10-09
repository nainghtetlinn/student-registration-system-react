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

    forms: {
      root: {
        path: '/admin/forms',
        getHref: () => '/admin/forms',
      },
      create: {
        path: '/admin/forms/create',
        getHref: () => '/admin/forms/create',
      },
      form: {
        path: '/admin/forms/:id',
        getHref: (id: string) => `/admin/forms/${id}`,
      },
      update: {
        path: '/admin/forms/:id/update',
        getHref: (id: string) => `/admin/forms/${id}/update`,
      },
    },

    profile: {
      root: {
        path: '/admin/profile',
        getHref: () => '/admin/profile',
      },
      create: {
        path: '/admin/profile/create',
        getHref: () => '/admin/profile/create',
      },
      update: {
        path: '/admin/profile/update',
        getHref: () => '/admin/profile/update',
      },
    },

    accounts: {
      details: {
        path: '/admin/accounts/:email',
        getHref: (email: string) => `/admin/accounts/${email}`,
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

  student: {
    root: {
      path: '/student',
      getHref: () => '/student',
    },
    update: {
      root: { path: '/student/update', getHref: () => '/student/update' },
      success: {
        path: '/student/update/success',
        getHref: () => '/student/update/success',
      },
    },
    register: {
      root: { path: '/student/register', getHref: () => '/student/register' },
      success: {
        path: '/student/register/success',
        getHref: () => '/student/register/success',
      },
    },
  },
} as const
