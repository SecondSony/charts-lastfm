import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import lastfm from './plugins/lastfm'

Vue.config.productionTip = false
Vue.use(lastfm);

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
