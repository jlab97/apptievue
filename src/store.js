import Vue from 'vue'
import Vuex from 'vuex'
import VueAxios from 'vue-axios'
import axios from 'axios'

Vue.use(VueAxios,axios)
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
      typeProd:[],
      brands:[]
  },
  mutations: {
      loadTypeProd(state,data){
          state.typeProd=data
      },
      loadBrands(state, data){
          state.brands=data
      }

  },
  actions: {
    getTypeProd(){
        axios.get('http://localhost/apptie/typeProducts.php?action=read')
        .then(res=>{
            this.commit('loadTypeProd',res.data.typeproducts)
        })
    },
    getBrands(){
        axios.get('http://localhost/apptie/brands.php?action=read')
        .then(res=>{
            this.commit('loadBrands',res.data.brands)
        })
    },
  }
})
