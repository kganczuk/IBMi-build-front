import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import App from './App'
import router from './router'
import SidebarMenu from 'vue-sidebar-menu'

Vue.config.productionTip = false

Vue.use(BootstrapVue)
Vue.use(SidebarMenu)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
