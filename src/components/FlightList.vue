<template>
  <div class="flight-container">
    <flight-card
      v-for="(airflight, i) in airflights"
      :key="i"
      :airflight="airflight"
    >
      <q-btn
        v-if="$route.path == '/user'"
        color="primary"
        rounded
        label="Book"
        padding="5px 40px"
        class="q-mt-sm"
        @click="bookTicket(airflight)"
      />
    </flight-card>

    <template v-if="!airflights">
      <q-skeleton
        v-for="(ske, i) in 3"
        :key="i"
        width="100%"
        height="100px"
        class="q-mb-md"
        style="border-radius: 20px"
      />
    </template>
  </div>
</template>

<script>
import FlightCard from "./FlightCard.vue";
export default {
  components: { FlightCard },
  props: ["airflights"],
  computed: {
    currentUser() {
      return this.$store.getters["currentUser"];
    },
  },
  methods: {
    bookTicket(airflight) {
      const userData = {
        id: this.currentUser.id,
        airflight,
      };
      this.$store
        .dispatch("bookTicket", userData)
        .then((res) => {
          this.$q.notify({
            message: "you have just booked the ticket",
            icon: "las la-check",
            color: "primary",
          });
        })
        .catch((err) => {
          const msg = err.msg;
          this.$q.notify({
            message: msg,
            icon: "las la-info",
            color: "red",
          });
        });
    },
  },
};
</script>

<style lang="scss">
.flight-container {
  margin: 30px 0 100px 0;
}
</style>
