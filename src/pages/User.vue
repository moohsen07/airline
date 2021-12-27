<template>
  <q-page>
    <div class="container-lg" style="margin-top: 50px">
      <div class="row q-col-gutter-md">
        <div class="col-sm-12 col-md-7">
          <header>
            <div class="flex items-center">
              <q-icon
                name="las la-arrow-circle-left"
                color="grey"
                size="30px"
                class="cursor-pointer"
                @click="$router.back(-1)"
              />
              <div class="q-ml-md text-h6 text-grey text-uppercase">
                Airlines flights
              </div>
            </div>
          </header>
          <main>
            <flight-list :airflights="airflights"></flight-list>
          </main>
        </div>
        <div class="col-sm-12 col-md-5">
          <header>
            <div class="flex items-center">
              <div class="q-ml-md text-h6 text-grey text-uppercase">
                My Tickets
              </div>
            </div>
          </header>
          <main>
            <div class="flight-container" v-if="tickets.length">
              <ticket
                v-for="ticket in tickets"
                :key="ticket.id"
                :ticket="ticket"
              />
            </div>
            <app-svg v-else></app-svg>
          </main>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import getAirFlights from "../Mixins/GetAirFlights.js";
import FlightList from "components/FlightList.vue";
import AppSvg from "components/AppSvg.vue";
import Ticket from "components/Ticket.vue";
export default {
  mixins: [getAirFlights],
  components: { FlightList, AppSvg, Ticket },
  computed: {
    tickets() {
      return this.$store.getters["tickets"] || [];
    },
  },
  methods: {
    getTickets() {
      this.$store.dispatch("getTickets");
    },
  },
  created() {
    this.getTickets();
  },
};
</script>

<style></style>
