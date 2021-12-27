import axios from "axios";

export default {
  state: {
    allUsers: null,
    currentUser: null,
    tickets: null
  },
  mutations: {
    ALL_USERS(state, users) {
      let arr = []
      for (let key in users) {
        users[key].id = key
        arr.push(users[key])
      }
      state.allUsers = arr
    },
    CREATE_USER(state, user) {
      state.currentUser = user
      localStorage.setItem('current_user', JSON.stringify(user))
    },
    ALL_TICKETS(state, tickets) {
      let arr = []
      for (let key in tickets) {
        arr.push(tickets[key])
      }
      state.tickets = arr
    },
    BOOK_TICKET(state, ticket) {
      state.tickets.push(ticket)
    }
  },
  actions: {
    async getAllUsers({
      commit
    }) {
      let res = await axios.get('https://airflights-b9315-default-rtdb.firebaseio.com/users.json')
      let data = await res.data
      commit('ALL_USERS', data)
    },
    checkUser({
      state
    }, userName) {
      return state.allUsers.findIndex(user => user.userName == userName)
    },
    async createUser(context, user) {
      let currentUser
      let checkUser = await context.dispatch('checkUser', user.userName)
      let result = await checkUser
      if (result === -1) {
        let res = await axios.post('https://airflights-b9315-default-rtdb.firebaseio.com/users.json', user)
        let data = await res.data
        currentUser = {
          id: data.name,
          ...user
        }
      } else {
        currentUser = context.state.allUsers.find(u => u.userName == user.userName)
        if (currentUser.password != user.password) {
          throw {
            msg: 'The password doesnt match'
          }
        }
      }
      context.commit('CREATE_USER', currentUser)
      return currentUser
    },
    async getTickets(context) {
      const userId = context.getters['currentUser'].id
      let res = await axios.get(`https://airflights-b9315-default-rtdb.firebaseio.com/users/${userId}/tickets.json`)
      let data = await res.data
      context.commit('ALL_TICKETS', data)
    },
    async bookTicket(context, userData) {
      const tickets = context.state.tickets
      let index = tickets.findIndex(ticket => ticket.id == userData.airflight.id)
      console.log(index)
      if (index != -1) {
        throw {
          msg: 'you already booked this ticket before'
        }
      }
      let res = await axios.post(`https://airflights-b9315-default-rtdb.firebaseio.com/users/${userData.id}/tickets.json`, userData.airflight)
      let data = res.data
      context.commit('BOOK_TICKET', userData.airflight)
      return data
    }
  },
  getters: {
    currentUser(state) {
      if (localStorage.getItem('current_user')) {
        return state.currentUser || JSON.parse(localStorage.getItem('current_user'))
      }
    },
    tickets(state) {
      return state.tickets
    }
  }
}
