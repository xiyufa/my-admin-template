import Vue from 'vue'
import Vuex from 'vuex'

import app from './modules/app'
import setting from './modules/setting'
import user from './modules/user'
import tagsView from './modules/tagsView'

import getters from './getters'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    app,
    setting,
    user,
    tagsView
  },
  getters
})
