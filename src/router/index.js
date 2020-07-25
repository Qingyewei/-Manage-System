import Vue from 'vue'
import VueRouter from 'vue-router'
//路由重复点击报错解决
const routerPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error => error)
}


import home from '@views/home'

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
    path: '/home',
    name: 'home',
    component: home,
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

      // data数据中没有这个path，所以路由路径不显示
      // {
      //   path: '/addpage',
      //   name: 'addpage',
      //   component: () => import('@views/commodityManagement/addpage')
      // },
      {
        path: '/orders',
        name: 'orders',
        copmonent: () => import('@views/orderManagement/orderList')
      },
      {
        path: '/reports',
        name: 'reports',
        copmonent: () => import('@views/dataStatistics/dataReport')
      },
      {
        path: '/StudyJavaScriptVue',
        name: 'StudyJavaScriptVue',
        copmonent: () => import('@views/studyJavaScriptVue'),
        // children: [{
        //   path: '/StudyJavaScriptVue/JavaScriptdragAndDrop',
        //   name: 'StudyJavaScriptVue/JavaScriptdragAndDrop',
        //   copmonent: () => import('@views/studyJavaScriptVue/JavaScript/JavaScriptdragAndDrop')
        // }, ]
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
  // mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.path == '/login') {
    if(!window.token){
      next()
    }else{
      window.token = ''
      next()
    }
  } else {
    if (!window.token) {
      next('/login')
    } else {
      next()
    }
  }
})



export default router