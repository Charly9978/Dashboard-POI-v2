import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/IndexPage.vue') }],
  },
  {
    path:'/incidents',
    component: () => import('layouts/MainLayout.vue'),
    children: [{
      path:'', component: () => import('pages/IndexPage.vue')
    },{
      path:'new',
      component: () => import('pages/CreateIncident.vue')
    }]
  },
  {
    path:'/incidents/:id',
    component: () =>import('layouts/MainLayout.vue'),
    children: [
      {
        path:'',
        component: ()=> import('pages/IncidentPage.vue')
      }
    ]
  },
  {
    path:'/test',
    component: () =>import('layouts/MainLayout.vue'),
    children: [
      {
        path:'',
        component: ()=> import('pages/TestPage.vue')
      }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
