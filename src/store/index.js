import Vue from 'vue'
import Vuex from 'vuex'

import airFlights from './airFlights'
import user from './user'

Vue.use(Vuex)


export default function () {
  const Store = new Vuex.Store({
    modules: {
      airFlights,
      user
    },

    strict: process.env.DEBUGGING
  })

  return Store
}
