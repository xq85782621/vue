import Vuex from 'vuex';
import Vue from 'vue';

import deviceInfo from './deviceInfo'
import deviceLog from './deviceLog'
import login from './login'
import user from './user'
import role from './role'
import department from './department'
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
    deviceInfo, deviceLog ,login, treeDemo, user, role,department
  }
});

export default store
