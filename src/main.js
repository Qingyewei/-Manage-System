import Vue from 'vue'
import App from './App.vue'
import router from './router'

import store from './store'

// 导入富文本编辑器
import VueQuillEditor from 'vue-quill-editor'

// 导入富文本编辑器 styles
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
// 将富文本编辑器，注册为全局可用的组件
Vue.use(VueQuillEditor)

// 导入mavonEditor编辑器
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
// use
Vue.use(mavonEditor)

// 导入上传文件插件
import VueCropper from 'vue-cropperjs';
import 'cropperjs/dist/cropper.css';
Vue.component(VueCropper);

import '@assets/fonts/iconfont.css'

import './assets/css/global.less'
import './assets/css/cover.less'

//导入ag-grid
import '../node_modules/ag-grid-community/dist/styles/ag-grid.css'
import '../node_modules/ag-grid-community/dist/styles/ag-theme-alpine.css'

//注册拖拽
import '@/public/directives';

//导入iconfont包
import '@/assets/fonts/iconfont.js'

//国际化功能
import VueI18n from 'vue-i18n'
import { messages } from './public/i18n';
Vue.use(VueI18n);
const i18n = new VueI18n({
  locale: 'zh',
  messages
});

//导入ElementUI
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

Vue.config.productionTip = false

// 导入 NProgress 包对应的JS和CSS 进度条
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

//全局注册组件tree-table
import TreeTable from 'vue-table-with-tree-grid'
Vue.component('tree-table', TreeTable)

//全局timeline时间线
import Timeline from './plugins/timeline/index.js'
import TimelineItem from './plugins/timeline-item/index.js'
import './plugins/timeline/timeline.css';
import './plugins/timeline-item/timeline-item.css';

Vue.use(Timeline)
Vue.use(TimelineItem)


import Schart from 'vue-schart'
Vue.use(Schart)


import auth from '@/public/auth'
Vue.use(auth)

// import axios from 'axios'
// axios.defaults.baseURL='http://127.0.0.1:8888/api/private/v1/'
// // 在 request 拦截器中，展示进度条 NProgress.start()
// axios.interceptors.request.use(config =>{
//   NProgress.start()
//   config.headers.Authorization = window.sessionStorage.getItem('token')
//   // 在最后必须 return confi
//   return config
// })
// // 在 response 拦截器中，隐藏进度条 NProgress.done()
// axios.interceptors.response.use(config=>{
//   NProgress.done()
//   return config
// })
// Vue.prototype.$http = axios

Vue.filter('dateFormat', function(originVal) {
  const dt = new Date(originVal)

  const y = dt.getFullYear()
  const m = (dt.getMonth() + 1 + '').padStart(2, '0')
  const d = (dt.getDate() + '').padStart(2, '0')

  const hh = (dt.getHours() + '').padStart(2, '0')
  const mm = (dt.getMinutes() + '').padStart(2, '0')
  const ss = (dt.getSeconds() + '').padStart(2, '0')

  return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
})

new Vue({
  router,
  i18n,
  store,
  render: h => h(App)
}).$mount('#app')
