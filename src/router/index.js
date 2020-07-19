import Vue from 'vue'
import VueRouter from 'vue-router'
//路由重复点击报错解决
const routerPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error => error)
}


import Home from '@views/home'

const mine = () => import('@views/mine')

Vue.use(VueRouter)

const routes = [{
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    component: () => import('@views/login/index')
  },
  {
    path: '/Home',
    name: 'Home',
    component: Home,
    redirect: '/mine',
    children: [{
        path: '/mine',
        name: 'mine',
        component: mine
      },
      {
        path: '/users',
        name: 'users',
        component: () => import('@views/user')
      },
      {
        path: '/roles',
        name: 'roleList',
        component: () => import('@views/rights/roleList')
      },
      {
        path: '/rights',
        name: 'permissionsList',
        component: () => import('@views/rights/permissionsList')
      },
      {
        path: '/goods',
        name: 'goods',
        component: () => import('@views/commodityManagement/productList')
      },
      {
        path: '/params',
        name: 'params',
        component: () => import('@views/commodityManagement/parameters')
      },
      {
        path: '/categories',
        name: 'categories',
        component: () => import('@views/commodityManagement/classification')
      },
      {
        path: '/addpage',
        name: 'addpage',
        component: () => import('@views/commodityManagement/addpage')
      },
    ]
  },

  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router