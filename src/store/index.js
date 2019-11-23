import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    default: {headerBack:false,hederContent:'订单数据',headerShow:true,bottom:'0',bottomShow: true},
    isLogin: false,
    host: 'https://www.baidu.com/'
  },
  getters: {
    
  },
  mutations: {
    defaultParame(state) {
      state.default = {headerBack:false,hederContent:'订单数据',bottom:'0'}
    },
    changeParame (state,parame) {
      state.default = {headerBack:false,headerShow:true,hederContent:'订单数据',bottom:'0',bottomShow: true}
      for(let val in parame){
        state.default[val] = parame[val]
      }
      // state.default = {headerBack:parame.headerBack,hederContent:parame.hederContent,bottom:parame.bottom,bottomShow:parame.bottomShow}
    },
    login (state){
      state.isLogin = true
    }
  }, 
  actions: {
  },
  modules: {
    home: {
      state: {},
      getters: {}, 
      mutations: {}, 
      actions: {},
    }
  },
  strict: process.env.NODE_ENV !== 'production'
})