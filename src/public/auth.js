import axios from 'axios'

// 导入 NProgress 包对应的JS和CSS 进度条
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'
// 在 request 拦截器中，展示进度条 NProgress.start()

// 在 response 拦截器中，隐藏进度条 NProgress.done()
axios.interceptors.response.use(config => {
    NProgress.done()
    return config
})


window.token = sessionStorage.getItem('token') || ''
sessionStorage.removeItem('token')

function login() {
    axios.interceptors.request.use(config => {
        NProgress.start()
        config.headers.Authorization = window.token
        // 在最后必须 return confi
        return config
    })
}

export default (Vue) => {

    if (window.token) {
        login()
    }

    Vue.prototype.$http = axios
    Vue.prototype.$auth = {
        login: login
    }
}