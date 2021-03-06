// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// require('es6-promise').polyfill()
import 'babel-polyfill'
import Vue from 'vue'
import ElementUI from 'element-ui'
import Vueditor from 'vueditor'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/css/index.css'
import 'vueditor/dist/style/vueditor.min.css'
import App from './App'
import store from './store/'
import router from './router'
import PdfLabel from './components/commomComponents/pdfLabel_moudle/install'

import util from 'utils/utils'
import sever from 'api/sever_api'
import GlobalMount from 'utils/globalmount'
import './utils/svg_icon_req'
import './assets/js/iconfont'
import editorConfig from './config/editor_config'
Vue.use(Vueditor, editorConfig)

Vue.use(ElementUI)
Vue.use(GlobalMount)
Vue.use(PdfLabel)

Vue.config.productionTip = false

/**
 * 将 网路请求http 方法 绑定到全局
 * 将 公用util 方法 绑定到全局
 * */
Vue.prototype.util = util
Vue.prototype.$sever = sever

router.beforeEach((to, from, next) => {
  let user = util.getStorage('TTD_MANAGE_USERINFO')
  if (user && Object.keys(user).length) {
    if (to.path === '/login' || to.path === '/index') {
      next({path: '/home/index'})
    } else {
      next()
    }
  } else {
    if (to.path === '/login' || to.path === '/index' || to.path === '/revise_password') {
      next()
    } else {
      next({path: '/login'})
    }
  }
})

/* eslint-disable no-new */
var vm = new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
export default vm
