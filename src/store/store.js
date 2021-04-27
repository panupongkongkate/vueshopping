import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    food: 'ต้มยำกุ้ง',
    sport: 'มวยไทย',
    dataCart:[],
  },
  mutations: {
    setFood(state, food) {
      state.food = food ;
    },
    setSport(state, sport) {
      state.sport = sport ;
    }
    ,
    setdataCart(state, dataCart) {
      state.dataCart = dataCart ;
    }

  },
  getters: {
    showFood: state => {
      return state.food ;
    },
    showpataca: state => {
      return state.pataca ;
    }
    ,
    showdataCart: state => {
      return state.dataCart 
    }
  }
})

  