import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
// 封装本地存储，vuex-persistedstate

// vuex-persistedstate --> 持久化state

// 1.下载
//  - yarn add vuex-persistedstate@3.2.1
// 2.引入
//  - import createPersistedState from 'vuex-persistedstate'
// 3.调用
//  - plugins: [createPersistedState()]
export default new Vuex.Store({
  state: {
    tokenObj:
      JSON.parse(window.localStorage.getItem('HEIMATOUTIAO_TOKEN')) || {}
  },
  getters: {},
  mutations: {
    SET_TOKEN(state, token) {
      // 将token存在vuex
      state.tokenObj = token
      // token持久化本地存储
      window.localStorage.setItem('HEIMATOUTIAO_TOKEN', JSON.stringify(token))
    }
  },
  actions: {},
  modules: {}
})
