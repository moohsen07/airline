const routes = [{
    path: '/',
    redirect: '/login',
    component: () => import('layouts/MainLayout.vue'),
    children: [{
      path: 'login',
      component: () => import('src/pages/Login.vue')
    }, ]
  },

  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [{
        path: '/admin',
        component: () => import('src/pages/Admin.vue')
      },
      {
        path: '/user',
        component: () => import('src/pages/User.vue')
      },
    ]
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
