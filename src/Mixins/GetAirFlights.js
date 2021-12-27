export default {
  computed: {
    airflights() {
      return this.$store.getters["allAirflights"];
    },
  },
  methods: {
    getAirFlights() {
      this.$store.dispatch("getAirflights");
    },
  },
  created() {
    this.getAirFlights();
  },
}
