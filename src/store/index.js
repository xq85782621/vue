import Vuex from 'vuex';
import Vue from 'vue';

import deviceInfo from './deviceInfo'
import login from './login'

Vue.use(Vuex);

export const state = {


};
export const mutations = {

};

export const store = new Vuex.Store({
  state,
  mutations,
  modules:{
    deviceInfo,login
  }
});

export default store
