import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../components/login/login.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/home',
    name: 'home',
    component: Home,
    redirect: "/goodslist",
    children: [
      {
        path: '/goodslist',
        name: 'Goodslist',
        component: () => import('../components/good/Goodslist.vue')
      },
      {
        path: '/setgoods',
        name: 'Setgoods',
        component: () => import('../components/good/Setgoods.vue')
      },
      {
        path: '/setgoods/:id',
        component: () => import('../components/good/Setgoods.vue'),
        props: true
      },
      {
        path: '/handle',
        name: 'handle',
        component: () => import('../components/handle/handle.vue')
      },
      {
        path: '/unhandle',
        name: 'unhandle',
        component: () => import('../components/handle/unhandle.vue')
      },
      {
        path: '/adminlist',
        name: 'adminlist',
        component: () => import('../components/admin/adminlist.vue')
      },
      {
        path: '/setadmin',
        name: 'setadmin',
        component: () => import('../components/admin/setadmin.vue')
      },
      {
        path: '/setadmin/:id',
        component: () => import('../components/admin/setadmin.vue'),
        props: true
      },
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
