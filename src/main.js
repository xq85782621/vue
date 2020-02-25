


import 'view-design/dist/styles/iview.css';


import Vue from 'vue'
import App from './App'
import router from './router'
import Vuex from 'vuex';
import Axios from 'axios';

import iView from 'view-design';

import store from '@/store/index'



Vue.config.productionTip = false
Vue.prototype.$axios = Axios;


Vue.use(iView);
Vue.use(Vuex)



/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
