import axios from 'axios'
export default {
  state: {
    airflights: null
  },
  mutations: {
    GET_AIRFLIGHTS(state, data) {
      let arr = []
      for (let key in data) {
        data[key].id = key
        arr.push(data[key])
      }
      state.airflights = arr
    },
    ADD_NEW_FLIGHT(state, data) {
      state.airflights.push(data)
    }
  },
  actions: {
    async getAirflights({
      commit
    }) {
      const res = await axios.get('https://airflights-b9315-default-rtdb.firebaseio.com/airFlights.json')
      const data = await res.data
      commit('GET_AIRFLIGHTS', data)
    },
    async addNewFlight({
      commit
    }, payload) {
      const res = await axios.post('https://airflights-b9315-default-rtdb.firebaseio.com/airFlights.json', payload)
      const data = await res.data
      const newFlight = {
        ...payload,
        id: data.name
      }
      commit('ADD_NEW_FLIGHT', newFlight)
      return data
    }
  },

  getters: {
    allAirflights(state) {
      return state.airflights
    }
  }

}
