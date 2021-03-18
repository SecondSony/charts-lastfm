import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import lastfm from './plugins/lastfm'
import InfiniteLoading from 'vue-infinite-loading'

Vue.config.productionTip = false
Vue.use(lastfm);
Vue.use(InfiniteLoading);

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
