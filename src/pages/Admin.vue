<template>
  <q-page class="">
    <div class="container" style="margin-top: 50px">
      <header class="flex justify-between items-center">
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
        <q-btn
          color="primary"
          rounded
          icon="las la-plus"
          label="Add flight"
          @click="flightDialog = true"
        />
      </header>

      <flight-list :airflights="airflights" />

      <q-dialog v-model="flightDialog" persistent>
        <flight-dialog @addFlight="newFlight"></flight-dialog>
      </q-dialog>
    </div>
  </q-page>
</template>

<script>
import getAirFlights from "../Mixins/GetAirFlights.js";
import FlightList from "src/components/FlightList.vue";
import FlightDialog from "src/components/FlightDialog.vue";
export default {
  components: { FlightList, FlightDialog },
  mixins: [getAirFlights],
  data() {
    return {
      flightDialog: false,
    };
  },
  methods: {
    newFlight(flight) {
      this.$store
        .dispatch("addNewFlight", flight)
        .then((res) => {
          this.$q.notify({
            message: "Airflight has been added",
            color: "secondary",
          });
          this.flightDialog = false;
        })
        .catch((err) => {
          this.$q.notify({
            message: "Somthing was wrong",
            color: "red",
          });
        });
    },
  },
};
</script>
