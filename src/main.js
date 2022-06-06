import Vue from 'vue'
import App from './App.vue'
import router from './route/index';
import vuetify from '@/plugins/vuetify' // path to vuetify export
import i18n from './i18n'




new Vue({
  router,
  vuetify,
  i18n,
  render: h => h(App)
}).$mount('#app')
