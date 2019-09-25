import Vuex from 'vuex';
import Vue from 'vue';

import deviceInfo from './deviceInfo'
import deviceLog from './deviceLog'
import login from './login'
import treeDemo from './treeDemo'

Vue.use(Vuex);

export const state = {


};
export const mutations = {

};

export const store = new Vuex.Store({
  state,
  mutations,
  modules:{
    deviceInfo, deviceLog ,login, treeDemo
  }
});

export default store
