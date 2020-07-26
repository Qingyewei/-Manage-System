import Vue from 'vue'
import VueRouter from 'vue-router'
//路由重复点击报错解决
const routerPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error => error)
}


import home from '@/views/home'

const mine = () => import('@/views/mine')

Vue.use(VueRouter)

const routes = [{
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    meta:{title:'登录'}
  },
  {
    path: '/resume',
    component: () => import('@/views/resume/index'),
    meta:{title:'个人简历'}
  },
  {
    path: '/home',
    name: 'home',
    component: home,
    redirect: '/mine',
    children: [{
        path: '/mine',
        name: 'mine',
        component: mine,
        meta:{title:'欢迎'}
      },
      {
        path: '/users',
        name: 'users',
        component: () => import('@/views/user'),
        meta:{title:'用户管理'}
        
      },
      {
        path: '/roles',
        name: 'roleList',
        component: () => import('@/views/rights/roleList'),
        meta:{title:'角色列表'}
      },
      {
        path: '/rights',
        name: 'permissionsList',
        component: () => import('@/views/rights/permissionsList'),
        meta:{title:'权限列表'}
      },
      {
        path: '/goods',
        name: 'goods',
        component: () => import('@/views/commodityManagement/productList'),
        meta:{title:'商品列表'}
      },
      {
        path: '/params',
        name: 'params',
        component: () => import('@/views/commodityManagement/parameters'),
        meta:{title:'分类参数'}
      },
      {
        path: '/categories',
        name: 'categories',
        component: () => import('@/views/commodityManagement/classification'),
        meta:{title:'商品分类'}
      },

      // data数据中没有这个path，所以路由路径不显示
      // {
      //   path: '/addpage',
      //   name: 'addpage',
      //   component: () => import('@/views/commodityManagement/addpage')
      // },
      {
        path: '/orders',
        name: 'orders',
        copmonent: () => import('@/views/orderManagement/orderList'),
        meta:{title:'订单列表'}
        
      },
      {
        path: '/reports',
        name: 'reports',
        copmonent: () => import('@/views/dataStatistics/dataReport'),
        meta:{title:'数据统计'}
      },
      {
        path: '/StudyJavaScriptVue',
        name: 'StudyJavaScriptVue',
        copmonent: () => import('@/views/studyJavaScriptVue'),
        meta:{title:'学习Vue.js'}
        // children: [{
        //   path: '/StudyJavaScriptVue/JavaScriptdragAndDrop',
        //   name: 'StudyJavaScriptVue/JavaScriptdragAndDrop',
        //   copmonent: () => import('@/views/studyJavaScriptVue/JavaScript/JavaScriptdragAndDrop')
        // }, ]
      },
      {
        path: '/dashboard',
        name: 'dashboard',
        copmonent: () => import('@/views/dashboard'),
        meta: { title: '系统首页' }
      },
      {
        path: '/basedTable',
        name: 'basedTable',
        copmonent: () => import('@/views/basedTable'),
        meta: { title: '基础表格' }
      },
      {
        path: '/tabs',
        name: 'tabs',
        copmonent: () => import('@/views/tabs'),
        meta: { title: 'tab选项卡' }
      },
      {
        path: '/basicForm',
        name: 'basicForm',
        copmonent: () => import('@/views/formRelated/basicForm'),
        meta: { title: '基本表单' }
      },
      {
        path: '/editor',
        name: 'editor',
        copmonent: () => import('@/views/formRelated/editor'),
        meta: { title: '富文本编辑器' }
      },
      {
        path: '/markdown',
        name: 'markdown',
        copmonent: () => import('@/views/formRelated/markdown'),
        meta: { title: 'markdown编辑器' }
      },
      {
        path: '/upload',
        name: 'upload',
        copmonent: () => import('@/views/formRelated/upload'),
        meta: { title: '文件上传' }
      },
      {
        path: '/customIcon',
        name: 'customIcon',
        copmonent: () => import('@/views/customIcon'),
        meta: { title: '自定义图标' }
      },
      {
        path: '/schartCharts',
        name: 'schartCharts',
        copmonent: () => import('@/views/schartCharts'),
        meta: { title: 'schart图表' }
      },
      {
        path: '/drag',
        name: 'drag',
        copmonent: () => import('@/views/dragAndDrop/drag'),
        meta: { title: '拖拽列表' }
      },
      {
        path: '/dialogBox',
        name: 'dialogBox',
        copmonent: () => import('@/views/dragAndDrop/dialogBox'),
        meta: { title: '拖拽弹框' }
      },
      {
        path: '/internationalization',
        name: 'internationalization',
        copmonent: () => import('@/views/internationalization'),
        meta: { title: '国际化' }
      },
      {
        path: '/pageMissing',
        name: 'pageMissing',
        copmonent: () => import('@/views/errorHandling/pageMissing.vue'),
        meta: { title: '权限测试', permission: true }
      },
      {
        path: '/permission',
        name: 'permission',
        copmonent: () => import('@/views/errorHandling/permission.vue'),
        meta: { title: '404' }
      },
      // {
      //   path: '/403',
      //   name: '403',
      //   copmonent: () => import('@/views/errorHandling/403.vue'),
      //   meta: { title: '403' }
      // },
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
  document.title = `${to.meta.title} | manage-system`;
  const role = localStorage.getItem('username');
  if (to.path == '/login') {
    if (!window.token) {
      next()
    } else {
      window.token = ''
      next()
    }
  }
   else {
    if (!window.token) {
      next('/login')
    } else {
      next()
    }
  }
})



export default router