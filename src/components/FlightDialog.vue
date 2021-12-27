<template>
  <q-card>
    <q-form @submit="addFlight">
      <q-card-section class="">
        <div class="text-subtitle1 text-grey text-uppercase q-mb-md text-bold">
          Add Flight
        </div>
        <div class="flex no-wrap">
          <q-input
            v-model="flight.from"
            :rules="[(val) => val.length >= 3 || 'Please Type valid country']"
            lazy-rules
            type="text"
            label="From"
            outlined
            color="primary"
            dense
            style="width: 48%"
          >
            <template v-slot:prepend>
              <q-icon name="las la-globe" color="primary" />
            </template>
          </q-input>
          <q-icon
            name="las la-arrow-right"
            color="primary"
            size="22px"
            style="margin: 10px"
          />
          <q-input
            v-model="flight.to"
            :rules="[(val) => val.length >= 3 || 'Please Type valid country']"
            lazy-rules
            type="text"
            label="To"
            outlined
            color="primary"
            dense
            style="width: 48%"
          >
            <template v-slot:prepend>
              <q-icon name="las la-globe" color="primary" />
            </template>
          </q-input>
        </div>

        <div class="flex no-wrap q-my-sm">
          <q-input
            v-model="flight.price"
            :rules="[(val) => !!val || 'please type the flight price']"
            lazy-rules
            type="number"
            label="Flight price"
            outlined
            color="primary"
            dense
            style="width: 50%; margin-right: 10px"
          >
            <template v-slot:prepend>
              <q-icon name="las la-dollar-sign" color="primary" />
            </template>
          </q-input>

          <q-select
            outlined
            v-model="flight.company"
            :rules="[(val) => !!val || 'please select the airline company']"
            lazy-rules
            :options="companies"
            label="select company"
            color="primary"
            dense
            style="width: 50%"
          />
        </div>

        <div class="flex no-wrap">
          <q-input
            outlined
            color="primary"
            v-model="flight.take_off"
            mask="time"
            :rules="['time']"
            style="margin-right: 10px"
          >
            <template v-slot:prepend>
              <q-icon name="las la-plane-departure" color="primary" />
            </template>
            <template v-slot:append>
              <q-icon name="access_time" class="cursor-pointer">
                <q-popup-proxy transition-show="scale" transition-hide="scale">
                  <q-time v-model="flight.take_off">
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Close" color="primary" flat />
                    </div>
                  </q-time>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
          <q-input
            outlined
            color="primary"
            v-model="flight.landing"
            mask="time"
            :rules="['time']"
          >
            <template v-slot:prepend>
              <q-icon name="las la-plane-arrival" color="primary" />
            </template>
            <template v-slot:append>
              <q-icon name="access_time" class="cursor-pointer">
                <q-popup-proxy transition-show="scale" transition-hide="scale">
                  <q-time v-model="flight.landing">
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Close" color="primary" flat />
                    </div>
                  </q-time>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </div>

        <div class="date">
          <q-input outlined v-model="flight.date" mask="date" :rules="['date']">
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy
                  ref="qDateProxy"
                  transition-show="scale"
                  transition-hide="scale"
                >
                  <q-date v-model="flight.date">
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Close" color="primary" flat />
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </div>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="Cancel" color="primary" v-close-popup />
        <q-btn label="Add " padding="5px 50px" color="primary" type="submit" />
      </q-card-actions>
    </q-form>
  </q-card>
</template>

<script>
export default {
  data() {
    return {
      flight: {
        from: "",
        to: "",
        price: "",
        company: "",
        date: "2021/12/30",
        take_off: "03:00",
        landing: "16:00",
      },
      companies: ["emirates", "qatar", "etihad"],
    };
  },
  methods: {
    addFlight() {
      this.$emit("addFlight", this.flight);
    },
  },
};
</script>

<style></style>
